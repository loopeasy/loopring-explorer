import React from "react";

import AppLink from "../AppLink";
import getDateString from "../../utils/getDateString";
import getTokenAmount from "../../utils/getTokenAmount";

const Remove: React.FC<{ transaction: any }> = ({ transaction }) => {
  const {
    block,
    account,
    token,
    data,
    pool,
    amount,
    feeToken,
    fee,
    __typename,
  } = transaction;

  return (
    <>
      <tr className="border">
        <td className="p-2 w-1/5">Block #</td>
        <td>
          <AppLink path="block" block={block.id}>
            {block.id}
          </AppLink>
        </td>
      </tr>
      <tr className="border">
        <td className="p-2">Submitted at</td>
        <td>{getDateString(block.timestamp)}</td>
      </tr>
      <tr className="border">
        <td className="p-2">Transaction Type</td>
        <td>{__typename}</td>
      </tr>
      <tr className="border">
        <td className="p-2">User Account</td>
        <td>
          <AppLink path="account" accountId={account.id}>
            {account.id}
          </AppLink>
          &nbsp; (
          <AppLink path="account" accountId={account.address} isExplorerLink>
            {account.address}
          </AppLink>
          )
        </td>
      </tr>
      <tr className="border">
        <td className="p-2">Pool</td>
        <td>
          <AppLink path="account" accountId={pool.id}>
            {pool.id}
          </AppLink>
          &nbsp; (
          <AppLink path="account" accountId={pool.address} isExplorerLink>
            {pool.address}
          </AppLink>
          )
        </td>
      </tr>
      <tr className="border">
        <td className="p-2">Token Removed</td>
        <td>
          {getTokenAmount(amount, token.decimals)} {token.symbol}
        </td>
      </tr>
      <tr className="border">
        <td className="p-2">Fee</td>
        <td>
          {getTokenAmount(fee, feeToken.decimals)} {feeToken.symbol}
        </td>
      </tr>
      <tr className="border">
        <td className="p-2">Transaction Data</td>
        <td>
          <div className="break-all bg-gray-100 h-32 overflow-auto m-2 rounded p-2 text-gray-500">
            {data}
          </div>
        </td>
      </tr>
    </>
  );
};

export default Remove;