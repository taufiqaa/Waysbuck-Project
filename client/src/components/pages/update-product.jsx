import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation } from 'react-query';
import Header from "../molecules/header"
import { API } from '../config/api';
import clip from "../../assets/clip.svg"


export default function UpdateProduct() {
  const title = 'Update Product';
  document.title = 'Waysbuck | ' + title;

  let navigate = useNavigate();
  const { id } = useParams();
  
  const [preview, setPreview] = useState(null); //For image preview
  const [product, setProduct] = useState({}); //Store product data
  const [form, setForm] = useState({
    title: '',
    price: '',
    image: '',
  }); //Store product data

  // Fetching detail product data by id from database
  useQuery('productCache', async () => {
    const response = await API.get('/product/' + id);
    setPreview(response.data.data.image);
    setForm({
      ...form,
      title: response.data.data.title,
      price: response.data.data.price,
    });
    setProduct(response.data.data);
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

      // Insert product data
      const response = await API.patch(
        '/product/' + id,
        formData,
        config
      );
      console.log(response.data);

      navigate('/products-list');
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
               <h2 className="mb3 txt-red fw700">Product</h2>
                <input className="modal-input mb1-5 br-red br5"
                 type="text"
                 id="title" name="title"
                 placeholder="Name Product"
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
                name="image" id="photo-product"
                hidden
                onChange={ handleChange }
                required
                />
                <label className="input mb4 flex jc-between ai-center" htmlFor="photo-product">
                  {preview}
                  <img src={clip} alt="clip" />
                </label>
                <div className="flex jc-center">
                  <button className="input-button bg-red br-none br5 txt-white fw500">Update Product</button>
                </div>
            </form>
            { preview && (
            <img className="input-product" src={preview} alt={preview} />
            )}
        </section>
    </main>
    </>
  )

}
