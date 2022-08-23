import React from 'react'; // TODO: babel
import { css, Global } from '@emotion/react';
import tw, { GlobalStyles as BaseStyles } from 'twin.macro';

const customStyles = {
  body: {
    ...tw`antialiased`,
  },
  // hide arrows on number inputs
  // https://stackoverflow.com/questions/3790935/can-i-hide-the-html5-number-input-s-spin-box
  ...css`
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0; /* <-- has some margin even though it's hidden */
    }
    input[type='number'] {
      -moz-appearance: textfield;
    }
  `,
};

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Global styles={customStyles} />
  </>
);

export default GlobalStyles;
