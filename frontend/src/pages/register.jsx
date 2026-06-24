import { useState } from 'react'
import '../index.css'

function Register() {
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    surName: "",
    lastName: ""
  })
  const handleChange = (e) =>{
    const{ name, value } = e.target;
    setData((prev) =>({
      ...data,
      [name]: value
    }));
  }
  const handleRegister = async () => {
    console.log(data)
    if(data.password !== data.confirmPassword){
      return alert("пароли должны совпадать")
    }
    try{
      const res = await fetch('http://localhost:4200/register/user', {
        credentials: "include",
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify(data),
      })
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message)
      }
      alert("успешная регистрация")

    } catch (e){
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
        <input type="text" name='surName' value={data.surName} onChange={handleChange}
        className='border border-zinc-900 rounded-lg invalid:border-rose-500'/>

        <input type="text" name='firstName' value={data.firstName} onChange={handleChange}
        className='border border-zinc-900 rounded-lg invalid:border-rose-500'/>
        
        <input type="text" name='lastName' value={data.lastName} onChange={handleChange}
        className='border border-zinc-900 rounded-lg invalid:border-rose-500'/>
        <input type="password" name='password' value={data.password} onChange={handleChange}
        className='border border-zinc-900 rounded-lg invalid:border-rose-500'/>
        <input type="password" name='confirmPassword' value={data.confirmPassword} onChange={handleChange}
        className='border border-zinc-900 rounded-lg invalid:border-rose-500'/>
        <button onClick={(e) => handleRegister()}>Зарегестрироваться</button>
      </div>

    </div>
  </>
  )
}

export default Register
