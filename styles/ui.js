"use client";

import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { motion } from 'framer-motion';
import Link from "next/link";

//TODO Удалить старые стили

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
`;
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
`;
const ButtonType = ({ $button, ...props }) => {
  const Component = $button ? 'button' : 'div';
  return <Component {...props} />;
};
export const Button = styled(ButtonType)`
	border-radius: 28px;
	background: ${({ green, black, theme }) =>
		green ? theme.colors.green : black ? '#191921' : theme.colors.purple};
	border: 2px solid ${({ green, theme }) =>
		green ? theme.colors.green : theme.colors.purple};
	padding: 12px 32px;
	cursor: pointer;
	text-align: center;
	color: ${({ green, theme }) => (green ? theme.colors.font : "#fff")};
	width: ${({ full }) => (full ? '100%' : 'max-content')};
	transition: ${({ theme }) => theme.transition};
	font-size: 16px;
	flex: ${({ black }) => black && '1'};

	&:hover {
		background: #fff;
		color: ${({ green, theme }) =>
		green ? theme.colors.font : theme.colors.purple};
	}

	@media(max-width: 799px) {
        margin: ${({ button_404 }) => (button_404 && '0 auto;')}
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
    text-align: center;
                        
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
  border: 1px solid #fff;
  border-radius: 28px;
  width: 100%;
  font-size: 14px;

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
  border: 1px solid #fff;

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
export const SelectorDate = styled.div`
  padding: 14px;
  background-color: #fff;
  border-radius: 28px;
  color: rgba(71, 71, 77, 0.64);
  font-size: 14px;
  line-height: 1.28;
  position: relative;
  border: 1px solid #fff;
  flex: 0 1 ${props => props.$full ? '180px' : 'calc(16.666666% - 13.333333px)' };
			max-width: ${props => props.$full ? '180px' : 'calc(16.666666% - 13.333333px)'};
			display: flex;
			align-items: center;
			justify-content: space-between;
			cursor: pointer;

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
    left: 0;
    top: calc(100% + 4px);

	background-color: transparent;
				box-shadow: none;
				width: 0;
				height: 0;

				@media(max-width: 991px) {
				  left: ${props => props.$fixmob && '-30vw'};
				}

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

// export const filterBtn = css`
//   background-color: #191921;
//   color: #fff;
//   text-align: center;
//   font-size: 16px;
//   padding: 14px 32px;
//   border-radius: 28px;
//   cursor: pointer;
//   flex: 1;
// `;

//TODO удалить просто стиль
export const pagePromo = css`
  background-color: #F5F7FA;
  padding: 120px 0 32px;
`;

export const PagePromo = styled.div`
  background-color: #F5F7FA;
  padding: 120px 0 32px;
`;
export const Breadcrumbs = styled.div`
	margin-bottom: 16px;
	display: flex;
	gap: 6px;
	flex-wrap: nowrap;

	@media (max-width: 575px) {
		margin-bottom: 32px;
	}

	a {
		font-size: 14px;
		color: #B5B7B9;
		line-height: 1.16;
		min-width: max-content;
		white-space: nowrap;

		&::after {
			content: "/";
			padding-left: 6px;
		}
	}

	p {
		color: #6C6C71;
		font-size: 14px;
		line-height: 1.16;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
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
    border-radius: 100%;
    border: 3px solid rgba(16, 16, 16, 0.2);
    transition: all 0.3s ease;
  }
`;

export const inputRadioActive = css`
	&::before {
		border-color: #8553F9;
		background-color: #fff;
		border-width: 6px;
	}
`;

//TODO удалить
export const lkContainer = css`
            padding: 120px 0;
            background-color: #F5F7FA;

            min-height: calc(100vh - 84px);
	
            @media(max-width: 575px) {
                padding-bottom: 64px;
            }
`;
export const LkWrapper = styled.div`
    padding: 120px 0;
    background-color: #F5F7FA;

    min-height: calc(100vh - 84px);

    @media(max-width: 575px) {
        padding-bottom: 64px;
		padding-top: 100px;
    }
`;

//TODO добавить для всех мест с текстом
export const Article = styled.article`
	padding: 64px 0;
	display: flex;
		flex-direction: column;
		gap: 16px;

		& > p {
			font-size: 16px;
			line-height: 1.28;
		}
		h1 {
			font-size: 28px;
			font-family: Impact;
			line-height: 1.34;
			font-weight: 500;
		}
		h2 {
			font-size: 24px;
			line-height: 1.34;
			font-weight: 500;
		}
		h3 {
			font-size: 20px;
			font-weight: 500;
			line-height: 1.4;
			font-weight: 500;
		}
		h4 {
			font-size: 18px;
			font-weight: 500;
			line-height: 1.36;
			font-weight: 500;
		}
		ul {
			padding-left: 20px;
			display: flex;
			flex-direction: column;
			gap: 10px;
			
			li {
				font-size: 14px;
			}
		}
		ol {
			padding-left: 20px;
			display: flex;
			flex-direction: column;
			gap: 10px;

			li {
				font-size: 14px;
			}
		}
		strong {
			font-weight: 500;
		}
`;


