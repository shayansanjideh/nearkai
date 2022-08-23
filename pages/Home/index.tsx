import DefaultLayout from '~/layouts/DefaultLayout';
import React from 'react';
import Spinner from '~/components/Spinner';
import toast from 'react-hot-toast';
import tw, { styled } from 'twin.macro';
import { components } from '~/styles';
import { useRecoilValue } from 'recoil';
import { useTitle } from 'react-use';
import { wrappedToast } from '~/components/WrappedToast';
import WalletList from '../../components/WalletList';

const Button = styled.button(
  tw`w-full`,
  tw`disabled:(bg-black bg-opacity-10 hover:(cursor-default border-transparent))`,
  ...components.button
);

const Fallback = () => {
  return <Spinner tw="m-auto text-7xl text-gray-50" />;
};

const Content = () => {
  useTitle('NEARKai');

  return (
    <React.Suspense fallback={<Fallback />}>
      <WalletList />
    </React.Suspense>
  );
};

export default () => {
  return (
    <DefaultLayout>
      <Content />
    </DefaultLayout>
  );
};
