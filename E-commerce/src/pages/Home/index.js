import React, { useContext } from 'react';
import { Link } from 'react-router-dom'

import { ApiContext } from '../../contexts/apiContext'

import CardProduct from '../../components/CardProduct'
import Loading from '../../components/Loading'
import backWomen from '../../assets/backWomen.jpg'
import backMen from '../../assets/backMen.jpg'

import * as S from "./styles";

export default function Home() {
    
    const { allProducts, loading } = useContext(ApiContext)

    const blockTitles = [
      "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet"
    ];

    const filteredProducts = allProducts.filter(
      item => !blockTitles.includes(item.title)
    );

    let productsHome = filteredProducts.slice(0, 5)

    return (
        <S.Container>
            <S.SeeProductsCards>
                <S.ProductCard>
                    <img src={backMen} alt="Imagem roupa masculina" />
                    <S.ContentProductCard>
                        <h1>Roupas masculinas</h1>
                        <p>Outono/Inverno 2025</p>
                        <Link to="/men">Ver produtos</Link>
                    </S.ContentProductCard>
                </S.ProductCard>

                <S.ProductCard>
                    <img src={backWomen} alt="Imagem roupa feminina" />
                    <S.ContentProductCard>
                        <h1>Roupas femininas</h1>
                        <p>Outono/Inverno 2025</p>
                        <Link to="/women">Ver produtos</Link>
                    </S.ContentProductCard>
                </S.ProductCard>
            </S.SeeProductsCards>


            <S.ProductsWrapper>
                <S.TitleProducts>
                    <h1>Conheça nossos principais produtos</h1>
                    <p>Em breve... Novo estoque!</p>
                </S.TitleProducts>

                {loading ? (
                    <Loading />
                ) : (

                    <S.SomeProducts>
                        <ul>
                            {productsHome.map((item) => (
                                <CardProduct
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    price={item.price}
                                    category={item.category}
                                    image={item.image}
                                    rating={item.rating}
                                />
                            ))}
                        </ul>
                    </S.SomeProducts>)}

                {loading === false && (
                    <S.ButtonSeeAllProducts>
                        <Link to="/products">Ver todos produtos</Link>
                    </S.ButtonSeeAllProducts>)}
            </S.ProductsWrapper>
        </S.Container>
    )
}