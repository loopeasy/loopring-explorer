import { useMemo } from "react";
import { gql } from "graphql-request";
import useSWR from "swr";
import request from "graphql-request";

import { LOOPRING_SUBGRAPH } from "../utils/config";
import {
  account,
  accountUpdate,
  add,
  ammUpdate,
  deposit,
  orderbookTrade,
  pool,
  remove,
  signatureVerification,
  swap,
  token,
  transfer,
  withdrawal,
  tradeNFT,
  swapNFT,
  withdrawalNFT,
  transferNFT,
  mintNFT,
  dataNFT,
  nft,
} from "../graphql/fragments";

export const FETCH_TXS = gql`
  query transactions(
    $skip: Int
    $first: Int
    $orderBy: Transaction_orderBy
    $orderDirection: OrderDirection
    $block: Block_height
    $where: Transaction_filter
  ) {
    proxy(id: 0) {
      transactionCount
      depositCount
      withdrawalCount
      transferCount
      addCount
      removeCount
      orderbookTradeCount
      swapCount
      accountUpdateCount
      ammUpdateCount
      signatureVerificationCount
      tradeNFTCount
      swapNFTCount
      withdrawalNFTCount
      transferNFTCount
      nftMintCount
      nftDataCount
    }
    transactions(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      block: $block
      where: $where
    ) {
      id
      internalID
      block {
        id
        blockHash
        timestamp
        transactionCount
        depositCount
        withdrawalCount
        transferCount
        addCount
        removeCount
        orderbookTradeCount
        swapCount
        accountUpdateCount
        ammUpdateCount
        signatureVerificationCount
        tradeNFTCount
        swapNFTCount
        withdrawalNFTCount
        transferNFTCount
        nftMintCount
        nftDataCount
      }
      data

      ...AddFragment
      ...RemoveFragment
      ...SwapFragment
      ...OrderbookTradeFragment
      ...DepositFragment
      ...WithdrawalFragment
      ...TransferFragment
      ...AccountUpdateFragment
      ...AmmUpdateFragment
      ...SignatureVerificationFragment
      ...TradeNFTFragment
      ...SwapNFTFragment
      ...WithdrawalNFTFragment
      ...TransferNFTFragment
      ...MintNFTFragment
      ...DataNFTFragment
    }
  }

  ${account}
  ${token}
  ${pool}
  ${nft}

  ${add}
  ${remove}
  ${swap}
  ${orderbookTrade}
  ${deposit}
  ${withdrawal}
  ${transfer}
  ${accountUpdate}
  ${ammUpdate}
  ${signatureVerification}
  ${tradeNFT}
  ${swapNFT}
  ${withdrawalNFT}
  ${transferNFT}
  ${mintNFT}
  ${dataNFT}
`;

const useTransactions = (
  skip = 0,
  first = 10,
  orderBy = "internalID",
  orderDirection = "desc",
  block = null,
  typename = null,
  accounts = []
) => {
  const memoVariables = useMemo(() => {
    const variables = {
      skip,
      first,
      orderBy,
      orderDirection,
      where: {},
    };

    if (block) {
      variables.where = {
        ...variables.where,
        block,
      };
    }
    if (accounts.length > 0) {
      variables.where = {
        ...variables.where,
        accounts_contains: accounts,
      };
    }
    if (typename) {
      variables.where = {
        ...variables.where,
        typename,
      };
    }
    return variables;
  }, [skip, first, orderBy, orderDirection, block, typename]);

  const { data, error } = useSWR(
    [FETCH_TXS, memoVariables],
    (query, variables) => request(LOOPRING_SUBGRAPH, query, variables)
  );

  return {
    data,
    error,
    isLoading: !data && !error,
  };
};

export default useTransactions;
