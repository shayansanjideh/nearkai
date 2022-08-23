import Routes from './routes';
import { Toaster } from 'react-hot-toast';
import { HashRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { theme } from 'twin.macro';

const App = () => {
  return (
    <RecoilRoot>
      <HashRouter>
        <Routes />
        <Toaster
          position="top-right"
          containerStyle={{ marginTop: '4rem', marginRight: theme`margin.2` }}
        />
      </HashRouter>
    </RecoilRoot>
  );
};

export default App;
