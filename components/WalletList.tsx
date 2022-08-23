import React, { useEffect, useState } from 'react';
import { createAccount, getAccounts, near } from '../services/near';
import List from './List';
import ListItem from './ListItem';

interface Props {}

const Row: React.FC<{ accountId: string }> = ({ accountId }) => {
  return <div tw="h-12">{accountId}</div>;
};

const WalletList: React.FC<Props> = () => {
  const [accounts, setAccounts] = useState<string[]>([]);
  const [accountToggle, setToggle] = useState(false);

  useEffect(() => {
    getAccounts(near).then(setAccounts);
  }, [accountToggle]);

  const onClick = async () => {
    const keyPair = await createAccount(near);
    console.log(keyPair);
    setToggle((toggle) => !toggle);
  };

  return (
    <div>
      <button onClick={onClick}>Create Account</button>
      <List>
        {accounts.map((account) => (
          <ListItem
            key={account}
            link={`/account/${account}`}
            label={account}
          />
        ))}
      </List>
    </div>
  );
};

export default WalletList;
