"use client"

import Link from "next/link";
import { Breadcrumbs, Container, PagePromo, PageTitle } from "@/styles/ui";
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from "react";
import PlusIcon from "@/public/images/svg/plus.svg";
import MinusIcon from "@/public/images/svg/minus.svg";
import { Form } from '@/components/Form';
import styled from "@emotion/styled";
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
const FaqClient = ({ initialData }) => {
	const [questions, setQuestions] = useState(initialData?.fields?.faq || null);
	// На сервере сразу открываем все вопросы, чтобы ответы попали в HTML (SSR)
	const [openIndexes, setOpenIndexes] = useState(
		initialData?.fields?.faq ? initialData.fields.faq.map((_, index) => index) : []
	);
	const [isLoading, setIsLoading] = useState(!initialData);

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

	const [pageInfo, setPageInfo] = useState(initialData || null);

	// На клиенте сразу после гидратации сворачиваем все ответы,
	// чтобы пользователь видел закрытый аккордеон, но HTML с ответами уже был отрендерен на сервере.
	useEffect(() => {
		if (initialData?.fields?.faq) {
			setOpenIndexes([]);
		}
	}, [initialData]);

	useEffect(() => {
		if (!initialData) {
			axios
				.get(getApiUrl("/backend/wp-json/pages/v2/faq/"))
				.then((response) => {
					setQuestions(response.data.fields.faq);
					setIsLoading(false);
					setPageInfo(response.data);
					console.log('faq ', response.data);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [initialData]);

    return (
        <>
            <PagePromo>
                <Container>
                    <Breadcrumbs>
                        <Link href="/">Главная</Link>
                        <p>FAQ</p>
                    </Breadcrumbs>
                    <PageTitle style={{textAlign: 'center'}}>FAQ</PageTitle>
                    <div style={{textAlign: 'center', marginBottom: 64}}>
						{/* Выберите подходящий тарифный план */}
						<div dangerouslySetInnerHTML={{ __html: pageInfo?.content }} />
					</div>
					

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
                                            <div style={{fontSize: 14, padding: '0 16px 16px 32px'}}>
												{/* {item.answer} */}
												<div dangerouslySetInnerHTML={{ __html: item.answer }} />
											</div>
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

export default FaqClient;