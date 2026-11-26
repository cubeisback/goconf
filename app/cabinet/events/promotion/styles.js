'use client';

import styled from '@emotion/styled';
import { Button } from '@/styles/ui';

export const Flow = styled.div`
  flex: 1; min-width: 0; padding: 24px 0 64px;
  h1 { font-family: var(--font-impact); font-size: 36px; font-weight: 400; line-height: 1.12; margin-bottom: 24px; }
  h2 { font-size: 20px; font-weight: 500; line-height: 1.4; margin: 8px 0 24px; }
  a { color: #8553f9; text-decoration: underline; }
  small { display: block; font-size: 14px; line-height: 1.16; color: #6c6c71; }
  button:disabled { cursor: default; opacity: .4; }
  input[type=checkbox], input[type=radio] { width: 24px; height: 24px; flex: 0 0 24px; accent-color: #8553f9; cursor: pointer; }
  input[type=checkbox] { appearance: none; border: 2px solid #10101033; border-radius: 6px; background: transparent; }
  input[type=checkbox]:checked { border-color: #8553f9; background: #8553f9 url('/images/svg/promotion-tick.svg') center / 24px 24px no-repeat; }
  input[type=radio] { appearance: none; border: 2px solid #10101033; border-radius: 50%; background: transparent; }
  input[type=radio]:checked { border: 6px solid #8553f9; }
  input:focus-visible, button:focus-visible { outline: 2px solid #8553f9; outline-offset: 3px; }
  input:disabled { cursor: default; }
  @media(max-width: 575px) { h1 { font-size: 28px; } h2 { font-size: 18px; } }
`;
export const PreviewNotice = styled.div`
  font-size: 13px; line-height: 1.4; color: #6c6c71; margin-bottom: 24px;
`;
export const Steps = styled.div`
  display: flex; align-items: center; gap: 8px; margin-bottom: 24px;
  span { height: 2px; width: 16px; background: #8553f9; flex-shrink: 0; }
  button { background: transparent; border: 2px solid #d7dadd; border-radius: 28px; padding: 11px 16px; color: #47474d; font-size: 14px; cursor: pointer; }
  button[data-active=true] { border-color: #8553f9; color: #8553f9; }
  button[data-complete=true] { background: #8553f9; border-color: #8553f9; color: white; }
  @media(max-width: 575px) { gap: 5px; button { padding: 10px; font-size: 12px; } span { width: 10px; } }
`;
export const Option = styled.label`
  display: flex; align-items: flex-start; gap: 12px; padding: 8px 4px; margin-bottom: 16px; cursor: pointer;
  & > div { min-width: 0; padding-top: 2px; }
  p { margin-bottom: 8px; } small + small { margin-top: 8px; }
  b { font-weight: 500; color: #191921; }
`;
export const Topics = styled.div`
  margin: -8px 0 24px 40px; padding: 20px 16px; background: #fff; border-radius: 16px;
  & > header { padding: 0 12px 16px; }
  & > header p { margin-bottom: 4px; }
  & > footer { border-top: 1px solid #c5d7ff; margin: 16px 12px 0; padding-top: 16px; }
  @media(max-width: 575px) { margin-left: 0; padding: 16px 8px; & > header { padding-left: 4px; padding-right: 4px; } }
`;
export const Topic = styled.label`
  display: flex; gap: 12px; align-items: flex-start; padding: 12px; border-radius: 8px; cursor: pointer;
  background: ${({ $selected }) => $selected ? '#f5f7fa' : '#fff'};
  opacity: ${({ $disabled }) => $disabled ? .4 : 1};
  & > div { flex: 1; min-width: 0; }
  header { display: flex; flex-wrap: wrap; gap: 8px 12px; align-items: baseline; margin-bottom: 8px; }
  strong { margin-left: auto; color: #8553f9; font-weight: 500; white-space: nowrap; }
  em { font-style: normal; font-size: 13px; border-radius: 8px; background: #c5d7ff; color: #8553f9; padding: 3px 8px; }
  small { color: ${({ $state }) => $state === 'renewal' ? '#8553f9' : $state === 'full' ? '#191921' : $state === 'last' ? '#ff5b3b' : '#64a61b'}; }
  @media(max-width: 575px) { padding: 12px 4px; strong { font-size: 14px; margin-left: 0; } }
`;
export const Receipt = styled.div`
  background: #fff; border-top: 8px solid #8553f9; padding: 24px; position: relative; margin: 16px 0 40px;
  box-shadow: 0 8px 17px #0000000a, 0 31px 31px #00000008;
  &::after { content: ''; position: absolute; height: 12px; left: 0; right: 0; bottom: -12px; background: radial-gradient(circle at 8px 12px, transparent 5px, white 5.5px) 0 0 / 16px 12px; }
  & > small { margin-bottom: 8px; }
  @media(max-width: 575px) { padding: 20px 16px; }
`;
export const ReceiptRow = styled.div`
  display: grid; grid-template-columns: minmax(0, 1fr) 150px 160px; gap: 16px; align-items: start; padding: 24px 0;
  & + & { border-top: 1px solid #f5f7fa; }
  & > div:first-of-type small { margin-top: 6px; }
  @media(max-width: 799px) { grid-template-columns: minmax(0, 1fr) 130px; & > div:first-of-type { grid-column: 1 / -1; } }
`;
export const Price = styled.div`
  text-align: right; color: #8553f9; font-weight: 500;
  del { color: #b5b7b9; font-size: 14px; font-weight: 400; display: block; }
  small { color: #191921; margin-top: 6px; font-weight: 400; }
`;
export const Term = styled.div`
  display: flex; align-items: center; justify-content: space-between; gap: 4px; border-radius: 8px; background: #f5f7fa; padding: 4px;
  button { display: flex; padding: 0; background: transparent; color: #6c6c71; cursor: pointer; }
  output { min-width: 64px; text-align: center; font-size: 14px; }
`;
export const Total = styled.div`
  text-align: right; padding-top: 24px; border-top: 1px solid #d7dadd;
  strong { color: #8553f9; font-weight: 500; }
`;
export const Actions = styled.div`
  display: flex; gap: 16px; margin: 24px 0;
  @media(max-width: 575px) { flex-direction: column-reverse; }
`;
export const Action = styled(Button)`
  &:disabled { opacity: .4; pointer-events: none; }
`;
export const Back = styled(Action)`
  background: white; color: #8553f9;
`;
export const Payment = styled.label`
  display: flex; align-items: center; gap: 12px; margin: 16px 0; cursor: pointer;
`;
export const ErrorMessage = styled.p`
  color: #d8442a; font-size: 14px; line-height: 1.4; margin: 16px 0;
`;
