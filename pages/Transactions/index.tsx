import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import List from '../../components/List';
import ListItem from '../../components/ListItem';
import DefaultLayout from '../../layouts/DefaultLayout';
import {
  getRecentTransactions,
  Transaction,
} from '../../services/transactions';

interface Props {
  accountId: string;
}

const TransactionsPage: React.FC<Props> = ({ accountId }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  useEffect(() => {
    getRecentTransactions(accountId).then(setTransactions);
  });
  return (
    <div>
      <List>
        {transactions.map((t) => (
          <ListItem
            link="#"
            key={t.hash}
            label={`${t.action_kind} ${t.hash}`}
            secondary={new Date(t.block_timestamp / 1000000).toISOString()}
          ></ListItem>
        ))}
      </List>
    </div>
  );
};

export default () => {
  const { account: accountId } = useParams<'account'>();
  return (
    <DefaultLayout>
      <TransactionsPage accountId={accountId as string} />
    </DefaultLayout>
  );
};
