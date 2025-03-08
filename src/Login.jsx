import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate('/');
  const onSubmit = (data) => {
    axios({
      url: "https://api.fruteacorp.uz/auth/signin",
      method: "POST",
      data: data,
    }).then((res) => {
      toast.success("muvaffaqiyatli o'tildi");
      localStorage.setItem("token", res.data.data.accessToken.token);
      navigate('/banner');
    });
  };
  return (
    <div>
      <div className='mx-auto w-[400px] '>
         <label htmlFor="username">Login:</label> <br />
      <input className='border w-[250px] h-[40px]' type="text"
        {...register("phone")} /> <br />
      <label htmlFor="password">Password:</label> <br />
      <input className='border w-[250px] h-[40px]' type="text"
        {...register("password")} /> <br />
      <button className="shadow bg-blue-500 hover:bg-blue-600 transition mr-3.5 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" onClick={handleSubmit(onSubmit)} >
        Login
      </button>
      </div>
     
    </div>
  );
}

export default Login;