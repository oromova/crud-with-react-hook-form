import React from 'react';
import { useForm } from 'react-hook-form';

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <input type="text" {...register("name", {required: "Ism kiriting"})}/>
      {errors.name && <p>{errors.name.message}</p>}
      <input type="text" {...register("phone")} />
      <button onClick={handleSubmit(onSubmit)}>Save</button>
    </div>
  );
}

export default App;