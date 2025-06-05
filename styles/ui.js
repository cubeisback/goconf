"use client";

import { css } from "@emotion/css";
import styled from "@emotion/styled";
import Link from "next/link";

// ✅ Не зависит от темы

//TODO Удалить container и другие старые стили
export const container = css`
  width: 1340px;
  margin: 0 auto;
  padding: 0 30px;
  position: relative;

  @media (max-width: 1339px) {
    width: 100%;
    padding: 0 15px;
  }
`;

export const Container = styled.div`
	width: 1340px;
  	margin: 0 auto;
  	padding: 0 30px;
  	position: relative;

  	@media (max-width: 1339px) {
    	width: 100%;
    	padding: 0 15px;
  	}

	@media(max-width: 1439px) {
		padding: ${({ $fullWidth }) => ($fullWidth && "0")};
	}
`

export const DoubleLink = styled.div`
  color: #191921;
  line-height: 1.28;
  overflow: hidden;
  height: 20px;

  span {
    display: block;
    transition: all 0.3s ease;

    &:nth-of-type(2) {
      color: #8553F9;
    }
  }

  &:hover {
    span {
      transform: translateY(-100%);
    }
  }
`;

export const DoubleLinkArrow = styled(Link)`
	width: 56px;
	height: 56px;
	border: 2px solid #8553F9;
	border-radius: 100%;
	display: flex;
	align-items: center;
	justify-content: center;

	@media(max-width: 575px) {
		width: 48px;
		height: 48px;
	}

	& > div {
		display: flex;
		width: 14px;
		height: 14px;
		position: relative;
		overflow: hidden;

		& > svg {
			position: absolute;
			transition: ${({ theme }) => theme.transition};

			&:nth-of-type(2) {
				transform: translateX(-14px) translateY(14px);
			}
		}
	}
	
	&:hover {
		svg {
			transform: translateX(14px) translateY(-14px);

			&:nth-of-type(2) {
				transform: translateX(0) translateY(0);
			}
		}
	}
`

const ButtonType = ({ $button, ...props }) => {
  const Component = $button ? 'button' : 'div';
  return <Component {...props} />;
};
export const Button = styled(ButtonType)`
  border-radius: 28px;
  background: ${({ green, theme }) =>
    green ? theme.colors.green : theme.colors.purple};
  border: 2px solid ${({ green, theme }) =>
    green ? theme.colors.green : theme.colors.purple};
  padding: 12px 32px;
  cursor: pointer;
  text-align: center;
  color: ${({ green, theme }) => (green ? theme.colors.font : "#fff")};
  width: max-content;
  transition: ${({ theme }) => theme.transition};

  &:hover {
    background: #fff;
    color: ${({ green, theme }) =>
      green ? theme.colors.font : theme.colors.purple};
  }

  @media (max-width: 575px) {
    width: 100%;
  }

  p {
    height: 21px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
	font-size: 16px;

    span {
      display: block;
      min-width: max-content;
      transition: ${({ theme }) => theme.transition};
      color: ${({ green, theme }) => (green ? theme.colors.font : "#fff")};

      &:nth-of-type(2) {
        transform: translateY(100%);
        color: ${({ green, theme }) =>
          green ? theme.colors.font : theme.colors.purple};
      }
    }
  }

  &:hover p span {
    transform: translateY(-100%);
  }
`;

export const ButtonMore = styled.div`
  margin: 0 auto;
                        padding: 14px 32px;
                        border-radius: 28px;
                        border: 2px solid ${({ theme }) => theme.colors.purple};
                        background-color: #fff;
                        width: max-content;
                        
                        line-height: 1.28;
                        cursor: pointer;
                        transition: ${({ theme }) => theme.transition};  
                        
                        &:hover {
                            background-color: ${({ theme }) => theme.colors.purple};
                        }

  @media (max-width: 575px) {
    width: 100%;
  }

  p {
    height: 21px;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    span {
      display: block;
      min-width: max-content;
      transition: ${({ theme }) => theme.transition};
      color: ${({ theme }) => theme.colors.purple};

      &:nth-of-type(2) {
        transform: translateY(100%);
        color: #fff;
      }
    }
  }

  &:hover p span {
    transform: translateY(-100%);
  }
`;

export const inputItem = css`
  flex: 0 1 calc(50% - 12px);
  max-width: calc(50% - 12px);
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 575px) {
    flex: 0 1 100%;
    max-width: 100%;
  }

  & > p {
    font-size: 14px;
    line-height: 1.16;
  }
`;

export const input = css`
  padding: 14px 16px;
  background-color: #fff;
  border-radius: 28px;
  width: 100%;

  &::placeholder {
    font-size: 14px;
    line-height: 1.16;
    color: rgba(71, 71, 77, 0.64);
  }
`;

export const textarea = css`
  padding: 14px 16px;
  background-color: #fff;
  border-radius: 28px;
  width: 100%;
  min-height: 116px;
  resize: none;

  &::placeholder {
    font-size: 14px;
    line-height: 1.16;
    color: rgba(71, 71, 77, 0.64);
  }
`;

