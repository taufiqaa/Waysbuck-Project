import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation } from 'react-query';
import Header from "../molecules/header"
import { API } from '../config/api';
import clip from "../../assets/clip.svg"


export default function UpdateTopping() {
  const title = 'Update Topping';
  document.title = 'Waysbuck | ' + title;

  let navigate = useNavigate();
  const { id } = useParams();
  
  const [preview, setPreview] = useState(null); //For image preview
  const [topping, setTopping] = useState({}); //Store topping data
  const [form, setForm] = useState({
    title: '',
    price: '',
    image: '',
  }); //Store topping data

  // Fetching detail topping data by id from database
  useQuery('toppingCache', async () => {
    const response = await API.get('/topping/' + id);
    setPreview(response.data.data.image);
    setForm({
      ...form,
      title: response.data.data.title,
      price: response.data.data.price,
    });
    setTopping(response.data.data);
  });

   // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === 'file' ? e.target.files : e.target.value,
    });
 
    // Create image url for preview
    if (e.target.type === 'file') {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      if (form.image) {
        formData.set('image', form?.image[0], form?.image[0]?.name);
      }
      formData.set('title', form.title);
      formData.set('price', form.price);

      // Insert topping data
      const response = await API.patch(
        '/topping/' + id,
        formData,
        config
      );
      console.log(response.data);

      navigate('/toppings-list');
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
    <Header />
    <main className="after-nav">
        <section className="pt3 flex jc-between ai-start">
            <form className="w100 flex-col mx5"
            onSubmit={ (e) => handleSubmit.mutate(e) }
            >
               <h2 className="mb3 txt-red fw700">Topping</h2>
                <input className="modal-input mb1-5 br-red br5"
                 type="text"
                 id="title" name="title"
                 placeholder="Name Topping"
                 onChange={ handleChange }
                 value={ form?.title }
                 required
                />
                <input className="modal-input mb1-5 br-red br5"
                 type="number"
                 id="price" name="price"
                 placeholder="Price"
                 onChange={ handleChange }
                 value={ form?.price }
                 required
                />
                <input
                type="file"
                name="image" id="photo-topping"
                hidden
                onChange={ handleChange }
                required
                />
                <label className="input mb4 flex jc-between ai-center" htmlFor="photo-topping">
                  {preview}
                  <img src={clip} alt="clip" />
                </label>
                <div className="flex jc-center">
                  <button className="input-button bg-red br-none br5 txt-white fw500">Update Topping</button>
                </div>
            </form>
            { preview && (
            <img className="input-topping" src={preview} alt={preview} />
            )}
        </section>
    </main>
    </>
  )
}
