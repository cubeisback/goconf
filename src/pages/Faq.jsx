import { css, cx } from "@emotion/css";
import { breadcrumbs, container, pagePromo, pageTitle } from "./ui";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from "react";
import { ReactComponent as PlusIcon } from '../images/svg/plus.svg';
import { Form } from '../components/Form';

const faqArray = [
    {
        q: 'Как разместить мероприятие',
        a: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio, qui. Officia voluptas accusantium officiis voluptates a itaque libero laborum dolorum sequi illum dignissimos nisi, delectus, accusamus ex numquam sunt veniam.'
    },
    {
        q: 'Почему мое событие уже опубликовано на сайте',
        a: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio, qui. Officia voluptas accusantium officiis voluptates a itaque libero laborum dolorum sequi illum dignissimos nisi, delectus, accusamus ex numquam sunt veniam.'
    },
    {
        q: 'Как разместить мероприятие',
        a: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio, qui. Officia voluptas accusantium officiis voluptates a itaque libero laborum dolorum sequi illum dignissimos nisi, delectus, accusamus ex numquam sunt veniam.'
    }
]

export const Faq = () => {

    const [openIndexes, setOpenIndexes] = useState([]);

    // Функция для обработки клика
    const handleToggle = (index) => {
        if (openIndexes.includes(index)) {
            // Если вопрос уже открыт, то закрываем его (удаляем индекс из массива)
            setOpenIndexes(openIndexes.filter(i => i !== index));
        } else {
            // Если вопрос закрыт, то открываем его (добавляем индекс в массив)
            setOpenIndexes([...openIndexes, index]);
        }
    };

    return (
        <>
            <div className={pagePromo}>
                <div className={container}>
                    <div className={breadcrumbs}>
                        <a href="/">Главная</a>
                        <p>FAQ</p>
                    </div>
                    <h1 className={cx(pageTitle, css`text-align: center;`)}>FAQ</h1>
                    <div className={css`text-align: center; margin-bottom: 64px;`}>Выберите подходящий тарифный план</div>

                    <div className={css`
                        display: flex;
                        flex-direction: column;
                        gap: 32px;
                    `}>
                    
                        {faqArray.map((item, index) => (
                            <div key={index} className={css`
                                background-color: #fff;
                                border-radius: 28px;
                            `}>
                                <div
                                    className={css`
                                        cursor: pointer;
                                        padding: 16px 16px 16px 32px;
                                        display: flex;
                                        justify-content: space-between;
                                        align-items: center;
                                        font-size: 20px;
                                        font-weight: 500;
                                        line-height: 1.4;
                                    `}
                                    onClick={() => handleToggle(index)}
                                >
                                    {item.q}
                                    <PlusIcon />
                                </div>
                                <AnimatePresence>
                                    {openIndexes.includes(index) && (
                                        <motion.div
                                            initial={{opacity: 0, height: 0}}
                                            animate={{opacity: 1, height: 'auto'}}
                                            exit={{opacity: 0, height: 0}}
                                            transition={{ duration: .3 }}
                                            className={css`
                                                overflow: hidden;
                                                
                                            `}
                                        >
                                            <div className={css`font-size: 14px; padding: 0 16px 16px 32px;`}>{item.a}</div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <Form />
        </>
    );
}
