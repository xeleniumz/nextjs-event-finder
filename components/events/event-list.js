import EventItem from "./event-item";
import classes from "./event-list.module.css";

function EventList(props) {
  const { items } = props;
  return (
    <ul className={classes.list}>
      {items.map((event) => (
          <EventItem
              event={event}
              key={event.id}
          >   
          </EventItem>
      ))}
    </ul>
  );
}
export default EventList;