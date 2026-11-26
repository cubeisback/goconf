'use client';

import styled from '@emotion/styled';
import { OrgPageInfoImg } from '@/styles/ui';

export const PromotionImage = styled(OrgPageInfoImg)`
  flex: 0 0 50%;
  max-width: none;
  margin-bottom: 0;

  &::before {
    display: ${({ $arrow }) => $arrow ? 'block' : 'none'};
    z-index: 1;
    background-image: url('/images/svg/about-promotion-arrow.svg');
    background-repeat: no-repeat;
    background-size: contain;
    width: 187px;
    height: 60px;
    transform: rotate(15deg);
  }

  @media(max-width: 1199px) { flex: 0 0 50%; max-width: none; }
  @media(max-width: 991px) { flex: none; width: 100%; max-width: none; margin-bottom: 0; }
`;

export const PromotionImageFrame = styled.div`
  width: 100%;
  aspect-ratio: 605 / 386;
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  background: #fff;
  box-shadow: 0 4px 10px #0000001a, 0 18px 18px #00000017, 0 40px 24px #0000000d, 0 71px 28px #00000003;

  & > img {
    position: absolute;
    max-width: none;
    height: auto;
    width: ${({ $interesting }) => $interesting ? '100.27%' : '100%'};
    left: ${({ $interesting }) => $interesting ? '-0.13%' : '0'};
    top: ${({ $interesting }) => $interesting ? '-20.51%' : '-8.55%'};
  }
`;
