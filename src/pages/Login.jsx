import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import LoginDetailsCard from "../components/LoginDetailsCard";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

const loginData = [
  {
    role: 'Admin',
    email: 'admin@gmail.com',
    pass: 'Pass@1234'
  },
  {
    role: 'Member',
    email: 'member@gmail.com',
    pass: 'Pass@member'
  }
]

const Login = () => {

  const navigate = useNavigate();
  const { login, user, userRole } = useAuth();
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // navigating user on every mount
  useEffect(() => {

    if (user) {
      if (userRole === 'Admin') {
        navigate('/admin/dashboard')
      } else if (userRole === 'Members') {
        navigate('/member/dashboard')
      }
    }

  }, [])

  const handleForm = async (ev) => {

   ev.preventDefault();

   let userInfo = { email, password };

   try {
      login(userInfo); // Perform login
    } catch (err) {
      setError(err.message);
    }

    // Clear form after submission
    setEmail('');
    setPassword('');

  }

  return (

    <div className="h-[100vh] w-full flex
     justify-center items-center">

      <div className="h-full w-[80%] flex flex-col justify-center
      items-center gap-14">

        <div className="h-auto w-full flex flex-col md:max-2xl:flex-row
         justify-center items-center gap-10 md:max-2xl:gap-16">
          {
            loginData.map((v, i) => {
              return <LoginDetailsCard key={i} data={v} />
            })
          }
        </div>

        <div className="h-auto w-full text-center">
          <h2 className="text-2xl text-zinc-900 font-semibold
          font-poppins">
            Log In
          </h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>

        <div className="h-auto w-full md:max-2xl:w-[60%]">
          <form onSubmit={handleForm} className="flex flex-col
          justify-center items-start gap-8">
            <div className="w-full flex flex-col gap-2">
             <label htmlFor="email"
               className="text-zinc-800 font-poppins font-semibold">
               Email
             </label>
             <InputText id="email" type="email" required
             placeholder="example@gmail.com" value={email}
             className="w-full bg-white border-2
              font-poppins
             border-zinc-200 rounded-xl text-zinc-900"
             onChange={(ev) => {setEmail(ev.target.value)}}
             />
            </div>
            <div className="w-full flex flex-col gap-2">
             <label htmlFor="pass"
               className="text-zinc-800 font-poppins font-semibold">
               Password
             </label>
             <InputText id="pass" type="password" required
             placeholder="examplePass" value={password}
             className="w-full bg-white border-2
              font-poppins
             border-zinc-200 rounded-xl text-zinc-900"
             onChange={(ev) => {setPassword(ev.target.value)}}
             />
            </div>
            <div className="self-center mt-6">
            <Button label="Log in" size="small" type="submit"
              icon='pi pi-sign-in'className="bg-zinc-900 text-white
              outline-0 border-0 " />
            </div>
          </form>
        </div>

      </div>

    </div>
  )
}

export default Login