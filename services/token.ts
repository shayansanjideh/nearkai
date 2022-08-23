import { ftBalanceOf, ftMetadata, ftTransfer } from '@tonic-foundation/token';
import { bnToApproximateDecimal } from '@tonic-foundation/utils';
import { BN } from 'bn.js';
import { Account, Near } from 'near-api-js';
import { nobody } from './near';

export interface TokenBalance {
  id: string;
  name: string;
  balance: number;
}

export const getOwnedTokens = async (accountId: string): Promise<string[]> => {
  const NEAR_ENV = 'testnet';
  const url =
    NEAR_ENV === 'testnet'
      ? `https://testnet-api.kitwallet.app/account/${accountId}/likelyTokens`
      : `https://api.kitwallet.app/account/${accountId}/likelyTokens`;
  const res = await fetch(url);
  return await res.json();
};

export const getBalanceWithMetadata = async (
  accountId: string,
  tokenId: string
) => {
  const metadata = await ftMetadata(nobody, tokenId);
  const rawBalance = await ftBalanceOf(nobody, tokenId, accountId);

  return {
    id: tokenId,
    rawBalance,
    balance: bnToApproximateDecimal(rawBalance, metadata.decimals),
    ...metadata,
  };
};

export const getTokenBalances = async (
  accountId: string
): Promise<TokenBalance[]> => {
  const ownedTokens = await getOwnedTokens(accountId);
  const results = await Promise.all(
    ownedTokens.map((token) => getBalanceWithMetadata(accountId, token))
  );
  return results;
};
