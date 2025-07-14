import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from "./authService"

type AuthContextProps = { children: React.ReactNode }
type LoginData = { email: string, password: string }

interface User {
    id: number;
}

type AuthContextData = {
    currentUser: User | null;
    loading: boolean;
    login: (credentials: LoginData) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextData>({
    currentUser: null,
    loading: false,
    login: async () => {},
    logout: () => {}
});

export const AuthProvider = ({ children }: AuthContextProps) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (credentials: LoginData) => {
        const user = await authService.login(credentials);
        setCurrentUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('user');
    };

    const value = {
        currentUser,
        loading,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};