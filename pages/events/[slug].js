import {useRouter} from "next/router";
import Layout from "../../components/Layout";

const EventPage = () => {
    const router = useRouter()
    console.log(router)
    return (
        <Layout title='Event'>
            <h1>My Event</h1>
            {router.query.slug}

        </Layout>
    );
};

export default EventPage;