//USER STYLES START
export const UserMain = styled(motion.div)`
	flex: 1;
	padding-top: 24px;

	@media (max-width: 1023px) {
		width: 100%;
	}
`;
export const UserEventsBlock = styled.div`
	display: flex;
    flex-direction: column;
    gap: 32px;
`;
export const UserEventsBlockItem = styled.div`
	border-radius: 0 0 28px 28px;
    background-color: #fff;
    box-shadow: 0px 196px 55px 0px rgba(0, 0, 0, 0.00), 0px 125px 50px 0px rgba(0, 0, 0, 0.01), 0px 71px 42px 0px rgba(0, 0, 0, 0.02), 0px 31px 31px 0px rgba(0, 0, 0, 0.03), 0px 8px 17px 0px rgba(0, 0, 0, 0.04);
    padding: 24px 32px;
	position: relative;

    @media(max-width: 575px) {
        padding: 16px;
    }
`;
export const UserEventsBlockHead = styled.div`
	background-color: ${({ $active, theme }) => ($active ? theme.colors.purple : "#F5F7FA")};
	padding: 16px 32px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 16px;
	border-radius: 28px 28px 0px 0px;
	border: 2px solid ${({ $active, theme }) => ($active ? theme.colors.purple : "#fff")};;
	border-bottom: none;

    @media(max-width: 575px) {
        flex-direction: column;
		padding: 16px;
		text-align: center;
		gap: 8px;
		position: relative;
    }
`;
export const UserEventsBlockItemTop = styled.div`
	display: flex;
    gap: 16px;
    align-items: center;
    margin-bottom: 24px;
	justify-content: space-between;

    @media(max-width: 575px) {
        flex-wrap: wrap;
        justify-content: space-between;
    }
`;
export const UserEventsBlockItemTopStatus = styled.div`
	padding: 3px 8px 5px;
	border-radius: 8px;
	color: #fff;
	font-size: 14px;
	line-height: 1.16;
	position: relative;

	span {
		color: #191921;
		border-radius: 8px;
		border: 1px solid #F5F7FA;
		background: #FFF;
		box-shadow: 0 196px 55px 0 rgba(0, 0, 0, 0.00), 0 125px 50px 0 rgba(0, 0, 0, 0.01), 0 71px 42px 0 rgba(0, 0, 0, 0.02), 0 31px 31px 0 rgba(0, 0, 0, 0.03), 0 8px 17px 0 rgba(0, 0, 0, 0.04);
		padding: 8px 16px;
		display: block;
		position: absolute;
		bottom: calc(100% + 8px);
		left: 0;
		font-size: 14px;
		opacity: 0;
		pointer-events: none;
		transition: .3s ease-in-out;
		max-width: 320px;
		width: max-content;

		@media(max-width: 575px) {
			max-width: 280px;
		}
	}
	&:hover span {
		opacity: 1;
		pointer-events: all;
	}
`;
export const UserEventsBlockItemTopPublishDate = styled.div`
	flex: 1;
	font-size: 14px; 
	line-height: 1.16;
	color: #47474D;

	@media(max-width: 575px) {
		order: 1;
		flex: 0 1 100%;
		max-width: 100%;
	}
`;
export const UserEventsBlockItemTopIcons = styled.div`
	display: flex;
	gap: 16px;

	svg {
		cursor: pointer;

		path {
			transition: .3s ease-in-out;
		}

		&:hover {

			path {
				stroke: #8553F9;
			}
		}
	}
`;
export const UserMainTitles = styled.div`
	display: flex;
    gap: 16px;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;

    @media(max-width: 575px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;
export const UserMainTitlesTitle = styled.div`
	font-family: Impact;
    font-size: 36px;
    line-height: 1.12;

    @media(max-width: 575px) {
        font-size: 28px;
    }
`;
export const UserEventNav = styled.div`
	display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 24px;
    overflow-x: auto;
`;
export const UserEventNavItem = styled.div`
	padding: 11px 16px 13px;
    color: ${({ $isActive, $isFilled, theme }) => ($isFilled ? '#fff' : $isActive ? theme.colors.purple : '#47474D')};
    font-size: 14px;
    line-height: 1.16;
    border-radius: 28px;
	background-color: ${({$isFilled, theme}) => ($isFilled && theme.colors.purple)};
    border: 2px solid ${({ $isActive, theme }) => ($isActive ? theme.colors.purple : '#D7DADD')};
    transition: ${({ theme }) => theme.transition};
    min-width: max-content;
	cursor: pointer;
