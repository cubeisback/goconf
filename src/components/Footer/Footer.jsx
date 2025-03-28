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
    `}>
        <div>© GoCONF 2025</div>
        <div>info@goconf.ru</div>
        <div>Пользовательское соглашение</div>
    </footer>
  );
}