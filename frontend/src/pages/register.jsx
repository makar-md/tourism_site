import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import InputCustom from '../components/inputCustom'
import Body from '../components/body'
import Header from '../components/header'
import {validationRegisterUser} from '../schemas/validate.schema'
import '../index.css'


function Register() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [passwordMatched, setPasswordMathced] = useState(null)
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
    setData( (prev) =>({
      ...prev,
      [name]: value
    }));
  }
  const handleRegister = async () => {
    const valid = validationRegisterUser.safeParse(data)
    if(!valid.success){
      setErrors(valid.error.flatten().fieldErrors)
      return
    }
    setErrors({})
    if(data.password !== data.confirmPassword){
      return alert("пароли должны совпадать")
    }
    try{
      const res = await fetch('http://localhost:4200/register/user', {
        credentials: "include",
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify(valid.data),
      })
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message)
      }
      navigate('/login')

    } catch (e){
      alert(e.message)
    }
  };


  return (
  <Body>
    <main className="min-h-screen w-11/12 sm:w-10/12 lg:w-5xl bg-white dark:bg-zinc-900 mx-auto flex items-center justify-center px-4 sm:px-6 lg:px-8 py-1">
      <Header linksShow={false} isCheckAuthUser={false} />

      <div className="flex w-full items-center justify-center">
        <div className="w-full max-w-md sm:max-w-xl md:max-w-3xl border border-zinc-300 dark:border-zinc-700 rounded-2xl flex flex-col items-center p-3 sm:p-5 md:p-8">
          {/* Header */}
          <div className="w-full flex flex-col items-center gap-3 mb-1">
            <div className="flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 dark:fill-zinc-50">
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="dark:stroke-zinc-50 stroke-zinc-900"
                >
                  <circle cx="12" cy="12" r="8" />
                  <path d="M8.399 4.849C5.372 2.582 2.972 1.489 2.23 2.23c-1.174 1.174 2.248 6.5 7.643 11.895c5.396 5.395 10.722 8.817 11.895 7.643c.431-.43.243-1.421-.435-2.769" />
                </g>
              </svg>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 font-semibold text-center">
              Register a new account
            </h1>
          </div>

          {/* Email */}
          <div className="w-full space-y-4">
            <div className="flex flex-col gap-2">
              <InputCustom
                type="email"
                name="email"
                label="Email"
                value={data.email}
                onChange={handleChange}
                placeholder="test@mail.ru"
                error={errors.email?.[0]}
              />
            </div>
          </div>

          {/* Personal Information */}
          <div className="w-full mt-6">
            <div className="border-t border-zinc-200 dark:border-zinc-700 pt-5">
              <p className="mb-5 text-sm uppercase tracking-wider font-semibold text-zinc-500 dark:text-zinc-400">
                Personal information
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <InputCustom
                    type="text"
                    name="surName"
                    label="Surname"
                    value={data.surName}
                    onChange={handleChange}
                    placeholder="Ivanov"
                    error={errors.surName?.[0]}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <InputCustom
                    type="text"
                    name="firstName"
                    label="First name"
                    value={data.firstName}
                    onChange={handleChange}
                    placeholder="Ivan"
                    error={errors.firstName?.[0]}
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <InputCustom
                  type="text"
                  name="lastName"
                  label="Last name"
                  value={data.lastName}
                  onChange={handleChange}
                  placeholder="Ivanovich"
                  error={errors.lastName?.[0]}
                />
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="w-full mt-6">
            <div className="border-t border-zinc-200 dark:border-zinc-700 pt-5">
              <p className="mb-5 text-sm uppercase tracking-wider font-semibold text-zinc-500 dark:text-zinc-400">
                Security
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <InputCustom
                    type="password"
                    name="password"
                    label="Password"
                    value={data.password}
                    onChange={handleChange}
                    placeholder="password"
                    error={errors.password?.[0]}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <InputCustom
                    type="password"
                    name="confirmPassword"
                    label="Confirm password"
                    value={data.confirmPassword}
                    onChange={handleChange}
                    placeholder="password"
                    error={errors.confirmPassword}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="w-full mt-4 flex flex-col gap-4">
            <p className="text-center text-base sm:text-lg text-zinc-500 dark:text-zinc-400">
              Already have an account?
              <Link to="/login" className="ml-1 font-medium text-teal-500 underline decoration-teal-500" >
                Log in
              </Link>
            </p>

            <button onClick={handleRegister}
              className="w-full inline-flex justify-center items-center rounded-md py-3 px-3 text-lg sm:text-xl md:text-2xl font-semibold
              bg-zinc-800 text-zinc-100 transition hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700
              dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70">
              Registration
            </button>
          </div>
        </div>
      </div>
    </main>
  </Body>
)
}

export default Register
