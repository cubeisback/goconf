import styles from './main.module.css';
import { ReactComponent as About1 } from '../images/svg/about_1.svg';
import { ReactComponent as About2 } from '../images/svg/about_2.svg';
import { ReactComponent as About3 } from '../images/svg/about_3.svg';
import { ReactComponent as FormSvg } from '../images/svg/form.svg';

export const About = () => {

    return (
        <>
            <div className={styles.promo_page}>
                <div className={styles.container}>
                    <div className={styles.breadcrumbs}>
                        <a href="/">Главная</a>
                        <p>О проекте</p>
                    </div>
                    <h1 style={{textAlign: 'center'}}>О проекте <span style={{color: '#8553F9'}}>GoCONF</span></h1>
                    <div className={styles.promo_page_text} style={{textAlign: 'center'}}>Самые интересные бизнес-мероприятия различных форматов<br/> от&nbsp;форумов до&nbsp;бизнес-семинаров по&nbsp;всей России</div>
                </div>
            </div>

            <div className={styles.about}>
                <div className={styles.container}>
                    <div className={styles.about_block}>
                        <div className={styles.about_item}>
                            <About1 />
                            <div>Бесплатно</div>
                            <p>Вы&nbsp;можете опубликовать свое событие совершенно бесплатно. Если оно не&nbsp;противоречит политике сайта, после модерации оно окажется в&nbsp;результатах поиска на&nbsp;странице мероприятия.</p>
                        </div>
                        <div className={styles.about_item}>
                            <About2 />
                            <div>Точно в цель</div>
                            <p>Ежемесячная аудитория сайта &gt; 150&nbsp;000 человек и&nbsp;мы&nbsp;постоянно работаем над привлечением новых пользователей. ЦА&nbsp;сервиса&nbsp;&mdash; это профессионалы, которые следят за&nbsp;трендами и&nbsp;регулярно посещают профильные мероприятия.</p>
                        </div>
                        <div className={styles.about_item}>
                            <About3 />
                            <div>Эффективно</div>
                            <p>Мы&nbsp;постоянно работаем над новыми форматами продвижения, чтобы сделать привлечение участников на&nbsp;ваши мероприятия максимально эффективным. Все опции можно оплатить любым удобным способом.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.b4}>
                <div className={styles.container}>
                    <div className={styles.form}>
                        <div className={styles.form_main}>
                            <div className={styles.form_title}>Дайджест событий<br/> в&nbsp;вашей почте</div>
                            <div className={styles.form_subtitle}>Раз в&nbsp;месяц присылаем подборку мероприятий по&nbsp;выбранной тематике в&nbsp;вашем городе. Никакого спама.</div>
                            <form action="">
                                <input type="text" placeholder="Ваш E-mail" />
                                <div>Тематика</div>
                                <div>Город</div>
                                <div>Подписаться</div>
                            </form>
                            <div className={styles.form_agree}>Нажимая &laquo;Подписаться&raquo;, вы&nbsp;соглашаетесь получать материалы компании GoConf на&nbsp;свой электронный адрес и&nbsp;даете согласие на&nbsp;обработку персональных данных</div>
                        </div>
                        <FormSvg />
                    </div>
                </div>
            </div>
        </>
    );
}