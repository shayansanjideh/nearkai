import { bnToApproximateDecimal } from '@tonic-foundation/utils';
import { BN } from 'bn.js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import List from '../../components/List';
import ListItem from '../../components/ListItem';
import DefaultLayout from '../../layouts/DefaultLayout';
import { getAccount, near } from '../../services/near';
import { getTokenBalances, TokenBalance } from '../../services/token';

interface Props {
  accountId: string;
}

const BalancesPage: React.FC<Props> = ({ accountId }) => {
  const [balances, setBalances] = useState<TokenBalance[]>([]);
  const [nearBalance, setNearBalance] = useState<number>();

  useEffect(() => {
    getTokenBalances(accountId).then(setBalances);
    getAccount(near, accountId)
      .getAccountBalance()
      .then((b) =>
        setNearBalance(bnToApproximateDecimal(new BN(b.available), 24))
      );
  }, [accountId]);

  return (
    <div>
      <List>
        <ListItem
          link={`/send/${accountId}/NEAR`}
          label="NEAR"
          secondary={`${nearBalance}`}
        ></ListItem>
        {balances.map((b) => (
          <ListItem
            key={b.id}
            link={`/send/${accountId}/${b.id}`}
            label={b.name}
            secondary={`${b.balance}`}
          />
        ))}
      </List>
    </div>
  );
};

export default () => {
  const { account: accountId } = useParams<'account'>();
  return (
    <DefaultLayout>
      <BalancesPage accountId={accountId} />
    </DefaultLayout>
  );
};
