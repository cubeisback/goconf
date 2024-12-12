import { css } from '@emotion/react';

export const globalStyles = css`
  @font-face {
    font-family: 'StyreneAWeb';
    src: url('/fonts/StyreneAWeb-Regular.woff2') format('woff2'),
         url('/fonts/StyreneAWeb-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  // @font-face {
  //   font-family: 'Impact';
  //   src: url('/fonts/Impact.woff2') format('woff2'),
  //        url('/fonts/Impact.woff') format('woff');
  //   font-weight: normal;
  //   font-style: normal;
  // }

  body {
    font-family: 'StyreneAWeb', sans-serif;
  }
`;