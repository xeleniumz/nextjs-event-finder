import Head from "next/head";
import { Fragment } from "react";

import { getAllEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/event-search";
import { useRouter } from "next/router";

function AllEventsPage(props) {
  const { events } = props;
  const router = useRouter();
  const searchEventHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }
  return (
    <Fragment>
       <Head>
          <title>All Events</title>
          <meta
              name='description'
              content='Find a lot of great events that allow you to evolve...'
          />
      </Head>
      <EventsSearch onSearch={searchEventHandler} />
      <EventList items={events} />
    </Fragment>
  );
}
export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      events,
    },
    revalidate: 60,
  };
}
export default AllEventsPage;