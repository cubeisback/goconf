import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { theme } from "../theme";

export const container = css`
    width: 1340px;
    margin: 0 auto;
    padding: 0 30px;
    position: relative;

    @media(max-width: 1339px) {
        width: 100%;
        padding: 0 15px;
    }
`;

export const DoubleLink = css`
    color: #191921;
    line-height: 1.28;
    overflow: hidden;
    height: 20px;

    span {
        display: block;
        transition: ${theme.transition};

        &:nth-of-type(2) {
            color: ${theme.colors.purple};
        }
    }

    &:hover {
        span {
            transform: translateY(-100%);
        }
    }
`;

export const Button = styled.div`
    border-radius: 28px;
    background: ${props => props.theme.colors.purple};
    border: 2px solid ${props => props.theme.colors.purple};
    padding: 12px 32px;
    cursor: pointer;
    text-align: center;
    color: #fff;
    width: max-content;
    transition: ${props => props.theme.transition};

    &:hover {
        background: #FFF;
        color: ${props => props.theme.colors.purple};
    }
`;

export const inputItem = css`
    flex: 0 1 calc(50% - 12px);
    max-width: calc(50% - 12px);
    display: flex;
    flex-direction: column;
    gap: 8px;

    @media(max-width: 575px) {
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
        color: rgba(71, 71, 77, .64);
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
        color: rgba(71, 71, 77, .64);
    }
`; 

export const filterSelector = css`
    flex: 0 1 calc(16.666666% - 13.333333px);
    max-width: calc(16.666666% - 13.333333px);
    padding: 14px;
    background-color: #fff;
    border-radius: 28px;
    color: rgba(71, 71, 77, .64);
    font-size: 14px;
    line-height: 1.28;
    position: relative;

    @media(max-width: 1339px) {
        flex: 0 1 calc(33.3333333% - 10.666666px);
        max-width: calc(33.3333333% - 10.666666px);
    }
    @media(max-width: 575px) {
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
        box-shadow: 0px 196px 55px 0px rgba(0, 0, 0, 0.00), 0px 125px 50px 0px rgba(0, 0, 0, 0.01), 0px 71px 42px 0px rgba(0, 0, 0, 0.02), 0px 31px 31px 0px rgba(0, 0, 0, 0.03), 0px 8px 17px 0px rgba(0, 0, 0, 0.04);
        width: 100%;
        left: 0;
        top: calc(100% + 4px);
        
        p {
            padding: 12px 16px;
            cursor: pointer;
            transition: ${theme.transition};

            &:hover {
                color: ${theme.colors.purple};
            }
        }
    }
`;

export const filterBtn = css`
    background-color: ${theme.colors.font};
    color: #fff;
    text-align: center;
    font-size: 16px;
    padding: 14px 32px;
    border-radius: 28px;
    cursor: pointer;
    flex: 1;
`;


export const pagePromo = css`
    background-color: #F5F7FA;
    padding: 120px 0 32px;
`;

export const breadcrumbs = css`
    margin-bottom: 16px;
    display: flex;
    gap: 6px;

    @media(max-width: 575px) {
        margin-bottom: 32px;
    }

    a {
        font-size: 14px;
        color: #B5B7B9;
        line-height: 1.16;

        &::after {
            content: '/';
            padding-left: 6px;
        }
    }

    p {
        color: #6C6C71;
        font-size: 14px;
        line-height: 1.16;
    }
`;

export const pageTitle = css`
    margin-bottom: 24px;
    font-family: Impact;
    font-size: 56px;
    line-height: 1.15;
    font-weight: normal;

    @media(max-width: 575px) {
        font-size: 32px;
    }
`;

export const userMain = css`
    flex: 1;
    padding-top: 24px;

    @media(max-width: 1023px) {
        width: 100%;
    }
`;