`;

export const UserEventNavSeparator = styled.div`
	width: 16px;
	min-width: 16px;
	height: 2px;
	background-color: ${({ theme }) => theme.colors.purple};
	padding: 0;
	border: none;
`;
// USER STYLES END

// PageNotFound 404 START
export const PageNotFound = styled.div`
	padding: 140px 0 32px;
    background-color: #F5F7FA;
`;
export const PageNotFoundBlock = styled.div`
	display: flex;
    gap: 24px;
    align-items: center;

    @media(max-width: 799px) {
        flex-direction: column;
        text-align: center;            
    }
`;
export const PageNotFoundBlockInfo = styled.div`
	flex: 1;
`;
export const PageNotFoundBlockInfoImg = styled.div`
	font-family: Impact;
    font-size: 104px;
    line-height: 1.1;
    margin-bottom: 90px;

    @media(max-width: 1023px) {
        font-size: 80px;
    }
    @media(max-width: 991px) {
        font-size: 60px;
        margin-bottom: 24px;
    }
    @media(max-width: 575px) {
        font-size: 40px;
    }
`;
export const PageNotFoundBlockInfoTitle = styled.div`
	font-size: 24px;
    font-weight: 500;
    line-height: 1.34;
    margin-bottom: 8px;

    @media(max-width: 575px) {
        font-size: 18px;
    }
`;
export const PageNotFoundBlockInfoText = styled.div`
	font-size: 20px;
    line-height: 1.4;
    margin-bottom: 24px;

    @media(max-width: 575px) {
        font-size: 16px;
    }
`;
export const PageNotFoundBlockImg = styled.div`
	flex: 0 1 440px;
    max-width: 440px;

    @media(max-width: 460px) {
        flex: 0 1 100%;
        max-width: 100%;

        svg {
            width: 100%;
            height: auto;
        }
    }
`;
// PageNotFound 404 END

export const OrgSubtitle = styled.div`
	font-size: 20px;
	line-height: 1.4;
	text-align: center;

	span {
		color: #8553F9;
		font-weight: 500;
	}

	br {
		@media(max-width: 575px) {
			display: none;
		}
	}

	@media(max-width: 767px) {
		font-size: 16px;
		line-height: 1.22;
	}
`;

export const OrgPageTitle = styled.div`
	font-size: 36px;
	line-height: 1.12;
	font-family: Impact;
	text-align: center;
	margin-bottom: 24px;
`;

export const OrgPageSubtitle = styled.div`
	text-align: center;
	font-size: 20px;
	line-height: 1.4;
	margin-bottom: 48px;

	span {
		color: #8553F9;
		font-weight: 500;
	}

	@media(max-width: 767px) {
		font-size: 16px;
		line-height: 1.22;

		br {
			display: none;
		}
	}
`;

export const OrgPagePadding = styled.div`
	padding: 32px 0 120px;

	@media(max-width: 575px) {
		padding-bottom: 64px;
	}
`;

export const OrgPageBlock = styled.div`
	display: flex;
	justify-content: center;
	gap: 32px;
	margin-bottom: 90px;

	@media(max-width: 991px) {
		flex-wrap: wrap;
	}
`;

export const OrgPageBlockItem = styled.div`
	flex: 0 1 400px;
	max-width: 400px;
	padding: 40px 24px 24px;
	border-radius: 28px;
	border: 2px solid #8553F9;
	background-color: #F5F7FA;
	display: flex;
	flex-direction: column;

	@media(max-width: 991px) {
		flex: 0 1 100%;
		max-width: 100%;
		padding: 24px 16px;
	}
`;

export const OrgPageBlockItemTitle = styled.div`
	color: #8553F9;
	text-align: center;
	font-family: Impact;
	font-size: 28px;
	line-height: 1.34;
	margin-bottom: 24px;
`;

export const OrgPageBlockItemPrice = styled.div`
	margin-bottom: 40px;
	text-align: center;
	font-size: 28px;
	font-weight: 500;
	line-height: 1.2;
`;

export const OrgPageBlockItemList = styled.div`
	border-radius: 16px;
	background-color: #fff;
	padding: 16px 24px 24px;
	display: flex;
	flex-direction: column;
	gap: 16px;
	color: #47474D;
	margin-bottom: 40px;
	margin-top: auto;
	
	div {
		text-align: center;
		font-size: 18px;
		line-height: 1.36;
	}
	
	p {
		padding-left: 24px;
		position: relative;
		font-size: 14px;
	
		span {
			&::before {
				content: '';
				position: absolute;
				width: 16px;
				height: 16px;
				left: 0;
				top: 0;
				background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><g clip-path="url(%23clip0_9501_15213)"><path d="M16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8Z" fill="%23B3ED73"/><path fill-rule="evenodd" clip-rule="evenodd" d="M11.7783 5.74978L7.01386 11.0435L4.23438 8.26408L4.76471 7.73375L6.98523 9.95426L11.2208 5.24805L11.7783 5.74978Z" fill="%23191921"/></g><defs><clipPath id="clip0_9501_15213"><rect width="16" height="16" fill="white"/></clipPath></defs></svg>');
			}
		}

		&:not(:nth-of-type(1)) {
			span {
				&::before {
					filter: ${props => props.$index == 0 ? 'grayscale(1)' : 'grayscale(0)'};
					opacity: ${props => props.$index == 0 ? '0.5' : '1'};
				}
			}
		}
	}
