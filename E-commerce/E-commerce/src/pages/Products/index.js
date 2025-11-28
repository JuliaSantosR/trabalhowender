import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { ApiContext } from '../../contexts/apiContext'

import CardProduct from '../../components/CardProduct'

import * as S from "./styles";

export default function Products() {
    const { allProducts } = useContext(ApiContext)

    return (
        <>
            <S.Breadcrumb>
                <Link to='/'>Início</Link>
                <span>/</span>
                <p>Produtos</p>
            </S.Breadcrumb>

            <S.AllProducts>
                <ul>
                    {allProducts.map((item) => (
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
            </S.AllProducts>
        </>
    )
}




