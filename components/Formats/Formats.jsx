"use client"

import { css } from '@emotion/css';
import styled from "@emotion/styled";
import { Container } from "@/styles/ui";
import { useTheme } from '@emotion/react';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import axios from 'axios';
import Link from 'next/link';
import { getApiUrl } from '@/functions/functions';
import useWindowSizeStore from '@/store/useWindowSizeStore';

const FormatsBlock = styled.div`
background-color: #F5F7FA;
            padding: 120px 0;
            overflow: hidden;

            @media(max-width: 575px) {
                padding: 96px 0 64px;
            }
`
const FormatsTitle = styled.div`
text-align: center;
                    margin-bottom: 96px;
                    font-family: Impact;
                    font-size: 56px;
                    line-height: 1.15;

                    @media(max-width: 575px) {
                        font-size: 32px;
                    }
`

export const Formats = () => {
    const theme = useTheme();

	const width = useWindowSizeStore((state) => state.width);

    const [formatItems, setFormatItems] = useState(null)
	const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      axios
		.get(getApiUrl("/backend/wp-json/events/v2/popular-formats/"))
        .then((response) => {
            setFormatItems(response.data.items)
			setIsLoading(false)
            // console.log('popular-formats ', response.data)
        })
        .catch((error) => {
            console.log(error)
        });

    }, [])

    const duplicatedItems = formatItems
  ? Array(Math.ceil(20 / formatItems.length)).fill(formatItems).flat()
  : [];
    

    return (
        <FormatsBlock>
            <Container>
                <FormatsTitle>Популярные форматы</FormatsTitle>
            </Container>
            {width > 767 ?
			isLoading ? (
  // Скелетоны (например, 3 заглушки)
  <>
  {/* <div className={css`display: flex;
	gap: 32px;`}>
    {[...Array(3)].map((_, i) => (
      <div key={i} className={css`
	  	background: #f90;
		padding: 1rem;
		margin-bottom: 1rem;
		border-radius: 8px;
		animation: pulse 1.5s infinite;
		height: 473px;
		width: 33%;

		@keyframes pulse {
			0% { opacity: 1 }
			50% { opacity: 0.5 }
			100% { opacity: 1 }
			}
	  `}>
      </div>
    ))}
	</div> */}
  </>
) :
            <div style={{minHeight: 235}}>
            
                {formatItems && (
  <div className={css`
    display: flex;
    flex-wrap: nowrap;
    animation: scroll-left 20s linear infinite;

    @keyframes scroll-left {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }
  `}>
    {duplicatedItems.map((item, index) =>  {
        const isLastInFirstHalf = index === Math.floor(duplicatedItems.length / 2) - 1;
    return (
      <Link
        href={`/events/${item.subject ? `direction_${item.subject}/` : ''}${item.city ? `city_${item.city}/` : ''}${item.format ? `format_${item.format}/` : ''}`}
        key={index}
        className={css`
          min-width: 224px;
          max-width: 224px;
          flex-shrink: 0;
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          transition: ${theme.transition};
           ${!isLastInFirstHalf ? 'margin-right: 24px;' : ''}

          &:hover {
            transform: scale(1.05);
          }
        `}
      >
        <img src={item.img} alt="" />
        <div className={css`
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 16px;
        `}>
          <div className={css`
            font-size: 18px;
            color: #fff;
            font-weight: 500;
            line-height: 1.36;
          `} dangerouslySetInnerHTML={{
            __html: item.name.replace(/\r\n/g, ''),
          }}></div>
          <div className={css`
            padding: 2px 4px;
            border-radius: 4px;
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(8px);
            line-height: 1.28;
            color: #fff;
            width: max-content;
          `}>{item.count}</div>
        </div>
      </Link>
      
    )})}
  </div>
)}

            </div>
            : 
            <Swiper 
                loop
                slidesPerView='auto'
            >
                        {formatItems && formatItems.map((item, index) => (
                            <SwiperSlide key={index} className={css`
                                max-width: 180px;
                                padding: 0 10px; 
                            `}>
                            <Link href={`/events/${item.subject ? `direction_${item.subject}/` : ''}${item.city ? `city_${item.city}/` : ''}${item.format ? `format_${item.format}/` : ''}`} className={css`
                                max-width: 224px;
                                border-radius: 24px;
                                overflow: hidden;
                                position: relative;
                            `}>
                                <img src={item.img} alt="" />
                                <div className={css`
                                    position: absolute;
                                    left: 0;
                                    top: 0;
                                    width: 100%;
                                    height: 100%;
                                    display: flex;
                                    flex-direction: column;
                                    justify-content: space-between;
                                    padding: 16px;
                                `}>
                                    <div className={css`
                                        font-size: 18px;
                                        color: #fff;
                                        font-weight: 500;
                                        line-height: 1.36;
                                    `} dangerouslySetInnerHTML={{
                                        __html: item.name.replace(/\r\n/g, ''),
                                      }}></div>
                                    <div className={css`
                                        padding: 2px 4px;
                                        border-radius: 4px;
                                        background: rgba(255, 255, 255, 0.08);
                                        backdrop-filter: blur(8px);
                                        line-height: 1.28;
                                        color: #fff;
                                        width: max-content;
                                    `}>{item.count}</div>
                                </div>
                            </Link>
                            </SwiperSlide>
                        ))}
            </Swiper>
            }
        </FormatsBlock>
    );
}