import { createContext, useContext, useEffect, useState } from "react";
import {api} from '../api/api.js'
export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState({
        email: "",
        surName: "",
        firstName: "",
        lastName: "",
        password: "",
        roleId: "",
        avatar: null
    });
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        async function loadUser(){
            try{
                const resIsAuth = await api("/isAuth")
                setIsAuth(resIsAuth.ok)
                if(resIsAuth.ok){
                    let resUser = await api("/profile", {})
                    const resData = await resUser.json()
                    setUser({...resData, password:""})
                }
            } catch (e){
                alert("context " + e.message);
                setUser(null);
                setIsAuth(false);
            }
        }
        loadUser();
    }, [isAuth]);

    const logOutContext = async() => {
        const res = await api("/logout", {
            method: "POST",
        });
        if (!res.ok) {
            alert("Не удалось выйти");
            return;
        }
        setIsAuth(false);
        setUser({
            email: "",
            surName: "",
            firstName: "",
            lastName: "",
            password: "",
            avatar: null
        });
    }

    return (
        <AuthContext.Provider value={{
                user,
                isAuth,
                setUser,
                setIsAuth,
                logOutContext
            }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}