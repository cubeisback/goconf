import { css } from '@emotion/css';

export const Footer = () => {

  return (
    <footer className={css`
      padding: 32px 64px;
      background-color: #191921;
      color: #fff;
      display: flex;
      justify-content: space-between;
    `}>
        <div>© GoCONF 2024</div>
        <div>info@goconf.ru</div>
        <div>Пользовательское соглашение</div>
    </footer>
  );
}