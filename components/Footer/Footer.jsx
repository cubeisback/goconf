import styled from '@emotion/styled';

const FooterS = styled.footer`
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
`

export const Footer = () => {

  return (
    <FooterS>
        <div>© GoCONF 2025</div>
        <div><a href="mailto:info@goconf.ru">info@goconf.ru</a></div>
        <div><a href="/" target='_blank'>Пользовательское соглашение</a></div>
    </FooterS>
  );
}