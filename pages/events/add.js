import Layout from "@/components/Layout";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {useState} from "react";
import {useRouter} from "next/router";
import Link from 'next/link'
import {API_URL} from "@/config/index";
import styles from "@/styles/Form.module.css"

function AddEventPage() {
    const [values, setValues] = useState({
        name: '',
        performers: '',
        venue: '',
        address: '',
        date: '',
        time: '',
        description: ''
    })

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
        const res = await fetch(`${API_URL}/events`, {
            method: 'POST',
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
        <Layout title='Add New Event'>
            <Link href={'/events'}>Go Back</Link>
            <h1>Add Event</h1>
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
                               value={values.date} onChange={handleInputChange}
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

                <input type="submit" value="Add Event" className={'btn'}/>
            </form>
        </Layout>
    );
}

export default AddEventPage;
