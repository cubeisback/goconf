import { css } from '@emotion/css';
import { container } from '../../pages/ui';
import { useTheme } from '@emotion/react';
import formats_ex_1 from '../../images/formats_1.jpg';

const formatsArray = [
    {
        name: 'Бизнес-семинары',
        count: 125
    },
    {
        name: 'Бизнес-семинары',
        count: 125
    },
    {
        name: 'Бизнес-семинары',
        count: 125
    },
    {
        name: 'Бизнес-семинары',
        count: 125
    },
    {
        name: 'Бизнес-семинары',
        count: 125
    },
    {
        name: 'Бизнес-семинары',
        count: 125
    },
    {
        name: 'Бизнес-семинары',
        count: 125
    },
    {
        name: 'Бизнес-семинары',
        count: 125
    },
    {
        name: 'Бизнес-семинары',
        count: 125
    },
    {
        name: 'Бизнес-семинары',
        count: 125
    },
    {
        name: 'Бизнес-семинары',
        count: 125
    },
    {
        name: 'Бизнес-семинары',
        count: 125
    },
    {
        name: 'Бизнес-семинары',
        count: 125
    },
    {
        name: 'Бизнес-семинары',
        count: 125
    },
    {
        name: 'Бизнес-семинары',
        count: 125
    },
    {
        name: 'Бизнес-семинары',
        count: 125
    },
]

export const Formats = () => {
    const theme = useTheme();

    return (
        <div className={css`
            background-color: #F5F7FA;
            padding: 120px 0;
        `}>
            <div className={container}>
                <div className={css`
                    text-align: center;
                    margin-bottom: 24px;
                    font-family: Impact;
                    font-size: 56px;
                    line-height: 1.15;

                    & > span {
                        color: ${theme.colors.purple}
                    }
                `}>Популярные форматы <span>GoCONF</span></div>
                <div className={css`
                    font-size: 20px;
                    line-height: 1.14;
                    color: #47474D;
                    margin-bottom: 96px;
                    text-align: center;
                `}>Самые интересные бизнес-мероприятия различных форматов от&nbsp;форумов до&nbsp;бизнес-семинаров по&nbsp;всей России</div>
            </div>
            <div className={css`
                // overflow-x: hidden;
            `}>
            <div className={css`
                display: flex;
                gap: 24px;
                width: 10000px;
                animation: scroll-left 20s linear infinite;

                @keyframes scroll-left {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-1240px);
                    }
                }
            `}>
                {formatsArray.map((item, index) => (
                    <div key={index} className={css`
                        max-width: 224px;
                        border-radius: 24px;
                        overflow: hidden;
                        position: relative;
                        transition: ${theme.transition};

                        &:hover {
                            transform: scale(1.05);
                        }
                    `}>
                        <img src={formats_ex_1} alt="" />
                        <div className={css`
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            height: 100%;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            padding: 16px;
                        `}>
                            <div className={css`
                                font-size: 18px;
                                color: #fff;
                                font-weight: 500;
                                line-height: 1.36;
                            `}>{item.name}</div>
                            <div className={css`
                                padding: 2px 4px;
                                border-radius: 4px;
                                background: rgba(255, 255, 255, 0.08);
                                backdrop-filter: blur(8px);
                                line-height: 1.28;
                                color: #fff;
                                width: max-content;
                            `}>{item.count} событий</div>
                        </div>
                    </div>
                ))}
            </div>
            </div>
        </div>
    );
}