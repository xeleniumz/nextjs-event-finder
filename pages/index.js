import { getFeaturedEvents } from '../dummy-data';
import EventList from '../components/events/event-list';

function IndexPage() {
    const filteredEvents = getFeaturedEvents();
    return (
        <div>
            <EventList items={filteredEvents} />
        </div>
    )
}
export default IndexPage;