export interface Transaction {
  hash: string;
  action_kind: 'TRANSFER' | 'FUNCTION_CALL';
  block_timestamp: number;
}

export const getRecentTransactions = async (
  accountId: string
): Promise<Transaction[]> => {
  const NEAR_ENV = 'testnet';
  const url =
    NEAR_ENV === 'testnet'
      ? `https://testnet-api.kitwallet.app/account/${accountId}/activity`
      : `https://api.kitwallet.app/account/${accountId}/activity`;
  const res = await fetch(url);
  return await res.json();
};
