"use client"

import Link from "next/link";
import { css, cx } from "@emotion/css";
import { Button, Container, input, LkWrapper, textarea, UserEventNav, UserEventNavItem, UserEventNavSeparator, UserMain, UserMainTitles, UserMainTitlesTitle } from "@/styles/ui";
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from "react";
import DropdownInput from "@/components/ui/DropdownInput";
import { useTheme } from "@emotion/react";
import AvatarIcon from "@/public/images/svg/avatar.svg";
import EditIcon from "@/public/images/svg/edit.svg";
import RemoveIcon from "@/public/images/svg/remove.svg";
import img_ex_1 from '/public/images/events_1.jpg';
import LkMenu from "@/components/ui/LkMenu";
import Image from "next/image";
import { getApiUrl } from "@/functions/functions";
import axios from "axios";
import { useAuthReady } from "@/hooks/useAuthReady";
import { useImageUpload } from "@/functions/useImageUpload";
import { useSearchParams } from "next/navigation";
import { AnimatedSwitch } from "../notifications/page";
import EventDropdown from "./add/EventDropdown";
import CityDropdown from "./add/CityDropdown";
import TextEditor from "@/components/ui/Editor";

const EventsAddEdit = () => {
	const { ready, token } = useAuthReady();

	const searchParams = useSearchParams();
	const id = searchParams.get('id');

	useEffect(() => {
		if (!ready) return;

		handleGetEventsMeta(token)
	}, [ready, token]);


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
	const handleGetEventsMeta = async(token) => {
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
	});

	useEffect(()=>{
		console.log(dataEvent)
	}, [dataEvent])

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

	// const [imageFormData, setImageFormData] = useState(null)
	// const handleUploadImage = async() => {
	// 		try {
	// 			const response = await axios.post(
	// 				getApiUrl('/backend/wp-json/images/v2/upload'),
	// 				imageFormData,
	// 				{
	// 					headers: {
	// 						Authorization: `Bearer ${token}`,
	// 					},
	// 				}
	// 			);

	// 			console.log("Файл успешно загружен:", response.data);

	// 			const newAnons = {
	// 				id: response.data.id,
	// 				url: response.data.url,
	// 			};

	// 			if (response.status === 200) {
	// 				if (dataEvent?.anons?.id) {
	// 					// 1. Удаляем старую картинку
	// 					await handleRemoveImage(dataEvent.anons.id);

	// 					// 2. Обновляем стейт
	// 					setDataEvent((prev) => {
	// 						const updated = {
	// 						...prev,
	// 						anons: newAnons,
	// 						};
	// 						// 3. Здесь сразу вызываем следующий шаг
	// 						// doSomethingAfterUpdate(updated);
	// 						handleAddEventSubmit(updated)
	// 						return updated;
	// 					});

	// 					} else {
	// 					// 1. Обновляем стейт
	// 					setDataEvent((prev) => {
	// 						const updated = {
	// 						...prev,
	// 						anons: newAnons,
	// 						};
	// 						// 2. Следующий шаг
	// 						// doSomethingAfterUpdate(updated);
	// 						handleAddEventSubmit(updated)
	// 						return updated;
	// 					});
	// 				}
	// 				// if(dataEvent?.anons?.id) {
	// 				// 	await handleRemoveImage(dataEvent?.anons?.id)
	// 				// 	setDataEvent((prev) => ({
	// 				// 		...prev,
	// 				// 		anons: {
	// 				// 			id: response.data.id,
	// 				// 			url: response.data.url
	// 				// 		},
	// 				// 	}));
	// 				// 	console.log('удалил картинку ', dataEvent?.anons?.id, 'стейт 1 ', dataEvent)
	// 				// } else {
	// 				// 	setDataEvent((prev) => ({
	// 				// 		...prev,
	// 				// 		anons: {
	// 				// 			id: response.data.id,
	// 				// 			url: response.data.url
	// 				// 		},
	// 				// 	}));
	// 				// 	console.log('картинки не было ', response.data.id, 'стейт 2 ', dataEvent)
	// 				// }
	// 				// console.log('стейт 3 ', dataEvent)
	// 			}
	// 		} catch (error) {
	// 			console.error("Ошибка загрузки:", error);
	// 		}
	// }

	const handleAddEventSubmit = async(items) => {
		try {
			const response = await axios.post(
			getApiUrl("/backend/wp-json/account/v2/events/editor/"),
			{
				...(id ? { id } : {}),
				status: 'draft',
				data: items
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
	}

	// useEffect(() => {
	// 	handleGetEventsMeta()
	// }, []);

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

	const handleDataEventCityChange = (selectedCity) => {
		setDataEvent((prev) => {

			return {
				...prev,
				city: selectedCity
			};
		});
	};

	// // https://dev.goconf.ru/wp-json/images/v2/upload/ 
	// const inputRef = useRef(null);

	// const handleButtonClick = () => {
	// 	// Открытие диалога выбора файла
	// 	inputRef.current?.click();
	// };

	// const [previewUrl, setPreviewUrl] = useState(null);
	// const handleFileChange = async (e) => {
	// 	const file = e.target.files[0];
	// 	if (!file) return;

	// 	// создаём временный URL для превью
	// 	const imageUrl = URL.createObjectURL(file);
	// 	setPreviewUrl(imageUrl);

	// 	const formData = new FormData();
	// 	formData.append('file', file);
	// 	setImageFormData(formData)
	// 	// [...formData.entries()].forEach(([key, value]) => {
	// 	// 	console.log('Ключ:', key);
	// 	// 	console.log('Значение:', value);
	// 	// });

	// 			// setDataEvent((prev) => ({
	// 			// 	...prev,
	// 			// 	anons: {
	// 			// 		id: response.data.id,
	// 			// 		url: response.data.url
	// 			// 	},
	// 			// }));

	// 	// try {
	// 	// 	const response = await axios.post(
	// 	// 		getApiUrl('/backend/wp-json/images/v2/upload'),
	// 	// 		formData,
	// 	// 		{
	// 	// 			headers: {
	// 	// 				Authorization: `Bearer ${token}`,
	// 	// 			},
	// 	// 		}
	// 	// 	);

	// 	// 	console.log("Файл успешно загружен:", response.data);
	// 	// 	if (response.status === 200) {
	// 	// 		setDataEvent((prev) => ({
	// 	// 			...prev,
	// 	// 			anons: {
	// 	// 				id: response.data.id,
	// 	// 				url: response.data.url
	// 	// 			},
	// 	// 		}));
	// 	// 	}
	// 	// } catch (error) {
	// 	// 	console.error("Ошибка загрузки:", error);
	// 	// }
	// };

	// // https://dev.goconf.ru/wp-json/images/v2/delete/ 
	// const handleRemoveImage = async(id) => {
	// 	try {
	// 		const response = await axios.get(
	// 			getApiUrl(`/backend/wp-json/images/v2/delete?id=${id}`),
	// 			{
	// 				headers: {
	// 					Authorization: `Bearer ${token}`,
	// 					// Content-Type не указываем, axios сам поставит
	// 				},
	// 			}
	// 		);

	// 		console.log("Файл успешно удален:", response);
	// 		if (response.status === 200) {
	// 			setDataEvent((prev) => ({
	// 				...prev,
	// 				anons: {},
	// 			}));
	// 		}
	// 	} catch (error) {
	// 		console.error("Ошибка загрузки:", error);
	// 	}
	// }




	const [time, setTime] = useState('12:00');

  const handleInputChange = (e) => {
    let value = e.target.value.replace(/[^\d]/g, ''); // Удаляем всё, кроме цифр

    // Ограничим до 4 цифр (ччмм)
    if (value.length > 4) value = value.slice(0, 4);

    // Добавим двоеточие
    let formatted = '';
    if (value.length <= 2) {
      formatted = value;
    } else {
      formatted = value.slice(0, 2) + ':' + value.slice(2);
    }

    setTime(formatted);
  };

  const handleBlur = () => {
    const [h, m] = time.split(':');

    let hours = parseInt(h || '0', 10);
    let minutes = parseInt(m || '0', 10);

    if (isNaN(hours)) hours = 0;
    if (isNaN(minutes)) minutes = 0;

    // Ограничения
    if (hours > 23) hours = 23;
    if (minutes > 59) minutes = 59;

    const formatted = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;

    setTime(formatted);
  };



const {
	previewUrl: anonsPreview,
	inputRef: anonsInputRef,
	handleFileChange: handleAnonsChange,
	handleUploadImage: uploadAnons,
	handleRemoveImage: removeAnons,
	handleButtonClick: clickAnons,
	file: anonsFile,
	} = useImageUpload({
	token,
	data: dataEvent,
	setData: setDataEvent,
	targetKey: "anons",
});

const {
	previewUrl: coverPreview,
	inputRef: coverInputRef,
	handleFileChange: handleCoverChange,
	handleUploadImage: uploadCover,
	handleRemoveImage: removeCover,
	handleButtonClick: clickCover,
	file: coverFile,
	} = useImageUpload({
	token,
	data: dataEvent,
	setData: setDataEvent,
	targetKey: "cover",
});
  
	const handleSubmitTest = async () => {
		// let testImage = dataEvent.logo;
  
		// if (anonsFile) {
		// 	const uploaded = await handleUploadImage(); // сначала загружаем изображение
		// 	if (!uploaded) return; // если ошибка, не отправляем дальше
		// 	testImage = uploaded;
		// }
  
		// const payload = {
		// 	...dataEvent,
		// 	anons: testImage,
		// 	// другие поля
		// };
		// console.log(payload)

	const anons = await uploadAnons();
	const cover = await uploadCover();

	if (!anons || !cover) {
		alert("Ошибка загрузки изображений");
		return;
	}

	// потом отправляй event
	const payload = {
		...dataEvent,
		anons,
		cover,
	};

	console.log("Отправка события:", payload);

		await handleAddEventSubmit(payload); // основной запрос
	};

    return( 
		<LkWrapper>
			<Container>
				<div style={{display: 'flex', gap: 64}}>
					<LkMenu />
					<UserMain
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }} 
						transition={{ duration: .3 }}
					>
						<UserMainTitles>
							<UserMainTitlesTitle>{id ? 'Редактирование': 'Добавить событие'}</UserMainTitlesTitle>
						</UserMainTitles>
						<UserEventNav>
							<UserEventNavItem $isActive={view >= 1 && true} $isFilled={view >= 2 && true} onClick={()=>{
								setView(1);
								window.scrollTo({ top: 0, behavior: 'smooth' })
								}}>Основные данные</UserEventNavItem>
							<UserEventNavSeparator></UserEventNavSeparator>
							<UserEventNavItem $isActive={view >= 2 && true} $isFilled={view >= 3 && true} onClick={()=>{
								setView(2);
								window.scrollTo({ top: 0, behavior: 'smooth' })
								}}>Место и время</UserEventNavItem>
							<UserEventNavSeparator></UserEventNavSeparator>
							<UserEventNavItem $isActive={view >= 3 && true} onClick={()=>{
								setView(3);
								window.scrollTo({ top: 0, behavior: 'smooth' })
								}}>Дополнительная информация</UserEventNavItem>
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
								onClick={clickAnons}
								>
									<input type="file"
										ref={anonsInputRef}
										style={{ display: 'none' }}
										onChange={handleAnonsChange} />
									{dataEvent?.anons?.id && !anonsPreview ? 
										<img src={dataEvent.anons.url} alt="" style={{objectFit: 'scale-down', width: '100%', height: '100%'}} />
									:
										
										anonsPreview ? <img src={anonsPreview} alt="" style={{objectFit: 'scale-down', width: '100%', height: '100%'}} /> : <AvatarIcon />
									}
									
								</div>
								
								{/* {dataEvent?.anons?.id && <div onClick={()=>handleRemoveImage(dataEvent.anons.id)}>УДАЛИТЬ КАРТИНКУ</div>} */}
								{dataEvent?.anons?.id || anonsPreview ?
								<div style={{display: 'flex', justifyContent: 'space-between', gap: '8px', alignItems: 'center'}}>
									<div className={css`font-size: 12px;color:#6C6C71;line-height: 1.2;`}>998.05 кб</div>
									<div style={{cursor: 'pointer'}}>
										<RemoveIcon onClick={()=>removeAnons(dataEvent.anons.id)} />
									</div>
								</div>
								:
								<div className={css`color: ${theme.colors.purple};margin-bottom: 8px;cursor: pointer`} onClick={clickAnons}>Загрузить</div>
								}
								
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
								{/* <div className={css`background-color: #fff;border-radius: 24px;display: flex;align-items:center;justify-content: center;height: 226px;margin-bottom: 8px;`}>
									<AvatarIcon />
								</div>
								 */}
								<div className={css`background-color: #fff;border-radius: 24px;display: flex;align-items:center;justify-content: center;height: 226px;margin-bottom: 8px;`}
								style={{cursor: "pointer"}}
								onClick={clickCover}
								>
									<input type="file"
										ref={coverInputRef}
										style={{ display: 'none' }}
										onChange={handleCoverChange} />
									{dataEvent?.cover?.id && !coverPreview ? 
										<img src={dataEvent.cover.url} alt="" style={{objectFit: 'scale-down', width: '100%', height: '100%'}} />
									:
										
										coverPreview ? <img src={coverPreview} alt="" style={{objectFit: 'scale-down', width: '100%', height: '100%'}} /> : <AvatarIcon />
									}
									
								</div>
								
								{/* {dataEvent?.anons?.id && <div onClick={()=>handleRemoveImage(dataEvent.anons.id)}>УДАЛИТЬ КАРТИНКУ</div>} */}
								{dataEvent?.cover?.id || coverPreview ?
								<div style={{display: 'flex', justifyContent: 'space-between', gap: '8px', alignItems: 'center'}}>
									<div className={css`font-size: 12px;color:#6C6C71;line-height: 1.2;`}>998.05 кб</div>
									<div style={{cursor: 'pointer'}}>
										<RemoveIcon onClick={()=>removeCover(dataEvent.cover.id)} />
									</div>
								</div>
								:
								<div className={css`color: ${theme.colors.purple};margin-bottom: 8px;cursor: pointer`} onClick={clickCover}>Загрузить</div>
								}
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
								{!dataEvent?.free &&
									<div className={css`display: flex;gap:8px;align-items: center;`}>
										<input className={input} type="number" placeholder="Введите стоимость" name="cost" value={dataEvent.cost} onChange={handleDataEventChange} />
										<p className={css`color: #47474D;`}>руб.</p>
									</div>
								}
								
								<AnimatedSwitch label="Бесплатное участие" initialChecked={dataEvent?.free} incomeFunction={handleDataEventChangeFree} />
							</div>
						</div>

						<div className={css`
							margin-bottom: 32px;
							font-family: Impact;
							font-size: 28px;
							line-height: 1.2;
						`}>Описание</div>

						<TextEditor
														content={dataEvent.text}
														onChange={(html) =>
														setDataEvent((prev) => ({
															...prev,
															text: html,
														}))
														}
													/>
						
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
											<p>Город</p>
											<CityDropdown options={metaParameters && metaParameters?.cities} handleDataOrganizaionCityChange={handleDataEventCityChange} items={[]} placeholder={'Выбрать город'} />
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
											<input
												type="text"
												className={input}
												value={time}
												onChange={handleInputChange}
												onBlur={handleBlur}
												placeholder="Время начала"
												maxLength={5}
											/>
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
						<div onClick={()=>handleUploadImage()}>отправить</div>
						<div onClick={handleSubmitTest}>ОТПРАВИТЬ НОВЫАЯ</div>
					</div>
					</UserMain>
				</div>
			</Container>
		</LkWrapper>
    )
};

export default EventsAddEdit;