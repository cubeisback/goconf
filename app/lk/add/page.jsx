"use client"

import Link from "next/link";

import { css, cx } from "@emotion/css";
import { Button, Container, container, input, lkContainer, textarea, userMain } from "@/styles/ui";
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from "react";
import DropdownInput from "@/components/ui/DropdownInput";
import { useTheme } from "@emotion/react";
import AvatarIcon from "@/public/images/svg/avatar.svg";
import EditIcon from "@/public/images/svg/edit.svg";
import RemoveIcon from "@/public/images/svg/remove.svg";
import { AnimatedSwitch } from "../notifications/page";
// import EditorComponent from "@/components/ui/Editor";
import img_ex_1 from '/public/images/events_1.jpg';
import LkMenu from "@/components/ui/LkMenu";
import Image from "next/image";
import { getApiUrl } from "@/functions/functions";
import axios from "axios";

const options = ['Варинат 1', 'Варинат 2', 'Варинат 3', 'Варинат 4', 'Варинат 5', 'Варинат 6'];

const UserAdd = () => {
    const [view, setView] = useState(1);

    const theme = useTheme();

    const [text, setText] = useState('');

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const [activeTab, setActiveTab] = useState(1)
        const tabItem = css`
            background-color: #fff;
            transition: ${theme.transition};
            padding: 14px 32px;
            cursor: pointer;
            border-radius: 32px;
        `;
        const tabItemActive = css`
            background-color: ${theme.colors.purple};
            color: #fff;
        `;
    
	const handleGetEventsMeta = async() => {
			const authTokenRaw = localStorage.getItem('authToken');
			const authToken = JSON.parse(authTokenRaw);
			const token = authToken?.state?.token;
	
				try {
					const response = await axios.get(
					getApiUrl("/backend/wp-json/account/v2/events/meta/"),
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
					);
					console.log('events meta', response)
					if (response.status === 200) {
						// console.log("events", response.data);
					}
				} catch (error) {
					console.error("Update password error", error);
				}
	};
	useEffect(() => {
		handleGetEventsMeta()
	}, []);

    return(
        <div className={lkContainer}>
            <Container>
                <div
                    className={css`
                    display: flex;
                    gap: 64px;
                `}>
                    <LkMenu />
                
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
                overflow-x: auto;

                div {
                    padding: 11px 16px 13px;
                    color: #47474D;
                    font-size: 14px;
                    line-height: 1.16;
                    border-radius: 28px;
                    border: 2px solid #D7DADD;
                    transition: ${theme.transition};
                    min-width: max-content;
                }
            `}>
                <div className={css`border-color: ${theme.colors.purple}!important; color: ${theme.colors.purple}!important; ${view > 1 && `background-color: ${theme.colors.purple};color:#fff!important;` }`}>Основные данные</div>
                <div className={css`width: 16px;min-width: 16px!important;height: 2px;background-color: ${theme.colors.purple};padding: 0!important;border:none!important;`}></div>
                <div className={css`
                    ${view > 1 && `color: ${theme.colors.purple}!important;border-color: ${theme.colors.purple}!important;` }
                    ${view > 2 && `background-color: ${theme.colors.purple};color:#fff!important;` }
                `}>Место и время</div>
                <div className={css`width: 16px;min-width: 16px!important;height: 2px;background-color: ${theme.colors.purple};padding: 0!important;border:none!important;`}></div>
                <div className={css`${view > 2 && `color: ${theme.colors.purple}!important;border-color: ${theme.colors.purple}!important;` }`}>Дополнительная информация</div>
            </div>

            {view === 1 && 
        <motion.div className={userMain}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: .3 }}>

            <div className={css`margin-bottom: 24px;`}>
                <div className={css`display: flex;gap:16px;justify-content:space-between;font-size: 14px;line-height:1.16;margin-bottom:8px;
                    @media(max-width: 575px) {
                        flex-direction: column;
                        gap: 8px;
                    }    
                `}>
                    <p className={css`color: #47474D;`}>Название</p>
                    <p className={css`color: #6C6C71;`}>Юридическое наименование вашей организации или ИП</p>
                </div>
                <input className={input} type="text" placeholder="Александр" />
            </div>
                        
            <div className={css`margin-bottom: 24px;`}>
                <div className={css`display: flex;gap:16px;justify-content:space-between;font-size: 14px;line-height:1.16;margin-bottom:8px;
                    @media(max-width: 575px) {
                        flex-direction: column;
                        gap: 8px;
                    }    
                `}>
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
                    color: #47474D;

                    @media(max-width: 575px) {
                        flex: 0 1 100%;
                        max-width: 100%;
                    }
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
                    <p className={css`color: #6C6C71;`}>Если вы&nbsp;ещё не&nbsp;добавили организатора, сделайте это в&nbsp;соответствующем разделе. <Link href="/lk/org" className={css`color: ${theme.colors.purple};`}>Добавить организатора</Link></p>
                </div>
                <div>
                    <p>Ссылка на сайт мероприятия</p>
                    <input className={input} type="text" placeholder="Александр" />
                    <p className={css`color: #6C6C71;`}>Добавление ссылок доступно пользователям со&nbsp;статусом <span className={css`color: ${theme.colors.font};`}>&laquo;Стандарт&raquo;</span> или <span className={css`color: ${theme.colors.font};`}>&laquo;Бизнес&raquo;</span>. <Link href='' className={css`color: ${theme.colors.purple};`}>Сменить статус</Link></p>
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

                @media(max-width: 1199px) {
                    flex-direction: column;
                }
            `}>
                <div className={css`
                    flex: 0 1 336px;
                    max-width: 336px;
                    font-size: 14px;
                    line-height: 1.16;

                    @media(max-width: 1199px) {
                        flex: 0 1 100%;
                        max-width: 100%;
                    }
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

                @media(max-width: 575px) {
                    flex-direction: column;
                }

                & > div {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    flex: 0 1 calc(50% - 12px);
                    max-width: calc(50% - 12px);

                    @media(max-width: 575px) {
                        flex: 0 1 100%;
                        max-width: 100%;
                    }
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
                    <p className={css`color: #6C6C71;`}>Публикация нескольких мероприятий доступна пользователям со&nbsp;статусом <span className={css`color: ${theme.colors.font};`}>&laquo;Бизнес&raquo;</span>. <Link href='' className={css`color: ${theme.colors.purple};`}>Сменить статус</Link></p>
                </div>
            </div>

            <div className={css`
                margin-bottom: 32px;
                font-family: Impact;
                font-size: 28px;
                line-height: 1.2;
            `}>Описание</div>

            {/* <EditorComponent /> */}
			<p>EDITOR</p>
            
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
            <div className={css`
                display: flex;
                gap: 4px;
                padding: 4px;
                background-color: #fff;
                border-radius: 28px;
                max-width: max-content;
                margin-bottom: 32px;

                @media(max-width: 575px) {
                    flex-direction: column;
                    max-width: 100%;
                }
            `}>
                <div className={cx(tabItem, activeTab === 1 && tabItemActive)} onClick={()=>setActiveTab(1)}>Оффлайн</div>
                <div className={cx(tabItem, activeTab === 2 && tabItemActive)} onClick={()=>setActiveTab(2)}>Онлайн</div>
            </div>
            <AnimatePresence>
                {activeTab === 1 ? (
                    <motion.div
                        key="tab1"
                        initial={{opacity: 0, y: 40}}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .3 }}
                    >
                        <div className={css`
                            display: flex;
                            flex-wrap: wrap;
                            gap: 24px;
                            margin-bottom: 48px;
                            font-size: 14px;

                            & > div {
                                flex: 0 1 calc(33.333333% - 16px);
                                max-width: calc(33.333333% - 16px);
                                display: flex;
                                flex-direction: column;
                                gap: 8px;
                                color: #47474D;

                                @media(max-width: 575px) {
                                    flex: 0 1 100%;
                                    max-width: 100%;
                                }
                            }
                        `}>
                            <div className={css`
                                flex: 0 1 calc(50% - 12px)!important;
                                max-width: calc(50% - 12px)!important;

                                @media(max-width: 575px) {
                                    flex: 0 1 100%!important;
                                    max-width: 100%!important;
                                }
                            `}>
                                <p>Город</p>
                                <DropdownInput options={options} placeholder={'Выбрать город'} />
                            </div>
                            <div className={css`
                                flex: 0 1 calc(50% - 12px)!important;
                                max-width: calc(50% - 12px)!important;

                                @media(max-width: 575px) {
                                    flex: 0 1 100%!important;
                                    max-width: 100%!important;
                                }
                            `}>
                                <p>Адрес</p>
                                <input className={input} type="text" placeholder="Укажите адрес" />
                            </div>
                            <div>
                                <p>Дата начала</p>
                                <input className={input} type="text" placeholder="Дата начала" />
                            </div>
                            <div>
                                <p>Дата окончания</p>
                                <input className={input} type="text" placeholder="Дата окончания" />
                            </div>
                            <div>
                                <p>Время начала</p>
                                <input className={input} type="text" placeholder="Время начала" />
                            </div>
                        </div>
                    </motion.div>
                    ) : (
                    <motion.div
                        key="tab2"
                        initial={{opacity: 0, y: 40}}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .3 }}
                    >
                        <div className={css`
                            display: flex;
                            flex-wrap: wrap;
                            gap: 24px;
                            margin-bottom: 48px;
                            font-size: 14px;

                            & > div {
                                flex: 0 1 calc(33.333333% - 16px);
                                max-width: calc(33.333333% - 16px);
                                display: flex;
                                flex-direction: column;
                                gap: 8px;
                                color: #47474D;

                                @media(max-width: 575px) {
                                    flex: 0 1 100%;
                                    max-width: 100%;
                                }
                            }
                        `}>
                            <div>
                                <p>Дата начала</p>
                                <input className={input} type="text" placeholder="Дата начала" />
                            </div>
                            <div>
                                <p>Дата окончания</p>
                                <input className={input} type="text" placeholder="Дата окончания" />
                            </div>
                            <div>
                                <p>Время начала</p>
                                <input className={input} type="text" placeholder="Время начала" />
                            </div>
                            <div className={css`
                                flex: 0 1 100%!important;
                                max-width: 100%!important;
                            `}>
                                <p>Ссылка на трансляцию</p>
                                <input className={input} type="text" placeholder="https://" />
                                <p className={css`color: #6C6C71;`}>Добавление ссылок доступно пользователям со&nbsp;статусом <span className={css`color: ${theme.colors.font};`}>&laquo;Стандарт&raquo;</span> или <span className={css`color: ${theme.colors.font};`}>&laquo;Бизнес&raquo;</span>. <Link href='' className={css`color: ${theme.colors.purple};`}>Сменить статус</Link></p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
        }

        {view === 3 && 
        <>
            <div className={css`
                margin-bottom: 8px;
                font-family: Impact;
                font-size: 28px;
                line-height: 1.2;
            `}>Галерея</div>
            <div className={css`
                margin-bottom: 24px;

                & > p {
                    font-size: 12px;
                    color: #6C6C71;

                    span {
                        color: ${theme.colors.font};
                    }
                }
            `}>
                <p><span>Разрешение</span>&nbsp;&mdash; не&nbsp;более 9&nbsp;фотографий</p>
                <p><span>Формат</span>&nbsp;&mdash; PNG или JPEG, рекомендуемое разрешение&nbsp;&mdash; 900&times;600</p>
            </div>
            <div className={css`
                    display: flex;
                    flex-wrap: wrap;
                    gap: 24px;
                    margin-bottom: 40px;

                    & > div {
                        flex: 0 1 calc(33.33333% - 16px);
                        max-width: calc(33.333333% - 16px);

                        @media(max-width: 575px) {
                            flex: 0 1 100%;
                            max-width: 100%;
                        }

                        img {
                            border-radius: 16px;
                            margin-bottom: 8px;
							object-fit: cover;
                        }
                        
                        div {
                            display: flex;
                            justify-content: space-between;
                            gap: 8px;
                            align-items: center;
                        }
                    }
                `}>
                    <div>
						<Image src={img_ex_1} alt="" />
                        <div>
                            <div className={css`font-size: 12px;color:#6C6C71;line-height: 1.2;`}>998.05 кб</div>
                            <div>
                                <EditIcon />
                                <RemoveIcon />
                            </div>
                        </div>
                    </div>
                    <div>
                        <Image src={img_ex_1} alt="" />
                        <div>
                            <div className={css`font-size: 12px;color:#6C6C71;line-height: 1.2;`}>998.05 кб</div>
                            <div>
                                <EditIcon />
                                <RemoveIcon />
                            </div>
                        </div>
                    </div>
                    <div>
                        <Image src={img_ex_1} alt="" />
                        <div>
                            <div className={css`font-size: 12px;color:#6C6C71;line-height: 1.2;`}>998.05 кб</div>
                            <div>
                                <EditIcon />
                                <RemoveIcon />
                            </div>
                        </div>
                    </div>
                    <div>
                        <Image src={img_ex_1} alt="" />
                        <div>
                            <div className={css`font-size: 12px;color:#6C6C71;line-height: 1.2;`}>998.05 кб</div>
                            <div>
                                <EditIcon />
                                <RemoveIcon />
                            </div>
                        </div>
                    </div>
                    <div>
                        <Image src={img_ex_1} alt="" />
                        <div>
                            <div className={css`font-size: 12px;color:#6C6C71;line-height: 1.2;`}>998.05 кб</div>
                            <div>
                                <EditIcon />
                                <RemoveIcon />
                            </div>
                        </div>
                    </div>
                </div>
            <Button className={cx(css`color:#8553F9!important;background-color:#fff!important;margin-bottom: 48px;`)} >+ Добавить изображение</Button>

            <div className={css`
                margin-bottom: 8px;
                font-family: Impact;
                font-size: 28px;
                line-height: 1.2;
            `}>Видео</div>
            <div className={css`
                margin-bottom: 16px;
                font-size: 12px;
            `}>Вы можете добавить Iframe с Ютуба или ВК</div>
            <textarea className={cx(textarea, css`margin-bottom: 40px;`)} name="" id="" placeholder="https://" ></textarea>
        </>
        }

        <div className={css`
            display: flex;
            gap:16px;
            align-items:center;

            @media(max-width: 575px) {
                flex-direction: column;
            }
        `}>
            <Button className={cx(css`color:#8553F9!important;background-color:#fff!important;`)} onClick={()=>{view > 1 && setView(prev => prev - 1)}}>Отменить</Button>
            <Button onClick={()=>{view < 3 && setView(prev => prev + 1)}}> {view > 2 ? 'Опубликовать' : 'Продолжить'}</Button>
            <div className={css`font-size: 14px;line-height: 1.16;color: #8553F9;`}>Сохранить в черновик</div>
        </div>
        </motion.div>
        
        </div>
            </Container>
        </div>
    )
};

export default UserAdd;