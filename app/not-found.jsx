'use client'

import { Button, Container, PageNotFound, PageNotFoundBlock, PageNotFoundBlockImg, PageNotFoundBlockInfo, PageNotFoundBlockInfoImg, PageNotFoundBlockInfoText, PageNotFoundBlockInfoTitle } from "@/styles/ui";
import Img404 from "@/public/images/svg/404.svg";
import { MainEvents } from "@/components/MainEvents";
import Link from "next/link";

export default function NotFoundPage() {

    return (
        <>
            <PageNotFound>
                <Container>
                    <PageNotFoundBlock>
                        <PageNotFoundBlockInfo>
                            <PageNotFoundBlockInfoImg>(｡•́︿•̀｡) 404</PageNotFoundBlockInfoImg>
                            <PageNotFoundBlockInfoTitle>Страница не найдена</PageNotFoundBlockInfoTitle>
                            <PageNotFoundBlockInfoText>К&nbsp;сожалению мы&nbsp;ничего не&nbsp;нашли по&nbsp;вашему запросу</PageNotFoundBlockInfoText>
							<Link href="/">
								<Button button_404="true">
									<p>
										<span>На главную</span>
										<span>На главную</span>
									</p>
								</Button>
							</Link>
                        </PageNotFoundBlockInfo>
                        <PageNotFoundBlockImg>
                            <Img404 />
                        </PageNotFoundBlockImg>
                    </PageNotFoundBlock>
                </Container>
            </PageNotFound>
            
            <MainEvents />
        </>
    )
}