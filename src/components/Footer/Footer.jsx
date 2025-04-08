import { css } from '@emotion/css';

export const Footer = () => {

  return (
    <footer className={css`
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
    `}>
        <div>© GoCONF 2025</div>
        <div><a href="mailto:info@goconf.ru">info@goconf.ru</a></div>
        <div><a href="/" target='_blank'>Пользовательское соглашение</a></div>
    </footer>
  );
}