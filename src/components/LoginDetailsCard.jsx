import 'primeicons/primeicons.css';
import { useState } from 'react';

/* eslint-disable react/prop-types */
const LoginDetailsCard = ({data}) => {

  const [copyStatus, setCopyStatus] = useState({
    email: false,
    pass: false,
  });

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopyStatus((prev) => ({ ...prev, [type]: true }));
        setTimeout(() => {
          setCopyStatus((prev) => ({ ...prev, [type]: false }));
        }, 2000); // Reset icon after 2 seconds
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <div className="h-[140px] w-full md:max-2xl:w-[300px] flex flex-col
     justify-center items-center gap-4 p-8 border-2 border-zinc-200
     rounded-2xl">
      <div className="w-full text-center">
        <h2 className="text-lg text-zinc-900 font-semibold
        font-poppins">
          {data.role}
        </h2>
      </div>
      <div className="w-full flex justify-between items-center">
        <div className="w-[80%]">
          <h2 className="text-base text-zinc-800 font-semibold
           font-poppins">
           {data.email}
        </h2>
        </div>
        <div className="w-[10%] cursor-pointer"
          onClick={() => copyToClipboard(data.email, 'email')}>
          <i className={`${
              copyStatus.email ? 'pi pi-check' : 'pi pi-clipboard'
            } text-lg text-zinc-900`}></i>
        </div>
      </div>
      <div className="w-full flex justify-between items-center">
        <div className="w-[80%]">
          <h2 className="text-base text-zinc-800 font-semibold
           font-poppins">
           {data.pass}
        </h2>
        </div>
        <div className="w-[10%] cursor-pointer"
          onClick={() => copyToClipboard(data.pass, 'pass')}>
          <i className={`${
              copyStatus.pass ? 'pi pi-check' : 'pi pi-clipboard'
            } text-lg text-zinc-900`}></i>
        </div>
      </div>
    </div>
  )
}

export default LoginDetailsCard