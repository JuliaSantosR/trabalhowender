import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as S from "./styles";
import api from '../../services/api'
import { toast } from 'react-toastify'

import CardProduct from '../../components/CardProduct'
import Loading from '../../components/Loading'

export default function Search({ match }) {
    
    const campoBusca = match.params.busca

    const [allProducts, setAllProducts] = useState([])
    const [productsFilter, setProductsFilter] = useState([])
    const [loading, setLoading] = useState(false)

    function returnSearch(value) {
        setProductsFilter([])
        let array = []
        value.forEach((item) => {
            if (
                String(item.title)
                    .toLowerCase()
                    .includes(campoBusca.toLowerCase())
                ||
                String(item.description)
                    .toLowerCase()
                    .includes(campoBusca
                    .toLowerCase())
            ) {
                array.push(item)
                setProductsFilter(array)
                return
            }
        })
    }

    useEffect(() => {
        setLoading(true)
        api
            .get('/products')
            .then((response) => {
                setAllProducts([...response.data])
                returnSearch([...response.data])
                setLoading(false)
                return
            })
            .catch((err) => {
                toast.error('Erro ao buscar produtos. Tente novamente.', {
                    position: "top-center",
                    autoClose: 3000,
                });
                setLoading(false)
            })
    }, [campoBusca])

    return (
        <>
            <S.ContainerMain>

                <S.Breadcrumb>
                    <Link to='/'>Início</Link>
                    <span>/</span>
                    <Link to='#'>Minha conta</Link>
                    <span>/</span>
                    <p>Resultados</p>
                </S.Breadcrumb>

                {loading && (
                    <Loading />
                )}

                <S.Results>
                    {productsFilter.length === 0 && !loading ? (
                        <p>Nenhum produto encontrado para "{campoBusca}"</p>
                    ) : (
                        productsFilter.map(item => (
                            <CardProduct
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                price={item.price}
                                category={item.category}
                                image={item.image}
                                rating={item.rating}
                            />
                        ))
                    )}
                </S.Results>

            </S.ContainerMain>
        </>
    )
}