import Layout from "@/components/Layout";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {useState} from "react";
import {useRouter} from "next/router";
import Link from 'next/link'
import {API_URL} from "@/config/index";
import moment from "moment";
import styles from "@/styles/Form.module.css"
import Image from 'next/image'
import {FaImage} from "react-icons/fa";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";


function EditEventPage({evt}) {
    const [values, setValues] = useState({
        name: evt.name,
        performers: evt.performers,
        venue: evt.venue,
        address: evt.address,
        date: evt.date,
        time: evt.time,
        description: evt.description

    })
    const [imagePreview, setImagePreview] = useState(evt.image ? evt.image.formats.thumbnail.url: null)
    const [showModal, setShowModal] = useState(false)
    const imageUploaded = async ()=>{
       const res = await fetch(`${API_URL}/events/${evt.id}`)
        const data = await res.json()
        setImagePreview(data.image.formats.thumbnail.url)
        setShowModal(false)
    }

    const router = useRouter()
    const handleSubmit = async (e) => {
        e.preventDefault()
        //check if any fields are empty
        const hasEmptyfields = Object.values(values).some((element) => element === '')

//If Empty display a toast message
        if (hasEmptyfields) {
            toast.error('Please fill in all fields')
            return
        }
        //Post data to Strapi Site
        const res = await fetch(`${API_URL}/events/${evt.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
//Check if data has been pushed successfully
        if (!res.ok) {
            toast.error('Something went wrong')
        } else {
            const evt = await res.json()
            await router.push(`/events/${evt.slug}`)
        }

    }

    const handleInputChange = (e) => {
        const {name, value} = e.target

        setValues({...values, [name]: value})
    }
    return (
        <Layout title='Edit Event'>
            <Link href={'/events'}>Go Back</Link>
            <h1>Edit Event</h1>
            <ToastContainer/>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.grid}>
                    <div>
                        <label htmlFor="name">Event Name</label>
                        <input type="text" id='name' name='name'
                               value={values.name} onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="performers">Performers</label>
                        <input type="text" id={'performers'} name={'performers'}
                               value={values.performers} onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="venue">Venue</label>
                        <input type="text" id={'venue'} name={'venue'}
                               value={values.venue} onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="{'address'}">Address</label>
                        <input type="text" id={'address'} name={'address'}
                               value={values.address} onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="date">Event Date</label>
                        <input type="date" id={'date'} name={'date'}
                               value={ moment(values.date).format('yyyy-MM-DD')} onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="time">Time</label>
                        <input type="text" id={'time'} name={'time'}
                               value={values.time} onChange={handleInputChange}
                        />
                    </div>

                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea id={'description'} name={'description'}
                              value={values.description} onChange={handleInputChange}
                    />
                </div>

                <input type="submit" value="Update Event" className={'btn'}/>
            </form>
            <h2>Event Image</h2>
            {imagePreview ? (
                <Image src={imagePreview} height={100} width={170} /> ):(
                <div>
                    <p>No image uploaded</p>
                </div>
            )}
            <div>
                <button className={'btn-secondary'} onClick={()=>setShowModal(true)}> <FaImage /> Set Image</button>

            </div>
            <Modal show={showModal} onClose={()=>setShowModal(false)}>
               <ImageUpload evtId={evt.id} imageUploaded={imageUploaded} />
            </Modal>

        </Layout>
    );
}

export default EditEventPage;

export async function getServerSideProps({params: {id}}){
    const res = await fetch(`${API_URL}/events/${id}`)

    const evt = await res.json()

    return{
        props:{
            evt
        }
    }
}
