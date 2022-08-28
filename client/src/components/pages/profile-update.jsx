import Header from '../molecules/header'
import clip from "../../assets/clip.svg"
import { useState, useEffect } from 'react';
import { API } from '../config/api';
import { useNavigate } from 'react-router';
import { useMutation, useQuery } from 'react-query';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';

export default function ProfileUpdate() {
    const [state] = useContext(UserContext)
    const navigate = useNavigate()

    const id = state.user.id
    const [photoProduct, setPhotoProduct] = useState(<p>Photo Product</p>)
    const [preview, setPreview] = useState(null)
    const [form, setForm] = useState({ name: '', image: '' })

    const { data: profile, refetch } = useQuery('profileCache', async () => {
        const res = await API.get(`/profile/${id}`)
        return res.data.data
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value
        })

        if (e.target.type === 'file') {
            let url = URL.createObjectURL(e.target.files[0])
            setPreview(url)
            setPhotoProduct(
                <p className="txt-black">{ url.slice(12) }</p>
            )
        }
    }
    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()

            const config = {
                headers: {'Content-type': 'multipart/form-data'}
            }

            const formData = new FormData()
            if (form.image) {
                formData.set('image', form?.image[0], form?.image[0]?.name)
            }
            formData.set('name', form.name)

            const res = await API.patch(`/profile/${id}`, formData, config)
            navigate('/profile')
        } catch (error) {
            console.log(error);
        }
    })
    
    useEffect(() => {
        if (profile) {
            setPreview(profile.image)
            setForm({...form, name: profile.name})
        }
    }, [profile])


  return (
    <>
    <Header />
    <main className="after-nav">
        <section className="pt3 flex jc-between ai-start">
            <form className="w100 flex-col mx5"
            onSubmit={ (e) => handleSubmit.mutate(e) }
            >
               <h2 className="mb3 txt-red fw700">Profile</h2>
                <input className="modal-input mb1-5 br-red br5"
                 type="text"
                 name="name"
                 placeholder="Full Name"
                 onChange={ handleChange }
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
                  {photoProduct}
                  <img src={clip} alt="clip" />
                </label>
                <div className="flex jc-center">
                  <button className="input-button bg-red br-none br5 txt-white fw500">Update Profile</button>
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
