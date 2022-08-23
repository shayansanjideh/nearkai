import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import List from '../../components/List';
import ListItem from '../../components/ListItem';
import DefaultLayout from '../../layouts/DefaultLayout';
import { getAccount, near } from '../../services/near';

interface Props {
  accountId: string;
}

const AccountPage: React.FC<Props> = ({ accountId }) => {
  const account = getAccount(near, accountId as string);
  return (
    <div>
      {account.accountId}
      <List>
        <ListItem link={`/balances/${accountId}`} label="Balances"></ListItem>
        <ListItem
          link={`/transactions/${accountId}`}
          label="Transactions"
        ></ListItem>
        <ListItem link={`/receive/${accountId}`} label="Receive"></ListItem>
        <ListItem link={`/settings/${accountId}`} label="Settings"></ListItem>
      </List>
    </div>
  );
};

export default () => {
  const { account: accountId } = useParams<'account'>();
  return (
    <DefaultLayout>
      <AccountPage accountId={accountId as string} />
    </DefaultLayout>
  );
};
