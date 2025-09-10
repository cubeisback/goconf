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
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatedSwitch } from "../notifications/page";
import EventDropdown from "./add/EventDropdown";
import CityDropdown from "./add/CityDropdown";
import TextEditor from "@/components/ui/Editor";
import EventDate from "./add/EventDate";
import { useMultiImageUpload } from "@/functions/useGalleryUpload";
import { useConfirmModal } from "@/store/confirmModalStore";
import DraftIcon from "@/public/images/svg/draft_icon.svg";
import BackIcon from "@/public/images/svg/back_icon.svg";

const EventsAddEdit = () => {
	const router = useRouter();
	const { ready, token } = useAuthReady();

	const searchParams = useSearchParams();
	const id = searchParams.get('id');

	useEffect(() => {
		if (!ready) return;

		handleGetEventsMeta(token)
		if (id) {
			dfsdfsdfsd2(id);
		}
	}, [ready, token, id]);


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
		broadcast: '',
		video: ''
	});

	const [contentLength, setContentLength] = useState(0);

	useEffect(()=>{
		setDataEvent((prev) => ({
			...prev,
			online: activeTab === 2 ? true : false,
		}));
	}, [activeTab])

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

	const handleDataEventChangeOrganizator = (organizatorItem) => {
		setDataEvent((prev) => {
			return {
				...prev,
				organizator: organizatorItem
			};
		});
	};

	const handleDataEventChangeFree = (value) => {
		setDataEvent((prev) => ({
			...prev,
			free: value,
		}));
	};

	const testCalendar = (date, whatDate) => {
		console.log(date, whatDate)
		whatDate === 'date_start' ?
		setDataEvent((prev) => ({
			...prev,
			date_start: date,
		}))
		:
		setDataEvent((prev) => ({
			...prev,
			date_end: date,
		}))
		;
	}



	const handleAddEventSubmit = async(items, status) => {
		try {
			const response = await axios.post(
			getApiUrl("/backend/wp-json/account/v2/events/editor/"),
			{
				...(id ? { id } : {}),
				status: status,
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




	const [time, setTime] = useState('00:00');

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
		setDataEvent((prev) => ({
			...prev,
			time_start: formatted,
		}));
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
	setDataEvent((prev) => ({
			...prev,
			time_start: formatted,
		}));
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
  
const {
  inputRef: galleryInputRef,
  replaceInputRef: replaceGalleryInputRef,
  previews: galleryPreviews,
  replacePreviews,
  handleFileChange: handleGalleryChange,
  handleReplaceChange: handleGalleryReplace,
  handleUploadImages: uploadGallery,
  handleUploadReplacements: uploadGalleryReplacements,
  handleRemoveImage: removeGalleryImage,
  handleRemoveTemp: removeTempGallery,
  handleButtonClick: clickGallery,
  startReplace,
} = useMultiImageUpload({
  token,
  data: dataEvent,
  setData: setDataEvent,
  targetKey: "gallery",
});






	const handleSubmitTest = async (status) => {
		const anons = await uploadAnons();
		const cover = await uploadCover();
		// const gallery = await uploadGallery();
		// ⚡️ теперь грузим галерею здесь
		const gallery = [
			...(await uploadGallery()),          // новые
			...(await uploadGalleryReplacements()) // замены
		];

		// if (!anons || !cover) {
		// 	alert("Ошибка загрузки изображений");
		// 	return;
		// }

		// потом отправляй event
		const payload = {
			...dataEvent,
			anons,
			cover,
			gallery,
			// gallery: dataEvent.gallery, // актуальная версия после замен
		};

		console.log("Отправка события:", payload);

		await handleAddEventSubmit(payload, status); // основной запрос
	};


	const { openModal } = useConfirmModal();
		const handleSubmitModal = () => {
			openModal({
			title: 'Сохранение',
			description: `Вы действительно хотите сохранить?`,
			onConfirm: () => {
				handleSubmitTest('moderation'), 
				router.replace('/lk/events')
			},
			confirmText: 'Сохранить',
			});
		};

	const handleSubmitModalDraft = () => {
			openModal({
			title: 'Сохранение',
			description: `Вы действительно хотите сохранить черновик?`,
			onConfirm: () => {
				handleSubmitTest('draft'), 
				router.replace('/lk/events')
			},
			confirmText: 'Сохранить',
			});
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
							<textarea className={textarea} name="short_text" id="" placeholder="Краткое описание" value={dataEvent.short_text} onChange={handleDataEventChange} maxLength={200}></textarea>
							<div className={css`color: #6C6C71;font-size: 14px;line-height:1.16;text-align: right;margin-top: 8px;`}><span>{dataEvent.short_text.length}</span> / 200</div>
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
								<EventDropdown full={true} options={metaParameters && metaParameters.companies} items={dataEvent.organizator} incomeFunction={handleDataEventChangeOrganizator} placeholder={'Выбрать организатора'} />
								{/* <DropdownInput full={true} options={metaParameters && metaParameters.companies} placeholder={'Выбрать организатора'} /> */}
								<p className={css`color: #6C6C71;`}>Если вы&nbsp;ещё не&nbsp;добавили организатора, сделайте это в&nbsp;соответствующем разделе. <Link href="/lk/org" target="_blank" className={css`color: ${theme.colors.purple};`}>Добавить организатора</Link></p>
							</div>
							<div>
								<p>Ссылка на сайт мероприятия</p>
								<input className={input} type="text" placeholder="Ссылка на сайт мероприятия" name="link" value={dataEvent.link} onChange={handleDataEventChange} />
								<p className={css`color: #6C6C71;`}>Укажите ссылку на сайт мероприятия или форму регистрации. Она будет отображаться на странице события после активации тарифа <span className={css`color: #191921;`}>«Расширенный»</span>. Оплатить тариф можно в любой момент.</p>
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
										<input className={input} type="number" placeholder="Введите стоимость" name="cost" value={dataEvent.cost ? dataEvent.cost : ''} onChange={handleDataEventChange} />
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

						<div className={css`margin-bottom: 24px;`}>
							<div className={css`display: flex;gap:16px;justify-content:space-between;font-size: 14px;line-height:1.16;margin-bottom:8px;
								@media(max-width: 575px) {
									flex-direction: column;
									gap: 8px;
								}    
							`}>
								<p className={css`color: #47474D;`}>Детальное описание</p>
								<p className={css`color: #6C6C71;`}>Максимальное количество символов - 5000</p>
							</div>
							<TextEditor
								content={dataEvent.content}
								onChange={(html, length) => {
									setDataEvent((prev) => ({
									...prev,
									content: html, // только HTML кладём в dataEvent
									}));
									setContentLength(length); // длину сохраняем в отдельный стейт
								}}
							/>
							<div className={css`color: #6C6C71;font-size: 14px;line-height:1.16;text-align: right;margin-top: 8px;`}>{contentLength} / 5000</div>
						</div>
						
						
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
											<CityDropdown options={metaParameters && metaParameters?.cities} handleDataOrganizaionCityChange={handleDataEventCityChange} value={dataEvent.city?.name} items={[]} fullCityData={true} placeholder={'Выбрать город'} />
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
											<EventDate title='Выберите дату' initialDate={dataEvent.date_start} changeDate={testCalendar} whatDate='date_start' />
										</div>
										<div>
											<p>Дата окончания</p>
											<EventDate title='Выберите дату' initialDate={dataEvent.date_end} changeDate={testCalendar} whatDate='date_end' />
										</div>
										<div>
											<p>Время начала</p>
											<input
												type="text"
												className={input}
												value={dataEvent.time_start}
												onChange={handleInputChange}
												onBlur={handleBlur}
												placeholder="Время начала"
												maxLength={5}
												name="time_start"
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
											<EventDate title='Выберите дату' initialDate={dataEvent.date_start} changeDate={testCalendar} whatDate='date_start' />
										</div>
										<div>
											<p>Дата окончания</p>
											<EventDate title='Выберите дату' initialDate={dataEvent.date_end} changeDate={testCalendar} whatDate='date_end' />
										</div>
										<div>
											<p>Время начала</p>
											<input
												type="text"
												className={input}
												value={dataEvent.time_start}
												onChange={handleInputChange}
												onBlur={handleBlur}
												placeholder="Время начала"
												maxLength={5}
											/>
										</div>
										<div className={css`
											flex: 0 1 100%!important;
											max-width: 100%!important;
										`}>
											<p>Ссылка на трансляцию</p>
											<input className={input} type="text" placeholder="https://" name="broadcast" value={dataEvent?.broadcast ?? ''} onChange={handleDataEventChange} />
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
					<div className={css`color: #6C6C71;margin: 48px 0; font-size: 14px;`}>По статистике, события с фото и видео получают до 20% больше трафика. Материалы отображаются на странице при активации тарифа <span className={css`color: #191921;`}>«Расширенный»</span>. Оплатить тариф можно в любое время.</div>
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


								<input
									type="file"
									ref={galleryInputRef}
									style={{ display: "none" }}
									onChange={handleGalleryChange}
									multiple
								/>
								{/* отдельный input для замены */}
								<input
								type="file"
								ref={replaceGalleryInputRef}
								style={{ display: "none" }}
								onChange={handleGalleryReplace}
								/>


	{/* уже загруженные картинки */}
	{dataEvent.gallery.map((img, index) => (
		<div key={img.id || index}>

			<img src={replacePreviews[index]?.url || img.url} alt="" />
			<div>
				<div className={css`font-size: 12px;color:#6C6C71;line-height: 1.2;`}>
					{replacePreviews[index]?.size || img.size || "-"}
				</div>
				<div>
					<EditIcon onClick={() => startReplace(index)} />
					<RemoveIcon onClick={() => removeGalleryImage(img.id)} />
				</div>
			</div>
		</div>
	))}

  {/* временные превью (ещё не отправлены) */}
  {galleryPreviews.map((src, idx) => (
    <div key={"temp-" + idx}>
		<img src={src.url} alt="" />
			<div>
				<div className={css`font-size: 12px;color:#6C6C71;line-height: 1.2;`}>{src.size}</div>
				<div>
					{/* <EditIcon /> */}
					<RemoveIcon onClick={() => removeTempGallery(idx)} />
				</div>
			</div>
      {/* <img src={src} alt="" width={80} /> */}
      {/* <button onClick={() => removeTempGallery(idx)}>Убрать</button> */}
    </div>
  ))}

  {/* добавить фото */}
  


								{/* {dataEvent.gallery && dataEvent.gallery.map((image, index) => (
									<div key={index}>
										<img src={image.url} alt="" />
										<div>
											<div className={css`font-size: 12px;color:#6C6C71;line-height: 1.2;`}>998.05 кб</div>
											<div>
												<EditIcon />
												<RemoveIcon />
												{image.id}
											</div>
										</div>

										
									</div>
								))} */}
								
							</div>
							{(dataEvent.gallery.length + galleryPreviews.length) < 9 && (
								<Button className={cx(css`color:#8553F9!important;background-color:#fff!important;margin-bottom: 48px;`)} onClick={clickGallery}>+ Добавить изображение</Button>
							)}
						

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
						<textarea className={cx(textarea, css`margin-bottom: 40px;`)} name="video" id="" placeholder="https://" value={dataEvent.video} onChange={handleDataEventChange}></textarea>
					</>
					}

					<div className={css`
						display: flex;
						gap:16px;
						align-items:center;
						justify-content: space-between;

						@media(max-width: 575px) {
							flex-direction: column;
						}
					`}>
						<div className={css`
							display: flex;
							gap:16px;
							align-items:center;

							@media(max-width: 575px) {
								flex-direction: column;
							}
						`}>
						{view == 1 ? 
							<Button onClick={()=>{setView(prev => prev + 1)}}>Продолжить</Button>
						: view == 2 ? 
						<>
							<div onClick={()=>{setView(prev => prev - 1)}} style={{cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, width: 112}}><BackIcon /> Назад</div>
							<Button onClick={()=>{setView(prev => prev + 1)}}>Продолжить</Button>
							<Button className={cx(css`color:#8553F9!important;background-color:#fff!important;`)} onClick={()=>{handleSubmitModal()}}>Отправить на модерацию</Button>
						</>
						: 
						<>
							<div onClick={()=>{setView(prev => prev - 1)}} style={{cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, width: 112}}><BackIcon /> Назад</div>
							<Button onClick={()=>{handleSubmitModal()}}>Отправить на модерацию</Button>
						</>
						}
						</div>
						<div className={css`font-size: 14px;line-height: 1.16;color: #8553F9;cursor: pointer;    display: flex
;
    align-items: center;
    gap: 8px;`} onClick={()=>{handleSubmitModalDraft()}}>Сохранить в черновик <DraftIcon /></div>
					</div>
					</UserMain>
				</div>
			</Container>
		</LkWrapper>
    )
};

export default EventsAddEdit;