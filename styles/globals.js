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
		src: url('/fonts/StyreneAWeb-Bold.woff2') format('woff2'),
			url('/fonts/StyreneAWeb-Bold.woff') format('woff');
		font-weight: bold;
		font-style: normal;
	}
	@font-face {
		font-family: 'StyreneAWeb';
		src: url('/fonts/StyreneAWeb-Medium.woff2') format('woff2'),
			url('/fonts/StyreneAWeb-Medium.woff') format('woff');
		font-weight: 500;
		font-style: normal;
	}
	@font-face {
		font-family: 'Impact';
		src: url('/fonts/Impact.woff2') format('woff2'),
			url('/fonts/Impact.woff') format('woff');
		font-weight: normal;
		font-style: normal;
	}

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
    // overflow-x: hidden;
	-webkit-overflow-scrolling: touch;
    line-height: 1.28;
    font-size: 16px;
    color: ${props.colors.font};
  }

  #reset,
  #html_reset {
    // overflow-x: hidden;
  }

  html, body {
	touch-action: manipulation;
	overflow-x: hidden;
	overflow-y: auto;
  }

  input,
  button,
  textarea {
    outline: none;
    border: none;
    font-family: StyreneAWeb;
  }

input {
	width: 100%;
    min-width: 0px;
    appearance: none;
}

input[type=number]::-webkit-outer-spin-button,
input[type=number]::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}
input[type=number] {
	-moz-appearance: textfield;
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

	.texteditor_panel {
		
		button {
			background-color: transparent;
			cursor: pointer;
			font-size: 16px;
		}
	}
	.texteditor_main {
		div {
			min-height: 200px!important;
			max-height: 200px!important;
			outline: none!important;
		}
	}

	.swiper-button-prev, .swiper-button-next {
		width: 56px;
		height: 56px;

		&::after {
			content: '';
			background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 56 56" style="width: 56px;"><g clip-path="url(%23slider_arrow_svg__a)"><circle cx="28" cy="28" r="27.125" stroke="%238553F9" stroke-width="2"></circle><g clip-path="url(%23slider_arrow_svg__b)"><path stroke="%238553F9" stroke-width="2" d="M20 28h16m-16 0 8-8m-8 8 8 8"></path></g></g><defs><clipPath id="slider_arrow_svg__a"><path fill="%23fff" d="M0 0h56v56H0z"></path></clipPath><clipPath id="slider_arrow_svg__b"><path fill="%23fff" d="M18 18h20v20H18z"></path></clipPath></defs></svg>');
			width: 100%;
			height: 100%;
			background-size: cover;
		}
	}
	.swiper-button-next {
		transform: rotate(180deg);
	}
	
`;
