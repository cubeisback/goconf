"use client"

import { css, cx } from "@emotion/css";
import { Button, Container, container, input, lkContainer, LkWrapper, textarea, UserMain, UserMainTitles, UserMainTitlesTitle } from "@/styles/ui";
import AvatarIcon from "@/public/images/svg/avatar.svg";
import { useEffect, useState } from "react";
import LkMenu from "@/components/ui/LkMenu";
import { useAuthReady } from "@/hooks/useAuthReady";
import axios from "axios";
import { getApiUrl } from "@/functions/functions";
import EventDropdown from "../../events/add/EventDropdown";
import TextEditor from "@/components/ui/Editor";
import { useImageUpload } from "@/functions/useImageUpload";

const OrganizationsAdd = ({id}) => {
	const [content, setContent] = useState(''); //Для редактора

	const { ready, token } = useAuthReady();
	useEffect(() => {
		if (!ready) return;

		handleGetOrganizationsMeta(token)
	}, [ready, token]);
	
	
	const [text, setText] = useState(''); // для мини-текста
	const handleChange = (event) => {
		setText(event.target.value);
	};

	// https://dev.goconf.ru/wp-json/account/v2/company/meta/
	const [metaParameters, setMetaParameters] = useState(null)
	const handleGetOrganizationsMeta = async(token) => {
		try {
			const response = await axios.get(
			getApiUrl("/backend/wp-json/account/v2/company/meta/"),
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
			);
			console.log('organizations meta', response.data)
			if (response.status === 200) {
				setMetaParameters(response.data)
				// console.log("events", response.data);
			}
		} catch (error) {
			console.error("organizations meta error", error);
		}
	};

	// https://dev.goconf.ru/wp-json/account/v2/company/editor/
	const [dataOrganization, setDataOrganization] = useState({
		name: '',
		logo: {},
		text_short: '',
		text: '',
		city: '',
		address: '',
		link: '',
		socials: {
			vk: '',
			tg: '',
			youtube: '',
			rutube: '',
		},
		emails: [],
		phones: []
	})

	const handleDataOrganizaionChange = (e) => {
		const { name, value, type, checked } = e.target;

		setDataOrganization((prev) => ({
			...prev,
			[name]: ['emails', 'phones'].includes(name)
				? [value]
				: value,
		}));
	};

	const handleSocialChange = (e) => {
		const { name, value } = e.target;

		setDataOrganization((prev) => ({
			...prev,
			socials: {
			...prev.socials,
			[name]: value,
			},
		}));
	};

	

	const handleDataEventChangeSubject = (subjectItem) => {
		setDa((prev) => {
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

	const handleAddOrganizationSubmit = async(items) => {
		try {
			const response = await axios.post(
			getApiUrl("/backend/wp-json/account/v2/company/editor/"),
			{
				...(id ? { id } : {}),
				status: 'moderation',
				data: items
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
			);
			console.log("organization ", response);
		} catch (error) {
			console.error(error);
		}
	}

	const jsakljdaslkd = () => {
		console.log('save', dataOrganization)
	}

	// const {
	// 	previewUrl,
	// 	inputRef,
	// 	handleFileChange,
	// 	handleUploadImage,
	// 	handleRemoveImage,
	// 	handleButtonClick,
	// } = useImageUpload({
	// 	token,
	// 	data: dataOrganization,
	// 	setData: setDataOrganization,
	// 	handleAfterUpload: jsakljdaslkd,
	// 	targetKey: "logo",  // куда сохранять
	// 	isMultiple: false,   // одиночное изображение
	// });

	const {
		previewUrl,
		inputRef,
		handleFileChange,
		handleUploadImage,
		handleRemoveImage,
		handleButtonClick,
		file,
	} = useImageUpload({
		token,
		data: dataOrganization,
		setData: setDataOrganization,
		targetKey: "logo",
	});

	const handleSubmitTest = async () => {
		let testImage = dataOrganization.logo;

		if (file) {
			const uploaded = await handleUploadImage(); // сначала загружаем изображение
			if (!uploaded) return; // если ошибка, не отправляем дальше
			testImage = uploaded;
		}

		const payload = {
			...dataOrganization,
			logo: testImage,
			// другие поля
		};
		console.log(payload)
		await handleAddOrganizationSubmit(payload); // основной запрос
	};
	
	
	return (
		<LkWrapper>
			<Container>
				<div style={{display: 'flex', gap: 64}}>
					<LkMenu />
					<UserMain
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
							<input className={input} type="text" placeholder="Название" name="name" value={dataOrganization.name} onChange={handleDataOrganizaionChange} />
						</div>
						
						<button onClick={handleButtonClick}>Выбрать изображение</button>
						<input
							type="file"
							ref={inputRef}
							onChange={handleFileChange}
							style={{ display: "none" }}
						/>

						{previewUrl && (
							<div>
							<img src={previewUrl} alt="preview" style={{ maxWidth: 200 }} />
							{dataOrganization.logo?.id && (
								<button onClick={() => handleRemoveImage(dataOrganization.logo.id)}>Удалить</button>
							)}
							</div>
						)}

						<button onClick={handleSubmitTest}>Отправить</button>

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
							<textarea className={textarea} placeholder="Краткое описание" name="text_short" value={dataOrganization.text_short} onChange={handleDataOrganizaionChange} ></textarea>
							<div className={css`color: #6C6C71;font-size: 14px;line-height:1.16;text-align: right;margin-top: 8px;`}>{dataOrganization.text_short.length} / 200</div>
						</div>
					
						<div className={css`margin-bottom: 24px;`}>
							<div className={css`display: flex;gap:16px;justify-content:space-between;font-size: 14px;line-height:1.16;margin-bottom:8px;`}>
								<p className={css`color: #47474D;`}>Детальное описание</p>
								<p className={css`color: #6C6C71;`}>Детальное описание для страницы компании</p>
							</div>
							<TextEditor
								content={dataOrganization.text}
								onChange={(html) =>
								setDataOrganization((prev) => ({
									...prev,
									text: html,
								}))
								}
							/>
							{/* <div dangerouslySetInnerHTML={{ __html: dataOrganization.text }} /> */}
							<div className={css`color: #6C6C71;font-size: 14px;line-height:1.16;text-align: right;margin-top: 8px;`}>{dataOrganization.text.length} / 5000</div>
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
								<EventDropdown full={true} options={metaParameters && metaParameters?.cities} items={[]} placeholder={'Выбрать город'} />
								{/* <input className={input} type="text" placeholder="Выбрать город" /> */}
							</div>
							<div className={css`flex: 0 1 calc(50% - 12px);`}>
								<p className={css`font-size: 14px;line-height:1.16;margin-bottom: 8px;`}>Адрес</p>
								<input className={input} type="text" placeholder="Укажите адрес" name="address" value={dataOrganization.address} onChange={handleDataOrganizaionChange} />
							</div>
							<div className={css`flex: 0 1 calc(50% - 12px);`}>
								<p className={css`font-size: 14px;line-height:1.16;margin-bottom: 8px;`}>E-mail</p>
								<input className={input} type="email" placeholder="Укажите E-mail" name="emails" value={dataOrganization.emails[0] || ''} onChange={handleDataOrganizaionChange} />
							</div>
							<div className={css`flex: 0 1 calc(50% - 12px);`}>
								<p className={css`font-size: 14px;line-height:1.16;margin-bottom: 8px;`}>Номер телефона</p>
								<input className={input} type="text" placeholder="+7 (___) ___-__-__" name="phones" value={dataOrganization.phones[0] || ''} onChange={handleDataOrganizaionChange} />
							</div>
							<div className={css`flex: 0 1 100%;`}>
								<p className={css`font-size: 14px;line-height:1.16;margin-bottom: 8px;`}>Адрес сайта</p>
								<input className={input} type="text" placeholder="https://" name="link" value={dataOrganization.link} onChange={handleDataOrganizaionChange} />
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
								<input className={input} type="text" placeholder="Укажите ссылку" name="vk" value={dataOrganization.socials.vk} onChange={handleSocialChange} />
							</div>
							<div className={css`flex: 0 1 calc(33.333333% - 16px);`}>
								<p className={css`font-size: 14px;line-height:1.16;margin-bottom: 8px;`}>Telegram</p>
								<input className={input} type="text" placeholder="Укажите ссылку" name="tg" value={dataOrganization.socials.tg} onChange={handleSocialChange} />
							</div>
							<div className={css`flex: 0 1 calc(33.333333% - 16px);`}>
								<p className={css`font-size: 14px;line-height:1.16;margin-bottom: 8px;`}>YouTube</p>
								<input className={input} type="text" placeholder="Укажите ссылку" name="youtube" value={dataOrganization.socials.youtube} onChange={handleSocialChange} />
							</div>
						</div>

						<div className={css`display: flex;gap:16px;`}>
							<Button className={cx(css`color:#8553F9!important;background-color:#fff!important;`)}>Предпросмотр</Button>
							<Button onClick={()=>console.log('save', dataOrganization)}>
								<p>
									<span>Сохранить</span>
									<span>Сохранить</span>
								</p>
							</Button>
						</div>
					</UserMain>
				</div>
			</Container>
		</LkWrapper>
	)
}

export default OrganizationsAdd;