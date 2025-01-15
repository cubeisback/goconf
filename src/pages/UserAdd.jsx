import { css, cx } from "@emotion/css";
import { Button, input, textarea, userMain } from "./ui";
import { motion } from 'framer-motion';
import { useState } from "react";
import DropdownInput from "../components/ui/DropdownInput";
import { NavLink } from "react-router";
import { useTheme } from "@emotion/react";
import { ReactComponent as AvatarIcon } from '../images/svg/avatar.svg';
import { AnimatedSwitch } from "./UserNotifications";
import EditorComponent from "../components/ui/Editor";

const options = ['Варинат 1', 'Варинат 2', 'Варинат 3', 'Варинат 4', 'Варинат 5', 'Варинат 6'];

export const UserAdd = () => {
    const [view, setView] = useState(1);

    const theme = useTheme();

    const [text, setText] = useState('');

    const handleChange = (event) => {
        setText(event.target.value);
    };
    

    return(
        <>
        <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: .3 }}
        className={userMain}
        >
        <div className={css`
                display: flex;
                gap: 16px;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 24px;
            `}>
                <div className={css`
                    font-family: Impact;
                    font-size: 36px;
                    line-height: 1.12;
                `}>Добавить событие</div>
            </div>

            <div className={css`
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 24px;

                div {
                    padding: 11px 16px 13px;
                    color: #47474D;
                    font-size: 14px;
                    line-height: 1.16;
                    border-radius: 28px;
                    border: 2px solid #D7DADD;
                }
            `}>
                <div className={css`border-color: #8553F9!important;`}>Основные данные</div>
                <div className={css`width: 16px;height: 2px;background-color: #8553F9;padding: 0!important;border:none!important;`}></div>
                <div>Место и время</div>
                <div className={css`width: 16px;height: 2px;background-color: #8553F9;padding: 0!important;border:none!important;`}></div>
                <div>Дополнительная информация</div>
            </div>

            {view === 1 && 
        <motion.div className={userMain}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: .3 }}>

            <div className={css`margin-bottom: 24px;`}>
                <div className={css`display: flex;gap:16px;justify-content:space-between;font-size: 14px;line-height:1.16;margin-bottom:8px;`}>
                    <p className={css`color: #47474D;`}>Название</p>
                    <p className={css`color: #6C6C71;`}>Юридическое наименование вашей организации или ИП</p>
                </div>
                <input className={input} type="text" placeholder="Александр" />
            </div>
                        
            <div className={css`margin-bottom: 24px;`}>
                <div className={css`display: flex;gap:16px;justify-content:space-between;font-size: 14px;line-height:1.16;margin-bottom:8px;`}>
                    <p className={css`color: #47474D;`}>Краткое описание для анонса</p>
                    <p className={css`color: #6C6C71;`}>Максимальное количество символов - 200</p>
                </div>
                <textarea className={textarea} name="" id="" placeholder="Александр" onChange={handleChange}></textarea>
                <div className={css`color: #6C6C71;font-size: 14px;line-height:1.16;text-align: right;margin-top: 8px;`}>{text.length} / 200</div>
            </div>

            <div className={css`
                display: flex;
                flex-wrap: wrap;
                gap: 24px;
                margin-bottom: 48px;
                font-size: 14px;

                & > div {
                    flex: 0 1 calc(50% - 12px);
                    max-width: calc(50% - 12px);
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
            `}>
                <div>
                    <p>Тематика мероприятия</p>
                    <DropdownInput options={options} placeholder={'Выбрать тематику'} />
                </div>
                <div>
                    <p>Формат мероприятия</p>
                    <DropdownInput options={options} placeholder={'Выбрать формат'} />
                </div>
                <div>
                    <p>Организатор</p>
                    <DropdownInput options={options} placeholder={'Выбрать организатора'} />
                    <p className={css`color: #6C6C71;`}>Если вы&nbsp;ещё не&nbsp;добавили организатора, сделайте это в&nbsp;соответствующем разделе. <NavLink to="/lk/org" className={css`color: ${theme.colors.purple};`}>Добавить организатора</NavLink></p>
                </div>
                <div>
                    <p>Ссылка на сайт мероприятия</p>
                    <input className={input} type="text" placeholder="Александр" />
                    <p className={css`color: #6C6C71;`}>Добавление ссылок доступно пользователям со&nbsp;статусом <span className={css`color: ${theme.colors.font};`}>&laquo;Стандарт&raquo;</span> или <span className={css`color: ${theme.colors.font};`}>&laquo;Бизнес&raquo;</span>. <NavLink className={css`color: ${theme.colors.purple};`}>Сменить статус</NavLink></p>
                </div>
            </div>

            <div className={css`
                margin-bottom: 32px;
                font-family: Impact;
                font-size: 28px;
                line-height: 1.2;
            `}>Изображение</div>

            <div className={css`
                display: flex;
                gap: 64px;
                margin-bottom: 48px;
            `}>
                <div className={css`
                    flex: 0 1 336px;
                    max-width: 336px;
                    font-size: 14px;
                    line-height: 1.16;
                `}>
                    <div className={css`color: #47474D;margin-bottom: 4px;`}>Изображение для анонса</div>
                    <div className={css`color: #6C6C71;margin-bottom: 16px;`}>Изображение в&nbsp;ленте мероприятий</div>
                    <div className={css`background-color: #fff;border-radius: 24px;display: flex;align-items:center;justify-content: center;height: 226px;margin-bottom: 8px;`}>
                        <AvatarIcon />
                    </div>
                    <div className={css`color: ${theme.colors.purple};margin-bottom: 8px;`}>Загрузить</div>
                    <div className={css`font-size: 12px; color: #6C6C71; span {color: ${theme.colors.font};}`}>
                        <p><span>Разрешение</span>&nbsp;&mdash; 400&times;270 пикселей</p>
                        <p><span>Формат</span>&nbsp;&mdash; PNG или JPEG</p>
                    </div>
                </div>
                <div className={css`
                    flex: 1;
                    font-size: 14px;
                    line-height: 1.16;
                `}>
                    <div className={css`color: #47474D;margin-bottom: 4px;`}>Широкое изображение на&nbsp;странице события</div>
                    <div className={css`color: #6C6C71;margin-bottom: 16px;`}>Изображение на&nbsp;внутренней странице мероприятия</div>
                    <div className={css`background-color: #fff;border-radius: 24px;display: flex;align-items:center;justify-content: center;height: 226px;margin-bottom: 8px;`}>
                        <AvatarIcon />
                    </div>
                    <div className={css`color: ${theme.colors.purple};margin-bottom: 8px;`}>Загрузить</div>
                    <div className={css`font-size: 12px; color: #6C6C71; span {color: ${theme.colors.font};}`}>
                        <p><span>Разрешение</span>&nbsp;&mdash; 960&times;420 пикселей</p>
                        <p><span>Формат</span>&nbsp;&mdash; PNG или JPEG</p>
                    </div>
                </div>
            </div>
            
            <div className={css`
                margin-bottom: 32px;
                font-family: Impact;
                font-size: 28px;
                line-height: 1.2;
            `}>Стоимость</div>

            <div className={css`
                display: flex;
                gap: 24px;
                font-size: 14px;
                margin-bottom: 48px;

                & > div {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    flex: 0 1 calc(50% - 12px);
                    max-width: calc(50% - 12px);
                }
            `}>
                <div>
                    <p>Стоимость участия</p>
                    <div className={css`display: flex;gap:8px;align-items: center;`}>
                        <input className={input} type="text" placeholder="Введите стоимость" />
                        <p className={css`color: #47474D;`}>руб.</p>
                    </div>
                    <AnimatedSwitch label="Бесплатное участие" initialChecked={false} />
                </div>
                <div>
                    <p>Статус мероприятия</p>
                    <DropdownInput options={options} placeholder={'Выбрать организатора'} />
                    <p className={css`color: #6C6C71;`}>Публикация нескольких мероприятий доступна пользователям со&nbsp;статусом <span className={css`color: ${theme.colors.font};`}>&laquo;Бизнес&raquo;</span>. <NavLink className={css`color: ${theme.colors.purple};`}>Сменить статус</NavLink></p>
                </div>
            </div>

            <div className={css`
                margin-bottom: 32px;
                font-family: Impact;
                font-size: 28px;
                line-height: 1.2;
            `}>Описание</div>

            <EditorComponent />
            
        </motion.div>
        }
        {view === 2 && 
        <motion.div className={userMain}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: .3 }}>
            <div className={css`
                display: flex;
                gap: 16px;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 24px;
            `}><div className={css`
                font-family: Impact;
                font-size: 36px;
                line-height: 1.12;
            `}>Формат события</div></div>
        </motion.div>
        }

        <div className={css`display: flex;gap:16px;align-items:center;`}>
            <Button className={cx(css`color:#8553F9!important;background-color:#fff!important;`)} onClick={()=>{view > 1 && setView(prev => prev - 1)}}>Отменить</Button>
            <Button onClick={()=>{view < 4 && setView(prev => prev + 1)}}>Продолжить</Button>
            <div className={css`font-size: 14px;line-height: 1.16;color: #8553F9;`}>Сохранить в черновик</div>
        </div>
        </motion.div>
        
        </>
    )
};