import tw, { styled } from 'twin.macro';
import { useResolvedPath, useMatch } from 'react-router';
import { Link, NavLinkProps } from 'react-router-dom';
import { FaFaucet } from 'react-icons/fa';

import { components } from '~/styles';

const HeaderNavLink: React.FC<NavLinkProps> = ({ to, children }) => {
  const resolved = useResolvedPath(to);
  const matched = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link to={to}>
      <div css={[components.button, matched && tw`border-sky-100`]}>
        {children}
      </div>
    </Link>
  );
};

const Header = () => {
  return (
    <header tw="w-full py-1 text-center font-bold bg-gray-600 text-white mb-2">
      NEARKai
    </header>
  );
};

const Footer = () => {
  return (
    <footer tw="flex items-center justify-between p-6 text-white"> </footer>
  );
};

const Wrapper = styled.div([tw`min-h-full max-w-[300px] overflow-auto`]);

const DefaultLayout: React.FC = ({ children, ...props }) => {
  return (
    <Wrapper {...props}>
      <Header />
      {children}
      <Footer />
    </Wrapper>
  );
};

export default DefaultLayout;
