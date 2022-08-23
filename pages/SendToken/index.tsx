import { ftTransfer, NEAR_DECIMALS } from '@tonic-foundation/token';
import { decimalToBn } from '@tonic-foundation/utils';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button';
import List from '../../components/List';
import ListItem from '../../components/ListItem';
import TextInput from '../../components/TextInput';
import DefaultLayout from '../../layouts/DefaultLayout';
import {
  getAccount,
  near,
  sendNear,
  yoctoToDecimal,
} from '../../services/near';
import { getBalanceWithMetadata } from '../../services/token';

interface Props {
  accountId: string;
  tokenId: string;
}

const SendTokenPage: React.FC<Props> = ({ accountId, tokenId }) => {
  const [balance, setBalance] = useState(0);
  const [decimals, setDecimals] = useState(0);
  const [tokenName, setTokenName] = useState('');
  const [amount, setAmount] = useState(0);
  const [address, setAddress] = useState('');
  useEffect(() => {
    console.log(tokenId);
    if (tokenId === 'NEAR') {
      setTokenName('NEAR');
      getAccount(near, accountId)
        .getAccountBalance()
        .then((b) => setBalance(yoctoToDecimal(b.available)));
      setDecimals(NEAR_DECIMALS);
    } else {
      getBalanceWithMetadata(accountId, tokenId).then((result) => {
        setDecimals(result.decimals);
        setBalance(result.balance);
        setTokenName(result.name);
      });
    }
  }, []);

  const onClick = () => {
    if (amount > balance) {
      // error
      return;
    }
    if (!address) {
      return;
    }

    const account = getAccount(near, accountId);

    if (tokenName === 'NEAR') {
      sendNear(account, address, amount).then(console.log);
    } else {
      const bnAmount = decimalToBn(amount, decimals);
      ftTransfer(account, tokenId, {
        receiverId: address,
        amount: bnAmount,
      }).then(console.log);
    }
  };

  return (
    <div>
      <div>
        Balance: {balance} {tokenName}
      </div>
      <TextInput
        label="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <TextInput
        label="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Button onClick={onClick}>Send</Button>
    </div>
  );
};

export default () => {
  const { account: accountId, tokenid: tokenId } = useParams<
    'account',
    'token'
  >();
  return (
    <DefaultLayout>
      <SendTokenPage
        accountId={accountId as string}
        tokenId={tokenId as string}
      />
    </DefaultLayout>
  );
};
