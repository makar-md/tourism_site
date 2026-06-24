import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Input from '../components/input'
import Body from '../components/body'
import Header from '../components/header'
import '../index.css'
export default function Profile(){
    const [userData, setUserData] = useState();
    useEffect(()=>{
        async function getData(){
            try{
                let res = await fetch("http://localhost:4200/profile", {
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
                    res = await fetch("http://localhost:4200/profile", {
                        credentials: "include"
                    });
                }
                const resData = await res.json()
                setUserData(resData)
            } catch (e){
                alert(e.message);
            }
        }
        getData();
    }, [])
    console.log(userData)
    return(
    <Body>
        <Header linksShow={true }/>
        <h1>profile</h1>
    </Body>
    )
}