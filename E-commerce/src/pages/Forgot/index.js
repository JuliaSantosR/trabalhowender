import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { AuthContext } from '../../contexts/auth';

import * as S from "./styles";

const schema = yup
    .object({
        email: yup
            .string()
            .email("Digite um email válido")
            .required("O email é obrigatório"),
    })
    .required();

export default function Forgot() {
    const { resetPassword, loadingAuth } = useContext(AuthContext);
    const [emailSent, setEmailSent] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    async function onSubmit(userData) {
        const result = await resetPassword(userData.email);
        if (result && result.success) {
            setEmailSent(true);
        }
    }

    return (
        <>

            <S.ContainerMain>
                <S.Breadcrumb>
                    <Link to='/'>Início</Link>
                    <span>/</span>
                    <Link to='#'>Minha conta</Link>
                    <span>/</span>
                    <p>Recuperar Senha</p>
                </S.Breadcrumb>

                {emailSent ? (
                    <S.Information>
                        <p>Senha redefinida com sucesso! Sua nova senha foi gerada. Verifique a mensagem acima para ver a nova senha.</p>
                        <S.DivButton>
                            <Link to='/login'>
                                <button>Voltar para Login</button>
                            </Link>
                        </S.DivButton>
                    </S.Information>
                ) : (
                    <>
                        <S.Information>
                            <p>Digite seu email para redefinir sua senha. Uma nova senha será gerada automaticamente.</p>
                        </S.Information>

                        <S.ContainerForm onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <div className='divLabelInput'>
                                    <label>
                                        Endereço de Email
                                        <input
                                            type="email"
                                            placeholder='seuemail@email.com'
                                            {...register("email", { required: true })}
                                        />
                                        {errors.email && <span> {errors.email?.message}</span>}
                                    </label>
                                </div>
                                <S.DivButton>
                                    <button type="submit" disabled={loadingAuth}>
                                        {loadingAuth ? 'Processando...' : 'Redefinir Senha'}
                                    </button>
                                </S.DivButton>
                                <p>Voltar para <Link to='/login'>Login</Link></p>
                            </div>
                        </S.ContainerForm>
                    </>
                )}
            </S.ContainerMain>

        </>
    )
}