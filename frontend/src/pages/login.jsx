import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { validationLoginUser } from '../schemas/validate.schema'
import InputCustom from '../components/inputCustom'
import Body from '../components/body'
import Header from '../components/header'
import '../index.css'


function Login() {
  const navigate = useNavigate()
  const [error, setError] = useState({})
  const [data, setData] = useState({
    email: "",
    password: "",
  })
  const handleChange = (e) =>{
    const{ name, value } = e.target;
    setData((prev) =>({
      ...prev,
      [name]: value
    }));

    const validation = validationLoginUser.safeParse(data)

    if(!validation.success){
      setError(validation.error.flatten().fieldErrors)
    } else{
      setError({})
    }
  }
  const handleLogin = async () => {
    const validation = validationLoginUser.safeParse(data)
    if(!validation.success){
      setError(validation.error.flatten().fieldErrors)
      return;
    }
    setError({})
    try{
      const res = await fetch('http://localhost:4200/login/user', {
        credentials: "include",
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify(validation.data),
      })
      console.log(res)
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message)
      }
      navigate('/profile')

    } catch (e){
      console.log(e.message)
      alert(e.message)
    }
  };
  return(
  <Body>
    <main className="min-h-screen w-11/12 sm:w-10/12 lg:w-5xl bg-white dark:bg-zinc-900 mx-auto flex items-center justify-center px-4 sm:px-6 lg:px-8 py-2">
      <Header linksShow={false}/>
      <div className=' flex h-screen w-full items-center justify-center'>
        <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl border border-zinc-300 dark:border-zinc-700 rounded-2xl flex flex-col items-center p-4 sm:p-6 md:p-8">
              <div className="w-full flex flex-col gap-2 mb-4">
                  <div className="flex justify-center items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-20 w-20 sm:h-28 sm:w-28 md:h-35 md:w-35 dark:fill-zinc-50">
                          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="dark:stroke-zinc-50 stroke-zinc-900">
                              <circle cx="12" cy="12" r="8"/>
                              <path d="M8.399 4.849C5.372 2.582 2.972 1.489 2.23 2.23c-1.174 1.174 2.248 6.5 7.643 11.895c5.396 5.395 10.722 8.817 11.895 7.643c.431-.43.243-1.421-.435-2.769"/>
                          </g>
                      </svg>
                  </div>
                  <div className="text-2xl sm:text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 font-semibold text-center leading-tight">
                      log in to your personal account
                  </div>
              </div>

              <div className="flex flex-col w-full p-2 space-y-2 sm:space-y-4">
                  <div className="flex flex-col gap-2">
                      <InputCustom type="email" name="email" label="Email" value={data.email} onChange={handleChange}
                      error={error.email?.[0]} require={true} placeholder="test@mail.ru"/>
                  </div>
                  <div className="flex flex-col gap-2">
                      <InputCustom type="password" name="password" label="Password" value={data.password} onChange={handleChange}
                      error={error.password?.[0]} placeholder="password"/>
                  </div>
              </div>
              
              <div className="flex flex-col gap-3 sm:gap-4 w-full p-2">
                  <div className="w-full text-center text-base sm:text-lg text-zinc-500 dark:text-zinc-400">
                      if you don't have an account,
                      <Link to="/registration" className="p-1 cursor-pointer underline text-teal-500 font-medium decoration-teal-500">register</Link>
                  </div>
                  <button className="text-lg sm:text-xl md:text-2xl inline-flex items-center gap-2 justify-center rounded-md py-2 sm:py-3 px-3 outline-offset-2 transition active:transition-none bg-zinc-800
                  font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600
                  dark:active:bg-zinc-700 dark:active:text-zinc-100/70 flex-none w-full" onClick={(e) => handleLogin()}>Login</button>
              </div>
          </div>
      </div>
    </main>
  </Body>
  )
}

export default Login
