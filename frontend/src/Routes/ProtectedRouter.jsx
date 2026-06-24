import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ProtectedRouter({ children }) {
    const [isLogined, setIsLogined] = useState(null)
    useEffect(()=>{
        const checkAuth = async () => {
            try {
                const res = await fetch("http://localhost:4200/isAuth", {
                    credentials: "include"
                });

                setIsLogined(res.ok);
            } catch (e) {
                setIsLogined(false);
            }
        };
        checkAuth();
    }, [])
    if (isLogined === null) return "Loading...";
    if (!isLogined) {
        return <Navigate to="/login" replace />;
    }

    return children;
}