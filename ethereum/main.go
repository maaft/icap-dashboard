package main

import (
	"context"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math"
	"math/big"
	"net/http"
	"sort"
	"strconv"
	"time"

	"github.com/lucsky/cuid"
	"github.com/maaft/gqlgenc/client"
	"github.com/maaft/invictusicap/auth"
	g "github.com/maaft/invictusicap/generated"
	"github.com/nanmu42/etherscan-api"

	ethmath "github.com/ethereum/go-ethereum/common/math"
	"github.com/ethereum/go-ethereum/crypto"
)

var stakingContract = "0x060d4a10f3154bd06005f0224a153b4f967a39c7"
var treasuryContracts = [2]string{"0x114b01a4a54404bd1fac518b4c5fb4e3b4991fd4", "0x0faa301e4475b0024ecca0ebe8f6dd4a265420d5"}
var etherscanAPIKey = "QQRQ61FFIDY7QREKV4UD4REBK96FP49JNG"

var denom = ethmath.U256(big.NewInt(int64(math.Pow(10, 18))))

type tokenAddress string

const (
	tokenAddressIHF tokenAddress = "0xaf1250fa68d7decd34fd75de8742bc03b29bd58e"
	tokenAddressC20 tokenAddress = "0x26e75307fc0c021472feb8f727839531f112f317"
	tokenAddressC10 tokenAddress = "0x000c100050e98c91f9114fa5dd75ce6869bf4f53"
	tokenAddressEMS tokenAddress = "0xc4d5c69439e028b9bc86af0ae5c038990bfac43c"
	tokenAddressIBA tokenAddress = "0xa32ec8db6ba73ee374dfed2dd566a53f6dc23ebe"
	tokenAddressIGP tokenAddress = "0x8df1be0fdf7161a6ff56c8189d7e10358727a96c"
	tokenAddressIML tokenAddress = "0x7ca598a636647b114292bb66e1336865fc262d11"
)

var tokenAddresses = [...]tokenAddress{tokenAddressIHF, tokenAddressC20, tokenAddressC10, tokenAddressEMS, tokenAddressIBA, tokenAddressIGP, tokenAddressIML}

func timeMultiplierFromSeconds(seconds int) float64 {
	switch seconds {
	case 2592000:
		return 1.0
	case 7776000:
		return 1.33
	case 15552000:
		return 1.66
	case 31536000:
		return 2.0
	default:
		panic("unknown seconds")
	}
}

func tickerFromAddress(address tokenAddress) string {
	switch address {
	case tokenAddressC10:
		return "C10"
	case tokenAddressC20:
		return "C20"
	case tokenAddressEMS:
		return "EMS"
	case tokenAddressIBA:
		return "IBA"
	case tokenAddressIGP:
		return "IGP"
	case tokenAddressIHF:
		return "IHF"
	case tokenAddressIML:
		return "IML"
	default:
		panic("unknown address")
	}
}

func baseMultiplierFromAddress(address tokenAddress) float64 {
	switch address {
	case tokenAddressC10:
		return 1.0
	case tokenAddressC20:
		return 1.0
	case tokenAddressEMS:
		return 1.0
	case tokenAddressIBA:
		return 1.33
	case tokenAddressIGP:
		return 1.0
	case tokenAddressIHF:
		return 1.0
	case tokenAddressIML:
		return 1.25
	default:
		panic("unknown address")
	}
}

func nameFromAddress(address tokenAddress) string {
	switch address {
	case tokenAddressC10:
		return "Crypto10 Hedged"
	case tokenAddressC20:
		return "Crypto20"
	case tokenAddressEMS:
		return "Emerging Markets Solar"
	case tokenAddressIBA:
		return "Invictus Bitcoin Alpha"
	case tokenAddressIGP:
		return "Invictus Gold Plus"
	case tokenAddressIHF:
		return "Invictus Hyperion Fund"
	case tokenAddressIML:
		return "Invictus Margin Lending"
	default:
		panic("unknown address")
	}
}

type appState struct {
	ID             string
	TransactionIDs map[string]bool
}

