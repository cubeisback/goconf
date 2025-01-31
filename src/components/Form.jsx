import { css } from "@emotion/css"
import { container } from "../pages/ui"
import { ReactComponent as FormSvg } from '../images/svg/form.svg';
import DropdownInput from "./ui/DropdownInput";
import { useEffect, useState } from "react";

const options = ['Варинат 1', 'Варинат 2', 'Варинат 3', 'Варинат 4', 'Варинат 5', 'Варинат 6'];

export const Form = () => {

    //Список городов
        const [cities, setCities] = useState([]);
    
        useEffect(() => {
          const getCities = async () => {
            const url = `https://raw.githubusercontent.com/pensnarik/russian-cities/refs/heads/master/russian-cities.json`;
      
            try {
              const response = await fetch(url);
              const data = await response.json();
      
              if (data) {
                // Сортировка: Москва и Санкт-Петербург всегда на первом месте
                const sortedCities = data
                  .map(city => city.name) // Получаем список городов
                  .sort((a, b) => {
                    if (a === 'Москва') return -1;  // Москва на первом месте
                    if (b === 'Москва') return 1;
                    if (a === 'Санкт-Петербург') return -1; // Санкт-Петербург на втором месте
                    if (b === 'Санкт-Петербург') return 1;
                    return a.localeCompare(b); // Остальные города сортируем по алфавиту
                  });
      
                setCities(sortedCities); // Устанавливаем в состояние
              }
            } catch (error) {
              console.error('Ошибка при получении городов:', error);
            }
          };
      
          getCities();
        }, []);

    return (
        <div className={css`
            background-color: #22222A;
            padding: 64px 0;

            @media(max-width: 640px) {
                padding: 32px 0;
            }
        `}>
            <div className={container}>
                <div className={css`
                    border-radius: 32px;
                    background-color: #6C35EA;
                    padding: 40px;
                    display: flex;
                    gap: 16px;

                    @media(max-width: 640px) {
                        padding: 16px;
                    }

                    svg {
                        @media(max-width: 991px) {
                            display: none;
                        }
                    }
                `}>
                    <div className={css`
                        flex: 0 1 768px;
                        max-width: 768px;
                    `}>
                        <div className={css`
                            color: #fff;
                            margin-bottom: 16px;
                            font-family: Impact;
                            font-size: 56px;
                            line-height: 1.15;

                            @media(max-width: 640px) {
                                font-size: 32px;
                            }
                        `}>Дайджест событий<br/> в&nbsp;вашей почте</div>
                        <div className={css`
                            margin-bottom: 40px;
                            font-size: 18px;
                            color: #C5D7FF;
                            line-height: 1.36;
                        `}>Раз в&nbsp;месяц присылаем подборку мероприятий по&nbsp;выбранной тематике в&nbsp;вашем городе. Никакого спама.</div>
                        <form action="" className={css`
                            display: flex;
                            flex-wrap: wrap;
                            gap: 16px;
                            margin-bottom: 16px;

                            input {
                                flex: 0 1 100%;
                                max-width: 100%;
                                padding: 16px;
                                background-color: #fff;
                                border-radius: 28px;
                                color: rgba(71, 71, 77, .64);
                                border: none;
                                outline: none;
                                font-size: 14px;
                            }

                            & > div {
                                flex: 0 1 calc(33.33333% - 10.666666px);
                                max-width: calc(33.33333% - 10.666666px);

                                @media(max-width: 640px) {
                                    flex: 0 1 100%;
                                    max-width: 100%;
                                }
                            }
                        `}>
                            <input type="text" placeholder="Ваш E-mail" />
                            <DropdownInput options={options} placeholder={'Тематика'} />
                            <DropdownInput options={cities} placeholder={'Город'} />
                            
                            
                            <div className={css`
                                cursor: pointer;
                                padding: 16px;
                                border-radius: 28px;
                                background-color: #B3ED73;
                                color: #191921;
                                text-align: center;
                                font-size: 16px;
                            `}>Подписаться</div>
                        </form>
                        <div className={css`
                            color: #C5D7FF;
                            font-size: 14px;
                            line-height: 1.16;
                        `}>Нажимая &laquo;Подписаться&raquo;, вы&nbsp;соглашаетесь получать материалы компании GoConf на&nbsp;свой электронный адрес и&nbsp;даете согласие на&nbsp;обработку персональных данных</div>
                    </div>
                    <FormSvg />
                </div>
            </div>
        </div>
    )
}