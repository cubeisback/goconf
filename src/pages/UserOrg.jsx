import { css, cx } from "@emotion/css";
import { Button, input, textarea } from "./ui";
import { motion } from 'framer-motion';
import { useState } from "react";
import { ReactComponent as EditIcon } from '../images/svg/edit.svg';
import { ReactComponent as RemoveIcon } from '../images/svg/remove.svg';
import { ReactComponent as AvatarIcon } from '../images/svg/avatar.svg';
import org_1 from '../images/org_1.png';

export const UserOrg = () => {
    const [view, setView] = useState(1);
    const [text, setText] = useState('');

    const handleChange = (event) => {
        setText(event.target.value);
    };

    return (
        <>
        {view === 1 &&
        <motion.div className={css`
            flex: 1;
            padding-top: 24px;
        `}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: .3 }}>
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
                `}>Организаторы</div>
                <Button onClick={()=>setView(2)}>+ Добавить организатора</Button>
            </div>

            <div className={css`
                display: flex;
                flex-direction: column;
                gap: 32px;
            `}>
                <div className={css`
                    border-radius: 28px;
                    background-color: #fff;
                    box-shadow: 0px 196px 55px 0px rgba(0, 0, 0, 0.00), 0px 125px 50px 0px rgba(0, 0, 0, 0.01), 0px 71px 42px 0px rgba(0, 0, 0, 0.02), 0px 31px 31px 0px rgba(0, 0, 0, 0.03), 0px 8px 17px 0px rgba(0, 0, 0, 0.04);
                    padding: 24px 32px;
                `}>
                    <div className={css`
                        display: flex;
                        gap: 16px;
                        align-items: center;
                        justify-content: space-between;
                        margin-bottom: 24px;
                    `}>
                        <div className={css`padding: 3px 8px 5px; border-radius: 8px; color: #fff; background-color: #8553F9; font-size: 14px; line-height: 1.16;`}>На модерации</div>
                        <div className={css`display: flex; gap: 16px;`}>
                            <EditIcon />
                            <RemoveIcon />
                        </div>
                    </div>
                    <div className={css`display: flex; gap: 24px;`}>
                        <div className={css`flex: 0 1 96px;`}>
                            <img src={org_1} alt="" />
                        </div>
                        <div className={css`flex:1;`}>
                            <div className={css`font-size:20px;font-weight:500;line-height:1.4;margin-bottom: 8px;`}>ООО «ЦРБК»</div>
                            <div className={css`color: #47474D;font-size: 14px;line-height: 1.16;margin-bottom: 16px;`}>Наша команда регулярно проводит форумы, фестивали, конкурсы и конференции, объединяющие весь рекламный рынок.</div>
                            <div className={css`font-size: 14px;line-height: 1.16;`}>Мероприятия <span className={css`color: #8553F9;`}>(0)</span></div>
                        </div>
                    </div>
                </div>
                <div className={css`
                    border-radius: 28px;
                    background-color: #fff;
                    box-shadow: 0px 196px 55px 0px rgba(0, 0, 0, 0.00), 0px 125px 50px 0px rgba(0, 0, 0, 0.01), 0px 71px 42px 0px rgba(0, 0, 0, 0.02), 0px 31px 31px 0px rgba(0, 0, 0, 0.03), 0px 8px 17px 0px rgba(0, 0, 0, 0.04);
                    padding: 24px 32px;
                `}>
                    <div className={css`
                        display: flex;
                        gap: 16px;
                        align-items: center;
                        justify-content: space-between;
                        margin-bottom: 24px;
                    `}>
                        <div className={css`padding: 3px 8px 5px; border-radius: 8px; color: #fff; background-color: #8553F9; font-size: 14px; line-height: 1.16;`}>На модерации</div>
                        <div className={css`display: flex; gap: 16px;`}>
                            <EditIcon />
                            <RemoveIcon />
                        </div>
                    </div>
                    <div className={css`display: flex; gap: 24px;`}>
                        <div className={css`flex: 0 1 96px;`}>
                            <img src={org_1} alt="" />
                        </div>
                        <div className={css`flex:1;`}>
                            <div className={css`font-size:20px;font-weight:500;line-height:1.4;margin-bottom: 8px;`}>ООО «ЦРБК»</div>
                            <div className={css`color: #47474D;font-size: 14px;line-height: 1.16;margin-bottom: 16px;`}>Наша команда регулярно проводит форумы, фестивали, конкурсы и конференции, объединяющие весь рекламный рынок.</div>
                            <div className={css`font-size: 14px;line-height: 1.16;`}>Мероприятия <span className={css`color: #8553F9;`}>(3)</span></div>
                        </div>
                    </div>
                </div>
                <div className={css`
                    border-radius: 28px;
                    background-color: #fff;
                    box-shadow: 0px 196px 55px 0px rgba(0, 0, 0, 0.00), 0px 125px 50px 0px rgba(0, 0, 0, 0.01), 0px 71px 42px 0px rgba(0, 0, 0, 0.02), 0px 31px 31px 0px rgba(0, 0, 0, 0.03), 0px 8px 17px 0px rgba(0, 0, 0, 0.04);
                    padding: 24px 32px;
                `}>
                    <div className={css`
                        display: flex;
                        gap: 16px;
                        align-items: center;
                        justify-content: space-between;
                        margin-bottom: 24px;
                    `}>
                        <div className={css`padding: 3px 8px 5px; border-radius: 8px; color: #fff; background-color: #8553F9; font-size: 14px; line-height: 1.16;`}>На модерации</div>
                        <div className={css`display: flex; gap: 16px;`}>
                            <EditIcon />
                            <RemoveIcon />
                        </div>
                    </div>
                    <div className={css`display: flex; gap: 24px;`}>
                        <div className={css`flex: 0 1 96px;`}>
                            <img src={org_1} alt="" />
                        </div>
                        <div className={css`flex:1;`}>
                            <div className={css`font-size:20px;font-weight:500;line-height:1.4;margin-bottom: 8px;`}>ООО «ЦРБК»</div>
                            <div className={css`color: #47474D;font-size: 14px;line-height: 1.16;margin-bottom: 16px;`}>Наша команда регулярно проводит форумы, фестивали, конкурсы и конференции, объединяющие весь рекламный рынок.</div>
                            <div className={css`font-size: 14px;line-height: 1.16;`}>Мероприятия <span className={css`color: #8553F9;`}>(0)</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
        }

        {view === 2 && 
        <motion.div className={css`
            flex: 1;
            padding-top: 24px;
        `}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: .3 }}>
            <div className={css`
                display: flex;
                gap: 16px;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 32px;
            `}>
                <div className={css`
                    font-family: Impact;
                    font-size: 36px;
                    line-height: 1.12;
                `}>Добавить организатора</div>
            </div>

            <div className={css`margin-bottom: 24px;`}>
                <div className={css`display: flex;gap:16px;justify-content:space-between;font-size: 14px;line-height:1.16;margin-bottom:8px;`}>
                    <p className={css`color: #47474D;`}>Название</p>
                    <p className={css`color: #6C6C71;`}>Юридическое наименование вашей организации или ИП</p>
                </div>
                <input className={input} type="text" placeholder="Александр" />
            </div>

            <div className={css`display: flex;flex-direction:column;gap:8px;margin-bottom:24px;`}>
                <div className={css`color: #47474D;font-size: 14px;line-height:1.16;`}>Логотип</div>
                <AvatarIcon />
                <div className={css`color: #8553F9;font-size: 14px;line-height:1.16;`}>Выберите файл</div>
                <div>
                    <div className={css`font-size: 12px;line-height:1.2;`}>Маскимальный размер <span className={css`color: #6C6C71;`}>- 1мб</span></div>
                    <div className={css`font-size: 12px;line-height:1.2;`}>Формат <span className={css`color: #6C6C71;`}>- PNG или SVG</span></div>
                </div>
            </div>
            
            <div className={css`margin-bottom: 24px;`}>
                <div className={css`display: flex;gap:16px;justify-content:space-between;font-size: 14px;line-height:1.16;margin-bottom:8px;`}>
                    <p className={css`color: #47474D;`}>Краткое описание</p>
                    <p className={css`color: #6C6C71;`}>Используется для поисковых систем (мета-описание)</p>
                </div>
                <textarea className={textarea} name="" id="" placeholder="Александр" onChange={handleChange}></textarea>
                <div className={css`color: #6C6C71;font-size: 14px;line-height:1.16;text-align: right;margin-top: 8px;`}>{text.length} / 200</div>
            </div>

            <div className={css`
                font-family: Impact;
                font-size: 36px;
                line-height: 1.12;
                margin-bottom: 32px;
            `}>Контактные данные</div>
            <div className={css`display: flex;gap:24px;flex-wrap:wrap;margin-bottom:48px;`}>
                <div className={css`flex: 0 1 calc(50% - 12px);`}>
                    <p className={css`font-size: 14px;line-height:1.16;margin-bottom: 8px;`}>Город</p>
                    <input className={input} type="text" placeholder="Выбрать город" />
                </div>
                <div className={css`flex: 0 1 calc(50% - 12px);`}>
                    <p className={css`font-size: 14px;line-height:1.16;margin-bottom: 8px;`}>Адрес</p>
                    <input className={input} type="text" placeholder="Укажите адрес" />
                </div>
                <div className={css`flex: 0 1 calc(50% - 12px);`}>
                    <p className={css`font-size: 14px;line-height:1.16;margin-bottom: 8px;`}>E-mail</p>
                    <input className={input} type="text" placeholder="Укажите E-mail" />
                </div>
                <div className={css`flex: 0 1 calc(50% - 12px);`}>
                    <p className={css`font-size: 14px;line-height:1.16;margin-bottom: 8px;`}>Номер телефона</p>
                    <input className={input} type="text" placeholder="+7 (___) ___-__-__" />
                </div>
                <div className={css`flex: 0 1 100%;`}>
                    <p className={css`font-size: 14px;line-height:1.16;margin-bottom: 8px;`}>Адрес сайта</p>
                    <input className={input} type="text" placeholder="https://" />
                </div>
            </div>

            <div className={css`
                font-family: Impact;
                font-size: 36px;
                line-height: 1.12;
                margin-bottom: 32px;
            `}>Ссылки на соцсети</div>
            <div className={css`display: flex;gap:24px;flex-wrap:wrap;margin-bottom: 40px;`}>
                <div className={css`flex: 0 1 calc(33.333333% - 16px);`}>
                    <p className={css`font-size: 14px;line-height:1.16;margin-bottom: 8px;`}>ВКонтакте</p>
                    <input className={input} type="text" placeholder="Укажите ссылку" />
                </div>
                <div className={css`flex: 0 1 calc(33.333333% - 16px);`}>
                    <p className={css`font-size: 14px;line-height:1.16;margin-bottom: 8px;`}>Telegram</p>
                    <input className={input} type="text" placeholder="Укажите ссылку" />
                </div>
                <div className={css`flex: 0 1 calc(33.333333% - 16px);`}>
                    <p className={css`font-size: 14px;line-height:1.16;margin-bottom: 8px;`}>YouTube</p>
                    <input className={input} type="text" placeholder="Укажите ссылку" />
                </div>
            </div>

            <div className={css`display: flex;gap:16px;`}>
                <Button className={cx(css`color:#8553F9!important;background-color:#fff!important;`)}>Предпросмотр</Button>
                <Button>Сохранить</Button>
            </div>
        </motion.div>
        }

        </>
    )
}