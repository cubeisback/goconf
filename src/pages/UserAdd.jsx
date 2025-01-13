import { css, cx } from "@emotion/css";
import { Button, input, textarea, userMain } from "./ui";
import { motion } from 'framer-motion';
import { useState } from "react";

export const UserAdd = () => {
    const [view, setView] = useState(1);

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
            
            <div className={css`display: flex;gap:16px;align-items:center;`}>
                <Button className={cx(css`color:#8553F9!important;background-color:#fff!important;`)}>Отменить</Button>
                <Button onClick={()=>setView(2)}>Продолжить</Button>
                <div className={css`font-size: 14px;line-height: 1.16;color: #8553F9;`}>Сохранить в черновик</div>
            </div>
            
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
        </motion.div>
        
        </>
    )
};