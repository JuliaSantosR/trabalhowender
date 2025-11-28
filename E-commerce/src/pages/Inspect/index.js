import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api'

import { toast } from 'react-toastify'

import { FiShoppingCart } from 'react-icons/fi'

import Loading from '../../components/Loading'

import * as S from "./styles";

export default function Inspect(props) {
    
    const history = useHistory();

    const id = props.match.params.id
    const index = parseInt(id) 

    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(false)
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        async function loadProduct() {
            setLoading(true)
            try {
                const response = await api.get(`products/${index}`)

                if (!response.data || response.data === null) {
                    toast.error('Produto não encontrado')
                    history.replace('/')
                    return
                }

                let p = {
                    category: response.data.category,
                    description: response.data.description,
                    id: response.data.id,
                    image: response.data.image,
                    price: response.data.price,
                    rating: response.data.rating,
                    title: response.data.title,
                    quantity: 1
                }

                setProduct(p)
                setQuantity(1)
                setLoading(false)
            } catch (error) {
                toast.error('Erro ao carregar produto. Tente novamente.')
                history.replace('/')
                setLoading(false)
            }
        }

        loadProduct();
    }, [index, history])

    function addItemOnCart() {
        if (!product.id) {
            toast.error('Erro ao adicionar produto ao carrinho')
            return
        }

        const myList = localStorage.getItem('products');
        let savedProducts = JSON.parse(myList) || [];
        const existingProductIndex = savedProducts.findIndex((savedProduct) => savedProduct.id === product.id)

        if (existingProductIndex !== -1) {
            savedProducts[existingProductIndex].quantity += quantity
            toast.info(`Quantidade atualizada! Total: ${savedProducts[existingProductIndex].quantity}`, {
                position: "top-left",
                autoClose: 2000,
            });
        } else {
            const productToAdd = {
                ...product,
                quantity: quantity
            }
            savedProducts.push(productToAdd)
            toast.success('Produto adicionado ao carrinho!', {
                position: "top-left",
                autoClose: 1500,
            });
        }

        localStorage.setItem('products', JSON.stringify(savedProducts));
        window.dispatchEvent(new Event('cartUpdated'));
    }

    function removeQuantity() {
        if(quantity === 1) {
            return
        }
        const newQuantity = quantity - 1
        setQuantity(newQuantity)
        setProduct({...product, quantity: newQuantity})
    }

    function addQuantity() {
        const newQuantity = quantity + 1
        setQuantity(newQuantity)
        setProduct({...product, quantity: newQuantity})
    }

    return (
        <>
            <S.Breadcrumb>
                <Link to='/'>Início</Link>
                <span>/</span>
                <Link to="/products">Produtos</Link>
                <span>/</span>
                <p>{product.title}</p>
            </S.Breadcrumb>

            {loading && (
                <Loading />
            )}

            {loading === false && (
                <S.InspectItem>
                    <S.ImageProduct>
                        <img src={product.image} />
                    </S.ImageProduct>
                    
                    <S.InfoProduct>
                        <S.TitleCompany>Dev Company</S.TitleCompany>
                        <h1>{product.title}</h1>
                        <p>{product.description}</p>
                        <span>R${product.price}</span>
                        <S.Purchase>
                            <div className="quantity">
                                <button type="button" onClick={removeQuantity}>-</button>
                                <input type="text" value={quantity} />
                                <button type="button" onClick={addQuantity} >+</button>
                            </div>
                            <button className="buttonPurchase" onClick={addItemOnCart}><FiShoppingCart /> Adicionar no carrinho</button>
                        </S.Purchase>
                    </S.InfoProduct>
                </S.InspectItem>)}
        </>
    )
}