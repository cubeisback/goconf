import styles from './main.module.css';
import { ReactComponent as FormSvg } from '../images/svg/form.svg';

export const Org = () => {

    return (
        <>
            <div className={styles.promo_page}>
                <div className={styles.container}>
                    <div className={styles.breadcrumbs}>
                        <a href="/">Главная</a>
                        <p>Организаторам</p>
                    </div>
                    <h1 style={{textAlign: 'center'}}>Организаторам</h1>
                    <div className={styles.promo_page_text} style={{textAlign: 'center'}}>Платные опции доступны всем организаторам, зарегистрированным на&nbsp;сайте.<br/> После регистрации вам доступна бесплатная версия карточки мероприятия (<span>тариф Базовый</span>)</div>
                </div>
            </div>

            <div className={styles.org_1}>
                <div className={styles.container}>
                    <div className={styles.org_1_title}>Тарифы</div>
                    <div className={styles.org_1_list}>
                        <div>1 месяц</div>
                        <div>3 месяца <span>- 10%</span></div>
                        <div>6 месяцев <span>- 15%</span></div>
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