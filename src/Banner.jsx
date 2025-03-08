import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export function Banner() {
  const { register, setValue, handleSubmit, watch, reset } = useForm();
  const [selectedItem, setSelectedItem] = useState(null);
  const [banner, setBanner] = useState([]);
  const baseUrl = "https://api.fruteacorp.uz";
  const token = localStorage.getItem("token");

  const getBanner = () => {
    axios.get(`${baseUrl}/banner`).then(res => {
      setBanner(res.data.data);
    });
  };

  useEffect(() => {
    getBanner();
  }, []);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if(file) {
      setValue("image", file);
    }
  };

  const onSubmit = (data) => {
    const file = watch("image");
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("link", data.link);
    if (file) {
      formData.append("image", file);
    }
    const url = selectedItem ? `${baseUrl}/banner/${selectedItem.id}` : `${baseUrl}/banner`;
    const method = selectedItem ? "PATCH" : "POST";


    axios({
      url: url,
      method: method,
      data: formData,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then((res) => {
      getBanner();
      reset();
    }).catch((err) => {
      console.error(err, "Banner yuklashda xatolik");
    });
  };

  const showBanner = (banner) => {
    setValue("title", banner.title);
    setValue("link", banner.link);
    setSelectedItem(banner);
  };

  return (
    <div>
      <div className='p-3.5 w-[400px] rounded mx-auto'>
        <h1 className='font-bold'>Yangi banner qo'shish</h1>
        <input className='border p-1 mb-1.5' type="text" placeholder='Title'
          {...register("title")} /> <br />
        <input className='border p-1 mb-1.5' type="text" placeholder='Link'
          {...register("link")} /> <br />
        <input  className='border p-1 mb-1.5' type="file" onChange={handleFile} /> <br />
        <button className='bg-blue-500 text-white px-4 py-2 my-3 rounded-lg shadow-lg hover:bg-blue-600 transition mr-3.5' onClick={handleSubmit(onSubmit)}>Banner qo'shish</button>
      </div>
    
      <div className='flex gap-5 mt-7 justify-center'>
        {banner && banner?.map((item, index) =>
          <div key={index} className='border w-[300px] rounded-2xl p-2'>
            <img className='w-[300px] h-[300px]'
              src={`https://api.fruteacorp.uz/images/${item.image}`}
              alt={item.title} />
            <h3>{item.title}</h3>
            <button 
              className='bg-blue-500 text-white px-4 py-2 my-3 rounded-lg shadow-lg hover:bg-blue-600 transition mr-3.5'
              onClick={() => showBanner(item)}>Tahrirlash</button>
             <button className='bg-red-500 text-white px-4 py-2 my-3 rounded-lg shadow-lg hover:bg-blue-600 transition'>O'chirish</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Banner;