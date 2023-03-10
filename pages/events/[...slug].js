import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import useSWR from 'swr';
import Head from 'next/head';

import { getFilteredEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

function FilterEventsPage(props) {
    const [ loadedEvents , setLoadedEvents ] = useState();
    const router = useRouter();
    const filterData = router.query.slug;
    const { data, error } = useSWR(
        'https://nextjs-course-f7911-default-rtdb.asia-southeast1.firebasedatabase.app/events.json',
        (url) => fetch(url).then(res => res.json())
    );

    useEffect(() => {
        if (data) {
        const events = [];
        for (const key in data) {
            events.push({
            id: key,
            ...data[key],
            });
        }
        setLoadedEvents(events);
        }
    }, [data]);

    let pageHeader = (
        <Head>
            <title>Filtered Events</title>
            <meta
                name='description'
                content='A list of filtered events'
            />
        </Head>
    );
    
    if (!loadedEvents) {
        return (
            <Fragment>
                {pageHeader}
                <p className='center'>Loading...</p>
            </Fragment>

        )
    }

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];
    const year = +filteredYear;
    const month = +filteredMonth;

    pageHeader = (
            <Head>
                <title>Filtered Events</title>
                <meta
                    name='description'
                    content={`All event for ${month}/${year}`}
                />
            </Head>
    )

    if (
        isNaN(year) ||
        isNaN(month) ||
        year > 2030 ||
        year < 2021 ||
        month < 1 ||
        month > 12 || 
        error
    ) {
        return (
            <Fragment>
                {pageHeader}
                <ErrorAlert>
                    Invalid Filter. Please Adjust your values.
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </Fragment>
        );
    }
    const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
        return (
            eventDate.getFullYear() === year &&
            eventDate.getMonth() === month - 1
        );
    });


    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <Fragment>
                {pageHeader}
                <ErrorAlert>
                    No Events Found.
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </Fragment>
        );
    }
    const date = new Date(year, month - 1);
    return (
        <Fragment>
            {pageHeader}
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </Fragment>
    )
    
}
/*
export async function getServerSideProps(ctx) {
    const { params } = ctx;
    const filterData = params.slug;
    const year = +filterData[0];
    const month = +filterData[1];
    if (
        isNaN(year) ||
        isNaN(month) ||
        year > 2030 ||
        year < 2021 ||
        month < 1 ||
        month > 12
    ) {
        return {
            props: {
                hasError: true,
            },
            // notFound: true,
            // redirect: {
            //     destination: '/error',
            // }
      }
    }
    const filteredEvents = await getFilteredEvents({ year, month });
    return {
        props: {
            events: filteredEvents,
            date: {
                year,
                month,
            }
        },
    };
} 
*/
export default FilterEventsPage;