export const filterSelector = css`
  flex: 0 1 calc(16.666666% - 13.333333px);
  max-width: calc(16.666666% - 13.333333px);
  padding: 14px;
  background-color: #fff;
  border-radius: 28px;
  color: rgba(71, 71, 77, 0.64);
  font-size: 14px;
  line-height: 1.28;
  position: relative;

  @media (max-width: 1339px) {
    flex: 0 1 calc(33.3333333% - 10.666666px);
    max-width: calc(33.3333333% - 10.666666px);
  }
  @media (max-width: 575px) {
    flex: 0 1 calc(50% - 8px);
    max-width: calc(50% - 8px);
  }

  & > label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  }

  & > div {
    border-radius: 28px;
    background-color: #fff;
    box-shadow: 0px 196px 55px 0px rgba(0, 0, 0, 0.00), 0px 125px 50px 0px rgba(0, 0, 0, 0.01),
      0px 71px 42px 0px rgba(0, 0, 0, 0.02), 0px 31px 31px 0px rgba(0, 0, 0, 0.03),
      0px 8px 17px 0px rgba(0, 0, 0, 0.04);
    width: 100%;
    left: 0;
    top: calc(100% + 4px);

    p {
      padding: 12px 16px;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        color: #8553F9;
      }
    }
  }
`;

export const filterBtn = css`
  background-color: #191921;
  color: #fff;
  text-align: center;
  font-size: 16px;
  padding: 14px 32px;
  border-radius: 28px;
  cursor: pointer;
  flex: 1;
`;

//TODO удалить просто стиль
export const pagePromo = css`
  background-color: #F5F7FA;
  padding: 120px 0 32px;
`;

export const PagePromo = styled.div`
  background-color: #F5F7FA;
  padding: 120px 0 32px;
`;

//TODO удалить просто стиль
export const breadcrumbs = css`
  margin-bottom: 16px;
  display: flex;
  gap: 6px;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  max-width: calc(100vw - 30px);

  @media (max-width: 575px) {
    margin-bottom: 32px;
  }

  a {
    font-size: 14px;
    color: #B5B7B9;
    line-height: 1.16;
    min-width: max-content;

    &::after {
      content: "/";
      padding-left: 6px;
    }
  }

  p {
    color: #6C6C71;
    font-size: 14px;
    line-height: 1.16;
    min-width: max-content;
  }
`;

export const Breadcrumbs = styled.div`
  margin-bottom: 16px;
  display: flex;
  gap: 6px;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  max-width: calc(100vw - 30px);

  @media (max-width: 575px) {
    margin-bottom: 32px;
  }

  a {
    font-size: 14px;
    color: #B5B7B9;
    line-height: 1.16;
    min-width: max-content;

    &::after {
      content: "/";
      padding-left: 6px;
    }
  }

  p {
    color: #6C6C71;
    font-size: 14px;
    line-height: 1.16;
    min-width: max-content;
  }
`;

//TODO Удалить просто стиль
export const pageTitle = css`
  margin-bottom: 24px;
  font-family: Impact;
  font-size: 56px;
  line-height: 1.15;
  font-weight: normal;

  @media (max-width: 575px) {
    font-size: 32px;
  }
`;

export const PageTitle = styled.h1`
  margin-bottom: 24px;
  font-family: Impact;
  font-size: 56px;
  line-height: 1.15;
  font-weight: normal;

  @media (max-width: 575px) {
    font-size: 32px;
  }
`;

export const userMain = css`
  flex: 1;
  padding-top: 24px;

  @media (max-width: 1023px) {
    width: 100%;
  }
`;

export const checkBox = css`
  input {
    display: none;
  }

  label {
    cursor: pointer;
    padding-left: 40px;
    position: relative;
    font-size: 14px;
    line-height: 1.16;

    &::before {
      content: "";
      position: absolute;
      border: 2px solid rgba(255, 255, 255, 0.3);
      background-color: transparent;
      border-radius: 5px;
      width: 24px;
      height: 24px;
      left: 2px;
      top: -3px;
      transition: all 0.3s ease;
    }

    &::after {
      content: "";
      position: absolute;
      background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M20.883 6.88398L9.883 17.884C9.39485 18.3721 8.60339 18.3721 8.11523 17.884L3.11523 12.884L4.883 11.1162L8.99912 15.2323L19.1152 5.11621L20.883 6.88398Z" fill="%238553F9"/></svg>');
      width: 24px;
      height: 24px;
      left: 2px;
      top: -3px;
      opacity: 0;
      transition: all 0.3s ease;
    }
  }

  input:checked ~ label {
    &::before {
      background-color: #fff;
    }

    &::after {
      opacity: 1;
    }
  }
`;

export const inputRadio = css`
  padding-left: 40px;
  padding: 6px 0 6px 40px;
  position: relative;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    left: 3px;
    top: 4px;
    width: 26px;
    height: 26px;
    background-color: #fff;
    border-radius: 100%;
    border: 5px solid rgba(16, 16, 16, 0.2);
    transition: all 0.3s ease;
  }
`;

export const inputRadioActive = css`
  &::before {
    border-color: #8553F9;
  }
`;

export const lkContainer = css`
            padding: 120px 0;
            background-color: #F5F7FA;

            min-height: calc(100vh - 84px);

            @media(max-width: 575px) {
                padding-bottom: 64px;
            }
`;