import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AuthContext } from '../../contexts/auth'
import { useHistory } from 'react-router-dom'

import * as S from "./styles";

export default function Login() {
    
    const history = useHistory();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { logIn, loadingAuth } = useContext(AuthContext)

    async function formSubmit(e) {
        e.preventDefault();

        if(email !== '' && password !== '') {
            const result = await logIn(email, password)
            if (result && result.success) {
                history.push('/')
            }
        } else {
            toast.error('Preencha todos os campos')
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
                    <p>Login</p>
                </S.Breadcrumb>

                <S.ContainerForm onSubmit={formSubmit}>
                    <div>

                        <div className='divLabelInput'>
                            <label>
                                Endereço de Email
                                <input
                                    type="email"
                                    placeholder='youremail@email.com'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </label>
                        </div>

                        <div className='divLabelInput'>
                            <label>
                                Senha
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                {" "}
                            </label>
                        </div>

                        <S.ForgotPassword>
                            <Link to='/reset'>Esqueceu a senha?</Link>
                        </S.ForgotPassword>

                        <S.ButtonLogin>
                            <button type="submit" disabled={loadingAuth}>
                                {loadingAuth ? 'Entrando...' : 'Entrar'}
                            </button>
                        </S.ButtonLogin>
                        <p>Não possui uma conta? <Link to='/register'>Registre-se</Link></p>
                        
                    </div>
                </S.ContainerForm>

            </S.ContainerMain>

        </>
    )
}