import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
import { Fragment } from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";

function EventsDetailPage(props) {
    const { event } = props;
    if (!event) {
        return (
            <div className="center">
                <p>Loading...</p>
            </div>
        );
    }
    return (
        <Fragment>
            <EventSummary title={event.title} />
            <EventLogistics
                date={event.date}
                address={event.location}
                image={event.image}
                imageAlt={event.title}
            />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </Fragment>
    );
}
export async function getStaticProps(ctx) {
    const event = await getEventById(ctx.params.id);
    return {
        props: {
            event,
        },
        revalidate: 30
    };
}
export async function getStaticPaths() {
    const events = await getFeaturedEvents();
    const paths = events.map((event) => ({ params: { id: event.id } }));
    return {
        paths,
        fallback: 'blocking',
    };
}

export default EventsDetailPage;