`;

export const OrgPageInfo = styled.div`
	border-radius: 28px;
	border: 2px solid #8553F9;
	background-color: #F5F7FA;
	padding: 32px;
	display: flex;
	gap: 64px;
	align-items: center;

	@media(max-width: 991px) {
		flex-direction: column;
		padding: 32px 16px;
	}
`;

export const OrgPageInfoTitle = styled.div`
	font-size: 20px;
	color: #47474D;
	margin-bottom: 32px;
	line-height: 1.4;

	span {
		font-weight: bold;
		color: #8553F9;
	}

	@media(max-width: 575px) {
		font-size: 18px;
		line-height: 1.2;
	}
`;

export const OrgPageInfoText = styled.div`
	font-size: 14px;
	line-height:1.16;
	margin-bottom: 40px;
`;

export const OrgPageInfoPrice = styled.div`
	margin-bottom: 16px;
	font-size:28px;
	line-height:1.2;

	@media(max-width: 575px) {
		font-size: 24px;
	}
`;

export const OrgPageInfoImg = styled.div`
	flex: 0 1 661px;
	max-width: 661px;
	position: relative;
	margin-bottom: -102px;

	@media(max-width: 1199px) {
		flex: 0 1 500px;
		max-width: 500px;
	}
	@media(max-width: 991px) {
		flex: 0 1 100%;
		max-width: 100%;
		margin-bottom: -60px;
	}

	&::before {
		content: '';
		position: absolute;
		width: 183px;
		height: 79px;
		left: -85px;
		top: 80px;
		background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="183" height="79" viewBox="0 0 183 79" fill="none"><path d="M0.818157 37.7171C0.508037 38.1741 0.627104 38.796 1.0841 39.1061C1.54109 39.4162 2.16296 39.2972 2.47308 38.8402L0.818157 37.7171ZM119.604 32.6084L118.616 32.4522L119.604 32.6084ZM67.7535 27.8503L68.6834 28.218L67.7535 27.8503ZM183.001 78.502L179.975 67.3585L171.837 75.5509L183.001 78.502ZM2.47308 38.8402C17.8733 16.1462 48.7371 3.9118 74.978 2.8112C88.0905 2.26123 99.8952 4.50067 107.954 9.46906C111.972 11.946 115.038 15.087 116.9 18.8823C118.759 22.6722 119.45 27.1801 118.616 32.4522L120.591 32.7646C121.482 27.1347 120.757 22.2033 118.696 18.0015C116.637 13.8052 113.279 10.4018 109.004 7.76658C100.478 2.51055 88.2249 0.253837 74.8942 0.812957C48.2487 1.93053 16.6852 14.3353 0.818157 37.7171L2.47308 38.8402ZM118.616 32.4522C117.335 40.554 112.967 45.8728 107.295 48.9468C101.589 52.0394 94.5145 52.8813 87.8759 51.8739C81.2294 50.8653 75.1517 48.0239 71.3951 43.9084C67.6855 39.8443 66.1962 34.5079 68.6834 28.218L66.8235 27.4826C64.0374 34.5284 65.7268 40.6651 69.918 45.2567C74.0622 49.7969 80.6074 52.7938 87.5759 53.8513C94.5523 54.9099 102.085 54.0457 108.248 50.7051C114.446 47.346 119.209 41.5047 120.591 32.7646L118.616 32.4522ZM68.6834 28.218C70.2075 24.3637 72.3664 21.6219 75.0188 19.7974C77.6746 17.9707 80.8915 17.0181 84.6017 16.8534C92.0598 16.5224 101.382 19.3821 111.677 24.5064C132.236 34.7396 156.195 53.757 175.918 72.8762L177.31 71.4402C157.519 52.2545 133.39 33.0796 112.568 22.7159C102.173 17.5417 92.4813 14.5018 84.513 14.8554C80.51 15.033 76.9105 16.0688 73.8854 18.1496C70.8569 20.2327 68.4704 23.3177 66.8235 27.4826L68.6834 28.218Z" fill="%238553F9"/></svg>');

		@media(max-width: 991px) {
			left: 50%;
			margin-left: -85px;
			top: -60px;
		}
	}

	& > img {
		height: auto!important;
	}
`;