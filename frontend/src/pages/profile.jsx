import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {validationUpdateUser} from "../schemas/validate.schema"
import { useAuth } from '../Contexts/AuthContext'
import {api} from "../api/api"

import InputCustom from '../components/inputCustom'
import Body from '../components/body'
import Header from '../components/header'
import '../index.css'

export default function Profile(){
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})
    const {user, setUser} = useAuth()


    const handleChange = (e) =>{
        const{ name, value } = e.target;
        setUser((prev) =>({
            ...prev,
            [name]: value
        }));
    }

    async function handleUpdateUser(){
        const valid = validationUpdateUser.safeParse(user);
        if(!valid.success){
            setErrors(valid.error.flatten().fieldErrors);
            return;
        }
        if(valid.data.password.trim().length < 8 && valid.data.password.trim().length > 0){
            setErrors({password: "Пароль должен быть не меньше 8 символов"})
            return;
        } 
        setErrors({})
        try{
            let res = await api("/user/update", {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(valid.data)  
            })
            const updatedUserData = await res.json()
            if(!res.ok){
                return alert(updatedUserData.message)
            }
            alert(updatedUserData.message)
            setUser({
                ...updatedUserData.user,
                password: ""
            })
        } catch(e){
            alert(e.message)
        }
    }

    async function uploadAvatar(file) {
        if (!file) return;
        const formData = new FormData();
        formData.append("avatar", file);
        try{
            const res = await api("/upload/avatar",{
                method: "POST",
                body: formData
            })
            const resData = await res.json();
            if(!res.ok){
                alert(resData.message)
                return;
            }
            setUser(prev => ({
                ...prev,
                avatar: resData.avatar
            }));
        } catch(e) {
            alert(e.message);
        }
    }

    async function deleteAvatar(){
        try{
            const res = await api("/delete/avatar",{
               method: "DELETE" 
            })
            const resData = await res.json()
            if(!res.ok){
                alert(resData)
                return;
            }
            setUser(prev => ({
                ...prev,
                avatar: resData.avatar
            }))
        } catch (e){
            alert(e.message)
        }
    }
    return(
    <Body>
        <main className="w-11/12 lg:w-9/12 mx-auto bg-white dark:bg-zinc-900 min-h-screen flex flex-col relative pt-15 items-center">
            <Header linksShow={true } isCheckAuthUser={true}/>
            <div className="w-full max-w-md sm:max-w-xl md:max-w-4xl flex flex-col items-center p-3 sm:p-5 md:p-8 ">
                
                <div className="w-full flex flex-col items-center gap-3 mb-1">
                    <div className="flex flex-col gap-4 justify-center items-center">
                        <label htmlFor="avatar" className="flex w-30 h-30 lg:w-45 lg:h-45 rounded-2xl border border-zinc-300 dark:border-zinc-600 
                        relative group cursor-pointer transition-all duration-300 hover:border-teal-400 dark:hover:border-teal-500 
                        hover:shadow-lg hover:shadow-teal-500/20 overflow-hidden"> 
                            <div className="absolute inset-0 bg-zinc-50 dark:bg-zinc-800/50  bg-[image:radial-gradient(var(--pattern-fg)_1px,_transparent_0)]
                            bg-[size:10px_10px] [--pattern-fg:var(--color-zinc-300)]dark:[--pattern-fg:var(--color-white)]/15 transition-all duration-300
                            group-hover:bg-teal-50/30 dark:group-hover:bg-teal-900/10 rounded-2xl">
                            </div>
                            
                            <img crossOrigin="anonymous" src={user.avatar ? `http://localhost:4200/uploads/${user.avatar}` : ``}
                            className={`absolute inset-0 rounded-2xl transition-all duration-500 ${!user.avatar ? "scale-150":""}
                            group-hover:scale-110 group-hover:brightness-110 object-cover h-full w-full object-center`}/>
                            
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
                        <input type="file" name="avatar" id="avatar" accept="image/png, image/jpeg, image/jpg, image/webp" className="hidden"
                            onChange={(e) => { uploadAvatar(e.target.files[0]); }}/>
                        <button className='text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300
                        transition-colors duration-200 flex items-center gap-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 
                        rounded-lg px-4 py-2 border border-red-200 dark:border-red-800/50' onClick={(e) => deleteAvatar()}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                            delete avatar
                        </button>
                    </div>
    
                </div>
    
                <div className="w-full space-y-4">
                    <div className="flex flex-col gap-2">
                        <InputCustom type="email" name="email" label="Email" value={user.email} onChange={handleChange} 
                            placeholder="test@mail.ru" error={errors.email?.[0]}/>
                    </div>
                </div>
    
                <div className="w-full mt-6">
                    <div className="border-t border-zinc-200 dark:border-zinc-700 pt-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <InputCustom type="text" name="surName" label="surName" value={user.surName} onChange={handleChange}
                                placeholder="Ivanov" error={errors.surName?.[0]}/>
                            </div>
        
                            <div className="flex flex-col gap-2">
                                <InputCustom type="text" name="firstName" label="firstName" value={user.firstName} onChange={handleChange}
                                placeholder="Ivan" error={errors.firstName?.[0]}/>
                            </div>
                        </div>
                        <div className="mt-4 flex flex-col gap-2">
                            <InputCustom type="text" name="lastName" label="lastName" value={user.lastName} onChange={handleChange}
                            placeholder="Ivanovich" error={errors.lastName?.[0]}/>
                        </div>
                    </div>
                </div>
    
                <div className="w-full mt-6">
                    <div className="border-t border-zinc-200 dark:border-zinc-700 pt-2">
                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex flex-col gap-2">
                                <InputCustom type="password" name="password" label="New password" value={user.password} onChange={handleChange}
                                placeholder="new password" error={errors.password}/>
                                <p className='text-sm text-zinc-600 dark:text-zinc-400  pl-2'>Если хотите оставить старый пароль то оставте поле путсым</p>
                            </div>
                        </div>
                        <button className="mt-2 text-lg sm:text-xl md:text-2xl inline-flex items-center gap-2 justify-center rounded-md py-1 sm:py-2 px-3 outline-offset-2
                        transition active:transition-none bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70
                        dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70 flex-none w-full"
                        onClick={(e)=>{handleUpdateUser()}}>Update</button>
                    </div>
                </div>
            </div>
        </main>
    </Body>
    )

}