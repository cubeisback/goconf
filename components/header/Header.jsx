"use client"

import LogoImg from "@/public/images/svg/logo.svg";
import UserIcon from "@/public/images/svg/user.svg";
import UserIcon32 from "@/public/images/svg/user32.svg";
import NotificationIcon from "@/public/images/svg/notification.svg";
import NotificationImg from "@/public/images/svg/notification_img.svg";
import SearchIcon from "@/public/images/svg/search.svg";
import SettingsIcon from "@/public/images/svg/settings.svg";
import styled from "@emotion/styled";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Button, DoubleLink, input } from "@/styles/ui";
import { css, cx } from '@emotion/css';
import { Modal } from "@/components/ui/Modal";
import { useTheme } from "@emotion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import useWindowSizeStore from "@/store/useWindowSizeStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useAuthReady } from "@/hooks/useAuthReady";
import { useWindowSize } from "@/hooks/useWindowSize";

const HeaderBlock = styled.header`
	position: fixed;
    top: 0;
    left: 0;
    padding: 10px 64px;
    background: rgba(255, 255, 255, 0.90);
    backdrop-filter: blur(16px);
    display: flex;
    gap: 64px;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    z-index: 10;
    max-width: 100vw;

    @media(max-width: 1199px) {
    	padding: 10px 32px;
    }
    @media(max-width: 1023px) {
        padding: 10px 24px;
    }
    @media(max-width: 767px) {
        padding: 10px 16px;
    }
    @media(max-width: 575px) {
    	gap: 32px;
    }

    & > * {
        flex: 1;
    }
`
const Logo = styled.div`
	svg {
		width: 135px;
		height: 60px;
	}
	@media(max-width: 575px) { 
		svg {
			height: 48px;
			width: 108px;
		}
	}
`
const NavWrapper = styled.nav`
    display: flex;
    gap: 32px;
    transition: ${({ theme }) => theme.transition};
  	margin-left: ${({ $searchOpened }) => ($searchOpened ? "-400px" : "0")};
`
const RightSection = styled.div`
	display: flex;
    gap: 32px;
    align-items: center;
    justify-content: flex-end;

    @media(max-width: 575px) {
    	gap: 24px;
    }
`
const SearchWrapper = styled.div`
    position: relative;
    height: 48px;
    width: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const SearchBlock = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    flex: 0 1 ${({ $searchOpened }) => ($searchOpened ? '520px' : '48px')};
    max-width: ${({ $searchOpened }) => ($searchOpened ? '520px' : '48px')};
    min-width: ${({ $searchOpened }) => ($searchOpened ? '520px' : '48px')};
    height: 48px;
    border: 1px solid #EDEDEE;
    border-radius: ${({ $searchOpened }) => ($searchOpened ? '28px' : '100%')};
    cursor: pointer;
    transition: ${({ theme }) => theme.transition};
    background-color: #fff;
    padding: ${({ $searchOpened }) => ($searchOpened ? '16px 48px 16px 16px' : '0')};
    display: flex;
    align-items: center;
    justify-content: center;

    @media(max-width: 1199px) {
		flex: 0 1 ${({ $searchOpened }) => ($searchOpened ? '300px' : '48px')};
		max-width: ${({ $searchOpened }) => ($searchOpened ? '300px' : '48px')};
		min-width: ${({ $searchOpened }) => ($searchOpened ? '300px' : '48px')};
    }

`
const SearchIconWrapper = styled.div`
	position: relative;
	cursor: pointer;
	height: 20px;
`

const Burger = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 48px;
    height: 48px;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    span {
              position: absolute;
              background-color: ${({ theme }) => theme.colors.purple};
              height: 2px;
              width: 24px;
              transition: ${({ theme }) => theme.transition};

              &:nth-of-type(1) {
                opacity: ${({ $burger }) => $burger ? '0' : '1'};
                top: 18px;
              }
              &:nth-of-type(2) {
                top: 24px;
                transform: rotate(${({ $burger }) => $burger ? '45deg' : '0deg'});
              }
              &:nth-of-type(3) {
                transform: rotate(${({ $burger }) => $burger ? '-45deg' : '0deg'});
                top: 24px;
              }
              &:nth-of-type(4) {
                opacity: ${({ $burger }) => $burger ? '0' : '1'};
                top: 30px;
              }
    }
          
