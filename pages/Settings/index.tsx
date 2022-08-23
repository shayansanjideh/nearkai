import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import List from '../../components/List';
import ListItem from '../../components/ListItem';
import DefaultLayout from '../../layouts/DefaultLayout';

interface Props {
  accountId: string;
}

const SettingsPage: React.FC<Props> = ({ accountId }) => {
  return (
    <div>
      <List>
        <ListItem link="#" label="NEAR"></ListItem>
      </List>
    </div>
  );
};

export default () => {
  const { account: accountId } = useParams<'account'>();
  return (
    <DefaultLayout>
      <SettingsPage accountId={accountId as string} />
    </DefaultLayout>
  );
};
