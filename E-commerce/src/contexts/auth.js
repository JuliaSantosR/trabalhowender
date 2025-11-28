import React, { useState, createContext, useEffect } from 'react';
import { toast } from 'react-toastify'
import { authApi } from '../services/authApi'

export const AuthContext = createContext({})

const STORAGE_CURRENT_USER_KEY = 'SistemaUser';
const STORAGE_TOKEN_KEY = 'authToken';

function AuthProvider ({ children }) {
    const [user, setUser] = useState(null); 
    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loadingUser, setLoadingUser] = useState(true)

    // Carrega o usuário do localStorage ao iniciar
    useEffect(() => {
        function loadStorage() {
            try {
                const storageUser = localStorage.getItem(STORAGE_CURRENT_USER_KEY);
                const storageToken = localStorage.getItem(STORAGE_TOKEN_KEY);
                
                if(storageUser && storageToken){
                    try {
                        const parsedUser = JSON.parse(storageUser);
                        if (parsedUser && parsedUser.email) {
                            setUser(parsedUser);
                        } else {
                            localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
                            localStorage.removeItem(STORAGE_TOKEN_KEY);
                        }
                    } catch (error) {
                        console.error('Erro ao carregar usuário do storage:', error);
                        localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
                        localStorage.removeItem(STORAGE_TOKEN_KEY);
                    }
                }
            } catch (error) {
                console.error('Erro ao acessar localStorage:', error);
            } finally {
                setLoadingUser(false);
            }
        }
        loadStorage();
    }, []);

    // Função para cadastrar novo usuário
    async function signUp(email, name, password) {
        setLoadingAuth(true);
        
        try {
            // Validação básica
            if (!email || !name || !password) {
                toast.error('Preencha todos os campos');
                setLoadingAuth(false);
                return { success: false, error: 'Campos obrigatórios não preenchidos' };
            }

            if (password.length < 6) {
                toast.error('A senha deve ter pelo menos 6 caracteres');
                setLoadingAuth(false);
                return { success: false, error: 'Senha muito curta' };
            }

            // Chama a API do backend
            const response = await authApi.register(name, email, password);
            
            if (response.success) {
                // Salva dados do usuário e token
                const userData = {
                    id: response.user.id,
                    name: response.user.name,
                    email: response.user.email
                };

                setUser(userData);
                storageUser(userData);
                localStorage.setItem(STORAGE_TOKEN_KEY, response.token);
                toast.success('Cadastro efetuado com sucesso!');
                setLoadingAuth(false);
                return { success: true };
            } else {
                toast.error(response.message || 'Erro ao criar conta');
                setLoadingAuth(false);
                return { success: false, error: response.message };
            }
        } catch (error) {
            setLoadingAuth(false);
            console.error('Erro no cadastro:', error);
            toast.error(error.message || 'Ops, algo deu errado ao criar a conta.');
            return { success: false, error: error.message };
        }
    }

    function storageUser(data) {
        localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(data));
    }

    function signOut() {
        localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
        localStorage.removeItem(STORAGE_TOKEN_KEY);
        setUser(null);
        toast.info('Logout realizado com sucesso');
    }

    // Função para fazer login
    async function logIn(email, password) {
        setLoadingAuth(true);
        
        try {
            if (!email || !password) {
                toast.error('Preencha todos os campos');
                setLoadingAuth(false);
                return { success: false, error: 'Campos obrigatórios não preenchidos' };
            }

            // Chama a API do backend
            const response = await authApi.login(email, password);
            
            if (response.success) {
                // Salva dados do usuário e token
                const userData = {
                    id: response.user.id,
                    name: response.user.name,
                    email: response.user.email
                };

                setUser(userData);
                storageUser(userData);
                localStorage.setItem(STORAGE_TOKEN_KEY, response.token);
                toast.success('Bem vindo de volta!');
                setLoadingAuth(false);
                return { success: true };
            } else {
                toast.error(response.message || 'Email ou senha incorretos');
                setLoadingAuth(false);
                return { success: false, error: response.message };
            }
        } catch (error) {
            setLoadingAuth(false);
            console.error('Erro no login:', error);
            toast.error(error.message || 'Ops, algo deu errado!');
            return { success: false, error: error.message };
        }
    }

    async function resetPassword(email) {
        setLoadingAuth(true);
        
        try {
            if (!email) {
                toast.error('Digite um email válido');
                setLoadingAuth(false);
                return { success: false, error: 'Email não fornecido' };
            }

            const newPassword = '123456';
            const response = await authApi.resetPassword(email, newPassword);
            
            if (response.success) {
                toast.success(`Senha redefinida com sucesso! Sua nova senha é: ${newPassword}`, {
                    position: "top-center",
                    autoClose: 8000,
                });
                setLoadingAuth(false);
                return { success: true };
            } else {
                toast.error(response.message || 'Erro ao redefinir senha');
                setLoadingAuth(false);
                return { success: false, error: response.message };
            }
        } catch (error) {
            setLoadingAuth(false);
            console.error('Erro ao resetar senha:', error);
            toast.error(error.message || 'Erro ao redefinir senha. Tente novamente.');
            return { success: false, error: error.message };
        }
    }

    return (
        <AuthContext.Provider 
            value={{
                signed: !!user, 
                user, 
                signUp,
                signOut, 
                logIn,
                resetPassword,
                loadingAuth,
                loadingUser,
                setUser,
                storageUser
            }} 
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
