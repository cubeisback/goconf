"use client"

import Link from "next/link";
import { Breadcrumbs, Container, PagePromo, PageTitle } from "@/styles/ui";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from "react";
import PlusIcon from "@/public/images/svg/plus.svg";
import MinusIcon from "@/public/images/svg/minus.svg";
import { Form } from '@/components/Form';
import styled from "@emotion/styled";
import { useEffect } from "react";
import axios from "axios";
import { getApiUrl } from "@/functions/functions";

const FaqBlock = styled.div`
	display: flex;
    flex-direction: column;
    gap: 32px;
`
const FaqItem = styled.div`
	cursor: pointer;
    padding: 16px 16px 16px 32px;
    display: flex;
    gap: 16px;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    font-weight: 500;
    line-height: 1.4;

    @media(max-width: 767px) {
        font-size: 18px;
        line-height: 1.2;
    }

    p {
        flex: 1;
    }

    svg {
        flex: 0 1 48px;
        max-width: 48px;
    }
`
const SkeletonItem = styled.div`
    background-color: rgb(255, 255, 255);
    border-radius: 28px;
	height: 80px;
	animation: pulse 1.5s infinite;

	@keyframes pulse {
		0% { opacity: 1 }
		50% { opacity: 0.5 }
		100% { opacity: 1 }
	}
`
//TODO SEO
const Faq = () => {
	const [questions, setQuestions] = useState(null)
	const [openIndexes, setOpenIndexes] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

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

	useEffect(() => {
		axios
		  .get(getApiUrl("/backend/wp-json/pages/v2/faq/"))
		  .then((response) => {
			setQuestions(response.data.fields.faq);
			setIsLoading(false)
			console.log('faq ', response.data);
		  })
		  .catch((error) => {
			console.log(error);
		  });
	}, []);

    return (
        <>
            <PagePromo>
                <Container>
                    <Breadcrumbs>
                        <Link href="/">Главная</Link>
                        <p>FAQ</p>
                    </Breadcrumbs>
                    <PageTitle style={{textAlign: 'center'}}>FAQ</PageTitle>
                    <div style={{textAlign: 'center', marginBottom: 64}}>Выберите подходящий тарифный план</div>

                    <FaqBlock>
						{isLoading ? (
							<>
								{[...Array(3)].map((_, i) => (
									<SkeletonItem key={i}></SkeletonItem>
								))}
							</>
						) : 
                        questions.map((item, index) => (
                            <div key={index} style={{backgroundColor: '#fff', borderRadius: 28}}>
                                <FaqItem
                                    onClick={() => handleToggle(index)}
                                >
                                    <p>{item.question}</p>
                                    {openIndexes.includes(index) ? <MinusIcon /> : <PlusIcon /> }
                                </FaqItem>
                                <AnimatePresence>
                                    {openIndexes.includes(index) && (
                                        <motion.div
                                            initial={{opacity: 0, height: 0}}
                                            animate={{opacity: 1, height: 'auto'}}
                                            exit={{opacity: 0, height: 0}}
                                            transition={{ duration: .3 }}
											style={{overflow: 'hidden'}}
                                        >
                                            <div style={{fontSize: 14, padding: '0 16px 16px 32px'}}>{item.answer}</div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </FaqBlock>
                </Container>
            </PagePromo>
            
            <Form />
        </>
    );
}

export default Faq;