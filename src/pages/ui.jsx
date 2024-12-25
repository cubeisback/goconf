import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { theme } from "../theme";

export const container = css`
    width: 1340px;
    margin: 0 auto;
    padding: 0 30px;
    position: relative;

    @media(max-width: 575px) {
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
    padding: 14px 32px;
    cursor: pointer;
    color: #fff;
    width: max-content;
    transition: ${props => props.theme.transition};

    &:hover {
        background: #FFF;
        color: ${props => props.theme.colors.purple};
    }
`;