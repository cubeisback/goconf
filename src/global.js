import { css } from '@emotion/react';

export const globalStyles = (props) => css`
  @font-face {
    font-family: 'StyreneAWeb';
    src: url('/fonts/StyreneAWeb-Regular.woff2') format('woff2'),
         url('/fonts/StyreneAWeb-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
      font-family: 'StyreneAWeb';
      src: url('/fonts/StyreneAWeb-Medium.woff2') format('woff2'),
          url('/fonts/StyreneAWeb-Medium.woff') format('woff');
      font-weight: 500;
      font-style: normal;
  }

  //TODO жирный шрифт

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    letter-spacing: 0.01em;
  }

  body {
    font-family: 'StyreneAWeb', sans-serif;
    overflow-x: hidden;
    line-height: 1.28;
    font-size: 16px;
    color: ${props.colors.font};
  }

  input,
  button,
  textarea {
    outline: none;
    border: none;
    font-family: StyreneAWeb;
  }

  a {
    text-decoration: none;
    color: ${props.colors.font};
    display: inline-block;
  }

  img {
    display: inline-block;
    max-width: 100%;
  }
`;
