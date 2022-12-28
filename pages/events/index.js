import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/event-search";
import { useRouter } from "next/router";
import { Fragment } from "react";

function AllEventsPage() {
  const router = useRouter();
  const events = getAllEvents();
  const searchEventHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }
  return (
    <Fragment>
      <EventsSearch onSearch={searchEventHandler} />
      <EventList items={events} />
    </Fragment>
  );
}
export default AllEventsPage;