func getMethodID(method string) string {
	return hex.EncodeToString(crypto.Keccak256([]byte(method)))
}

func padWithZeros(s string) string {
	result := ""
	for i := 0; i < 64-len(s); i++ {
		result += "0"
	}
	return result + s
}

type etherscanResponse struct {
	jsonrpc string
	id      string
	Result  string `json:"result"`
}

func getTokenBalance(tokenAddress string, holderAddress string) float64 {
	url := "https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=" + tokenAddress + "&address=" + holderAddress + "&tag=latest&apikey=" + etherscanAPIKey
	resp, err := http.Get(url)

	if err != nil {
		panic(err)
	}

	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		panic(err)
	}

	decoded := &etherscanResponse{}
	err = json.Unmarshal(body, decoded)
	if err != nil {
		panic(err)
	}

	value, success := ethmath.ParseBig256(decoded.Result)
	if !success {
		panic("Can't parse uint256!")
	}

	mod := ethmath.U256(big.NewInt(0))

	value.DivMod(value, denom, mod)

	result := float64(value.Int64()) + float64(mod.Int64())/math.Pow(10, 18)

	return result
}

func getAmountStaked(tokenAddress string, holderAddress string) float64 {
	data := "0x" + getMethodID("userAmountStaked(address,address)")[:8] + padWithZeros(tokenAddress[2:]) + padWithZeros(holderAddress[2:])

	url := "https://api.etherscan.io/api?module=proxy&action=eth_call&to=" + stakingContract + "&data=" + data + "&tag=latest&apikey=" + etherscanAPIKey
	resp, err := http.Get(url)

	if err != nil {
		panic(err)
	}

	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		panic(err)
	}

	decoded := &etherscanResponse{}
	err = json.Unmarshal(body, decoded)
	if err != nil {
		panic(err)
	}

	value, success := ethmath.ParseBig256(decoded.Result)
	if !success {
		panic("Can't parse uint256!")
	}

	mod := ethmath.U256(big.NewInt(0))

	value.DivMod(value, denom, mod)

	result := float64(value.Int64()) + float64(mod.Int64())/math.Pow(10, 18)

	return result
}

func getCommittedStakingPeriod(tokenAddress string, holderAddress string) int {
	data := "0x" + getMethodID("userCommittedStakingPeriod(address,address)")[:8] + padWithZeros(tokenAddress[2:]) + padWithZeros(holderAddress[2:])

	url := "https://api.etherscan.io/api?module=proxy&action=eth_call&to=" + stakingContract + "&data=" + data + "&tag=latest&apikey=" + etherscanAPIKey
	resp, err := http.Get(url)

	if err != nil {
		panic(err)
	}

	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		panic(err)
	}

	decoded := &etherscanResponse{}
	err = json.Unmarshal(body, decoded)
	if err != nil {
		panic(err)
	}

	value, success := ethmath.ParseBig256(decoded.Result)
	if !success {
		panic("Can't parse uint256!")
	}

	return int(value.Int64())
}

type navData struct {
	Ticker string  `json:"ticker"`
	Nav    float64 `json:"nav_per_token,string"`
}

type navResult struct {
	Status string    `json:"status"`
	Data   []navData `json:"data"`
}

func getNav() (map[string]float64, error) {
	resp, err := http.Get("https://api.invictuscapital.com/v2/funds")
	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	decoded := navResult{}
	err = json.Unmarshal(body, &decoded)
	if err != nil {
		return nil, err
	}

	result := make(map[string]float64)
	for _, entry := range decoded.Data {
		result[entry.Ticker] = entry.Nav
	}

	return result, nil
}

type ethResult struct {
	Status int `json:"status,string"`
	Result struct {
		Price float64 `json:"ethusd,string"`
	} `json:"result"`
}

func getETHPrice() (float64, error) {
	resp, err := http.Get("https://api.etherscan.io/api?module=stats&action=ethprice&apikey=" + etherscanAPIKey)
	if err != nil {
		return 0, err
	}

	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return 0, err
	}

	decoded := ethResult{}
	err = json.Unmarshal(body, &decoded)
	if err != nil {
		return 0, err
	}

	if decoded.Status == 0 {
		return 0, err
	}

	return decoded.Result.Price, nil
}

