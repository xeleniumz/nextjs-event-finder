export async function getAllEvents() {
    const resp = await fetch('https://nextjs-course-f7911-default-rtdb.asia-southeast1.firebasedatabase.app/events.json');
    const data = await resp.json();
    const events = [];
    for (const key in data) {
        events.push({
            id: key,
            ...data[key]
        });
    }
    return events;
}

export async function getFeaturedEvents() {
    const allEvents = await getAllEvents();
    return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
    const allEvents = await getAllEvents();
    const filterEvent = allEvents.find((event) => event.id === id);
    return filterEvent ?? null;
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  const allEvents = await getAllEvents();
  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  return filteredEvents;
}
