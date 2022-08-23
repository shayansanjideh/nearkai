import * as nearApi from 'near-api-js';
import { getNearConfig } from '@tonic-foundation/config';
import { BrowserLocalStorageKeyStore } from 'near-api-js/lib/key_stores';
import { Account, KeyPair, Near } from 'near-api-js';
import { BN } from 'bn.js';
import { bnToApproximateDecimal, decimalToBn } from '@tonic-foundation/utils';
import { NEAR_DECIMALS } from '@tonic-foundation/token';

// TODO, copy from cli into a shared config
const getNearConnection = () => {
  const keyStore = new BrowserLocalStorageKeyStore();
  return new nearApi.Near({ ...getNearConfig('testnet'), keyStore });
};

const generateKeyPair = () => {
  return KeyPair.fromRandom('ed25519');
};

const toHexString = (byteArray: Uint8Array) =>
  Array.from(byteArray, (byte) =>
    ('0' + (byte & 0xff).toString(16)).slice(-2)
  ).join('');

export const createAccount = async (near: Near) => {
  const keyPair = generateKeyPair();
  const keyStore = new BrowserLocalStorageKeyStore();
  const accountId = toHexString(keyPair.getPublicKey().data);
  await keyStore.setKey(near.connection.networkId, accountId, keyPair);
  return accountId;
};

export const getAccounts = async (near: Near) => {
  const keyStore = new BrowserLocalStorageKeyStore();
  return await keyStore.getAccounts(near.connection.networkId);
};

export const getAccount = (near: Near, accountId: string) => {
  return new Account(near.connection, accountId);
};

export const yoctoToDecimal = (amount: string) => {
  return bnToApproximateDecimal(new BN(amount), NEAR_DECIMALS);
};

export const sendNear = async (
  account: Account,
  address: string,
  amount: number
) => {
  return account.sendMoney(address, decimalToBn(amount, NEAR_DECIMALS));
};

export const near = getNearConnection();
export const nobody = new Account(near.connection, 'nobody');
