import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import InputCustom from '../components/inputCustom'
import Body from '../components/body'
import Header from '../components/header'
import {validationUpdateUser} from "../schemas/validate.schema"
import '../index.css'

export default function Profile(){
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})
    const [userData, setUserData] = useState({
        email: "",
        surName: "",
        firstName: "",
        lastName: "",
        password: "",
    });
    const handleChange = (e) =>{
        const{ name, value } = e.target;
        setUserData((prev) =>({
        ...prev,
        [name]: value
        }));
        const valid = validationUpdateUser.safeParse(userData);
        let newErrors = {}
        if(!valid.success){
            newErrors = valid.error.flatten().fieldErrors;
        } 
        if(valid.data.password.trim().length < 8 && valid.data.password.trim().length > 0){
            newErrors.password = "Пароль должен быть не меньше 8 символов";
        } 
        setErrors(newErrors);
    }
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
                setUserData({...resData, password:""})
            } catch (e){
                alert(e.message);
            }
        }
        getData();
    }, [])

    async function handleUpdateUser(){
        const valid = validationUpdateUser.safeParse(userData);
        if(!valid.success){
            setErrors(valid.error.flatten().fieldErrors);
            return;
        }
        if(valid.data.password.trim.length < 8 && valid.data.password.trim.length > 0){
            setErrors({password: "Пароль должен быть не меньше 8 символов"})
            return;
        } 
        setErrors({})
        try{
            const res = await fetch("http://localhost:4200/user/update", {
                credentials: "include",
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(valid.data)
            })
            const updatedUserData = await res.json()
            if(!res.ok){
                return alert(updatedUserData.message)
            }
            alert(updatedUserData.message)
            setUserData(updatedUserData)
        } catch(e){
            alert(e.message)
        }
    }
    return(
    <Body>
        <main className="w-11/12 lg:w-9/12 mx-auto bg-white dark:bg-zinc-900 min-h-screen flex flex-col relative py-15">
            <Header linksShow={true } isCheckAuthUser={true}/>
            <div className='flex flex-col p-8'>
                <div className='flex justify-between'>
                    <div className="flex flex-col basis-1/2 py-2 space-y-2 sm:space-y-3 px-6">
                        <div className="flex flex-col gap-2">
                            <InputCustom type="email" name="email" label="Email" value={userData.email} onChange={handleChange} 
                            placeholder="test@mail.ru" error={errors.email?.[0]}/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <InputCustom type="text" name="surName" label="surName" value={userData.surName} onChange={handleChange}
                            placeholder="Ivanov" error={errors.surName?.[0]}/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <InputCustom type="text" name="firstName" label="firstName" value={userData.firstName} onChange={handleChange}
                            placeholder="Ivan" error={errors.firstName?.[0]}/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <InputCustom type="text" name="lastName" label="lastName" value={userData.lastName} onChange={handleChange}
                            placeholder="Ivanovich" error={errors.lastName?.[0]}/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <InputCustom type="password" name="password" label="New password" value={userData.password} onChange={handleChange}
                            placeholder="new password" error={errors.password}/>
                            <p className='text-sm text-zinc-600 dark:text-zinc-400 -mt-2 pl-2'>Если хотите оставить старый пароль то оставте поле путсым</p>
                        </div>
                        <button className="text-lg sm:text-xl md:text-2xl inline-flex items-center gap-2 justify-center rounded-md py-2 sm:py-3 px-3 outline-offset-2 transition active:transition-none bg-zinc-800
                        font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600
                        dark:active:bg-zinc-700 dark:active:text-zinc-100/70 flex-none w-full" onClick={(e)=>{handleUpdateUser()}}>Update</button>
                    </div>
                    <div className=' basis-1/2 px-6 flex'>
                        <div className="w-full flex justify-center items-center ">
                            <label htmlFor="avatar" className="flex w-60 h-60 lg:w-90 lg:h-90 rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-600 
                            relative group cursor-pointer transition-all duration-300 hover:border-teal-400 dark:hover:border-teal-500 
                            hover:shadow-lg hover:shadow-teal-500/20 overflow-hidden">
                                
                                <div className="absolute inset-0 bg-zinc-50 dark:bg-zinc-800/50 
                                bg-[image:radial-gradient(var(--pattern-fg)_1px,_transparent_0)] bg-[size:10px_10px] [--pattern-fg:var(--color-zinc-300)]
                                dark:[--pattern-fg:var(--color-white)]/15 transition-all duration-300 group-hover:bg-teal-50/30 dark:group-hover:bg-teal-900/10 rounded-2xl">
                                </div>
                                
                                <div className="absolute inset-0 bg-cover bg-center bg-[url(../images/astronavt.webp)] rounded-2xl 
                                transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:brightness-110">
                                </div>
                                
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 
                                group-hover:opacity-100 transition-all duration-300 rounded-2xl">
                                    
                                    <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        </svg>
                                        <div className="text-sm font-medium">click to upload</div>
                                    </div>
                                </div>

                            </label>
                    
                            <input type="file" name="avatar" id="avatar" accept="image/png, image/jpeg, image/jpg" className="hidden"/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </Body>
    )
}