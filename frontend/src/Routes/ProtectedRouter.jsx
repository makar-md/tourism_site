import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ProtectedRouter({ children }) {
    const navigate = useNavigate()
    const [isLogined, setIsLogined] = useState(null)
    useEffect(()=>{
        const checkAuth = async () => {
            try {
                let res = await fetch("http://localhost:4200/isAuth", {
                    credentials: "include"
                });
                if (res.status === 401) {
                    const refreshRes = await fetch("http://localhost:4200/refresh", {
                        method: "POST",
                        credentials: "include"
                    });

                    if (!refreshRes.ok) {
                        navigate("/login");
                        return;
                    }
                    res = await fetch("http://localhost:4200/isAuth", {
                        credentials: "include"
                    });
                }
                
                setIsLogined(res.ok);
            } catch (e) {
                console.log(e);
                alert(e.message)
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