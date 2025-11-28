import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { ApiContext } from '../../contexts/apiContext'

import CardProduct from '../../components/CardProduct'

import * as S from "./styles";

export default function Men() {
    const { menProducts } = useContext(ApiContext)

    return (
        <>
            <S.Breadcrumb>
                <Link to='/'>Início</Link>
                <span>/</span>
                <p>Masculino</p>
            </S.Breadcrumb>

            <S.SomeProducts>
                <ul>
                    {menProducts.map((item) => (
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
            </S.SomeProducts>
        </>
    )
}