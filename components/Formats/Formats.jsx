"use client"

import { css } from '@emotion/css';
import styled from "@emotion/styled";
import { Container } from "@/styles/ui";
import { useTheme } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import axios from 'axios';
import Link from 'next/link';
import { getApiUrl } from '@/functions/functions';
import useWindowSizeStore from '@/store/useWindowSizeStore';
import SliderArrow from "@/public/images/svg/arrow.svg";

import image1 from '/public/images/formats_1.jpg'
import image2 from '/public/images/formats_2.jpg'
import image3 from '/public/images/formats_3.jpg'
import image4 from '/public/images/formats_4.jpg'
import image5 from '/public/images/formats_5.jpg'
import Image from 'next/image';

const customItems = [
  {
    image: image1,
    title: 'Маркетинг и PR'
  },
  {
    image: image2,
    title: 'IT-конференции'
  },
  {
    image: image3,
    title: 'HR-конференции'
  },
  {
    image: image4,
    title: 'Бизнес форумы'
  },
  {
    image: image5,
    title: 'Всё по менеджменту'
  },
  {
    image: image1,
    title: 'Маркетинг и PR'
  },
  {
    image: image2,
    title: 'IT-конференции'
  },
  {
    image: image3,
    title: 'HR-конференции'
  },
  {
    image: image4,
    title: 'Бизнес форумы'
  },
  {
    image: image5,
    title: 'Всё по менеджменту'
  },
]

const FormatsBlock = styled.div`
background-color: #F5F7FA;
            padding: 120px 0;
            overflow: hidden;

            @media(max-width: 575px) {
                padding: 96px 0 64px;
            }
`
const FormatsTitle = styled.div`
  font-family: Impact;
  line-height: 1.12;
  font-size: 36px;

  @media (max-width: 575px) {
    font-size: 28px;
}
`
const SliderBlockTopNav = styled.div`
	display: flex;
    gap: 16px;

    & > div {
        display: flex;
        cursor: pointer;
    }

    svg {
        @media(max-width: 575px) {
            width: 48px;
            height: 48px;
        }
    }
`
const Next = styled.div`
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
		width: 18px;
		height: 18px;
		position: relative;
		overflow: hidden;

		& > svg {
			position: absolute;
			transition: ${({theme}) => theme.transition};

			&:nth-of-type(2) {
				transform: translateX(18px);
			}
		}
	}
	
	&:hover {
		svg {
			transform: translateX(-18px);

			&:nth-of-type(2) {
				transform: translateX(0);
			}
		}
	}
`

export const Formats = () => {

  const navigationPrevRef = useRef(null);
      const navigationNextRef = useRef(null);
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
            console.log('popular-formats ', response.data)
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
              <div className={css`
                background: #fff;
                border-radius: 28px;
              `}>
                <div className={css`
                  padding: 40px;

                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  gap: 16px;

                  @media (max-width: 575px) {
                    padding: 32px 16px;
                  }
                  `}>

                
                <FormatsTitle>Популярные форматы</FormatsTitle>

                <SliderBlockTopNav>
                    <Next ref={navigationPrevRef}>
						<div>
							<SliderArrow />
							<SliderArrow />
						</div>
                    </Next>
                    <Next ref={navigationNextRef} style={{transform: 'rotate(180deg)'}}>
                        <div>
							<SliderArrow />
							<SliderArrow />
						</div>
                    </Next>
                </SliderBlockTopNav>
                </div>
            
            {
            // width > 767 ?
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
//             <div style={{minHeight: 235}}>
            
//                 {formatItems && (
//   <div className={css`
//     display: flex;
//     flex-wrap: nowrap;
//     animation: scroll-left 20s linear infinite;

//     @keyframes scroll-left {
//       0% {
//         transform: translateX(0);
//       }
//       100% {
//         transform: translateX(-50%);
//       }
//     }
//   `}>
//     {duplicatedItems.map((item, index) =>  {
//         const isLastInFirstHalf = index === Math.floor(duplicatedItems.length / 2) - 1;
//     return (
//       <Link
//         href={`/events/${item.subject ? `direction_${item.subject}/` : ''}${item.city ? `city_${item.city}/` : ''}${item.format ? `format_${item.format}/` : ''}`}
//         key={index}
//         className={css`
//           min-width: 224px;
//           max-width: 224px;
//           flex-shrink: 0;
//           border-radius: 24px;
//           overflow: hidden;
//           position: relative;
//           transition: ${theme.transition};
//            ${!isLastInFirstHalf ? 'margin-right: 24px;' : ''}

//           &:hover {
//             transform: scale(1.05);
//           }
//         `}
//       >
//         <img src={item.img} alt="" />
//         <div className={css`
//           position: absolute;
//           left: 0;
//           top: 0;
//           width: 100%;
//           height: 100%;
//           display: flex;
//           flex-direction: column;
//           justify-content: space-between;
//           padding: 16px;
//         `}>
//           <div className={css`
//             font-size: 18px;
//             color: #fff;
//             font-weight: 500;
//             line-height: 1.36;
//           `} dangerouslySetInnerHTML={{
//             __html: item.name.replace(/\r\n/g, ''),
//           }}></div>
//           <div className={css`
//             padding: 2px 4px;
//             border-radius: 4px;
//             background: rgba(255, 255, 255, 0.08);
//             backdrop-filter: blur(8px);
//             line-height: 1.28;
//             color: #fff;
//             width: max-content;
//           `}>{item.count}</div>
//         </div>
//       </Link>
      
//     )})}
//   </div>
// )}

//             </div>
//             : 
            <Swiper 
              modules={[Navigation]} 
                slidesPerView='auto'
                navigation={{
                            prevEl: navigationPrevRef.current,
                            nextEl: navigationNextRef.current,
                }}
                loop
                        onSwiper={(swiper) => {
                            setTimeout(() => {
                                if (swiper.params) {
                                  swiper.params.navigation.prevEl = navigationPrevRef.current;
                                  swiper.params.navigation.nextEl = navigationNextRef.current;
                    
                                  swiper.navigation.destroy();
                                  swiper.navigation.init();
                                  swiper.navigation.update();
                                }
                              }, 500);
                        }}
                        spaceBetween={26}

                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                            },
                            1024: {
                              slidesPerView: 3,
                            },
                        }}
                className={css`
                  padding: 0 32px 40px;
                  `}
            >
                        {/* {formatItems && formatItems.map((item, index) => ( */}
                        {customItems && customItems.map((item, index) => (
                            <SwiperSlide key={index} className={css`
                                max-width: 224px;
                                // padding: 0 10px; 
                            `}>
                            <Link 
                            href=''
                            // href={`/events/${item.subject ? `direction_${item.subject}/` : ''}${item.city ? `city_${item.city}/` : ''}${item.format ? `format_${item.format}/` : ''}`} 
                            className={css`
                                max-width: 224px;
                                // min-width: 224px;
                                overflow: hidden;
                                position: relative;
                            `}>
                                <Image src={item.image} alt="" style={{borderRadius: 24}} />
                                {/* <div className={css`
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
                                </div> */}
                                <div style={{fontSize: 18, fontWeight: 500, lineHeight: 1.36, marginTop: 16}}>{item.title}</div>
                            </Link>
                            </SwiperSlide>
                        ))}
            </Swiper>
            }
</div>
</Container>
        </FormatsBlock>
    );
}