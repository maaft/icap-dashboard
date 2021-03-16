import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The DateTime scalar type represents date and time as a string in RFC3339 format.
   * For example: "1985-04-12T23:20:50.52Z" represents 20 minutes and 50.52 seconds
   * after the 23rd hour of April 12th, 1985 in UTC.
   */
  DateTime: any;
  /**
   * The Int64 scalar type represents a signed 64‐bit numeric non‐fractional value.
   * Int64 can represent values in range [-(2^63),(2^63 - 1)].
   */
  Int64: any;
};














export type Account = ReadOnly & {
  __typename?: 'Account';
  _placeholder?: Maybe<Scalars['String']>;
  address: Scalars['String'];
  type: AccountType;
  stakes: Array<Stake>;
  balances: Array<Balance>;
  stakesAggregate?: Maybe<StakeAggregateResult>;
  balancesAggregate?: Maybe<BalanceAggregateResult>;
};


export type AccountStakesArgs = {
  filter?: Maybe<StakeFilter>;
  order?: Maybe<StakeOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type AccountBalancesArgs = {
  filter?: Maybe<BalanceFilter>;
  order?: Maybe<BalanceOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type AccountStakesAggregateArgs = {
  filter?: Maybe<StakeFilter>;
};


export type AccountBalancesAggregateArgs = {
  filter?: Maybe<BalanceFilter>;
};

export type AccountAggregateResult = {
  __typename?: 'AccountAggregateResult';
  count?: Maybe<Scalars['Int']>;
  _placeholderMin?: Maybe<Scalars['String']>;
  _placeholderMax?: Maybe<Scalars['String']>;
  addressMin?: Maybe<Scalars['String']>;
  addressMax?: Maybe<Scalars['String']>;
};

export type AccountFilter = {
  address?: Maybe<StringHashFilter>;
  type?: Maybe<AccountType_Hash>;
  has?: Maybe<AccountHasFilter>;
  and?: Maybe<Array<Maybe<AccountFilter>>>;
  or?: Maybe<Array<Maybe<AccountFilter>>>;
  not?: Maybe<AccountFilter>;
};

export enum AccountHasFilter {
  Placeholder = '_placeholder',
  Address = 'address',
  Type = 'type',
  Stakes = 'stakes',
  Balances = 'balances'
}

export type AccountOrder = {
  asc?: Maybe<AccountOrderable>;
  desc?: Maybe<AccountOrderable>;
  then?: Maybe<AccountOrder>;
};

export enum AccountOrderable {
  Placeholder = '_placeholder',
  Address = 'address'
}

export type AccountPatch = {
  _placeholder?: Maybe<Scalars['String']>;
  type?: Maybe<AccountType>;
  stakes?: Maybe<Array<StakeRef>>;
  balances?: Maybe<Array<BalanceRef>>;
};

export type AccountRef = {
  _placeholder?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  type?: Maybe<AccountType>;
  stakes?: Maybe<Array<StakeRef>>;
  balances?: Maybe<Array<BalanceRef>>;
};

export enum AccountType {
  User = 'User',
  StakingContract = 'StakingContract',
  TreasuryContract = 'TreasuryContract'
}

export type AccountType_Hash = {
  eq?: Maybe<AccountType>;
  in?: Maybe<Array<Maybe<AccountType>>>;
};

export type AddAccountInput = {
  _placeholder?: Maybe<Scalars['String']>;
  address: Scalars['String'];
  type: AccountType;
  stakes: Array<StakeRef>;
  balances: Array<BalanceRef>;
};

export type AddAccountPayload = {
  __typename?: 'AddAccountPayload';
  account?: Maybe<Array<Maybe<Account>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type AddAccountPayloadAccountArgs = {
  filter?: Maybe<AccountFilter>;
  order?: Maybe<AccountOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type AddAppStateInput = {
  _placeholder?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  transactionIds: Array<Scalars['String']>;
  totalStakingPower: Scalars['Float'];
  medianStakingPower: Scalars['Float'];
  maxStakingPower: Scalars['Float'];
  ethPrice: Scalars['Float'];
};

export type AddAppStatePayload = {
  __typename?: 'AddAppStatePayload';
  appState?: Maybe<Array<Maybe<AppState>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type AddAppStatePayloadAppStateArgs = {
  filter?: Maybe<AppStateFilter>;
  order?: Maybe<AppStateOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type AddBalanceInput = {
  _placeholder?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  token: TokenRef;
  amount: Scalars['Float'];
  owner: AccountRef;
};

export type AddBalancePayload = {
  __typename?: 'AddBalancePayload';
  balance?: Maybe<Array<Maybe<Balance>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type AddBalancePayloadBalanceArgs = {
  filter?: Maybe<BalanceFilter>;
  order?: Maybe<BalanceOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type AddFooInput = {
  id: Scalars['String'];
  value: Scalars['Int'];
};

export type AddFooPayload = {
  __typename?: 'AddFooPayload';
  foo?: Maybe<Array<Maybe<Foo>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type AddFooPayloadFooArgs = {
  filter?: Maybe<FooFilter>;
  order?: Maybe<FooOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type AddStakeInput = {
  _placeholder?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  token: TokenRef;
  amount: Scalars['Float'];
  committedStakingPeriod: Scalars['Int'];
  owner: AccountRef;
};

export type AddStakePayload = {
  __typename?: 'AddStakePayload';
  stake?: Maybe<Array<Maybe<Stake>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type AddStakePayloadStakeArgs = {
  filter?: Maybe<StakeFilter>;
  order?: Maybe<StakeOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type AddTokenInput = {
  _placeholder?: Maybe<Scalars['String']>;
  ticker: Scalars['String'];
  name: Scalars['String'];
  nav: Scalars['Float'];
  baseMultiplier: Scalars['Float'];
};

export type AddTokenPayload = {
  __typename?: 'AddTokenPayload';
  token?: Maybe<Array<Maybe<Token>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type AddTokenPayloadTokenArgs = {
  filter?: Maybe<TokenFilter>;
  order?: Maybe<TokenOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type AddTransactionInput = {
  _placeholder?: Maybe<Scalars['String']>;
  blockNumber: Scalars['Int'];
  timeStamp: Scalars['DateTime'];
  hash: Scalars['String'];
  nonce: Scalars['Int'];
  blockHash: Scalars['String'];
  from: Scalars['String'];
  contractAddress: Scalars['String'];
  to: Scalars['String'];
  value: Scalars['String'];
  tokenName: Scalars['String'];
  tokenSymbol: Scalars['String'];
  tokenDecimal: Scalars['Int'];
  transactionIndex: Scalars['Int'];
  gas: Scalars['Int'];
  gasPrice: Scalars['String'];
  gasUsed: Scalars['Int'];
  cumulativeGasUsed: Scalars['Int'];
  input: Scalars['String'];
  confirmations: Scalars['Int'];
};

export type AddTransactionPayload = {
  __typename?: 'AddTransactionPayload';
  transaction?: Maybe<Array<Maybe<Transaction>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type AddTransactionPayloadTransactionArgs = {
  filter?: Maybe<TransactionFilter>;
  order?: Maybe<TransactionOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type AppState = Cuid & ReadOnly & {
  __typename?: 'AppState';
  _placeholder?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  transactionIds: Array<Scalars['String']>;
  totalStakingPower: Scalars['Float'];
  medianStakingPower: Scalars['Float'];
  maxStakingPower: Scalars['Float'];
  ethPrice: Scalars['Float'];
};

export type AppStateAggregateResult = {
  __typename?: 'AppStateAggregateResult';
  count?: Maybe<Scalars['Int']>;
  _placeholderMin?: Maybe<Scalars['String']>;
  _placeholderMax?: Maybe<Scalars['String']>;
  idMin?: Maybe<Scalars['String']>;
  idMax?: Maybe<Scalars['String']>;
  totalStakingPowerMin?: Maybe<Scalars['Float']>;
  totalStakingPowerMax?: Maybe<Scalars['Float']>;
  totalStakingPowerSum?: Maybe<Scalars['Float']>;
  totalStakingPowerAvg?: Maybe<Scalars['Float']>;
  medianStakingPowerMin?: Maybe<Scalars['Float']>;
  medianStakingPowerMax?: Maybe<Scalars['Float']>;
  medianStakingPowerSum?: Maybe<Scalars['Float']>;
  medianStakingPowerAvg?: Maybe<Scalars['Float']>;
  maxStakingPowerMin?: Maybe<Scalars['Float']>;
  maxStakingPowerMax?: Maybe<Scalars['Float']>;
  maxStakingPowerSum?: Maybe<Scalars['Float']>;
  maxStakingPowerAvg?: Maybe<Scalars['Float']>;
  ethPriceMin?: Maybe<Scalars['Float']>;
  ethPriceMax?: Maybe<Scalars['Float']>;
  ethPriceSum?: Maybe<Scalars['Float']>;
  ethPriceAvg?: Maybe<Scalars['Float']>;
};

export type AppStateFilter = {
  id?: Maybe<StringHashFilter>;
  transactionIds?: Maybe<StringHashFilter>;
  has?: Maybe<AppStateHasFilter>;
  and?: Maybe<Array<Maybe<AppStateFilter>>>;
  or?: Maybe<Array<Maybe<AppStateFilter>>>;
  not?: Maybe<AppStateFilter>;
};

export enum AppStateHasFilter {
  Placeholder = '_placeholder',
  Id = 'id',
  TransactionIds = 'transactionIds',
  TotalStakingPower = 'totalStakingPower',
  MedianStakingPower = 'medianStakingPower',
  MaxStakingPower = 'maxStakingPower',
  EthPrice = 'ethPrice'
}

export type AppStateOrder = {
  asc?: Maybe<AppStateOrderable>;
  desc?: Maybe<AppStateOrderable>;
  then?: Maybe<AppStateOrder>;
};

export enum AppStateOrderable {
  Placeholder = '_placeholder',
  Id = 'id',
  TotalStakingPower = 'totalStakingPower',
  MedianStakingPower = 'medianStakingPower',
  MaxStakingPower = 'maxStakingPower',
  EthPrice = 'ethPrice'
}

export type AppStatePatch = {
  _placeholder?: Maybe<Scalars['String']>;
  transactionIds?: Maybe<Array<Scalars['String']>>;
  totalStakingPower?: Maybe<Scalars['Float']>;
  medianStakingPower?: Maybe<Scalars['Float']>;
  maxStakingPower?: Maybe<Scalars['Float']>;
  ethPrice?: Maybe<Scalars['Float']>;
};

export type AppStateRef = {
  _placeholder?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  transactionIds?: Maybe<Array<Scalars['String']>>;
  totalStakingPower?: Maybe<Scalars['Float']>;
  medianStakingPower?: Maybe<Scalars['Float']>;
  maxStakingPower?: Maybe<Scalars['Float']>;
  ethPrice?: Maybe<Scalars['Float']>;
};

export type AuthRule = {
  and?: Maybe<Array<Maybe<AuthRule>>>;
  or?: Maybe<Array<Maybe<AuthRule>>>;
  not?: Maybe<AuthRule>;
  rule?: Maybe<Scalars['String']>;
};

export type Balance = Cuid & ReadOnly & {
  __typename?: 'Balance';
  _placeholder?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  token: Token;
  amount: Scalars['Float'];
  owner: Account;
};


export type BalanceTokenArgs = {
  filter?: Maybe<TokenFilter>;
};


export type BalanceOwnerArgs = {
  filter?: Maybe<AccountFilter>;
};

export type BalanceAggregateResult = {
  __typename?: 'BalanceAggregateResult';
  count?: Maybe<Scalars['Int']>;
  _placeholderMin?: Maybe<Scalars['String']>;
  _placeholderMax?: Maybe<Scalars['String']>;
  idMin?: Maybe<Scalars['String']>;
  idMax?: Maybe<Scalars['String']>;
  amountMin?: Maybe<Scalars['Float']>;
  amountMax?: Maybe<Scalars['Float']>;
  amountSum?: Maybe<Scalars['Float']>;
  amountAvg?: Maybe<Scalars['Float']>;
};

export type BalanceFilter = {
  id?: Maybe<StringHashFilter>;
  has?: Maybe<BalanceHasFilter>;
  and?: Maybe<Array<Maybe<BalanceFilter>>>;
  or?: Maybe<Array<Maybe<BalanceFilter>>>;
  not?: Maybe<BalanceFilter>;
};

export enum BalanceHasFilter {
  Placeholder = '_placeholder',
  Id = 'id',
  Token = 'token',
  Amount = 'amount',
  Owner = 'owner'
}

export type BalanceOrder = {
  asc?: Maybe<BalanceOrderable>;
  desc?: Maybe<BalanceOrderable>;
  then?: Maybe<BalanceOrder>;
};

export enum BalanceOrderable {
  Placeholder = '_placeholder',
  Id = 'id',
  Amount = 'amount'
}

export type BalancePatch = {
  _placeholder?: Maybe<Scalars['String']>;
  token?: Maybe<TokenRef>;
  amount?: Maybe<Scalars['Float']>;
  owner?: Maybe<AccountRef>;
};

export type BalanceRef = {
  _placeholder?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  token?: Maybe<TokenRef>;
  amount?: Maybe<Scalars['Float']>;
  owner?: Maybe<AccountRef>;
};

export type ContainsFilter = {
  point?: Maybe<PointRef>;
  polygon?: Maybe<PolygonRef>;
};

export type Cuid = {
  id: Scalars['String'];
};

export type CuidAggregateResult = {
  __typename?: 'CuidAggregateResult';
  count?: Maybe<Scalars['Int']>;
  idMin?: Maybe<Scalars['String']>;
  idMax?: Maybe<Scalars['String']>;
};

export type CuidFilter = {
  id?: Maybe<StringHashFilter>;
  has?: Maybe<CuidHasFilter>;
  and?: Maybe<Array<Maybe<CuidFilter>>>;
  or?: Maybe<Array<Maybe<CuidFilter>>>;
  not?: Maybe<CuidFilter>;
};

export enum CuidHasFilter {
  Id = 'id'
}

export type CuidOrder = {
  asc?: Maybe<CuidOrderable>;
  desc?: Maybe<CuidOrderable>;
  then?: Maybe<CuidOrder>;
};

export enum CuidOrderable {
  Id = 'id'
}

export type CuidRef = {
  id: Scalars['String'];
};

export type CustomHttp = {
  url: Scalars['String'];
  method: HttpMethod;
  body?: Maybe<Scalars['String']>;
  graphql?: Maybe<Scalars['String']>;
  mode?: Maybe<Mode>;
  forwardHeaders?: Maybe<Array<Scalars['String']>>;
  secretHeaders?: Maybe<Array<Scalars['String']>>;
  introspectionHeaders?: Maybe<Array<Scalars['String']>>;
  skipIntrospection?: Maybe<Scalars['Boolean']>;
};


export type DateTimeFilter = {
  eq?: Maybe<Scalars['DateTime']>;
  le?: Maybe<Scalars['DateTime']>;
  lt?: Maybe<Scalars['DateTime']>;
  ge?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  between?: Maybe<DateTimeRange>;
};

export type DateTimeRange = {
  min: Scalars['DateTime'];
  max: Scalars['DateTime'];
};

export type DeleteAccountPayload = {
  __typename?: 'DeleteAccountPayload';
  account?: Maybe<Array<Maybe<Account>>>;
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};


export type DeleteAccountPayloadAccountArgs = {
  filter?: Maybe<AccountFilter>;
  order?: Maybe<AccountOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type DeleteAppStatePayload = {
  __typename?: 'DeleteAppStatePayload';
  appState?: Maybe<Array<Maybe<AppState>>>;
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};


export type DeleteAppStatePayloadAppStateArgs = {
  filter?: Maybe<AppStateFilter>;
  order?: Maybe<AppStateOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type DeleteBalancePayload = {
  __typename?: 'DeleteBalancePayload';
  balance?: Maybe<Array<Maybe<Balance>>>;
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};


export type DeleteBalancePayloadBalanceArgs = {
  filter?: Maybe<BalanceFilter>;
  order?: Maybe<BalanceOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type DeleteCuidPayload = {
  __typename?: 'DeleteCuidPayload';
  cuid?: Maybe<Array<Maybe<Cuid>>>;
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};


export type DeleteCuidPayloadCuidArgs = {
  filter?: Maybe<CuidFilter>;
  order?: Maybe<CuidOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type DeleteFooPayload = {
  __typename?: 'DeleteFooPayload';
  foo?: Maybe<Array<Maybe<Foo>>>;
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};


export type DeleteFooPayloadFooArgs = {
  filter?: Maybe<FooFilter>;
  order?: Maybe<FooOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type DeleteReadOnlyPayload = {
  __typename?: 'DeleteReadOnlyPayload';
  readOnly?: Maybe<Array<Maybe<ReadOnly>>>;
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};


export type DeleteReadOnlyPayloadReadOnlyArgs = {
  filter?: Maybe<ReadOnlyFilter>;
  order?: Maybe<ReadOnlyOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type DeleteStakePayload = {
  __typename?: 'DeleteStakePayload';
  stake?: Maybe<Array<Maybe<Stake>>>;
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};


export type DeleteStakePayloadStakeArgs = {
  filter?: Maybe<StakeFilter>;
  order?: Maybe<StakeOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type DeleteTokenPayload = {
  __typename?: 'DeleteTokenPayload';
  token?: Maybe<Array<Maybe<Token>>>;
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};


export type DeleteTokenPayloadTokenArgs = {
  filter?: Maybe<TokenFilter>;
  order?: Maybe<TokenOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type DeleteTransactionPayload = {
  __typename?: 'DeleteTransactionPayload';
  transaction?: Maybe<Array<Maybe<Transaction>>>;
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};


export type DeleteTransactionPayloadTransactionArgs = {
  filter?: Maybe<TransactionFilter>;
  order?: Maybe<TransactionOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export enum DgraphIndex {
  Int = 'int',
  Int64 = 'int64',
  Float = 'float',
  Bool = 'bool',
  Hash = 'hash',
  Exact = 'exact',
  Term = 'term',
  Fulltext = 'fulltext',
  Trigram = 'trigram',
  Regexp = 'regexp',
  Year = 'year',
  Month = 'month',
  Day = 'day',
  Hour = 'hour',
  Geo = 'geo'
}

export type FloatFilter = {
  eq?: Maybe<Scalars['Float']>;
  le?: Maybe<Scalars['Float']>;
  lt?: Maybe<Scalars['Float']>;
  ge?: Maybe<Scalars['Float']>;
  gt?: Maybe<Scalars['Float']>;
  between?: Maybe<FloatRange>;
};

export type FloatRange = {
  min: Scalars['Float'];
  max: Scalars['Float'];
};

export type Foo = {
  __typename?: 'Foo';
  id: Scalars['String'];
  value: Scalars['Int'];
};

export type FooAggregateResult = {
  __typename?: 'FooAggregateResult';
  count?: Maybe<Scalars['Int']>;
  idMin?: Maybe<Scalars['String']>;
  idMax?: Maybe<Scalars['String']>;
  valueMin?: Maybe<Scalars['Int']>;
  valueMax?: Maybe<Scalars['Int']>;
  valueSum?: Maybe<Scalars['Int']>;
  valueAvg?: Maybe<Scalars['Float']>;
};

export type FooFilter = {
  id?: Maybe<StringHashFilter>;
  has?: Maybe<FooHasFilter>;
  and?: Maybe<Array<Maybe<FooFilter>>>;
  or?: Maybe<Array<Maybe<FooFilter>>>;
  not?: Maybe<FooFilter>;
};

export enum FooHasFilter {
  Id = 'id',
  Value = 'value'
}

export type FooOrder = {
  asc?: Maybe<FooOrderable>;
  desc?: Maybe<FooOrderable>;
  then?: Maybe<FooOrder>;
};

export enum FooOrderable {
  Id = 'id',
  Value = 'value'
}

export type FooPatch = {
  value?: Maybe<Scalars['Int']>;
};

export type FooRef = {
  id?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Int']>;
};

export type GenerateMutationParams = {
  add?: Maybe<Scalars['Boolean']>;
  update?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
};

export type GenerateQueryParams = {
  get?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Scalars['Boolean']>;
  password?: Maybe<Scalars['Boolean']>;
  aggregate?: Maybe<Scalars['Boolean']>;
};

export enum HttpMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Patch = 'PATCH',
  Delete = 'DELETE'
}


export type Int64Filter = {
  eq?: Maybe<Scalars['Int64']>;
  le?: Maybe<Scalars['Int64']>;
  lt?: Maybe<Scalars['Int64']>;
  ge?: Maybe<Scalars['Int64']>;
  gt?: Maybe<Scalars['Int64']>;
  between?: Maybe<Int64Range>;
};

export type Int64Range = {
  min: Scalars['Int64'];
  max: Scalars['Int64'];
};

export type IntersectsFilter = {
  polygon?: Maybe<PolygonRef>;
  multiPolygon?: Maybe<MultiPolygonRef>;
};

export type IntFilter = {
  eq?: Maybe<Scalars['Int']>;
  le?: Maybe<Scalars['Int']>;
  lt?: Maybe<Scalars['Int']>;
  ge?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  between?: Maybe<IntRange>;
};

export type IntRange = {
  min: Scalars['Int'];
  max: Scalars['Int'];
};

export enum Mode {
  Batch = 'BATCH',
  Single = 'SINGLE'
}

export type MultiPolygon = {
  __typename?: 'MultiPolygon';
  polygons: Array<Polygon>;
};

export type MultiPolygonRef = {
  polygons: Array<PolygonRef>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addFoo?: Maybe<AddFooPayload>;
  updateFoo?: Maybe<UpdateFooPayload>;
  deleteFoo?: Maybe<DeleteFooPayload>;
  updateReadOnly?: Maybe<UpdateReadOnlyPayload>;
  deleteReadOnly?: Maybe<DeleteReadOnlyPayload>;
  deleteCuid?: Maybe<DeleteCuidPayload>;
  addToken?: Maybe<AddTokenPayload>;
  updateToken?: Maybe<UpdateTokenPayload>;
  deleteToken?: Maybe<DeleteTokenPayload>;
  addStake?: Maybe<AddStakePayload>;
  updateStake?: Maybe<UpdateStakePayload>;
  deleteStake?: Maybe<DeleteStakePayload>;
  addBalance?: Maybe<AddBalancePayload>;
  updateBalance?: Maybe<UpdateBalancePayload>;
  deleteBalance?: Maybe<DeleteBalancePayload>;
  addAccount?: Maybe<AddAccountPayload>;
  updateAccount?: Maybe<UpdateAccountPayload>;
  deleteAccount?: Maybe<DeleteAccountPayload>;
  addTransaction?: Maybe<AddTransactionPayload>;
  updateTransaction?: Maybe<UpdateTransactionPayload>;
  deleteTransaction?: Maybe<DeleteTransactionPayload>;
  addAppState?: Maybe<AddAppStatePayload>;
  updateAppState?: Maybe<UpdateAppStatePayload>;
  deleteAppState?: Maybe<DeleteAppStatePayload>;
};


export type MutationAddFooArgs = {
  input: Array<AddFooInput>;
};


export type MutationUpdateFooArgs = {
  input: UpdateFooInput;
};


export type MutationDeleteFooArgs = {
  filter: FooFilter;
};


export type MutationUpdateReadOnlyArgs = {
  input: UpdateReadOnlyInput;
};


export type MutationDeleteReadOnlyArgs = {
  filter: ReadOnlyFilter;
};


export type MutationDeleteCuidArgs = {
  filter: CuidFilter;
};


export type MutationAddTokenArgs = {
  input: Array<AddTokenInput>;
};


export type MutationUpdateTokenArgs = {
  input: UpdateTokenInput;
};


export type MutationDeleteTokenArgs = {
  filter: TokenFilter;
};


export type MutationAddStakeArgs = {
  input: Array<AddStakeInput>;
};


export type MutationUpdateStakeArgs = {
  input: UpdateStakeInput;
};


export type MutationDeleteStakeArgs = {
  filter: StakeFilter;
};


export type MutationAddBalanceArgs = {
  input: Array<AddBalanceInput>;
};


export type MutationUpdateBalanceArgs = {
  input: UpdateBalanceInput;
};


export type MutationDeleteBalanceArgs = {
  filter: BalanceFilter;
};


export type MutationAddAccountArgs = {
  input: Array<AddAccountInput>;
};


export type MutationUpdateAccountArgs = {
  input: UpdateAccountInput;
};


export type MutationDeleteAccountArgs = {
  filter: AccountFilter;
};


export type MutationAddTransactionArgs = {
  input: Array<AddTransactionInput>;
};


export type MutationUpdateTransactionArgs = {
  input: UpdateTransactionInput;
};


export type MutationDeleteTransactionArgs = {
  filter: TransactionFilter;
};


export type MutationAddAppStateArgs = {
  input: Array<AddAppStateInput>;
};


export type MutationUpdateAppStateArgs = {
  input: UpdateAppStateInput;
};


export type MutationDeleteAppStateArgs = {
  filter: AppStateFilter;
};

export type NearFilter = {
  distance: Scalars['Float'];
  coordinate: PointRef;
};

export type Point = {
  __typename?: 'Point';
  longitude: Scalars['Float'];
  latitude: Scalars['Float'];
};

export type PointGeoFilter = {
  near?: Maybe<NearFilter>;
  within?: Maybe<WithinFilter>;
};

export type PointList = {
  __typename?: 'PointList';
  points: Array<Point>;
};

export type PointListRef = {
  points: Array<PointRef>;
};

export type PointRef = {
  longitude: Scalars['Float'];
  latitude: Scalars['Float'];
};

export type Polygon = {
  __typename?: 'Polygon';
  coordinates: Array<PointList>;
};

export type PolygonGeoFilter = {
  near?: Maybe<NearFilter>;
  within?: Maybe<WithinFilter>;
  contains?: Maybe<ContainsFilter>;
  intersects?: Maybe<IntersectsFilter>;
};

export type PolygonRef = {
  coordinates: Array<PointListRef>;
};

export type Query = {
  __typename?: 'Query';
  getFoo?: Maybe<Foo>;
  queryFoo?: Maybe<Array<Maybe<Foo>>>;
  aggregateFoo?: Maybe<FooAggregateResult>;
  queryReadOnly?: Maybe<Array<Maybe<ReadOnly>>>;
  aggregateReadOnly?: Maybe<ReadOnlyAggregateResult>;
  queryCuid?: Maybe<Array<Maybe<Cuid>>>;
  aggregateCuid?: Maybe<CuidAggregateResult>;
  getToken?: Maybe<Token>;
  queryToken?: Maybe<Array<Maybe<Token>>>;
  aggregateToken?: Maybe<TokenAggregateResult>;
  getStake?: Maybe<Stake>;
  queryStake?: Maybe<Array<Maybe<Stake>>>;
  aggregateStake?: Maybe<StakeAggregateResult>;
  getBalance?: Maybe<Balance>;
  queryBalance?: Maybe<Array<Maybe<Balance>>>;
  aggregateBalance?: Maybe<BalanceAggregateResult>;
  getAccount?: Maybe<Account>;
  queryAccount?: Maybe<Array<Maybe<Account>>>;
  aggregateAccount?: Maybe<AccountAggregateResult>;
  getTransaction?: Maybe<Transaction>;
  queryTransaction?: Maybe<Array<Maybe<Transaction>>>;
  aggregateTransaction?: Maybe<TransactionAggregateResult>;
  getAppState?: Maybe<AppState>;
  queryAppState?: Maybe<Array<Maybe<AppState>>>;
  aggregateAppState?: Maybe<AppStateAggregateResult>;
};


export type QueryGetFooArgs = {
  id: Scalars['String'];
};


export type QueryQueryFooArgs = {
  filter?: Maybe<FooFilter>;
  order?: Maybe<FooOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryAggregateFooArgs = {
  filter?: Maybe<FooFilter>;
};


export type QueryQueryReadOnlyArgs = {
  filter?: Maybe<ReadOnlyFilter>;
  order?: Maybe<ReadOnlyOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryAggregateReadOnlyArgs = {
  filter?: Maybe<ReadOnlyFilter>;
};


export type QueryQueryCuidArgs = {
  filter?: Maybe<CuidFilter>;
  order?: Maybe<CuidOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryAggregateCuidArgs = {
  filter?: Maybe<CuidFilter>;
};


export type QueryGetTokenArgs = {
  ticker: Scalars['String'];
};


export type QueryQueryTokenArgs = {
  filter?: Maybe<TokenFilter>;
  order?: Maybe<TokenOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryAggregateTokenArgs = {
  filter?: Maybe<TokenFilter>;
};


export type QueryGetStakeArgs = {
  id: Scalars['String'];
};


export type QueryQueryStakeArgs = {
  filter?: Maybe<StakeFilter>;
  order?: Maybe<StakeOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryAggregateStakeArgs = {
  filter?: Maybe<StakeFilter>;
};


export type QueryGetBalanceArgs = {
  id: Scalars['String'];
};


export type QueryQueryBalanceArgs = {
  filter?: Maybe<BalanceFilter>;
  order?: Maybe<BalanceOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryAggregateBalanceArgs = {
  filter?: Maybe<BalanceFilter>;
};


export type QueryGetAccountArgs = {
  address: Scalars['String'];
};


export type QueryQueryAccountArgs = {
  filter?: Maybe<AccountFilter>;
  order?: Maybe<AccountOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryAggregateAccountArgs = {
  filter?: Maybe<AccountFilter>;
};


export type QueryGetTransactionArgs = {
  hash: Scalars['String'];
};


export type QueryQueryTransactionArgs = {
  filter?: Maybe<TransactionFilter>;
  order?: Maybe<TransactionOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryAggregateTransactionArgs = {
  filter?: Maybe<TransactionFilter>;
};


export type QueryGetAppStateArgs = {
  id: Scalars['String'];
};


export type QueryQueryAppStateArgs = {
  filter?: Maybe<AppStateFilter>;
  order?: Maybe<AppStateOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryAggregateAppStateArgs = {
  filter?: Maybe<AppStateFilter>;
};

export type ReadOnly = {
  _placeholder?: Maybe<Scalars['String']>;
};

export type ReadOnlyAggregateResult = {
  __typename?: 'ReadOnlyAggregateResult';
  count?: Maybe<Scalars['Int']>;
  _placeholderMin?: Maybe<Scalars['String']>;
  _placeholderMax?: Maybe<Scalars['String']>;
};

export type ReadOnlyFilter = {
  has?: Maybe<ReadOnlyHasFilter>;
  and?: Maybe<Array<Maybe<ReadOnlyFilter>>>;
  or?: Maybe<Array<Maybe<ReadOnlyFilter>>>;
  not?: Maybe<ReadOnlyFilter>;
};

export enum ReadOnlyHasFilter {
  Placeholder = '_placeholder'
}

export type ReadOnlyOrder = {
  asc?: Maybe<ReadOnlyOrderable>;
  desc?: Maybe<ReadOnlyOrderable>;
  then?: Maybe<ReadOnlyOrder>;
};

export enum ReadOnlyOrderable {
  Placeholder = '_placeholder'
}

export type ReadOnlyPatch = {
  _placeholder?: Maybe<Scalars['String']>;
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type Stake = Cuid & ReadOnly & {
  __typename?: 'Stake';
  _placeholder?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  token: Token;
  amount: Scalars['Float'];
  committedStakingPeriod: Scalars['Int'];
  owner: Account;
};


export type StakeTokenArgs = {
  filter?: Maybe<TokenFilter>;
};


export type StakeOwnerArgs = {
  filter?: Maybe<AccountFilter>;
};

export type StakeAggregateResult = {
  __typename?: 'StakeAggregateResult';
  count?: Maybe<Scalars['Int']>;
  _placeholderMin?: Maybe<Scalars['String']>;
  _placeholderMax?: Maybe<Scalars['String']>;
  idMin?: Maybe<Scalars['String']>;
  idMax?: Maybe<Scalars['String']>;
  amountMin?: Maybe<Scalars['Float']>;
  amountMax?: Maybe<Scalars['Float']>;
  amountSum?: Maybe<Scalars['Float']>;
  amountAvg?: Maybe<Scalars['Float']>;
  committedStakingPeriodMin?: Maybe<Scalars['Int']>;
  committedStakingPeriodMax?: Maybe<Scalars['Int']>;
  committedStakingPeriodSum?: Maybe<Scalars['Int']>;
  committedStakingPeriodAvg?: Maybe<Scalars['Float']>;
};

export type StakeFilter = {
  id?: Maybe<StringHashFilter>;
  has?: Maybe<StakeHasFilter>;
  and?: Maybe<Array<Maybe<StakeFilter>>>;
  or?: Maybe<Array<Maybe<StakeFilter>>>;
  not?: Maybe<StakeFilter>;
};

export enum StakeHasFilter {
  Placeholder = '_placeholder',
  Id = 'id',
  Token = 'token',
  Amount = 'amount',
  CommittedStakingPeriod = 'committedStakingPeriod',
  Owner = 'owner'
}

export type StakeOrder = {
  asc?: Maybe<StakeOrderable>;
  desc?: Maybe<StakeOrderable>;
  then?: Maybe<StakeOrder>;
};

export enum StakeOrderable {
  Placeholder = '_placeholder',
  Id = 'id',
  Amount = 'amount',
  CommittedStakingPeriod = 'committedStakingPeriod'
}

export type StakePatch = {
  _placeholder?: Maybe<Scalars['String']>;
  token?: Maybe<TokenRef>;
  amount?: Maybe<Scalars['Float']>;
  committedStakingPeriod?: Maybe<Scalars['Int']>;
  owner?: Maybe<AccountRef>;
};

export type StakeRef = {
  _placeholder?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  token?: Maybe<TokenRef>;
  amount?: Maybe<Scalars['Float']>;
  committedStakingPeriod?: Maybe<Scalars['Int']>;
  owner?: Maybe<AccountRef>;
};

export type StringExactFilter = {
  eq?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
  le?: Maybe<Scalars['String']>;
  lt?: Maybe<Scalars['String']>;
  ge?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  between?: Maybe<StringRange>;
};

export type StringFullTextFilter = {
  alloftext?: Maybe<Scalars['String']>;
  anyoftext?: Maybe<Scalars['String']>;
};

export type StringHashFilter = {
  eq?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type StringRange = {
  min: Scalars['String'];
  max: Scalars['String'];
};

export type StringRegExpFilter = {
  regexp?: Maybe<Scalars['String']>;
};

export type StringTermFilter = {
  allofterms?: Maybe<Scalars['String']>;
  anyofterms?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  getToken?: Maybe<Token>;
  queryToken?: Maybe<Array<Maybe<Token>>>;
  aggregateToken?: Maybe<TokenAggregateResult>;
  getAccount?: Maybe<Account>;
  queryAccount?: Maybe<Array<Maybe<Account>>>;
  aggregateAccount?: Maybe<AccountAggregateResult>;
};


export type SubscriptionGetTokenArgs = {
  ticker: Scalars['String'];
};


export type SubscriptionQueryTokenArgs = {
  filter?: Maybe<TokenFilter>;
  order?: Maybe<TokenOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type SubscriptionAggregateTokenArgs = {
  filter?: Maybe<TokenFilter>;
};


export type SubscriptionGetAccountArgs = {
  address: Scalars['String'];
};


export type SubscriptionQueryAccountArgs = {
  filter?: Maybe<AccountFilter>;
  order?: Maybe<AccountOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type SubscriptionAggregateAccountArgs = {
  filter?: Maybe<AccountFilter>;
};

export type Token = ReadOnly & {
  __typename?: 'Token';
  _placeholder?: Maybe<Scalars['String']>;
  ticker: Scalars['String'];
  name: Scalars['String'];
  nav: Scalars['Float'];
  baseMultiplier: Scalars['Float'];
};

export type TokenAggregateResult = {
  __typename?: 'TokenAggregateResult';
  count?: Maybe<Scalars['Int']>;
  _placeholderMin?: Maybe<Scalars['String']>;
  _placeholderMax?: Maybe<Scalars['String']>;
  tickerMin?: Maybe<Scalars['String']>;
  tickerMax?: Maybe<Scalars['String']>;
  nameMin?: Maybe<Scalars['String']>;
  nameMax?: Maybe<Scalars['String']>;
  navMin?: Maybe<Scalars['Float']>;
  navMax?: Maybe<Scalars['Float']>;
  navSum?: Maybe<Scalars['Float']>;
  navAvg?: Maybe<Scalars['Float']>;
  baseMultiplierMin?: Maybe<Scalars['Float']>;
  baseMultiplierMax?: Maybe<Scalars['Float']>;
  baseMultiplierSum?: Maybe<Scalars['Float']>;
  baseMultiplierAvg?: Maybe<Scalars['Float']>;
};

export type TokenFilter = {
  ticker?: Maybe<StringHashFilter>;
  has?: Maybe<TokenHasFilter>;
  and?: Maybe<Array<Maybe<TokenFilter>>>;
  or?: Maybe<Array<Maybe<TokenFilter>>>;
  not?: Maybe<TokenFilter>;
};

export enum TokenHasFilter {
  Placeholder = '_placeholder',
  Ticker = 'ticker',
  Name = 'name',
  Nav = 'nav',
  BaseMultiplier = 'baseMultiplier'
}

export type TokenOrder = {
  asc?: Maybe<TokenOrderable>;
  desc?: Maybe<TokenOrderable>;
  then?: Maybe<TokenOrder>;
};

export enum TokenOrderable {
  Placeholder = '_placeholder',
  Ticker = 'ticker',
  Name = 'name',
  Nav = 'nav',
  BaseMultiplier = 'baseMultiplier'
}

export type TokenPatch = {
  _placeholder?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nav?: Maybe<Scalars['Float']>;
  baseMultiplier?: Maybe<Scalars['Float']>;
};

export type TokenRef = {
  _placeholder?: Maybe<Scalars['String']>;
  ticker?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nav?: Maybe<Scalars['Float']>;
  baseMultiplier?: Maybe<Scalars['Float']>;
};

export type Transaction = ReadOnly & {
  __typename?: 'Transaction';
  _placeholder?: Maybe<Scalars['String']>;
  blockNumber: Scalars['Int'];
  timeStamp: Scalars['DateTime'];
  hash: Scalars['String'];
  nonce: Scalars['Int'];
  blockHash: Scalars['String'];
  from: Scalars['String'];
  contractAddress: Scalars['String'];
  to: Scalars['String'];
  value: Scalars['String'];
  tokenName: Scalars['String'];
  tokenSymbol: Scalars['String'];
  tokenDecimal: Scalars['Int'];
  transactionIndex: Scalars['Int'];
  gas: Scalars['Int'];
  gasPrice: Scalars['String'];
  gasUsed: Scalars['Int'];
  cumulativeGasUsed: Scalars['Int'];
  input: Scalars['String'];
  confirmations: Scalars['Int'];
};

export type TransactionAggregateResult = {
  __typename?: 'TransactionAggregateResult';
  count?: Maybe<Scalars['Int']>;
  _placeholderMin?: Maybe<Scalars['String']>;
  _placeholderMax?: Maybe<Scalars['String']>;
  blockNumberMin?: Maybe<Scalars['Int']>;
  blockNumberMax?: Maybe<Scalars['Int']>;
  blockNumberSum?: Maybe<Scalars['Int']>;
  blockNumberAvg?: Maybe<Scalars['Float']>;
  timeStampMin?: Maybe<Scalars['DateTime']>;
  timeStampMax?: Maybe<Scalars['DateTime']>;
  hashMin?: Maybe<Scalars['String']>;
  hashMax?: Maybe<Scalars['String']>;
  nonceMin?: Maybe<Scalars['Int']>;
  nonceMax?: Maybe<Scalars['Int']>;
  nonceSum?: Maybe<Scalars['Int']>;
  nonceAvg?: Maybe<Scalars['Float']>;
  blockHashMin?: Maybe<Scalars['String']>;
  blockHashMax?: Maybe<Scalars['String']>;
  fromMin?: Maybe<Scalars['String']>;
  fromMax?: Maybe<Scalars['String']>;
  contractAddressMin?: Maybe<Scalars['String']>;
  contractAddressMax?: Maybe<Scalars['String']>;
  toMin?: Maybe<Scalars['String']>;
  toMax?: Maybe<Scalars['String']>;
  valueMin?: Maybe<Scalars['String']>;
  valueMax?: Maybe<Scalars['String']>;
  tokenNameMin?: Maybe<Scalars['String']>;
  tokenNameMax?: Maybe<Scalars['String']>;
  tokenSymbolMin?: Maybe<Scalars['String']>;
  tokenSymbolMax?: Maybe<Scalars['String']>;
  tokenDecimalMin?: Maybe<Scalars['Int']>;
  tokenDecimalMax?: Maybe<Scalars['Int']>;
  tokenDecimalSum?: Maybe<Scalars['Int']>;
  tokenDecimalAvg?: Maybe<Scalars['Float']>;
  transactionIndexMin?: Maybe<Scalars['Int']>;
  transactionIndexMax?: Maybe<Scalars['Int']>;
  transactionIndexSum?: Maybe<Scalars['Int']>;
  transactionIndexAvg?: Maybe<Scalars['Float']>;
  gasMin?: Maybe<Scalars['Int']>;
  gasMax?: Maybe<Scalars['Int']>;
  gasSum?: Maybe<Scalars['Int']>;
  gasAvg?: Maybe<Scalars['Float']>;
  gasPriceMin?: Maybe<Scalars['String']>;
  gasPriceMax?: Maybe<Scalars['String']>;
  gasUsedMin?: Maybe<Scalars['Int']>;
  gasUsedMax?: Maybe<Scalars['Int']>;
  gasUsedSum?: Maybe<Scalars['Int']>;
  gasUsedAvg?: Maybe<Scalars['Float']>;
  cumulativeGasUsedMin?: Maybe<Scalars['Int']>;
  cumulativeGasUsedMax?: Maybe<Scalars['Int']>;
  cumulativeGasUsedSum?: Maybe<Scalars['Int']>;
  cumulativeGasUsedAvg?: Maybe<Scalars['Float']>;
  inputMin?: Maybe<Scalars['String']>;
  inputMax?: Maybe<Scalars['String']>;
  confirmationsMin?: Maybe<Scalars['Int']>;
  confirmationsMax?: Maybe<Scalars['Int']>;
  confirmationsSum?: Maybe<Scalars['Int']>;
  confirmationsAvg?: Maybe<Scalars['Float']>;
};

export type TransactionFilter = {
  hash?: Maybe<StringHashFilter>;
  has?: Maybe<TransactionHasFilter>;
  and?: Maybe<Array<Maybe<TransactionFilter>>>;
  or?: Maybe<Array<Maybe<TransactionFilter>>>;
  not?: Maybe<TransactionFilter>;
};

export enum TransactionHasFilter {
  Placeholder = '_placeholder',
  BlockNumber = 'blockNumber',
  TimeStamp = 'timeStamp',
  Hash = 'hash',
  Nonce = 'nonce',
  BlockHash = 'blockHash',
  From = 'from',
  ContractAddress = 'contractAddress',
  To = 'to',
  Value = 'value',
  TokenName = 'tokenName',
  TokenSymbol = 'tokenSymbol',
  TokenDecimal = 'tokenDecimal',
  TransactionIndex = 'transactionIndex',
  Gas = 'gas',
  GasPrice = 'gasPrice',
  GasUsed = 'gasUsed',
  CumulativeGasUsed = 'cumulativeGasUsed',
  Input = 'input',
  Confirmations = 'confirmations'
}

export type TransactionOrder = {
  asc?: Maybe<TransactionOrderable>;
  desc?: Maybe<TransactionOrderable>;
  then?: Maybe<TransactionOrder>;
};

export enum TransactionOrderable {
  Placeholder = '_placeholder',
  BlockNumber = 'blockNumber',
  TimeStamp = 'timeStamp',
  Hash = 'hash',
  Nonce = 'nonce',
  BlockHash = 'blockHash',
  From = 'from',
  ContractAddress = 'contractAddress',
  To = 'to',
  Value = 'value',
  TokenName = 'tokenName',
  TokenSymbol = 'tokenSymbol',
  TokenDecimal = 'tokenDecimal',
  TransactionIndex = 'transactionIndex',
  Gas = 'gas',
  GasPrice = 'gasPrice',
  GasUsed = 'gasUsed',
  CumulativeGasUsed = 'cumulativeGasUsed',
  Input = 'input',
  Confirmations = 'confirmations'
}

export type TransactionPatch = {
  _placeholder?: Maybe<Scalars['String']>;
  blockNumber?: Maybe<Scalars['Int']>;
  timeStamp?: Maybe<Scalars['DateTime']>;
  nonce?: Maybe<Scalars['Int']>;
  blockHash?: Maybe<Scalars['String']>;
  from?: Maybe<Scalars['String']>;
  contractAddress?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  tokenName?: Maybe<Scalars['String']>;
  tokenSymbol?: Maybe<Scalars['String']>;
  tokenDecimal?: Maybe<Scalars['Int']>;
  transactionIndex?: Maybe<Scalars['Int']>;
  gas?: Maybe<Scalars['Int']>;
  gasPrice?: Maybe<Scalars['String']>;
  gasUsed?: Maybe<Scalars['Int']>;
  cumulativeGasUsed?: Maybe<Scalars['Int']>;
  input?: Maybe<Scalars['String']>;
  confirmations?: Maybe<Scalars['Int']>;
};

export type TransactionRef = {
  _placeholder?: Maybe<Scalars['String']>;
  blockNumber?: Maybe<Scalars['Int']>;
  timeStamp?: Maybe<Scalars['DateTime']>;
  hash?: Maybe<Scalars['String']>;
  nonce?: Maybe<Scalars['Int']>;
  blockHash?: Maybe<Scalars['String']>;
  from?: Maybe<Scalars['String']>;
  contractAddress?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  tokenName?: Maybe<Scalars['String']>;
  tokenSymbol?: Maybe<Scalars['String']>;
  tokenDecimal?: Maybe<Scalars['Int']>;
  transactionIndex?: Maybe<Scalars['Int']>;
  gas?: Maybe<Scalars['Int']>;
  gasPrice?: Maybe<Scalars['String']>;
  gasUsed?: Maybe<Scalars['Int']>;
  cumulativeGasUsed?: Maybe<Scalars['Int']>;
  input?: Maybe<Scalars['String']>;
  confirmations?: Maybe<Scalars['Int']>;
};

export type UpdateAccountInput = {
  filter: AccountFilter;
  set?: Maybe<AccountPatch>;
  remove?: Maybe<AccountPatch>;
};

export type UpdateAccountPayload = {
  __typename?: 'UpdateAccountPayload';
  account?: Maybe<Array<Maybe<Account>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type UpdateAccountPayloadAccountArgs = {
  filter?: Maybe<AccountFilter>;
  order?: Maybe<AccountOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type UpdateAppStateInput = {
  filter: AppStateFilter;
  set?: Maybe<AppStatePatch>;
  remove?: Maybe<AppStatePatch>;
};

export type UpdateAppStatePayload = {
  __typename?: 'UpdateAppStatePayload';
  appState?: Maybe<Array<Maybe<AppState>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type UpdateAppStatePayloadAppStateArgs = {
  filter?: Maybe<AppStateFilter>;
  order?: Maybe<AppStateOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type UpdateBalanceInput = {
  filter: BalanceFilter;
  set?: Maybe<BalancePatch>;
  remove?: Maybe<BalancePatch>;
};

export type UpdateBalancePayload = {
  __typename?: 'UpdateBalancePayload';
  balance?: Maybe<Array<Maybe<Balance>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type UpdateBalancePayloadBalanceArgs = {
  filter?: Maybe<BalanceFilter>;
  order?: Maybe<BalanceOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type UpdateFooInput = {
  filter: FooFilter;
  set?: Maybe<FooPatch>;
  remove?: Maybe<FooPatch>;
};

export type UpdateFooPayload = {
  __typename?: 'UpdateFooPayload';
  foo?: Maybe<Array<Maybe<Foo>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type UpdateFooPayloadFooArgs = {
  filter?: Maybe<FooFilter>;
  order?: Maybe<FooOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type UpdateReadOnlyInput = {
  filter: ReadOnlyFilter;
  set?: Maybe<ReadOnlyPatch>;
  remove?: Maybe<ReadOnlyPatch>;
};

export type UpdateReadOnlyPayload = {
  __typename?: 'UpdateReadOnlyPayload';
  readOnly?: Maybe<Array<Maybe<ReadOnly>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type UpdateReadOnlyPayloadReadOnlyArgs = {
  filter?: Maybe<ReadOnlyFilter>;
  order?: Maybe<ReadOnlyOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type UpdateStakeInput = {
  filter: StakeFilter;
  set?: Maybe<StakePatch>;
  remove?: Maybe<StakePatch>;
};

export type UpdateStakePayload = {
  __typename?: 'UpdateStakePayload';
  stake?: Maybe<Array<Maybe<Stake>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type UpdateStakePayloadStakeArgs = {
  filter?: Maybe<StakeFilter>;
  order?: Maybe<StakeOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type UpdateTokenInput = {
  filter: TokenFilter;
  set?: Maybe<TokenPatch>;
  remove?: Maybe<TokenPatch>;
};

export type UpdateTokenPayload = {
  __typename?: 'UpdateTokenPayload';
  token?: Maybe<Array<Maybe<Token>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type UpdateTokenPayloadTokenArgs = {
  filter?: Maybe<TokenFilter>;
  order?: Maybe<TokenOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type UpdateTransactionInput = {
  filter: TransactionFilter;
  set?: Maybe<TransactionPatch>;
  remove?: Maybe<TransactionPatch>;
};

export type UpdateTransactionPayload = {
  __typename?: 'UpdateTransactionPayload';
  transaction?: Maybe<Array<Maybe<Transaction>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type UpdateTransactionPayloadTransactionArgs = {
  filter?: Maybe<TransactionFilter>;
  order?: Maybe<TransactionOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type WithinFilter = {
  polygon: PolygonRef;
};


export const QueryAccountDocument = gql`
    query queryAccount {
  queryAccount {
    type
    address
    balances {
      id
      token {
        name
        ticker
        nav
        baseMultiplier
      }
      amount
    }
    stakes {
      id
      token {
        name
        ticker
        nav
        baseMultiplier
      }
      committedStakingPeriod
      amount
    }
  }
}
    `;

/**
 * __useQueryAccountQuery__
 *
 * To run a query within a React component, call `useQueryAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryAccountQuery({
 *   variables: {
 *   },
 * });
 */
export function useQueryAccountQuery(baseOptions?: Apollo.QueryHookOptions<QueryAccountQuery, QueryAccountQueryVariables>) {
        return Apollo.useQuery<QueryAccountQuery, QueryAccountQueryVariables>(QueryAccountDocument, baseOptions);
      }
export function useQueryAccountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryAccountQuery, QueryAccountQueryVariables>) {
          return Apollo.useLazyQuery<QueryAccountQuery, QueryAccountQueryVariables>(QueryAccountDocument, baseOptions);
        }
export type QueryAccountQueryHookResult = ReturnType<typeof useQueryAccountQuery>;
export type QueryAccountLazyQueryHookResult = ReturnType<typeof useQueryAccountLazyQuery>;
export type QueryAccountQueryResult = Apollo.QueryResult<QueryAccountQuery, QueryAccountQueryVariables>;
export const GetAccountDocument = gql`
    query getAccount($address: String!) {
  getAccount(address: $address) {
    type
    address
    balances {
      id
      token {
        name
        ticker
        nav
        baseMultiplier
      }
      amount
    }
    stakes {
      id
      token {
        name
        ticker
        nav
        baseMultiplier
      }
      committedStakingPeriod
      amount
    }
  }
}
    `;

/**
 * __useGetAccountQuery__
 *
 * To run a query within a React component, call `useGetAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountQuery({
 *   variables: {
 *      address: // value for 'address'
 *   },
 * });
 */
export function useGetAccountQuery(baseOptions: Apollo.QueryHookOptions<GetAccountQuery, GetAccountQueryVariables>) {
        return Apollo.useQuery<GetAccountQuery, GetAccountQueryVariables>(GetAccountDocument, baseOptions);
      }
export function useGetAccountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccountQuery, GetAccountQueryVariables>) {
          return Apollo.useLazyQuery<GetAccountQuery, GetAccountQueryVariables>(GetAccountDocument, baseOptions);
        }
export type GetAccountQueryHookResult = ReturnType<typeof useGetAccountQuery>;
export type GetAccountLazyQueryHookResult = ReturnType<typeof useGetAccountLazyQuery>;
export type GetAccountQueryResult = Apollo.QueryResult<GetAccountQuery, GetAccountQueryVariables>;
export const SubscribeAccountDocument = gql`
    subscription subscribeAccount {
  queryAccount {
    type
    address
    balances {
      id
      token {
        name
        ticker
        nav
        baseMultiplier
      }
      amount
    }
    stakes {
      id
      token {
        name
        ticker
        nav
        baseMultiplier
      }
      committedStakingPeriod
      amount
    }
  }
}
    `;

/**
 * __useSubscribeAccountSubscription__
 *
 * To run a query within a React component, call `useSubscribeAccountSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeAccountSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeAccountSubscription({
 *   variables: {
 *   },
 * });
 */
export function useSubscribeAccountSubscription(baseOptions?: Apollo.SubscriptionHookOptions<SubscribeAccountSubscription, SubscribeAccountSubscriptionVariables>) {
        return Apollo.useSubscription<SubscribeAccountSubscription, SubscribeAccountSubscriptionVariables>(SubscribeAccountDocument, baseOptions);
      }
export type SubscribeAccountSubscriptionHookResult = ReturnType<typeof useSubscribeAccountSubscription>;
export type SubscribeAccountSubscriptionResult = Apollo.SubscriptionResult<SubscribeAccountSubscription>;
export const QueryTokenDocument = gql`
    query queryToken {
  queryToken {
    ticker
    nav
    name
    baseMultiplier
  }
}
    `;

/**
 * __useQueryTokenQuery__
 *
 * To run a query within a React component, call `useQueryTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryTokenQuery({
 *   variables: {
 *   },
 * });
 */
export function useQueryTokenQuery(baseOptions?: Apollo.QueryHookOptions<QueryTokenQuery, QueryTokenQueryVariables>) {
        return Apollo.useQuery<QueryTokenQuery, QueryTokenQueryVariables>(QueryTokenDocument, baseOptions);
      }
export function useQueryTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryTokenQuery, QueryTokenQueryVariables>) {
          return Apollo.useLazyQuery<QueryTokenQuery, QueryTokenQueryVariables>(QueryTokenDocument, baseOptions);
        }
export type QueryTokenQueryHookResult = ReturnType<typeof useQueryTokenQuery>;
export type QueryTokenLazyQueryHookResult = ReturnType<typeof useQueryTokenLazyQuery>;
export type QueryTokenQueryResult = Apollo.QueryResult<QueryTokenQuery, QueryTokenQueryVariables>;
export const SubscribeTokenDocument = gql`
    subscription subscribeToken {
  queryToken {
    ticker
    nav
    name
  }
}
    `;

/**
 * __useSubscribeTokenSubscription__
 *
 * To run a query within a React component, call `useSubscribeTokenSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeTokenSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeTokenSubscription({
 *   variables: {
 *   },
 * });
 */
export function useSubscribeTokenSubscription(baseOptions?: Apollo.SubscriptionHookOptions<SubscribeTokenSubscription, SubscribeTokenSubscriptionVariables>) {
        return Apollo.useSubscription<SubscribeTokenSubscription, SubscribeTokenSubscriptionVariables>(SubscribeTokenDocument, baseOptions);
      }
export type SubscribeTokenSubscriptionHookResult = ReturnType<typeof useSubscribeTokenSubscription>;
export type SubscribeTokenSubscriptionResult = Apollo.SubscriptionResult<SubscribeTokenSubscription>;
export const GetAppStateDocument = gql`
    query getAppState {
  queryAppState {
    transactionIds
  }
}
    `;

/**
 * __useGetAppStateQuery__
 *
 * To run a query within a React component, call `useGetAppStateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAppStateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAppStateQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAppStateQuery(baseOptions?: Apollo.QueryHookOptions<GetAppStateQuery, GetAppStateQueryVariables>) {
        return Apollo.useQuery<GetAppStateQuery, GetAppStateQueryVariables>(GetAppStateDocument, baseOptions);
      }
export function useGetAppStateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAppStateQuery, GetAppStateQueryVariables>) {
          return Apollo.useLazyQuery<GetAppStateQuery, GetAppStateQueryVariables>(GetAppStateDocument, baseOptions);
        }
export type GetAppStateQueryHookResult = ReturnType<typeof useGetAppStateQuery>;
export type GetAppStateLazyQueryHookResult = ReturnType<typeof useGetAppStateLazyQuery>;
export type GetAppStateQueryResult = Apollo.QueryResult<GetAppStateQuery, GetAppStateQueryVariables>;
export const SetEthPriceDocument = gql`
    mutation setEthPrice($price: Float!) {
  updateAppState(input: {filter: {has: maxStakingPower}, set: {ethPrice: $price}}) {
    numUids
  }
}
    `;
export type SetEthPriceMutationFn = Apollo.MutationFunction<SetEthPriceMutation, SetEthPriceMutationVariables>;

/**
 * __useSetEthPriceMutation__
 *
 * To run a mutation, you first call `useSetEthPriceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetEthPriceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setEthPriceMutation, { data, loading, error }] = useSetEthPriceMutation({
 *   variables: {
 *      price: // value for 'price'
 *   },
 * });
 */
export function useSetEthPriceMutation(baseOptions?: Apollo.MutationHookOptions<SetEthPriceMutation, SetEthPriceMutationVariables>) {
        return Apollo.useMutation<SetEthPriceMutation, SetEthPriceMutationVariables>(SetEthPriceDocument, baseOptions);
      }
export type SetEthPriceMutationHookResult = ReturnType<typeof useSetEthPriceMutation>;
export type SetEthPriceMutationResult = Apollo.MutationResult<SetEthPriceMutation>;
export type SetEthPriceMutationOptions = Apollo.BaseMutationOptions<SetEthPriceMutation, SetEthPriceMutationVariables>;
export const GetEthPriceDocument = gql`
    query getEthPrice {
  queryAppState {
    ethPrice
  }
}
    `;

/**
 * __useGetEthPriceQuery__
 *
 * To run a query within a React component, call `useGetEthPriceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEthPriceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEthPriceQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetEthPriceQuery(baseOptions?: Apollo.QueryHookOptions<GetEthPriceQuery, GetEthPriceQueryVariables>) {
        return Apollo.useQuery<GetEthPriceQuery, GetEthPriceQueryVariables>(GetEthPriceDocument, baseOptions);
      }
export function useGetEthPriceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEthPriceQuery, GetEthPriceQueryVariables>) {
          return Apollo.useLazyQuery<GetEthPriceQuery, GetEthPriceQueryVariables>(GetEthPriceDocument, baseOptions);
        }
export type GetEthPriceQueryHookResult = ReturnType<typeof useGetEthPriceQuery>;
export type GetEthPriceLazyQueryHookResult = ReturnType<typeof useGetEthPriceLazyQuery>;
export type GetEthPriceQueryResult = Apollo.QueryResult<GetEthPriceQuery, GetEthPriceQueryVariables>;
export const GetStatisticsDocument = gql`
    query getStatistics {
  queryAppState {
    totalStakingPower
    medianStakingPower
    maxStakingPower
  }
}
    `;

/**
 * __useGetStatisticsQuery__
 *
 * To run a query within a React component, call `useGetStatisticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStatisticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStatisticsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetStatisticsQuery(baseOptions?: Apollo.QueryHookOptions<GetStatisticsQuery, GetStatisticsQueryVariables>) {
        return Apollo.useQuery<GetStatisticsQuery, GetStatisticsQueryVariables>(GetStatisticsDocument, baseOptions);
      }
export function useGetStatisticsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStatisticsQuery, GetStatisticsQueryVariables>) {
          return Apollo.useLazyQuery<GetStatisticsQuery, GetStatisticsQueryVariables>(GetStatisticsDocument, baseOptions);
        }
export type GetStatisticsQueryHookResult = ReturnType<typeof useGetStatisticsQuery>;
export type GetStatisticsLazyQueryHookResult = ReturnType<typeof useGetStatisticsLazyQuery>;
export type GetStatisticsQueryResult = Apollo.QueryResult<GetStatisticsQuery, GetStatisticsQueryVariables>;
export const AddAccountDocument = gql`
    mutation addAccount($input: AddAccountInput!) {
  addAccount(input: [$input]) {
    account {
      address
    }
  }
}
    `;
export type AddAccountMutationFn = Apollo.MutationFunction<AddAccountMutation, AddAccountMutationVariables>;

/**
 * __useAddAccountMutation__
 *
 * To run a mutation, you first call `useAddAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAccountMutation, { data, loading, error }] = useAddAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddAccountMutation(baseOptions?: Apollo.MutationHookOptions<AddAccountMutation, AddAccountMutationVariables>) {
        return Apollo.useMutation<AddAccountMutation, AddAccountMutationVariables>(AddAccountDocument, baseOptions);
      }
export type AddAccountMutationHookResult = ReturnType<typeof useAddAccountMutation>;
export type AddAccountMutationResult = Apollo.MutationResult<AddAccountMutation>;
export type AddAccountMutationOptions = Apollo.BaseMutationOptions<AddAccountMutation, AddAccountMutationVariables>;
export const AddTransactionDocument = gql`
    mutation addTransaction($input: AddTransactionInput!) {
  addTransaction(input: [$input]) {
    transaction {
      hash
    }
  }
}
    `;
export type AddTransactionMutationFn = Apollo.MutationFunction<AddTransactionMutation, AddTransactionMutationVariables>;

/**
 * __useAddTransactionMutation__
 *
 * To run a mutation, you first call `useAddTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTransactionMutation, { data, loading, error }] = useAddTransactionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddTransactionMutation(baseOptions?: Apollo.MutationHookOptions<AddTransactionMutation, AddTransactionMutationVariables>) {
        return Apollo.useMutation<AddTransactionMutation, AddTransactionMutationVariables>(AddTransactionDocument, baseOptions);
      }
export type AddTransactionMutationHookResult = ReturnType<typeof useAddTransactionMutation>;
export type AddTransactionMutationResult = Apollo.MutationResult<AddTransactionMutation>;
export type AddTransactionMutationOptions = Apollo.BaseMutationOptions<AddTransactionMutation, AddTransactionMutationVariables>;
export const QueryTransactionDocument = gql`
    query queryTransaction {
  queryTransaction {
    blockNumber
    timeStamp
    hash
    nonce
    blockHash
    from
    contractAddress
    to
    value
    tokenName
    tokenSymbol
    tokenDecimal
    transactionIndex
    gas
    gasPrice
    gasUsed
    cumulativeGasUsed
    input
    confirmations
  }
}
    `;

/**
 * __useQueryTransactionQuery__
 *
 * To run a query within a React component, call `useQueryTransactionQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryTransactionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryTransactionQuery({
 *   variables: {
 *   },
 * });
 */
export function useQueryTransactionQuery(baseOptions?: Apollo.QueryHookOptions<QueryTransactionQuery, QueryTransactionQueryVariables>) {
        return Apollo.useQuery<QueryTransactionQuery, QueryTransactionQueryVariables>(QueryTransactionDocument, baseOptions);
      }
export function useQueryTransactionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryTransactionQuery, QueryTransactionQueryVariables>) {
          return Apollo.useLazyQuery<QueryTransactionQuery, QueryTransactionQueryVariables>(QueryTransactionDocument, baseOptions);
        }
export type QueryTransactionQueryHookResult = ReturnType<typeof useQueryTransactionQuery>;
export type QueryTransactionLazyQueryHookResult = ReturnType<typeof useQueryTransactionLazyQuery>;
export type QueryTransactionQueryResult = Apollo.QueryResult<QueryTransactionQuery, QueryTransactionQueryVariables>;
export const AddAppStateDocument = gql`
    mutation addAppState($input: AddAppStateInput!) {
  addAppState(input: [$input]) {
    appState {
      _placeholder
    }
  }
}
    `;
export type AddAppStateMutationFn = Apollo.MutationFunction<AddAppStateMutation, AddAppStateMutationVariables>;

/**
 * __useAddAppStateMutation__
 *
 * To run a mutation, you first call `useAddAppStateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAppStateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAppStateMutation, { data, loading, error }] = useAddAppStateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddAppStateMutation(baseOptions?: Apollo.MutationHookOptions<AddAppStateMutation, AddAppStateMutationVariables>) {
        return Apollo.useMutation<AddAppStateMutation, AddAppStateMutationVariables>(AddAppStateDocument, baseOptions);
      }
export type AddAppStateMutationHookResult = ReturnType<typeof useAddAppStateMutation>;
export type AddAppStateMutationResult = Apollo.MutationResult<AddAppStateMutation>;
export type AddAppStateMutationOptions = Apollo.BaseMutationOptions<AddAppStateMutation, AddAppStateMutationVariables>;
export const AddTokenDocument = gql`
    mutation addToken($input: AddTokenInput!) {
  addToken(input: [$input]) {
    token {
      ticker
    }
  }
}
    `;
export type AddTokenMutationFn = Apollo.MutationFunction<AddTokenMutation, AddTokenMutationVariables>;

/**
 * __useAddTokenMutation__
 *
 * To run a mutation, you first call `useAddTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTokenMutation, { data, loading, error }] = useAddTokenMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddTokenMutation(baseOptions?: Apollo.MutationHookOptions<AddTokenMutation, AddTokenMutationVariables>) {
        return Apollo.useMutation<AddTokenMutation, AddTokenMutationVariables>(AddTokenDocument, baseOptions);
      }
export type AddTokenMutationHookResult = ReturnType<typeof useAddTokenMutation>;
export type AddTokenMutationResult = Apollo.MutationResult<AddTokenMutation>;
export type AddTokenMutationOptions = Apollo.BaseMutationOptions<AddTokenMutation, AddTokenMutationVariables>;
export const AddBalanceDocument = gql`
    mutation addBalance($input: AddBalanceInput!) {
  addBalance(input: [$input]) {
    balance {
      id
    }
  }
}
    `;
export type AddBalanceMutationFn = Apollo.MutationFunction<AddBalanceMutation, AddBalanceMutationVariables>;

/**
 * __useAddBalanceMutation__
 *
 * To run a mutation, you first call `useAddBalanceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddBalanceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addBalanceMutation, { data, loading, error }] = useAddBalanceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddBalanceMutation(baseOptions?: Apollo.MutationHookOptions<AddBalanceMutation, AddBalanceMutationVariables>) {
        return Apollo.useMutation<AddBalanceMutation, AddBalanceMutationVariables>(AddBalanceDocument, baseOptions);
      }
export type AddBalanceMutationHookResult = ReturnType<typeof useAddBalanceMutation>;
export type AddBalanceMutationResult = Apollo.MutationResult<AddBalanceMutation>;
export type AddBalanceMutationOptions = Apollo.BaseMutationOptions<AddBalanceMutation, AddBalanceMutationVariables>;
export const AddStakeDocument = gql`
    mutation addStake($input: AddStakeInput!) {
  addStake(input: [$input]) {
    stake {
      id
    }
  }
}
    `;
export type AddStakeMutationFn = Apollo.MutationFunction<AddStakeMutation, AddStakeMutationVariables>;

/**
 * __useAddStakeMutation__
 *
 * To run a mutation, you first call `useAddStakeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddStakeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addStakeMutation, { data, loading, error }] = useAddStakeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddStakeMutation(baseOptions?: Apollo.MutationHookOptions<AddStakeMutation, AddStakeMutationVariables>) {
        return Apollo.useMutation<AddStakeMutation, AddStakeMutationVariables>(AddStakeDocument, baseOptions);
      }
export type AddStakeMutationHookResult = ReturnType<typeof useAddStakeMutation>;
export type AddStakeMutationResult = Apollo.MutationResult<AddStakeMutation>;
export type AddStakeMutationOptions = Apollo.BaseMutationOptions<AddStakeMutation, AddStakeMutationVariables>;
export const UpdateAppStateDocument = gql`
    mutation updateAppState($set: AppStatePatch!) {
  updateAppState(input: {filter: {has: id}, set: $set}) {
    numUids
  }
}
    `;
export type UpdateAppStateMutationFn = Apollo.MutationFunction<UpdateAppStateMutation, UpdateAppStateMutationVariables>;

/**
 * __useUpdateAppStateMutation__
 *
 * To run a mutation, you first call `useUpdateAppStateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAppStateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAppStateMutation, { data, loading, error }] = useUpdateAppStateMutation({
 *   variables: {
 *      set: // value for 'set'
 *   },
 * });
 */
export function useUpdateAppStateMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAppStateMutation, UpdateAppStateMutationVariables>) {
        return Apollo.useMutation<UpdateAppStateMutation, UpdateAppStateMutationVariables>(UpdateAppStateDocument, baseOptions);
      }
export type UpdateAppStateMutationHookResult = ReturnType<typeof useUpdateAppStateMutation>;
export type UpdateAppStateMutationResult = Apollo.MutationResult<UpdateAppStateMutation>;
export type UpdateAppStateMutationOptions = Apollo.BaseMutationOptions<UpdateAppStateMutation, UpdateAppStateMutationVariables>;
export const UpdateTokenDocument = gql`
    mutation updateToken($filter: TokenFilter!, $set: TokenPatch!) {
  updateToken(input: {filter: $filter, set: $set}) {
    token {
      ticker
      nav
    }
  }
}
    `;
export type UpdateTokenMutationFn = Apollo.MutationFunction<UpdateTokenMutation, UpdateTokenMutationVariables>;

/**
 * __useUpdateTokenMutation__
 *
 * To run a mutation, you first call `useUpdateTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTokenMutation, { data, loading, error }] = useUpdateTokenMutation({
 *   variables: {
 *      filter: // value for 'filter'
 *      set: // value for 'set'
 *   },
 * });
 */
export function useUpdateTokenMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTokenMutation, UpdateTokenMutationVariables>) {
        return Apollo.useMutation<UpdateTokenMutation, UpdateTokenMutationVariables>(UpdateTokenDocument, baseOptions);
      }
export type UpdateTokenMutationHookResult = ReturnType<typeof useUpdateTokenMutation>;
export type UpdateTokenMutationResult = Apollo.MutationResult<UpdateTokenMutation>;
export type UpdateTokenMutationOptions = Apollo.BaseMutationOptions<UpdateTokenMutation, UpdateTokenMutationVariables>;
export const UpdateBalanceDocument = gql`
    mutation updateBalance($balanceId: String!, $set: BalancePatch!) {
  updateBalance(input: {filter: {id: {eq: $balanceId}}, set: $set}) {
    numUids
  }
}
    `;
export type UpdateBalanceMutationFn = Apollo.MutationFunction<UpdateBalanceMutation, UpdateBalanceMutationVariables>;

/**
 * __useUpdateBalanceMutation__
 *
 * To run a mutation, you first call `useUpdateBalanceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBalanceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBalanceMutation, { data, loading, error }] = useUpdateBalanceMutation({
 *   variables: {
 *      balanceId: // value for 'balanceId'
 *      set: // value for 'set'
 *   },
 * });
 */
export function useUpdateBalanceMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBalanceMutation, UpdateBalanceMutationVariables>) {
        return Apollo.useMutation<UpdateBalanceMutation, UpdateBalanceMutationVariables>(UpdateBalanceDocument, baseOptions);
      }
export type UpdateBalanceMutationHookResult = ReturnType<typeof useUpdateBalanceMutation>;
export type UpdateBalanceMutationResult = Apollo.MutationResult<UpdateBalanceMutation>;
export type UpdateBalanceMutationOptions = Apollo.BaseMutationOptions<UpdateBalanceMutation, UpdateBalanceMutationVariables>;
export const UpdateStakeDocument = gql`
    mutation updateStake($filter: StakeFilter!, $set: StakePatch!) {
  updateStake(input: {filter: $filter, set: $set}) {
    numUids
  }
}
    `;
export type UpdateStakeMutationFn = Apollo.MutationFunction<UpdateStakeMutation, UpdateStakeMutationVariables>;

/**
 * __useUpdateStakeMutation__
 *
 * To run a mutation, you first call `useUpdateStakeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStakeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStakeMutation, { data, loading, error }] = useUpdateStakeMutation({
 *   variables: {
 *      filter: // value for 'filter'
 *      set: // value for 'set'
 *   },
 * });
 */
export function useUpdateStakeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStakeMutation, UpdateStakeMutationVariables>) {
        return Apollo.useMutation<UpdateStakeMutation, UpdateStakeMutationVariables>(UpdateStakeDocument, baseOptions);
      }
export type UpdateStakeMutationHookResult = ReturnType<typeof useUpdateStakeMutation>;
export type UpdateStakeMutationResult = Apollo.MutationResult<UpdateStakeMutation>;
export type UpdateStakeMutationOptions = Apollo.BaseMutationOptions<UpdateStakeMutation, UpdateStakeMutationVariables>;
export const DeleteStakeDocument = gql`
    mutation deleteStake($id: String!) {
  deleteStake(filter: {id: {eq: $id}}) {
    msg
  }
}
    `;
export type DeleteStakeMutationFn = Apollo.MutationFunction<DeleteStakeMutation, DeleteStakeMutationVariables>;

/**
 * __useDeleteStakeMutation__
 *
 * To run a mutation, you first call `useDeleteStakeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteStakeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteStakeMutation, { data, loading, error }] = useDeleteStakeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteStakeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteStakeMutation, DeleteStakeMutationVariables>) {
        return Apollo.useMutation<DeleteStakeMutation, DeleteStakeMutationVariables>(DeleteStakeDocument, baseOptions);
      }
export type DeleteStakeMutationHookResult = ReturnType<typeof useDeleteStakeMutation>;
export type DeleteStakeMutationResult = Apollo.MutationResult<DeleteStakeMutation>;
export type DeleteStakeMutationOptions = Apollo.BaseMutationOptions<DeleteStakeMutation, DeleteStakeMutationVariables>;
export const UpdateAccountDocument = gql`
    mutation updateAccount($filter: AccountFilter!, $set: AccountPatch!) {
  updateAccount(input: {filter: $filter, set: $set}) {
    numUids
  }
}
    `;
export type UpdateAccountMutationFn = Apollo.MutationFunction<UpdateAccountMutation, UpdateAccountMutationVariables>;

/**
 * __useUpdateAccountMutation__
 *
 * To run a mutation, you first call `useUpdateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAccountMutation, { data, loading, error }] = useUpdateAccountMutation({
 *   variables: {
 *      filter: // value for 'filter'
 *      set: // value for 'set'
 *   },
 * });
 */
export function useUpdateAccountMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAccountMutation, UpdateAccountMutationVariables>) {
        return Apollo.useMutation<UpdateAccountMutation, UpdateAccountMutationVariables>(UpdateAccountDocument, baseOptions);
      }
export type UpdateAccountMutationHookResult = ReturnType<typeof useUpdateAccountMutation>;
export type UpdateAccountMutationResult = Apollo.MutationResult<UpdateAccountMutation>;
export type UpdateAccountMutationOptions = Apollo.BaseMutationOptions<UpdateAccountMutation, UpdateAccountMutationVariables>;
export const GetTreasuryAccountsDocument = gql`
    query getTreasuryAccounts {
  queryAccount(filter: {type: {eq: TreasuryContract}}) {
    address
    balances {
      token {
        nav
      }
      amount
    }
  }
}
    `;

/**
 * __useGetTreasuryAccountsQuery__
 *
 * To run a query within a React component, call `useGetTreasuryAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTreasuryAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTreasuryAccountsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTreasuryAccountsQuery(baseOptions?: Apollo.QueryHookOptions<GetTreasuryAccountsQuery, GetTreasuryAccountsQueryVariables>) {
        return Apollo.useQuery<GetTreasuryAccountsQuery, GetTreasuryAccountsQueryVariables>(GetTreasuryAccountsDocument, baseOptions);
      }
export function useGetTreasuryAccountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTreasuryAccountsQuery, GetTreasuryAccountsQueryVariables>) {
          return Apollo.useLazyQuery<GetTreasuryAccountsQuery, GetTreasuryAccountsQueryVariables>(GetTreasuryAccountsDocument, baseOptions);
        }
export type GetTreasuryAccountsQueryHookResult = ReturnType<typeof useGetTreasuryAccountsQuery>;
export type GetTreasuryAccountsLazyQueryHookResult = ReturnType<typeof useGetTreasuryAccountsLazyQuery>;
export type GetTreasuryAccountsQueryResult = Apollo.QueryResult<GetTreasuryAccountsQuery, GetTreasuryAccountsQueryVariables>;
export type QueryAccountQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryAccountQuery = (
  { __typename?: 'Query' }
  & { queryAccount?: Maybe<Array<Maybe<(
    { __typename?: 'Account' }
    & Pick<Account, 'type' | 'address'>
    & { balances: Array<(
      { __typename?: 'Balance' }
      & Pick<Balance, 'id' | 'amount'>
      & { token: (
        { __typename?: 'Token' }
        & Pick<Token, 'name' | 'ticker' | 'nav' | 'baseMultiplier'>
      ) }
    )>, stakes: Array<(
      { __typename?: 'Stake' }
      & Pick<Stake, 'id' | 'committedStakingPeriod' | 'amount'>
      & { token: (
        { __typename?: 'Token' }
        & Pick<Token, 'name' | 'ticker' | 'nav' | 'baseMultiplier'>
      ) }
    )> }
  )>>> }
);

export type GetAccountQueryVariables = Exact<{
  address: Scalars['String'];
}>;


export type GetAccountQuery = (
  { __typename?: 'Query' }
  & { getAccount?: Maybe<(
    { __typename?: 'Account' }
    & Pick<Account, 'type' | 'address'>
    & { balances: Array<(
      { __typename?: 'Balance' }
      & Pick<Balance, 'id' | 'amount'>
      & { token: (
        { __typename?: 'Token' }
        & Pick<Token, 'name' | 'ticker' | 'nav' | 'baseMultiplier'>
      ) }
    )>, stakes: Array<(
      { __typename?: 'Stake' }
      & Pick<Stake, 'id' | 'committedStakingPeriod' | 'amount'>
      & { token: (
        { __typename?: 'Token' }
        & Pick<Token, 'name' | 'ticker' | 'nav' | 'baseMultiplier'>
      ) }
    )> }
  )> }
);

export type SubscribeAccountSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type SubscribeAccountSubscription = (
  { __typename?: 'Subscription' }
  & { queryAccount?: Maybe<Array<Maybe<(
    { __typename?: 'Account' }
    & Pick<Account, 'type' | 'address'>
    & { balances: Array<(
      { __typename?: 'Balance' }
      & Pick<Balance, 'id' | 'amount'>
      & { token: (
        { __typename?: 'Token' }
        & Pick<Token, 'name' | 'ticker' | 'nav' | 'baseMultiplier'>
      ) }
    )>, stakes: Array<(
      { __typename?: 'Stake' }
      & Pick<Stake, 'id' | 'committedStakingPeriod' | 'amount'>
      & { token: (
        { __typename?: 'Token' }
        & Pick<Token, 'name' | 'ticker' | 'nav' | 'baseMultiplier'>
      ) }
    )> }
  )>>> }
);

export type QueryTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryTokenQuery = (
  { __typename?: 'Query' }
  & { queryToken?: Maybe<Array<Maybe<(
    { __typename?: 'Token' }
    & Pick<Token, 'ticker' | 'nav' | 'name' | 'baseMultiplier'>
  )>>> }
);

export type SubscribeTokenSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type SubscribeTokenSubscription = (
  { __typename?: 'Subscription' }
  & { queryToken?: Maybe<Array<Maybe<(
    { __typename?: 'Token' }
    & Pick<Token, 'ticker' | 'nav' | 'name'>
  )>>> }
);

export type GetAppStateQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAppStateQuery = (
  { __typename?: 'Query' }
  & { queryAppState?: Maybe<Array<Maybe<(
    { __typename?: 'AppState' }
    & Pick<AppState, 'transactionIds'>
  )>>> }
);

export type SetEthPriceMutationVariables = Exact<{
  price: Scalars['Float'];
}>;


export type SetEthPriceMutation = (
  { __typename?: 'Mutation' }
  & { updateAppState?: Maybe<(
    { __typename?: 'UpdateAppStatePayload' }
    & Pick<UpdateAppStatePayload, 'numUids'>
  )> }
);

export type GetEthPriceQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEthPriceQuery = (
  { __typename?: 'Query' }
  & { queryAppState?: Maybe<Array<Maybe<(
    { __typename?: 'AppState' }
    & Pick<AppState, 'ethPrice'>
  )>>> }
);

export type GetStatisticsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStatisticsQuery = (
  { __typename?: 'Query' }
  & { queryAppState?: Maybe<Array<Maybe<(
    { __typename?: 'AppState' }
    & Pick<AppState, 'totalStakingPower' | 'medianStakingPower' | 'maxStakingPower'>
  )>>> }
);

export type AddAccountMutationVariables = Exact<{
  input: AddAccountInput;
}>;


export type AddAccountMutation = (
  { __typename?: 'Mutation' }
  & { addAccount?: Maybe<(
    { __typename?: 'AddAccountPayload' }
    & { account?: Maybe<Array<Maybe<(
      { __typename?: 'Account' }
      & Pick<Account, 'address'>
    )>>> }
  )> }
);

export type AddTransactionMutationVariables = Exact<{
  input: AddTransactionInput;
}>;


export type AddTransactionMutation = (
  { __typename?: 'Mutation' }
  & { addTransaction?: Maybe<(
    { __typename?: 'AddTransactionPayload' }
    & { transaction?: Maybe<Array<Maybe<(
      { __typename?: 'Transaction' }
      & Pick<Transaction, 'hash'>
    )>>> }
  )> }
);

export type QueryTransactionQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryTransactionQuery = (
  { __typename?: 'Query' }
  & { queryTransaction?: Maybe<Array<Maybe<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, 'blockNumber' | 'timeStamp' | 'hash' | 'nonce' | 'blockHash' | 'from' | 'contractAddress' | 'to' | 'value' | 'tokenName' | 'tokenSymbol' | 'tokenDecimal' | 'transactionIndex' | 'gas' | 'gasPrice' | 'gasUsed' | 'cumulativeGasUsed' | 'input' | 'confirmations'>
  )>>> }
);

export type AddAppStateMutationVariables = Exact<{
  input: AddAppStateInput;
}>;


export type AddAppStateMutation = (
  { __typename?: 'Mutation' }
  & { addAppState?: Maybe<(
    { __typename?: 'AddAppStatePayload' }
    & { appState?: Maybe<Array<Maybe<(
      { __typename?: 'AppState' }
      & Pick<AppState, '_placeholder'>
    )>>> }
  )> }
);

export type AddTokenMutationVariables = Exact<{
  input: AddTokenInput;
}>;


export type AddTokenMutation = (
  { __typename?: 'Mutation' }
  & { addToken?: Maybe<(
    { __typename?: 'AddTokenPayload' }
    & { token?: Maybe<Array<Maybe<(
      { __typename?: 'Token' }
      & Pick<Token, 'ticker'>
    )>>> }
  )> }
);

export type AddBalanceMutationVariables = Exact<{
  input: AddBalanceInput;
}>;


export type AddBalanceMutation = (
  { __typename?: 'Mutation' }
  & { addBalance?: Maybe<(
    { __typename?: 'AddBalancePayload' }
    & { balance?: Maybe<Array<Maybe<(
      { __typename?: 'Balance' }
      & Pick<Balance, 'id'>
    )>>> }
  )> }
);

export type AddStakeMutationVariables = Exact<{
  input: AddStakeInput;
}>;


export type AddStakeMutation = (
  { __typename?: 'Mutation' }
  & { addStake?: Maybe<(
    { __typename?: 'AddStakePayload' }
    & { stake?: Maybe<Array<Maybe<(
      { __typename?: 'Stake' }
      & Pick<Stake, 'id'>
    )>>> }
  )> }
);

export type UpdateAppStateMutationVariables = Exact<{
  set: AppStatePatch;
}>;


export type UpdateAppStateMutation = (
  { __typename?: 'Mutation' }
  & { updateAppState?: Maybe<(
    { __typename?: 'UpdateAppStatePayload' }
    & Pick<UpdateAppStatePayload, 'numUids'>
  )> }
);

export type UpdateTokenMutationVariables = Exact<{
  filter: TokenFilter;
  set: TokenPatch;
}>;


export type UpdateTokenMutation = (
  { __typename?: 'Mutation' }
  & { updateToken?: Maybe<(
    { __typename?: 'UpdateTokenPayload' }
    & { token?: Maybe<Array<Maybe<(
      { __typename?: 'Token' }
      & Pick<Token, 'ticker' | 'nav'>
    )>>> }
  )> }
);

export type UpdateBalanceMutationVariables = Exact<{
  balanceId: Scalars['String'];
  set: BalancePatch;
}>;


export type UpdateBalanceMutation = (
  { __typename?: 'Mutation' }
  & { updateBalance?: Maybe<(
    { __typename?: 'UpdateBalancePayload' }
    & Pick<UpdateBalancePayload, 'numUids'>
  )> }
);

export type UpdateStakeMutationVariables = Exact<{
  filter: StakeFilter;
  set: StakePatch;
}>;


export type UpdateStakeMutation = (
  { __typename?: 'Mutation' }
  & { updateStake?: Maybe<(
    { __typename?: 'UpdateStakePayload' }
    & Pick<UpdateStakePayload, 'numUids'>
  )> }
);

export type DeleteStakeMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteStakeMutation = (
  { __typename?: 'Mutation' }
  & { deleteStake?: Maybe<(
    { __typename?: 'DeleteStakePayload' }
    & Pick<DeleteStakePayload, 'msg'>
  )> }
);

export type UpdateAccountMutationVariables = Exact<{
  filter: AccountFilter;
  set: AccountPatch;
}>;


export type UpdateAccountMutation = (
  { __typename?: 'Mutation' }
  & { updateAccount?: Maybe<(
    { __typename?: 'UpdateAccountPayload' }
    & Pick<UpdateAccountPayload, 'numUids'>
  )> }
);

export type GetTreasuryAccountsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTreasuryAccountsQuery = (
  { __typename?: 'Query' }
  & { queryAccount?: Maybe<Array<Maybe<(
    { __typename?: 'Account' }
    & Pick<Account, 'address'>
    & { balances: Array<(
      { __typename?: 'Balance' }
      & Pick<Balance, 'amount'>
      & { token: (
        { __typename?: 'Token' }
        & Pick<Token, 'nav'>
      ) }
    )> }
  )>>> }
);
