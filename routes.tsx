import { Routes, Route } from 'react-router-dom';

import Home from '~/pages/Home';
import { useNavigation } from './hooks/useNavigation';
import AccountPage from './pages/Account';
import BalancesPage from './pages/Balances';
import ReceivePage from './pages/Receive';
import SendNFT from './pages/SendNFT';
import SendToken from './pages/SendToken';
import SettingsPage from './pages/Settings';
import TransactionsPage from './pages/Transactions';

export default () => {
  useNavigation();
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/account/:account" element={<AccountPage />} />
      <Route path="/receive/:account" element={<ReceivePage />} />
      <Route path="/balances/:account" element={<BalancesPage />} />
      <Route path="/transactions/:account" element={<TransactionsPage />} />
      <Route path="/settings/:account" element={<SettingsPage />} />
      <Route path="/send/:account/:tokenid" element={<SendToken />} />
      <Route path="/send/:account/:collection/:itemid" element={<SendNFT />} />
    </Routes>
  );
};
