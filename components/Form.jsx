import { Container } from "@/styles/ui"
// import FormSvg from "@/public/images/svg/form.svg";
import styled from "@emotion/styled";
import DropdownInput from "@/components/ui/DropdownInput";
import useFiltersStore from "@/store/useFiltersStore";

const FormWrapper = styled.div`
	background-color: #22222A;
	padding: 64px 0;

	@media(max-width: 640px) {
	    padding: 32px 0;
	}
`
const FormBlock = styled.div`
	border-radius: 32px;
    background-color: #6C35EA;
    padding: 40px;
    display: flex;
    gap: 16px;

    @media(max-width: 640px) {
        padding: 16px;
    }

    img {
		height: max-content;
		
        @media(max-width: 991px) {
            display: none;
        }
    }
`
const FormBlockLeft = styled.div`
	flex: 0 1 768px;
    max-width: 768px;
`
const FormBlockTitle = styled.div`
	color: #fff;
    margin-bottom: 16px;
    font-family: Impact;
    font-size: 56px;
    line-height: 1.15;

    @media(max-width: 640px) {
        font-size: 32px;
    }
`
const FormBlockSubtitle = styled.div`
	margin-bottom: 40px;
    font-size: 18px;
    color: #C5D7FF;
    line-height: 1.36;
`
const FormMain = styled.form`
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

    & > div,
	& > button {
        flex: 0 1 calc(33.33333% - 10.666666px);
        max-width: calc(33.33333% - 10.666666px);

        @media(max-width: 640px) {
            flex: 0 1 100%;
            max-width: 100%;
        }
    }
`
const FormBtn = styled.button`
	cursor: pointer;
    padding: 16px;
    border-radius: 28px;
    background-color: #B3ED73;
    color: #191921;
    text-align: center;
    font-size: 16px;
`
const FormAgree = styled.div`
	color: #C5D7FF;
    font-size: 14px;
    line-height: 1.16;
`

export const Form = () => {
    const filtersData = useFiltersStore((state) => state.filtersData)

    return (
        <FormWrapper>
            <Container>
                <FormBlock>
                    <FormBlockLeft>
                        <FormBlockTitle>Дайджест событий<br/> в&nbsp;вашей почте</FormBlockTitle>
                        <FormBlockSubtitle>Раз в&nbsp;месяц присылаем подборку мероприятий по&nbsp;выбранной тематике в&nbsp;вашем городе. Никакого спама.</FormBlockSubtitle>
                        <FormMain>
                            <input type="text" placeholder="Ваш E-mail" />
                            <DropdownInput options={filtersData && filtersData.subjects} placeholder={'Тематика'} type={'direction'} />
                            <DropdownInput options={filtersData && filtersData.cities} placeholder={'Город'} type={'city'} />
                            <FormBtn>Подписаться</FormBtn>
                        </FormMain>
                        <FormAgree>Нажимая &laquo;Подписаться&raquo;, вы&nbsp;соглашаетесь получать материалы компании GoConf на&nbsp;свой электронный адрес и&nbsp;даете согласие на&nbsp;обработку персональных данных</FormAgree>
                    </FormBlockLeft>
                    {/* <FormSvg /> */}
					<img src="/images/form.png" alt="" />
                </FormBlock>
            </Container>
        </FormWrapper>
    )
}