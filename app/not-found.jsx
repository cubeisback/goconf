'use client'

import { Button, Container, PageNotFound, PageNotFoundBlock, PageNotFoundBlockImg, PageNotFoundBlockInfo, PageNotFoundBlockInfoImg, PageNotFoundBlockInfoText, PageNotFoundBlockInfoTitle } from "@/styles/ui";
import Img404 from "@/public/images/svg/404.svg";
import { MainEvents } from "@/components/MainEvents";

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
                            <Button button_404="true">На главную</Button>
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