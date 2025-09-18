import styled from '@emotion/styled';
import Link from 'next/link';

const FooterWrapper = styled.footer`
	padding: 32px 64px;
    background-color: #191921;
    color: #fff;
    display: flex;
    justify-content: space-between;

    @media(max-width: 767px) {
        padding: 32px 16px;
        flex-direction: column;
        align-items: center;
        gap: 32px;
    }

    a {
    	color: #fff;
    }

	div:nth-of-type(3) {
		display: flex;
		gap: 16px;
	}
`

export const Footer = () => {

  return (
    <FooterWrapper>
        <div>© GoCONF 2025</div>
        <div><a href="mailto:info@goconf.ru">info@goconf.ru</a></div>
		<div><Link href="/offer">Публичная оферта</Link></div>
		<div><Link href="/privacy">Политика конфиденциальности</Link></div>
		<div><Link href="/agreement">Пользовательское соглашение</Link></div>
    </FooterWrapper>
  );
}