`

export const Header = () => {
	// const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const { ready } = useAuthReady();
	const user = useAuthStore((state) => state.user);
	useEffect(() => {
		if (!ready) return;
	
	}, [ready]);
	
	// const width = useWindowSizeStore((state) => state.width);
	const { width } = useWindowSize();
	// const theme = useTheme();

	const [notifications, setNotifications] = useState(false);
	const notificationsRef = useRef(null);
	const iconRef = useRef(null);

	const [searchOpened, setSearchOpened] = useState(false);

	const searchRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (searchRef.current && !searchRef.current.contains(event.target)) {
				setSearchOpened(false);
			}
		};
		
		document.addEventListener("mousedown", handleClickOutside);
		
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);
		
	const router = useRouter();

	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (notificationsRef.current && !notificationsRef.current.contains(event.target) &&
				iconRef.current && !iconRef.current.contains(event.target)) {
				setNotifications(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const toggleNotifications = () => {
		setNotifications(prev => !prev);
	};

	//burger menu
	const [burger, setBurger] = useState(false);


	const makeEventsBtn = () => {
		ready ? 
		router.push('/lk/events/add')
		: 
		setIsModalOpen(true)
	}
  

  return (
    <>
    <HeaderBlock>
        <Logo>
			<Link href="/">
				<LogoImg />
			</Link>
		</Logo>
        {width > 1199 &&
        <NavWrapper $searchOpened={searchOpened}>
            <Link href="/events" >
				<DoubleLink>
              		<span>Мероприятия</span><span>Мероприятия</span>
			  	</DoubleLink>
            </Link>
            <Link href="/org">
			<DoubleLink>
              <span>Организаторам</span><span>Организаторам</span>
			  </DoubleLink>
            </Link>
            <Link href="/about">
			<DoubleLink>
              <span>О&nbsp;проекте</span><span>О&nbsp;проекте</span>
			  </DoubleLink>
            </Link>
            <Link href="/faq">
			<DoubleLink>
              <span>FAQ</span><span>FAQ</span>
			  </DoubleLink>
            </Link>
        </NavWrapper>
        }
        <RightSection>
          {/* {width > 575 && 
          <SearchWrapper
          onClick={()=>{setSearchOpened(true)}}
          ref={searchRef}
          >
            <SearchBlock $searchOpened={searchOpened}>
              {searchOpened && <input type="text" placeholder="Поиск по мероприятиям" /> }
            </SearchBlock>
            
            <SearchIconWrapper onClick={()=>{searchOpened && router.push('/events')}}>
              <SearchIcon />
            </SearchIconWrapper>
            
          </SearchWrapper>
          } */}
          {width > 768 && 
            // <Link href="/lk/events/add">
              <Button onClick={()=>makeEventsBtn()}>
                <p>
                  <span>Разместить событие</span>
                  <span>Разместить событие</span>
                </p>
              </Button>
            // </Link>
          }
          {ready ?
          <>
          <div style={{cursor: 'pointer'}} ref={iconRef} onClick={toggleNotifications}>
            <NotificationIcon />
          </div>
          <Link className={css`
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 136px;
          `} href="/lk"> 
		  	{width > 575 && user?.user?.data?.display_name
			? user.user.data.display_name
			: <UserIcon32 />}
		  </Link>
          </>
          :
          <div onClick={()=>setIsModalOpen(true)} className={css`display: flex;gap:5px;align-items:center;line-height:1.28;cursor:pointer;`}>
            {width > 575 ? <UserIcon /> : <UserIcon32 /> }
            {width > 575 && 
			<DoubleLink>
				<span>Войти</span>
				<span>Войти</span>
			</DoubleLink>
			}
          </div>
          }
          {width < 1200 && 
          <Burger
			$burger={burger}
          	onClick={()=>setBurger(prev => !prev)}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </Burger>
          }
        </RightSection>
      
      <AnimatePresence>
        {notifications && 
          <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }} 
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: .3 }}
          className={css`
            position: fixed;
            right: 0;
            height: calc(100vh - 90px);
            top: 90px;
            background-color: #fff;
            padding: 16px;
            width: 100%;
            max-width: 380px;
            z-index: 9;
            border-radius: 24px;
            border: 1px solid #F5F7FA;
            box-shadow: 0px 196px 55px 0px rgba(0, 0, 0, 0.00), 0px 125px 50px 0px rgba(0, 0, 0, 0.01), 0px 71px 42px 0px rgba(0, 0, 0, 0.02), 0px 31px 31px 0px rgba(0, 0, 0, 0.03), 0px 8px 17px 0px rgba(0, 0, 0, 0.04);
            text-align: center;
          `}
          ref={notificationsRef}
          >
            <div className={css`margin-bottom: center;font-size:18px;font-weight:500;line-height:1.36;`}>Уведомления</div>
            <Link href="/lk/notifications" className={css`position:absolute;top:16px;right:16px;`} onClick={()=>setNotifications(false)}>
              <SettingsIcon />
            </Link>
            <NotificationImg className={css`margin-bottom:8px;`} />
            <div className={css`margin-bottom:8px;font-weight:500;`}>Пока нет уведомлений для отображения</div>
            <div className={css`color: #6C6C71;font-size:14px;line-height:1.16;`}>Скоро вы увидите здесь полезную информацию. Оставайтесь с нами!</div>
          </motion.div>
        }
      </AnimatePresence>

      <Modal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)} />

      
    </HeaderBlock>

    <AnimatePresence>
    {burger && 
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        transition={{ duration: .3 }}
        className={css`
          position: fixed;
          top: 0;
          left: 0;
          background: rgba(255, 255, 255, 0.90);
          backdrop-filter: blur(16px);
          width: 100vw;
          height: 100vh;
          z-index: 2;
          padding-top: 90px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-bottom: 60px;
        `}
      >
        <div className={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 32px;
          padding: 24px 16px;
        `}>
          {/* <div className={css`
                                  background-color: #fff;
                                  border-radius: 28px;
                                  padding: 14px 16px;
                                  width: 608px;
                                  font-size: 14px;
                                  line-height: 1.16;
                                  display: flex;
                                  gap: 8px;
                                  align-items: center;
                                  border: 1px solid #EDEDEE;
          
                                  @media(max-width: 640px) {
                                      width: 100%;
                                  }
                              `}>
                                  <input className={cx(input, css`padding: 0 4px;`)} type="text" placeholder='Поиск по мероприятиям' />
                                  <SearchIcon className={css`cursor: pointer;`} />
                              </div> */}
            <Link href="/events" onClick={()=>setBurger(false)}>
			<DoubleLink>
              <span>Мероприятия</span><span>Мероприятия</span>
			  </DoubleLink>
            </Link>
            <Link href="/org" onClick={()=>setBurger(false)}>
			<DoubleLink>
              <span>Организаторам</span><span>Организаторам</span>
			  </DoubleLink>
            </Link>
            <Link href="/about" onClick={()=>setBurger(false)}>
			<DoubleLink>
              <span>О&nbsp;проекте</span><span>О&nbsp;проекте</span>
			  </DoubleLink>
            </Link>
            <Link href="/faq" onClick={()=>setBurger(false)}>
			<DoubleLink>
              <span>FAQ</span><span>FAQ</span>
			  </DoubleLink>
            </Link>
        </div>
        <div className={css`
          display: flex;
          flex-direction: column;
          gap: 32px;
          align-items: center;
        `}>
          {/* <Link href="/lk/events/add"> */}
              <Button onClick={()=>makeEventsBtn()}>
                <p>
                  <span>Разместить событие</span>
                  <span>Разместить событие</span>
                </p>
              </Button>
            {/* </Link> */}
          <Link href="">Пользовательское соглашение</Link>
          <div>© GoCONF 2025</div>
        </div>
      </motion.div>
    }
    </AnimatePresence>
    
    </>
  );
}