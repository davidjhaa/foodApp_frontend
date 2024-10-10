import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL;


export const AuthContext = React.createContext();
export function useAuth() {
    return useContext(AuthContext)
}

function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(false);

    async function signUp(name,email,password,confirmPassword) {
        setLoading(true);
        try {
            await axios.post(`${apiUrl}/auth/signup`, {
                name: name,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            });
            setLoading(false);
            navigate("/login");
        } 
        catch (error) {
            console.error('Sign up failed:', error);
            setLoading(false);
        }
    } 

    async function login(email, password) {
        try {
            console.log('before')
            const response = await axios.post(`${apiUrl}/auth/login`, 
                { email, password }, 
                { withCredentials: true } 
            );
            console.log('after')
            console.log(response);
            if (response.status >= 200 && response.status < 300) {
                const name = response.data.name;
                const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
                localStorage.setItem("user", capitalizedName);
                // localStorage.setItem("token", response.data.token);
                // localStorage.setItem("userId", response.data.userId);
                setUser(capitalizedName);        
                navigate("/");  
            } else {
                console.log("Request failed with status:", response.status);
            }
        } catch (err) {
            console.log("........", err);
        }
    }
    
    async function logout() {
        try {
            await axios.get(`${apiUrl}/user/logout`, { withCredentials: true });
            
            localStorage.clear();
            
            setUser(null);
            
            navigate("/login");
        } catch (err) {
            console.error('Logout failed:', err);
        }
    }
    
    const value = {
        user,
        setUser,
        login,
        signUp,
        logout
    }

    return (
        < AuthContext.Provider value={value} >
            {!loading && children}
        </AuthContext.Provider >
    )
}

export default AuthProvider