type uniswapResult struct {
	Pair *struct {
		Price string `json:"price" graphql:"price"`
	} `json:"pair" graphql:"pair"`
}

func updateDatabase(etherscanClient *etherscan.Client, dgraphClient *g.Client, appState *appState) error {

	for _, tokenAddress := range tokenAddresses {
		currentTicker := tickerFromAddress(tokenAddress)

		for _, treasury := range treasuryContracts {
			balance := getTokenBalance(string(tokenAddress), treasury)

			existingAccount, err := dgraphClient.GetAccount(context.Background(), treasury)

			if err != nil {
				return err
			}

			foundBalance := false
			balanceID := ""
			for _, existingBalance := range existingAccount.GetAccount.Balances {
				if existingBalance.Token.Ticker == currentTicker {
					foundBalance = true
					balanceID = existingBalance.ID
				}
			}
			if foundBalance {
				_, err := dgraphClient.UpdateBalance(context.Background(), balanceID, g.BalancePatch{
					Amount: &balance,
				})

				if err != nil {
					return err
				}

			} else {
				_, err := dgraphClient.AddBalance(context.Background(), g.AddBalanceInput{
					ID:     cuid.New(),
					Token:  &g.TokenRef{Ticker: &currentTicker},
					Amount: balance,
					Owner:  &g.AccountRef{Address: &treasury},
				})

				if err != nil {
					return err
				}
			}

			time.Sleep(time.Millisecond * 200)
		}
	}

	newTransactions := make([]etherscan.ERC20Transfer, 0)

	for _, tokenAddress := range tokenAddresses {
		strAddr := string(tokenAddress)
		transactions, err := etherscanClient.ERC20Transfers(&strAddr, &stakingContract, nil, nil, 1, 1000, false)
		if err != nil {
			return err
		}
		for _, tx := range transactions {
			if _, ok := appState.TransactionIDs[tx.Hash]; !ok {
				newTransactions = append(newTransactions, tx)
			}
		}
		time.Sleep(time.Millisecond * 200)
	}

	for _, tx := range newTransactions {

		holderAddress := tx.From
		if holderAddress == stakingContract {
			skip := false
			for _, treasuryContract := range treasuryContracts {
				if tx.To == treasuryContract {
					skip = true
				}
			}
			if skip {
				continue
			} else {
				holderAddress = tx.To
			}
		}

		ticker := tickerFromAddress(tokenAddress(tx.ContractAddress))

		amount := getAmountStaked(tx.ContractAddress, holderAddress)
		time.Sleep(time.Millisecond * 200)
		stakingPeriod := getCommittedStakingPeriod(tx.ContractAddress, holderAddress)
		time.Sleep(time.Millisecond * 200)

		existingAccount, err := dgraphClient.GetAccount(context.Background(), holderAddress)

		if err != nil {
			return err
		}

		if existingAccount.GetAccount == nil {
			id := cuid.New()
			_, err := dgraphClient.AddAccount(context.Background(), g.AddAccountInput{
				Address:  holderAddress,
				Balances: []*g.BalanceRef{},
				Type:     g.AccountTypeUser,
				Stakes: []*g.StakeRef{
					&g.StakeRef{
						Amount:                 &amount,
						ID:                     &id,
						CommittedStakingPeriod: &stakingPeriod,
						Token: &g.TokenRef{
							Ticker: &ticker,
						},
					},
				},
			})
			if err != nil {
				return err
			}

		} else {
			if amount == 0 {
				for _, stake := range existingAccount.GetAccount.Stakes {
					if stake.Token.Ticker == ticker {
						_, err := dgraphClient.DeleteStake(context.Background(), stake.ID)
						if err != nil {
							return err
						}
					}
				}
			} else {
				foundStake := false
				stakeID := ""
				for _, stake := range existingAccount.GetAccount.Stakes {
					if stake.Token.Ticker == ticker {
						foundStake = true
						stakeID = stake.ID
					}
				}

				if foundStake {
					_, err := dgraphClient.UpdateStake(context.Background(), g.StakeFilter{
						ID: &g.StringHashFilter{
							Eq: &stakeID,
							In: []*string{&stakeID},
						},
					}, g.StakePatch{
						Amount:                 &amount,
						CommittedStakingPeriod: &stakingPeriod,
					})
					if err != nil {
						return err
					}
				} else {
					_, err := dgraphClient.AddStake(context.Background(), g.AddStakeInput{
						ID:                     cuid.New(),
						Amount:                 amount,
						CommittedStakingPeriod: stakingPeriod,
						Token: &g.TokenRef{
							Ticker: &ticker,
						},
						Owner: &g.AccountRef{
							Address: &holderAddress,
						},
					})
					if err != nil {
						return err
					}
				}
			}
		}
		appState.TransactionIDs[tx.Hash] = true
		_, err = dgraphClient.UpdateAppState(context.Background(), g.AppStatePatch{
			TransactionIds: []string{tx.Hash},
		})
		if err != nil {
			return err
		}
		_, err = dgraphClient.AddTransaction(context.Background(), g.AddTransactionInput{
			BlockHash:         tx.BlockHash,
			BlockNumber:       tx.BlockNumber,
			Confirmations:     tx.Confirmations,
			ContractAddress:   tx.ContractAddress,
			CumulativeGasUsed: tx.CumulativeGasUsed,
			From:              tx.From,
			Gas:               tx.Gas,
			GasPrice:          tx.GasPrice.Int().String(),
			GasUsed:           tx.GasUsed,
			Hash:              tx.Hash,
			Input:             tx.Input,
			Nonce:             tx.Nonce,
			TimeStamp:         tx.TimeStamp.Time().Format(time.RFC3339),
			To:                tx.To,
			TokenDecimal:      int(tx.TokenDecimal),
			TokenName:         tx.TokenName,
			TokenSymbol:       tx.TokenSymbol,
			TransactionIndex:  tx.TransactionIndex,
			Value:             tx.Value.Int().String(),
		})

		if err != nil {
			return err
		}

	}

	return nil
}

