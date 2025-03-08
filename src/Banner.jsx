import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export function Banner() {
  const { register, setValue, handleSubmit, watch, reset } = useForm();
  const [selectedItem, setSelectedItem] = useState();
  const [banner, setBanner] = useState();
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
    axios({
      url: `${baseUrl}/banner/${selectedItem.id}`,
      method: selectedItem ? "PATCH" : "POST",
      data: formData,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then((res) => {
      getBanner();
      reset();
    });
  };

  const showBanner = (banner) => {
    setValue("title", banner.title);
    setValue("link", banner.link);
    setSelectedItem(banner);
  };

  return (
    <div>
      <input type="text" {...register("title")} />
      <input type="text" {...register("link")} />
      <input type="file" onChange={handleFile} />
      <button onClick={handleSubmit(onSubmit)}>Save</button>
      <div className='flex gap-5 mt-7'>
        {banner && banner.map((item, index) =>
          <div key={index} className='border w-[300px] '>
            <img className='w-[300px] h-[300px]'
              src={`https://api.fruteacorp.uz/images/${item.image}`}
              alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.link}</p>
            <button onClick={() => showBanner(item)}>Edit</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Banner;