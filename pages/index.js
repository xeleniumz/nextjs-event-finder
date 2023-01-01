import Head from 'next/head';

import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/event-list';

function IndexPage(props) {
    return (
        <div>
            <Head>
                <title>NextJS Events</title>
            </Head>
            <EventList items={props.events} />
        </div>
    )
}
export const getStaticProps = async () => {
    const featuredEvents = await getFeaturedEvents();
    return {
        props: {
            events: featuredEvents,
        },
        revalidate: 1800,
    }
}
export default IndexPage;