func updatePrices(dgraphClient *g.Client, uniswapClient *client.Client) error {
	ethPrice, err := getETHPrice()

	if err != nil {
		return err
	}

	_, err = dgraphClient.SetEthPrice(context.Background(), ethPrice)

	if err != nil {
		return err
	}

	time.Sleep(time.Millisecond * 200)

	// get Invictus prices
	navResult, err := getNav()

	if err != nil {
		return err
	}

	tokens, err := dgraphClient.QueryToken(context.Background())

	if err != nil {
		return err
	}

	for _, requiredToken := range tokenAddresses {
		ticker := tickerFromAddress(requiredToken)
		baseMultiplier := baseMultiplierFromAddress(requiredToken)
		foundToken := false
		for _, token := range tokens.QueryToken {
			if ticker == token.Ticker {
				foundToken = true
			}
		}
		if foundToken {
			nav := navResult[ticker]
			_, err := dgraphClient.UpdateToken(context.Background(), g.TokenFilter{
				Ticker: &g.StringHashFilter{
					Eq: &ticker,
					In: []*string{&ticker},
				},
			}, g.TokenPatch{
				Nav: &nav,
			})

			if err != nil {
				return err
			}

		} else {
			_, err := dgraphClient.AddToken(context.Background(), g.AddTokenInput{
				Ticker:         ticker,
				Name:           nameFromAddress(requiredToken),
				Nav:            navResult[ticker],
				BaseMultiplier: baseMultiplier,
			})

			if err != nil {
				return err
			}
		}
	}

	// get ICAP price
	var icapPrice uniswapResult
	err = uniswapClient.Post(context.Background(), `query { pair(id: "0xcb57a7eac6ad4ba80e48edea2cb426d6576ab681") { price: token0Price } }`, &icapPrice, map[string]interface{}{})
	if err != nil {
		return err
	}
	price, _ := strconv.ParseFloat(icapPrice.Pair.Price, 64)

	foundToken := false
	for _, token := range tokens.QueryToken {
		if token.Ticker == "ICAP" {
			foundToken = true
		}
	}
	if foundToken {
		ticker := "ICAP"
		_, err := dgraphClient.UpdateToken(context.Background(), g.TokenFilter{
			Ticker: &g.StringHashFilter{
				Eq: &ticker,
				In: []*string{&ticker},
			},
		}, g.TokenPatch{
			Nav: &price,
		})

		if err != nil {
			return err
		}
	} else {
		_, err = dgraphClient.AddToken(context.Background(), g.AddTokenInput{
			Ticker: "ICAP",
			Name:   "ICAP",
			Nav:    price,
		})

		if err != nil {
			return err
		}
	}

	return nil
}

