import { NavLink } from "react-router";
import { ReactComponent as Logo } from '../../images/svg/logo.svg';
import styled from '@emotion/styled';
import styles from '../header/header.module.css';

const Button = styled.div`
    border-radius: 28px;
    background: #8553F9;
    border: 2px solid #8553F9;
    padding: 14px 32px;
    cursor: pointer;
    color: #fff;
    width: max-content;
    transition: .3s ease-in-out;
  
    &:hover {
        background: #FFF;
        color: #8553F9;
    }
`;


export const Header = () => {

  return (
    <header>
        <NavLink to="/"><Logo /></NavLink>
        <nav>
            <NavLink to="/events">Мероприятия</NavLink>
            <NavLink to="/">Организаторам</NavLink>
            <NavLink to="/">О&nbsp;проекте</NavLink>
            <NavLink to="/">FAQ</NavLink>
        </nav>
        <div className={styles.header_right}>
            <Button>Разместить событие</Button>
            <div>Войти</div>
        </div>
    </header>
    
  );
}