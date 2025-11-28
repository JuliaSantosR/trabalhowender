import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth'
import { useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { toast } from 'react-toastify';

import * as S from "./styles";

const schema = yup
    .object({
        name: yup
            .string()
            .required("O nome é obrigatório"),
        email: yup
            .string()
            .email("Digite um email válido")
            .required("O email é obrigatório"),
        password: yup
            .string()
            .min(6, "A senha deve ter pelo menos 6 dígitos")
            .required("A senha é obrigatória"),
        confirmPassword: yup
            .string()
            .required("A Confirmação de Senha é obrigatória")
            .oneOf([yup.ref("password")], "As senhas devem ser iguais"),
    })
    .required();

export default function Register() {
    const history = useHistory();
    const { signUp, loadingAuth } = useContext(AuthContext)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    async function formSubmit(data) {
        if (data.password !== data.confirmPassword) {
            toast.error('As senhas não coincidem');
            return;
        }

        const result = await signUp(data.email, data.name, data.password);
        if (result && result.success) {
            setTimeout(() => {
                history.push('/');
            }, 500);
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
                    <p>Registro</p>
                </S.Breadcrumb>

                <S.ContainerForm>
                    <form onSubmit={handleSubmit(formSubmit)}>
                        <div className='divLabelInput'>
                            <label>
                                Nome completo
                                <input
                                    className={`input ${errors.name ? "error" : ""}`}
                                    type="text"
                                    placeholder='Seu nome completo'
                                    {...register("name", { required: true })}
                                />
                                {errors.name && <span>{errors.name?.message}</span>}
                            </label>
                        </div>
                        <div className='divLabelInput'>
                            <label>
                                Endereço de Email
                                <input
                                    className={`input ${errors.email ? "error" : ""}`}
                                    type="email"
                                    placeholder='seuemail@email.com'
                                    {...register("email", { required: true })}
                                />
                                {errors.email && <span>{errors.email?.message}</span>}
                            </label>
                        </div>
                        <div className='divLabelInput'>
                            <label>
                                Senha
                                <input
                                    className={`input ${errors.password ? "error" : ""}`}
                                    type="password"
                                    placeholder='Mínimo 6 caracteres'
                                    {...register("password", { required: true })}
                                />
                                {errors.password && <span>{errors.password?.message}</span>}
                            </label>
                        </div>
                        <div className='divLabelInput'>
                            <label>
                                Confirmação de senha
                                <input
                                    className={`input ${errors.confirmPassword ? "error" : ""}`}
                                    type="password"
                                    placeholder='Digite a senha novamente'
                                    {...register("confirmPassword", { required: true })}
                                />
                                {errors.confirmPassword && (<span>{errors.confirmPassword?.message}</span>)}
                            </label>
                        </div>
                        <S.ButtonRegister>
                            <button type="submit" disabled={loadingAuth}>
                                {loadingAuth ? 'Registrando...' : 'Registrar'}
                            </button>
                        </S.ButtonRegister>
                        <p>Você já possui uma conta? <Link to='/login'>Entrar</Link></p>
                    </form>
                </S.ContainerForm>

            </S.ContainerMain>

        </>
    )
}