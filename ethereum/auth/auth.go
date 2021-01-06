package auth

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/99designs/gqlgen/handler"
	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"

	g "github.com/maaft/invictusicap/generated"
)

var userCtxKey = &contextKey{"user"}

type contextKey struct {
	name string
}

type User struct {
	Username   string
	Role       g.Role
	IsLoggedIn bool
}

// HashPassword : Hashes password
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

// CheckPasswordHash : CHecks password
func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

// CreateToken : Creates a JWT token based on username and role
func CreateToken(username string, role g.Role, loggedIn bool) (string, error) {
	var err error

	type CustomClaims struct {
		Claims jwt.MapClaims `json:"https://invictusicap.com/jwt/claims"`
		jwt.StandardClaims
	}

	customClaims := jwt.MapClaims{}
	customClaims["ROLE"] = role.String()
	customClaims["USERNAME"] = username
	if loggedIn {
		customClaims["IS_LOGGED_IN"] = "true"
	} else {
		customClaims["IS_LOGGED_IN"] = "false"
	}

	//Creating Access Token
	claims := CustomClaims{
		customClaims,
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 24 * 365).Unix(),
		},
	}

	at := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	token, err := at.SignedString([]byte(os.Getenv("APP_SECRET")))
	if err != nil {
		return "", err
	}
	return token, nil
}

// VerifyToken : Verify Token
func VerifyToken(tokenString string) (*jwt.Token, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		//Make sure that the token method conform to "SigningMethodHMAC"
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("APP_SECRET")), nil
	})
	if err != nil {
		return nil, err
	}

	return token, nil
}

// VerifyTokenFromString :  VerifyTokenFromString
func VerifyTokenFromString(tokenString string) bool {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		//Make sure that the token method conform to "SigningMethodHMAC"
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("APP_SECRET")), nil
	})
	if err == nil && token.Valid {
		return true
	}
	return false
}

// ExtractToken : Get token from header
func ExtractToken(r *http.Request) string {
	return r.Header.Get("X-Auth")
}

// GetUser : finds the user from the context. REQUIRES Middleware to have run.
func GetUser(ctx context.Context) *User {
	raw, _ := ctx.Value(userCtxKey).(*User)
	return raw
}

// Middleware decodes the share session cookie and packs the session into context
func Middleware() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			tokenString := ExtractToken(r)
			verifyTokenVar, _ := VerifyToken(tokenString)

			var ctx context.Context
			var user User

			if verifyTokenVar != nil {

				claims, ok := verifyTokenVar.Claims.(jwt.MapClaims)

				customClaims, ok := claims["https://invictusicap.com/jwt/claims"].(map[string]interface{})

				if ok && verifyTokenVar.Valid {
					role := g.Role(customClaims["ROLE"].(string))
					ok := role.IsValid()

					if !ok {
						http.Error(w, "Failed to verify Token", http.StatusForbidden)
						return
					}

					user = User{
						Username:   customClaims["USERNAME"].(string),
						Role:       role,
						IsLoggedIn: customClaims["IS_LOGGED_IN"].(string) == "true",
					}

					ctx = context.WithValue(r.Context(), userCtxKey, &user)

					r = r.WithContext(ctx)

				} else {
					http.Error(w, "Failed to verify Token", http.StatusForbidden)
					return
				}

			}
			next.ServeHTTP(w, r)

		})
	}
}

// WebsocketAuthFunc decodes auth token from websocket initpayload (connection parameters)
func WebsocketAuthFunc() handler.Option {
	return handler.WebsocketInitFunc(func(ctx context.Context, initPayload handler.InitPayload) (context.Context, error) {
		tokenString, ok := initPayload["X-Auth"].(string)
		if ok {
			verifyTokenVar, _ := VerifyToken(tokenString)
			var userCtx context.Context
			var user User

			if verifyTokenVar != nil {

				claims, ok := verifyTokenVar.Claims.(jwt.MapClaims)

				customClaims, ok := claims["https://invictusicap.com/jwt/claims"].(map[string]interface{})

				if ok && verifyTokenVar.Valid {
					role := g.Role(customClaims["ROLE"].(string))
					ok := role.IsValid()

					if !ok {
						return ctx, errors.New("Failed to verify Token")
					}

					user = User{
						Username:   customClaims["USERNAME"].(string),
						Role:       role,
						IsLoggedIn: customClaims["IS_LOGGED_IN"].(string) == "true",
					}

					userCtx = context.WithValue(ctx, userCtxKey, &user)

				} else {
					return ctx, errors.New("Failed to verify Token")
				}

			}

			return userCtx, nil
		}
		return ctx, errors.New("Token missing in websocket connection parameters!")
	})
}
