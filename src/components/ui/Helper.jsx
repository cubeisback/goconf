import { css } from '@emotion/css';

export const Helper = (props) => {

  return (
    <div className={css`
        position: fixed;
        bottom: 0;
        right: 0;
        padding: 8px;
        background: #fff;
        max-width: 300px;
    `}>
        {props.children}
    </div>
  );
}