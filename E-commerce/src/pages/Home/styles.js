import styled from 'styled-components'
import theme from "../../styles/theme"

export const Container = styled.div``

export const SeeProductsCards = styled.div`
    display: flex;
    max-width: 95vw;
    justify-content: center;
    flex-wrap: wrap;
    margin: 2rem auto 2rem auto;
    gap: 1rem;
`

export const ProductCard = styled.div`
    display: flex;
    position: relative;
    width: 300px;
    height: 300px;
    flex: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${theme.black};
    cursor: pointer;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: 0.5s;
        opacity: 0.7;
        &:hover {
        opacity: 0.5;
    }
    }


`

export const ContentProductCard = styled.div`
    display: flex;
    position: absolute;
    flex-direction: column;
    align-items: center;
    color: #fff;

    h1 {
        font-size: 1.7rem;
    }

    p {
        margin-top: 10px;
    }

    a {
        padding: 7px 10px;
        margin-top: 10px;
        font-weight: ${theme.fonts.weight.boldest};
        color: ${theme.white};
        background: rgb(238, 74, 123);
        border-radius: 3px;
        text-transform: uppercase;
        &:hover {
            filter: brightness(1.1);
        }
    }
`

export const TitleProducts = styled.div`
    display: flex;
    margin: 2.5rem auto 1rem auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90%;
    padding: 0 0 3rem 0;

    border-radius: 12px;

    h1 {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        font-size: 1.5rem;
        color: ${theme.gray2};
        text-transform: uppercase;
        
        @media (max-width: 550px){
        text-align: center;
    }
    }

`

export const ProductsWrapper = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    background: linear-gradient(180deg, ${theme.white2} 0%, ${theme.white3} 100%);
    padding: 3rem 0 89px 0;
`

export const SomeProducts = styled.div`
    display: flex;
    width: 82vw;
    height: 100%;
    margin: 0 auto;

    ul {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        justify-content: center;
        gap: 5rem;
    }
`

export const ButtonSeeAllProducts = styled.div`
    display: flex;

     a {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 350px;
        height: 40px;
        margin: 2rem auto 0 auto;
        background: rgb(238, 74, 123);
        font-weight: ${theme.fonts.weight.boldest};
        color: #fff;
        text-transform: uppercase;
        border-radius: 3px;
        &:hover {
                filter: brightness(1.1);
        }
}
`
