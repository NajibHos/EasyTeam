import { InputText } from "primereact/inputtext";
import { useState, useEffect } from "react";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const { login, user, userRole } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // navigating user on every mount
  useEffect(() => {

    if (user) {
      if (userRole === 'Admin') {
        navigate('/admin/dashboard');
      } else if (userRole === 'Members') {
        navigate('/member/dashboard');
      }
    }

  }, [])

  const handleForm = async (ev) => {

   ev.preventDefault();

   let userInfo = { email, password };

    try {
      await login(userInfo); // Perform login
    } catch (err) {
      setError(err.message);
    }

    // Clear form after submission
    setEmail('');
    setPassword('');

  }

  return (

    <div className="h-[90vh] md:max-2xl:h-[110vh] w-full
     flex justify-center items-center">

      <div className="h-full w-[80%] flex flex-col justify-center
      items-center gap-12">

        <div className="h-16 w-16 rounded-full bg-zinc-200
        flex justify-center items-center">
          <i className="pi pi-sign-in text-zinc-950"
           style={{ fontSize: '1.5rem' }}></i>
        </div>

        <div className="h-auto w-full text-center">
          <h2 className="text-2xl text-zinc-900 font-semibold
          font-poppins">
            Sign In
          </h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>

        <div className="h-auto w-full md:max-2xl:w-[50%]">
          <form onSubmit={handleForm} className="flex flex-col
          justify-center items-start gap-8">
            <div className="w-full flex flex-col gap-2">
             <label htmlFor="email"
               className="text-zinc-800 font-poppins font-semibold">
               Email
             </label>

              <InputText id="email" type="email" value={email}
               placeholder="example@gmail.com" required
              className="w-full !bg-zinc-200 border !border-zinc-200
               !rounded !text-zinc-900 !font-semibold font-poppins"
              onChange={(ev) => {setEmail(ev.target.value)}} />

              <div className="h-auto w-full">
                <h2 className="text-base text-zinc-400 font-semibold
                font-display">Admin: <span className="text-zinc-900">
                  admin@gmail.com</span></h2>
              </div>
              <div className="h-auto w-full">
                <h2 className="text-base text-zinc-400 font-semibold
                font-display">Member: <span className="text-zinc-900">
                  member@gmail.com</span></h2>
              </div>
            </div>

            <div className="w-full flex flex-col gap-2">
             <label htmlFor="pass"
               className="text-zinc-800 font-poppins font-semibold">
               Password
             </label>

             <InputText id="pass" type="password" value={password}
               placeholder="example1232" required
              className="w-full !bg-zinc-200 border !border-zinc-200
               !rounded !text-zinc-900 !font-semibold font-poppins"
              onChange={(ev) => {setPassword(ev.target.value)}} />

              <div className="h-auto w-full">
                <h2 className="text-base text-zinc-400 font-semibold
                font-display">Admin: <span className="text-zinc-900">
                  Pass@1234</span></h2>
              </div>
              <div className="h-auto w-full">
                <h2 className="text-base text-zinc-400 font-semibold
                font-display">Member: <span className="text-zinc-900">
                  Pass@member</span></h2>
              </div>

            </div>

            <div className="w-full h-auto mt-4">
              <button className="w-full py-2 bg-zinc-900 text-white
              font-semibold rounded cursor-pointer font-display text-base
              md:max-2xl:text-lg"
               type="submit">
                Sign In
              </button>
            </div>

            <div className="w-full h-auto">
              <button className="w-full py-2 bg-blue-600 text-white
              font-semibold rounded cursor-pointer text-base
              md:max-2xl:text-lg font-display"
              type="button" onClick={() => navigate('/')}>
                Cancel
              </button>
            </div>

          </form>
        </div>

      </div>

    </div>
  )
}

export default Login