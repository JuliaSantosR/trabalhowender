import styled from 'styled-components'
import theme from '../../styles/theme'

export const Container = styled.div`
    display: flex;
    width: 100vw;
    flex-direction: column;
    justify-content: center;
    font-family: ${theme.fonts.primary};
`

export const ServicesFooter = styled.div`
    display: flex;
    width: 90%;
    justify-content: space-evenly;
    flex-wrap: wrap;
    margin: 2rem auto;
    color: ${theme.gray3};

    @media (max-width: 1280px){
        gap: 10px;
    }
`

export const Service = styled.div`
    display: flex;
    width: 350px;
    align-items: center;

    svg {
        font-size: 2rem;
        margin-right: 10px;
    }

    @media (max-width: 1280px){
        width: 341px;
    }

    @media (max-width: 510px){
        width: 300px;
    }

    &:nth-child(1) {
        border-right: 2px solid ${theme.black};
        @media (max-width: 768px){
            border-right: 2px solid transparent;
        }
    }
    &:nth-child(2) {
        border-right: 2px solid ${theme.black};
        @media (max-width: 768px){
            border-right: 2px solid transparent;
        }
    }
`

export const TextService = styled.div`
    font-size: 0.6rem;

    h1 {
        text-transform: uppercase;
    }

    p {
        font-size: 1rem;
    }

    @media (max-width: 768px){
        font-size: 0.5rem;
    }
`

export const BottomFooter = styled.div`
    display: flex;
    width: 90%;
    justify-content: space-between;
    align-items: center;
    margin: 10px auto;

        .createdBy {
            display: flex;
            font-size: 1rem;
        
            strong {
                font-weight: ${theme.fonts.weight.boldest};
            }
        }

        p {
            font-size: 0.8rem;
            font-weight: ${theme.fonts.weight.medium};
            text-transform: uppercase;
            
            @media (max-width: 768px){
            text-align: center;
        }

        @media (max-width: 768px){
            flex-direction: column;
        }
    }
`

