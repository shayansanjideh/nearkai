import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button';
import List from '../../components/List';
import ListItem from '../../components/ListItem';
import TextInput from '../../components/TextInput';
import DefaultLayout from '../../layouts/DefaultLayout';
import { getAccount } from '../../services/near';

interface Props {
  accountId: string;
  tokenId: string;
  itemId: string;
}

const SendTokenPage: React.FC<Props> = ({ accountId, tokenId }) => {
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    if (tokenId === 'NEAR') {
    }
  }, []);

  return (
    <div>
      <div>Balance: {balance}</div>
      <TextInput label="Address" />
      <Button>Send</Button>
    </div>
  );
};

export default () => {
  const { account: accountId, token: tokenId } = useParams<'account'>();
  return (
    <DefaultLayout>
      <SendTokenPage
        accountId={accountId as string}
        tokenId={tokenId as string}
      />
    </DefaultLayout>
  );
};
