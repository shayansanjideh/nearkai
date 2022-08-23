import { getAccount, near } from './near';

export interface NFT {
  id: string;
}

export const getOwnedNFTs = async (accountId: string): Promise<string[]> => {
  const NEAR_ENV = 'testnet';
  const url =
    NEAR_ENV === 'testnet'
      ? `https://testnet-api.kitwallet.app/account/${accountId}/likelyNFTs`
      : `https://api.kitwallet.app/account/${accountId}/likelyNFTs`;
  const res = await fetch(url);
  return await res.json();
};

export const getNFTsForContract = async (
  contractId: string,
  accountId: string
) => {
  // nft_tokens_for_owner
  const nfts = await getAccount(near, accountId).viewFunction(
    contractId,
    'nft_tokens_for_owner'
  );
  return nfts;
};

export const getAllNfts = async (accountId: string) => {
  const contracts = await getOwnedNFTs(accountId);
  const nfts = await Promise.all(
    contracts.map((contract) => getNFTsForContract(contract, accountId))
  );
  return nfts.flat();
};
