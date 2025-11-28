import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { toast } from 'react-toastify';

import * as S from "./styles";

const schema = yup
    .object({
        email: yup
            .string()
            .email("Digite um email válido")
            .required("O email é obrigatório"),
        cep: yup
            .string()
            .required("O CEP é obrigatório")
            .test('cep-format', 'CEP inválido (deve ter 8 dígitos)', function(value) {
                if (!value) return false;
                const numbers = value.replace(/\D/g, '');
                return numbers.length === 8;
            }),
    })
    .required();

export default function Delivery() {
    const history = useHistory();
    const [productsOnCart, setProductsOnCart] = useState([])
    const [total, setTotal] = useState(0)
    const [receiveOffers, setReceiveOffers] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

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
        productsOnCart.forEach((item) => {
            totalPrice += item.price * item.quantity
        })
        setTotal(totalPrice.toFixed(2))
    }, [productsOnCart])

    function formatCEP(value) {
        const numbers = value.replace(/\D/g, '');
        if (numbers.length <= 5) {
            return numbers;
        }
        return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
    }

    function onSubmit(data) {
        try {
            const cepFormatted = data.cep ? data.cep.replace(/\D/g, '') : '';
            
            const deliveryData = {
                email: data.email,
                cep: cepFormatted,
                receiveOffers: receiveOffers
            };
            
            localStorage.setItem('deliveryData', JSON.stringify(deliveryData));
            
            localStorage.setItem('products', JSON.stringify([]));
            window.dispatchEvent(new Event('cartUpdated'));
            
            setProductsOnCart([]);
            
            toast.success('Compra efetuada com sucesso!', {
                position: "top-center",
                autoClose: 3000,
            });
            
            setTimeout(() => {
                history.push('/');
            }, 1500);
        } catch (error) {
            console.error('Erro ao processar compra:', error);
            toast.error('Erro ao processar compra. Tente novamente.');
        }
    }

    return (
        <>
            <S.Breadcrumb>
                <Link to='/'>Início</Link>
                <span>/</span>
                <p>Entrega</p>
            </S.Breadcrumb>

            <S.ContainerMain>
                <S.ContainerData>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <S.Form>
                            <h3>DADOS DE CONTATO</h3>
                            <label>
                                <input
                                    className={`inputEmail ${errors.email ? 'error' : ''}`}
                                    type="email"
                                    placeholder="Email"
                                    {...register('email', { required: true })}
                                />
                                {errors.email && <span className="error-message">{errors.email?.message}</span>}
                            </label>
                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                <input
                                    id="check"
                                    type="checkbox"
                                    checked={receiveOffers}
                                    onChange={e => setReceiveOffers(e.target.checked)}
                                />
                                <label htmlFor="check" className="labelCheck" style={{ marginLeft: '10px', cursor: 'pointer' }}>
                                    Quero receber ofertas e novidades por email
                                </label>
                            </div>
                        </S.Form>
                        <S.DivMid>
                            <h3>ENTREGA</h3>
                            <select disabled>
                                <option>Brasil</option>
                            </select>
                            <label>
                                <input
                                    type="text"
                                    placeholder="CEP (ex: 12345-678)"
                                    maxLength={9}
                                    {...register('cep', {
                                        required: true,
                                        onChange: e => {
                                            const formatted = formatCEP(e.target.value)
                                            e.target.value = formatted
                                        },
                                    })}
                                    className={errors.cep ? 'error' : ''}
                                />
                                {errors.cep && <span className="error-message">{errors.cep?.message}</span>}
                            </label>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://buscacepinter.correios.com.br/app/endereco/index.php"
                            >
                                <span>Não sei meu CEP</span>
                            </a>
                        </S.DivMid>
                        <S.ButtonContinue>
                            <button type="submit">Continuar</button>
                        </S.ButtonContinue>
                    </form>
                </S.ContainerData>
                <S.ContainerTotal as="div">
                    {productsOnCart.map((item, index) => (
                        <S.Product key={index}>
                            <img src={item.image} alt={item.title} />
                            <p>
                                <span>{item.quantity}</span> x {item.title}
                            </p>
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
                            </>
                        )}
                    </S.Total>
                </S.ContainerTotal>
            </S.ContainerMain>
        </>)
}
