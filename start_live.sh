BACKEND_PATH=$(pwd)
export DB_PATH=$BACKEND_PATH/dgraphdb
export ZERO_PATH_W=$DB_PATH/zw
export ALPHA_PATH_P=$DB_PATH/p
export ALPHA_PATH_W=$DB_PATH/w

mkdir -p $ZERO_PATH_W
mkdir -p $ALPHA_PATH_P
mkdir -p $ALPHA_PATH_W

dgraph alpha -p $PWD/dgraphdb/p -w $PWD/dgraphdb/w &
dgraph zero -w $PWD/dgraphdb/zw

# export APP_SECRET="12345"
# sleep 15
# envsubst '${APP_SECRET}' < \"db/dgraph.graphql\" > \"db/dgraph-secret.graphql\";curl -X POST localhost:8080/admin/schema --data-binary '@db/dgraph-secret.graphql'