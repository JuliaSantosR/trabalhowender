import React, { useState, createContext, useEffect } from 'react';
import { toast } from 'react-toastify'

export const AuthContext = createContext({})

const STORAGE_USERS_KEY = 'juliastore_users';
const STORAGE_CURRENT_USER_KEY = 'SistemaUser';

function AuthProvider ({ children }) {
    const [user, setUser] = useState(null); 
    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loadingUser, setLoadingUser] = useState(true)

    useEffect(() => {
        function loadStorage() {
            try {
                const storageUser = localStorage.getItem(STORAGE_CURRENT_USER_KEY);
                if(storageUser){
                    try {
                        const parsedUser = JSON.parse(storageUser);
                        if (parsedUser && parsedUser.email) {
                            setUser(parsedUser);
                        } else {
                            localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
                        }
                    } catch (error) {
                        console.error('Erro ao carregar usuário do storage:', error);
                        localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
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

    function getUsers() {
        const usersJson = localStorage.getItem(STORAGE_USERS_KEY);
        return usersJson ? JSON.parse(usersJson) : [];
    }

    function saveUsers(users) {
        localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
    }

    function signUp(email, name, password) {
        setLoadingAuth(true);
        
        try {
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

            const users = getUsers();
            const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
            
            if (emailExists) {
                toast.error('Já foi criada uma conta com esse email.');
                setLoadingAuth(false);
                return { success: false, error: 'Email já cadastrado' };
            }

            const newUser = {
                id: Date.now().toString(),
                name: name.trim(),
                email: email.toLowerCase().trim(),
                password: password
            };

            users.push(newUser);
            saveUsers(users);

            const userData = {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            };

            setUser(userData);
            storageUser(userData);
            toast.success('Cadastro efetuado com sucesso!');
            setLoadingAuth(false);
            return { success: true };
        } catch (error) {
            setLoadingAuth(false);
            console.error('Erro no cadastro:', error);
            toast.error('Ops, algo deu errado ao criar a conta.');
            return { success: false, error };
        }
    }

    function storageUser(data) {
        localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(data));
    }

    function signOut() {
        localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
        setUser(null);
        toast.info('Logout realizado com sucesso');
    }

    function logIn(email, password) {
        setLoadingAuth(true);
        
        try {
            if (!email || !password) {
                toast.error('Preencha todos os campos');
                setLoadingAuth(false);
                return { success: false, error: 'Campos obrigatórios não preenchidos' };
            }

            const users = getUsers();
            const user = users.find(
                u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
            );

            if (!user) {
                toast.error('Email ou senha incorretos.');
                setLoadingAuth(false);
                return { success: false, error: 'Credenciais inválidas' };
            }

            const userData = {
                id: user.id,
                name: user.name,
                email: user.email
            };

            setUser(userData);
            storageUser(userData);
            toast.success('Bem vindo de volta!');
            setLoadingAuth(false);
            return { success: true };
        } catch (error) {
            setLoadingAuth(false);
            console.error('Erro no login:', error);
            toast.error('Ops, algo deu errado!');
            return { success: false, error };
        }
    }

    function resetPassword(email) {
        setLoadingAuth(true);
        
        try {
            if (!email) {
                toast.error('Digite um email válido');
                setLoadingAuth(false);
                return { success: false, error: 'Email não fornecido' };
            }

            const users = getUsers();
            const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());

            if (userIndex === -1) {
                toast.error('Usuário não encontrado.');
                setLoadingAuth(false);
                return { success: false, error: 'Usuário não encontrado' };
            }

            const newPassword = '123456';
            users[userIndex].password = newPassword;
            saveUsers(users);

            toast.success(`Senha redefinida com sucesso! Sua nova senha é: ${newPassword}`, {
                position: "top-center",
                autoClose: 8000,
            });
            setLoadingAuth(false);
            return { success: true };
        } catch (error) {
            setLoadingAuth(false);
            console.error('Erro ao resetar senha:', error);
            toast.error('Erro ao redefinir senha. Tente novamente.');
            return { success: false, error };
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
