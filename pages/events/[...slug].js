import { useRouter } from 'next/router';
import { Fragment } from 'react';

import { getFilteredEvents } from '../../dummy-data';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

function FilterEventsPage() {
    const router = useRouter();
    const filterData = router.query.slug;
    if(!filterData) {
        return <p className='center'>Loading...</p>
    }
    const year = +filterData[0];
    const month = +filterData[1];
    if(isNaN(year) || isNaN(month) || year > 2030 || year < 2021 || month < 1 || month > 12) {
        return <Fragment>
            <ErrorAlert>Invalid Filter. Please Adjust your values.</ErrorAlert>
             <div className='center'>
                <Button link='/events'>Show All Events</Button>
            </div>
        </Fragment>
    }
    const filteredEvents = getFilteredEvents({ year, month });
    if (!filteredEvents || filteredEvents.length === 0) {
        return <Fragment>
            <ErrorAlert>No Events Found.</ErrorAlert>
            <div className='center'>
                <Button link='/events'>Show All Events</Button>
            </div>
        </Fragment>
    }

    return (
        <Fragment>
            <ResultsTitle date={new Date(year, month - 1)} />
            <EventList items={filteredEvents} />
        </Fragment>
    )
    
}
export default FilterEventsPage;
