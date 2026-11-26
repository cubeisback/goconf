'use client';

import styled from '@emotion/styled';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { Modal } from '@/components/ui/Modal';
import { PromotionImage, PromotionImageFrame } from './PromotionImage';
import { Button, OrgPageInfo, OrgPageInfoTitle, OrgPageInfoText, OrgPageInfoPrice } from '@/styles/ui';

const Card = styled(OrgPageInfo)`
  margin-top: 32px;
  & > div:first-of-type { flex: 1; min-width: 0; }
`;

const Benefits = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
  li { display: flex; align-items: flex-start; gap: 8px; }
  img { flex: 0 0 16px; }
`;

export default function PinnedPromotion() {
  const token = useAuthStore(state => state.token);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card data-promotion="pinned">
        <div>
          <OrgPageInfoTitle>
            Закрепление события в списке<br />
            <span>«Первая строка в вашей тематике»</span>
          </OrgPageInfoTitle>
          <OrgPageInfoText>
            <p>Событие встаёт на первую позицию в выбранной тематике и остаётся там весь срок размещения — выше остальных и независимо от даты проведения. Карточка отмечается меткой «Продвигается» и выделяется фоном, поэтому её замечают даже при беглом просмотре списка.</p>
            <Benefits>
              {[
                'Первая позиция в выбранной тематике',
                'Заметное выделение карточки и метка «Продвигается»',
                'Не более трёх закреплённых событий в тематике',
              ].map(text => <li key={text}><img src="/images/svg/promotion-check.svg" width="16" height="16" alt="" /><span>{text}</span></li>)}
            </Benefits>
          </OrgPageInfoText>
          <OrgPageInfoPrice>от 1 000 Р. / неделю</OrgPageInfoPrice>
          <Button $button onClick={() => token ? router.push('/cabinet/events') : setIsModalOpen(true)}>
            <p><span>Попробовать</span><span>Попробовать</span></p>
          </Button>
        </div>
        <PromotionImage><PromotionImageFrame><img src="/images/about-pinned-events.png" alt="Пример закреплённого события в списке мероприятий" /></PromotionImageFrame></PromotionImage>
      </Card>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
