"use client"

import Link from "next/link";

import { css, cx } from "@emotion/css";
import { Button, input, textarea, UserEventNav, UserEventNavItem, UserEventNavSeparator, UserMain, UserMainTitles, UserMainTitlesTitle } from "@/styles/ui";
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from "react";
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
import EventDropdown from "./EventDropdown";
import { useAuthStore } from "@/store/useAuthStore";

const options = ['Варинат 1', 'Варинат 2', 'Варинат 3', 'Варинат 4', 'Варинат 5', 'Варинат 6'];

const EventAdd = ({setBack, id}) => {
	const token = useAuthStore((state) => state.token);
    const [view, setView] = useState(1);

    const theme = useTheme();

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

	const [metaParameters, setMetaParameters] = useState(null)
	const handleGetEventsMeta = async() => {
	
				try {
					const response = await axios.get(
					getApiUrl("/backend/wp-json/account/v2/events/meta/"),
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
					);
					console.log('events meta', response.data)
					if (response.status === 200) {
						setMetaParameters(response.data)
						// console.log("events", response.data);
					}
				} catch (error) {
					console.error("Update password error", error);
				}
	};

	useEffect(()=>{
		// console.log('города', metaParameters?.cities)
	}, [metaParameters])

	// https://dev.goconf.ru/wp-json/account/v2/events/editor/
	// https://dev.goconf.ru/wp-json/account/v2/events/get_edit/
	const [dataEvent, setDataEvent] = useState({
		name: '',
		date_start: '',
		date_end: '',
		address: '',
		anons: {},
		city: {},
		content: '',
		cost: '',
		cover: {},
		format: [],
		free: false,
		gallery: [],
		link: '',
		online: false,
		organizator: null,
		short_text: '',
		subject: [],
		time_start: '',
		video: ''
	})

	const handleDataEventChange = (e) => {
		const { name, value, type, checked } = e.target;

		setDataEvent((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	const handleDataEventChangeSubject = (subjectItem) => {
		setDataEvent((prev) => {
			const exists = prev.subject.some(item => item.id === subjectItem.id);

			return {
				...prev,
				subject: exists
					? prev.subject.filter(item => item.id !== subjectItem.id) // удалить
					: [...prev.subject, subjectItem] // добавить
			};
		});
	};

	const handleDataEventChangeFormat = (formatItem) => {
		setDataEvent((prev) => {
			const exists = prev.format.some(item => item.id === formatItem.id);

			return {
				...prev,
				format: exists
					? prev.format.filter(item => item.id !== formatItem.id) // удалить
					: [...prev.format, formatItem] // добавить
			};
		});
	};

	const handleDataEventChangeFree = (value) => {
		setDataEvent((prev) => ({
			...prev,
			free: value,
		}));
	};

	

	const handleAddEventSubmit = async() => {
		try {
			const response = await axios.post(
			getApiUrl("/backend/wp-json/account/v2/events/editor/"),
			{
				...(id ? { id } : {}),
				data: dataEvent
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
			);
			console.log("editor ", response);
		} catch (error) {
			console.error(error);
		}
		console.log(dataEvent)
	}

	useEffect(() => {
		handleGetEventsMeta()
	}, []);

	useEffect(() => {
		id && dfsdfsdfsd2(id)
	}, [id]);
	


	const dfsdfsdfsd2 = async(id) => {
		console.log("dsfsjdhfds ID ID ", id)
		try {
			const response = await axios.get(
			getApiUrl(`/backend/wp-json/account/v2/events/get_edit/?id=${id}`),
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
			);
			console.log("get edit info ", response);
			if (response.status === 200) {
				setDataEvent(response.data.data)
			}
		} catch (error) {
			console.error(error);
		}
	}

	// https://dev.goconf.ru/wp-json/images/v2/upload/ 
	// const addPreviewImage = async (e) => {
	// 	try {
	// 		const file = e.target.files[0]; // получаем файл из инпута

	// 		const formData = new FormData();
	// 		formData.append('file', file); // имя 'file' должно совпадать с тем, что ожидает бекенд

	// 		const response = await axios.post(
	// 			getApiUrl('/backend/wp-json/account/images/v2/upload'),
	// 			formData,
	// 			{
	// 				headers: {
	// 					Authorization: `Bearer ${token}`,
	// 					// Не указывай Content-Type, axios сам установит boundary для multipart/form-data
	// 				},
	// 			}
	// 		);

	// 		console.log("get edit info ", response);
	// 		if (response.status === 200) {
	// 			setDataEvent(response.data.data);
	// 		}
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };
	const inputRef = useRef(null);
	const [selectedFile, setSelectedFile] = useState(null);

	const handleButtonClick = () => {
		// Открытие диалога выбора файла
		inputRef.current?.click();
	};

	const handleFileChange = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		setSelectedFile(file); // если хочешь отобразить превью и т.д.

		const formData = new FormData();
		formData.append('file', file);
		// [...formData.entries()].forEach(([key, value]) => {
		// 	console.log('Ключ:', key);
		// 	console.log('Значение:', value);
		// });

		try {
			const response = await axios.post(
				getApiUrl('/backend/wp-json/images/v2/upload'),
				formData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						// Content-Type не указываем, axios сам поставит
					},
				}
			);

			console.log("Файл успешно загружен:", response.data);
			if (response.status === 200) {
				setDataEvent((prev) => ({
					...prev,
					anons: {
						id: response.data.id,
						url: response.data.url
					},
				}));
				// setDataEvent(response.data.data); // если хочешь отдать данные в родительский компонент
			}
		} catch (error) {
			console.error("Ошибка загрузки:", error);
		}
	};

	// https://dev.goconf.ru/wp-json/images/v2/delete/ 
	const handleRemoveImage = async(id) => {
		console.log(token)
		try {
			const response = await axios.get(
				getApiUrl(`/backend/wp-json/images/v2/delete?id=${id}`),
				{
					headers: {
						Authorization: `Bearer ${token}`,
						// Content-Type не указываем, axios сам поставит
					},
				}
			);

			console.log("Файл успешно удален:", response);
			if (response.status === 200) {
				setDataEvent((prev) => ({
					...prev,
					anons: {},
				}));
			}
		} catch (error) {
			console.error("Ошибка загрузки:", error);
		}
	}

    return( 
        <UserMain
			initial={{ opacity: 0, x: 50 }}
			animate={{ opacity: 1, x: 0 }} 
			transition={{ duration: .3 }}
        >
        	<UserMainTitles>
                <UserMainTitlesTitle>{id ? 'Редактирование': 'Добавить событие'}</UserMainTitlesTitle>
            </UserMainTitles>

            <UserEventNav>
                <UserEventNavItem $view={view}>Основные данные</UserEventNavItem>
                <UserEventNavSeparator></UserEventNavSeparator>
                <UserEventNavItem className={css`
                    ${view > 1 && `color: ${theme.colors.purple}!important;border-color: ${theme.colors.purple}!important;` }
                    ${view > 2 && `background-color: ${theme.colors.purple};color:#fff!important;` }
                `}>Место и время</UserEventNavItem>
                <UserEventNavSeparator></UserEventNavSeparator>
                <div className={css`${view > 2 && `color: ${theme.colors.purple}!important;border-color: ${theme.colors.purple}!important;` }`}>Дополнительная информация</div>
            </UserEventNav>

            {view === 1 && 
        <UserMain
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
                <input className={input} type="text" placeholder="Название" name="name" value={dataEvent.name} onChange={handleDataEventChange} />
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
                <textarea className={textarea} name="short_text" id="" placeholder="Краткое описание" value={dataEvent.short_text} onChange={handleDataEventChange}></textarea>
                <div className={css`color: #6C6C71;font-size: 14px;line-height:1.16;text-align: right;margin-top: 8px;`}>{dataEvent.short_text.length} / 200</div>
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
                    <EventDropdown full={true} options={metaParameters && metaParameters.subjects} items={dataEvent.subject} incomeFunction={handleDataEventChangeSubject} placeholder={'Выбрать тематики'} />
					{/* <DropdownInput full={full} options={metaParameters && metaParameters.subjects} type={'direction'} placeholder={'ТематикаФЫВ'} /> */}
                </div>
                <div>
                    <p>Формат мероприятия</p>
					<EventDropdown full={true} options={metaParameters && metaParameters.formats} items={dataEvent.format} incomeFunction={handleDataEventChangeFormat} placeholder={'Выбрать формат'} />
                    {/* <DropdownInput full={true} options={options} placeholder={'Выбрать формат'} /> */}
                </div>
                <div>
                    <p>Организатор</p>
					{/* <EventDropdown full={true} placeholder={'Выбрать организатора'} /> */}
                    <DropdownInput full={true} placeholder={'Выбрать организатора'} />
                    <p className={css`color: #6C6C71;`}>Если вы&nbsp;ещё не&nbsp;добавили организатора, сделайте это в&nbsp;соответствующем разделе. <Link href="/lk/org" className={css`color: ${theme.colors.purple};`}>Добавить организатора</Link></p>
                </div>
                <div>
                    <p>Ссылка на сайт мероприятия</p>
					<input className={input} type="text" placeholder="Ссылка на сайт мероприятия" name="link" value={dataEvent.link} onChange={handleDataEventChange} />
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
                    
					<div className={css`background-color: #fff;border-radius: 24px;display: flex;align-items:center;justify-content: center;height: 226px;margin-bottom: 8px;`}
					style={{cursor: "pointer"}}
					onClick={handleButtonClick}
					>
						<input type="file"
							ref={inputRef}
							style={{ display: 'none' }}
							onChange={handleFileChange} />
						{dataEvent?.anons?.id ? 
							<img src={dataEvent.anons.url} alt="" style={{objectFit: 'scale-down', width: '100%', height: '100%'}} />
						:
							<AvatarIcon />
						}
                        
                    </div>
					{dataEvent?.anons?.id && <div onClick={()=>handleRemoveImage(dataEvent.anons.id)}>УДАЛИТЬ КАРТИНКУ</div>}
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
                        <input className={input} type="text" placeholder="Введите стоимость" name="cost" value={dataEvent.cost} onChange={handleDataEventChange} />
                        <p className={css`color: #47474D;`}>руб.</p>
                    </div>
                    <AnimatedSwitch label="Бесплатное участие" initialChecked={dataEvent?.free} incomeFunction={handleDataEventChangeFree} />
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
            
        </UserMain>
        }
        {view === 2 && 
        <UserMain
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
                                <p style={{color: 'red'}}>Город</p>
                                {/* <DropdownInput options={metaParameters && metaParameters?.cities} placeholder={'Выбрать город'} /> */}
								{/* <DropdownInput full={full} options={filtersData && filtersData.cities} handleFilterChange={handleFilterChange} filterValues={filterValues} type={'city'} placeholder={'Город'} /> */}
								<EventDropdown full={true} options={metaParameters && metaParameters?.cities} items={[]} placeholder={'Выбрать город'} />
								{/* items={dataEvent.format} incomeFunction={handleDataEventChangeFormat} */}
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
								<input className={input} type="text" placeholder="Введите адрес" name="address" value={dataEvent.address} onChange={handleDataEventChange} />
                            </div>
                            <div>
                                <p>Дата начала</p>
                                <input className={input} type="text" name="date_start" placeholder="Дата начала" value={dataEvent.date_start} onChange={handleDataEventChange} />
                            </div>
                            <div>
                                <p>Дата окончания</p>
                                <input className={input} type="text" name="date_end" placeholder="Дата окончания" value={dataEvent.date_end} onChange={handleDataEventChange} />
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
        </UserMain>
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
            <Button className={cx(css`color:#8553F9!important;background-color:#fff!important;`)} onClick={()=>{view > 1 ? setView(prev => prev - 1) : setBack(1)}}>Отменить</Button>
            <Button onClick={()=>{view < 3 ? setView(prev => prev + 1) : handleAddEventSubmit()}}> {view > 2 ? 'Опубликовать' : 'Продолжить'}</Button>
            <div className={css`font-size: 14px;line-height: 1.16;color: #8553F9;`}>Сохранить в черновик</div>
			<div onClick={()=>handleAddEventSubmit()}>отправить</div>
        </div>
        </UserMain>
    )
};

export default EventAdd;