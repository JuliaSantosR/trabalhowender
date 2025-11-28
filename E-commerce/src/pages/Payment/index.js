import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import * as S from "./styles";

export default function Payment() {
    const history = useHistory();
    const [productsOnCart, setProductsOnCart] = useState([])
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const listaProducts = localStorage.getItem('products')
        const products = JSON.parse(listaProducts) || []
        setProductsOnCart(products)

        if (products.length === 0) {
            toast.info('Adicione produtos ao carrinho antes de continuar')
            history.push('/products')
        }
    }, [history])

    useEffect(() => {
        let totalPrice = 0;

        productsOnCart.forEach((item, index) => {
            totalPrice += item.price * item.quantity
        })
        setTotal(totalPrice.toFixed(2))
    }, [productsOnCart])

    const handlePaymentSuccess = () => {
        localStorage.setItem('products', JSON.stringify([]));
        window.dispatchEvent(new Event('cartUpdated'));
        toast.success('Pagamento realizado com sucesso!', {
            position: "top-center",
            autoClose: 3000,
        });
        setTimeout(() => {
            history.push('/');
        }, 2000);
    }

    return (
        <>
            <S.Breadcrumb>
                <Link to='/'>Início</Link>
                <span>/</span>
                <Link to='/delivery'>Entrega</Link>
                <span>/</span>
                <p>Pagamento</p>
            </S.Breadcrumb>

            <S.ContainerMain>
                <S.ContainerLeft>
                    <div>
                        <S.Form>
                            <h3>Pagamento Local (Placeholder)</h3>
                            <div style={{ margin: '16px 0' }}>
                                <button 
                                    type="button" 
                                    onClick={handlePaymentSuccess}
                                    style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>
                                    Efetuar Pagamento Simulado
                                </button>
                            </div>
                            <p style={{marginTop:'8px'}}>Pagamento via gateway externo removido; este é apenas um fluxo fictício.</p>
                        </S.Form>
                    </div>
                </S.ContainerLeft>

                <S.ContainerRight>
                    {productsOnCart.map((item, index) => (
                        <S.Product key={index}>
                            <img src={item.image} alt={item.title} />
                            <p><span>{item.quantity}</span> x {item.title}</p>
                            <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                        </S.Product>
                    ))}
                    <S.Total>
                        {productsOnCart.length === 0 ? (
                            <p>Sem produtos no carrinho.</p>
                        ) : (
                            <>
                                <span>Total:</span>
                                <span>R$ {total}</span>
                            </>)}
                    </S.Total>
                </S.ContainerRight>
            </S.ContainerMain>
        </>
    )
}