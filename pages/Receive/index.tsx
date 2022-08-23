import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useParams } from 'react-router-dom';
import List from '../../components/List';
import ListItem from '../../components/ListItem';
import DefaultLayout from '../../layouts/DefaultLayout';
import { QRCodeSVG } from 'qrcode.react';

interface Props {
  accountId: string;
}

const ReceivePage: React.FC<Props> = ({ accountId }) => {
  useEffect(() => {
    ReactDOM.render(
      <QRCodeSVG value={accountId} />,
      document.getElementById('mountNode')
    );
  }, [accountId]);
  return (
    <div>
      <div id="mountNode" />
      <div tw="mt-2">{accountId}</div>
    </div>
  );
};

export default () => {
  const { account: accountId } = useParams<'account'>();
  return (
    <DefaultLayout>
      <ReceivePage accountId={accountId as string} />
    </DefaultLayout>
  );
};
