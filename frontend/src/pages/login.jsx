import { useState } from 'react'
import '../index.css'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
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
  }
  const handleLogin = async () => {
    try{
      const res = await fetch('http://localhost:4200/login/user', {
        credentials: "include",
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify(data),
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
  <>
    <div className=' flex h-screen w-full items-center justify-center'>
      <div className='w-xl h-96 border border-teal-500 flex flex-col justify-around'>
        <label htmlFor="email" className='flex flex-col gap-0.5'>Email
          <input type="email" id='email' name='email' value={data.email} onChange={handleChange}
          className='border border-zinc-900 rounded-lg p-1 invalid:border-rose-500'/>
        </label>
        
        <input type="password" name='password' value={data.password} onChange={handleChange}
        className='border border-zinc-900 rounded-lg invalid:border-rose-500'/>
        <button onClick={(e) => handleLogin()}>Войти</button>
      </div>

    </div>
  </>
  )
}

export default Login