func updateStakingPower(dgraphClient *g.Client, appState *appState) error {
	accounts, err := dgraphClient.QueryAccount(context.Background())
	if err != nil {
		return err
	}

	totalPower := 0.0
	stakingPowers := make([]float64, 0)
	maxPower := 0.0
	for _, acc := range accounts.QueryAccount {
		for _, stake := range acc.Stakes {
			currentPower := stake.Amount * stake.Token.BaseMultiplier * stake.Token.Nav * timeMultiplierFromSeconds(stake.CommittedStakingPeriod)
			if currentPower > maxPower {
				maxPower = currentPower
			}
			stakingPowers = append(stakingPowers, currentPower)
			totalPower += currentPower
		}
	}

	sort.Float64s(stakingPowers)
	medianPower := stakingPowers[len(stakingPowers)/2]

	fmt.Println(totalPower, maxPower, medianPower)

	_, err = dgraphClient.UpdateAppState(context.Background(), g.AppStatePatch{
		MaxStakingPower:    &maxPower,
		MedianStakingPower: &medianPower,
		TotalStakingPower:  &totalPower,
	})

	if err != nil {
		return err
	}

	return nil
}

func main() {
	adminToken, _ := auth.CreateToken("admin", "ADMIN", true)

	clientAHeader := func(req *http.Request) {
		req.Header.Set("X-Auth", adminToken)
	}

	dgraphClient := &g.Client{Client: client.NewClient(http.DefaultClient, "http://localhost:8080/graphql", clientAHeader)}

	uniswapClient := client.NewClient(http.DefaultClient, "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2")

	etherscanClient := etherscan.New(etherscan.Mainnet, etherscanAPIKey)

	appState := appState{
		ID:             cuid.New(),
		TransactionIDs: make(map[string]bool),
	}

	appStates, err := dgraphClient.GetAppState(context.Background())
	if err != nil {
		fmt.Println(err)
	}

	if len(appStates.QueryAppState) == 0 {
		_, err := dgraphClient.AddAppState(context.Background(), g.AddAppStateInput{
			ID:             appState.ID,
			TransactionIds: []string{},
		})

		if err != nil {
			fmt.Println(err)
		}
	} else {
		for _, txID := range appStates.QueryAppState[0].TransactionIds {
			appState.TransactionIDs[txID] = true
		}
	}

	treasuryAccounts, err := dgraphClient.GetTreasuryAccounts(context.Background())

	if err != nil {
		fmt.Println(err)
	}

	if len(treasuryAccounts.QueryAccount) != len(treasuryContracts) {
		for _, addr := range treasuryContracts {
			found := false
			for _, acc := range treasuryAccounts.QueryAccount {
				if addr == acc.Address {
					found = true
				}
			}

			if !found {
				_, err := dgraphClient.AddAccount(context.Background(), g.AddAccountInput{
					Address:  addr,
					Type:     g.AccountTypeTreasuryContract,
					Stakes:   []*g.StakeRef{},
					Balances: []*g.BalanceRef{},
				})

				if err != nil {
					fmt.Println(err)
				}
			}
		}
	}

	for {
		err := updatePrices(dgraphClient, uniswapClient)
		if err != nil {
			fmt.Println(err)
		}
		err = updateDatabase(etherscanClient, dgraphClient, &appState)
		if err != nil {
			fmt.Println(err)
		}
		err = updateStakingPower(dgraphClient, &appState)
		if err != nil {
			fmt.Println(err)
		}
		time.Sleep(time.Minute)
	}
}
