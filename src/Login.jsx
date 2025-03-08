import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
  const {register, handleSubmit} = useForm();
  const navigate = useNavigate('/')
  const onSubmit = (data) => {
    axios({
      url: "https://api.fruteacorp.uz/auth/signin",
      method: "POST",
      data: data,
    }).then((res) => {
      toast.success("muvaffaqiyatli o'tildi")
      localStorage.setItem("token", res.data.data.accessToken.token);
      navigate('/banner')
    });
  };
  return (
    <div>
      <input type="text" className='border'
        {...register("phone")} />
      <input type="text" className='border'
        {...register("password")} />
      <button onClick={handleSubmit(onSubmit)} className='border bg-blue-500 text-white'>
        Login
      </button>
    </div>
  );
}

export default Login;