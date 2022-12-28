import Button from "../ui/button";
import DateIcon from '../icons/date-icon';
import classes from './event-item.module.css';
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";

function EventItem(props) {
    const { title, image, date, location, id } = props.event;
    const dateTime = new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const address = location.replace(', ', '\n');
    const link = `/events/${id}`;
    return (
        <li className={classes.item}>
            <img src={"/" + image} alt="" />
            <div className={classes.content}>
                <div className={classes.summary}>
                    <h2>{title}</h2>
                    <div className={classes.date}>
                        <DateIcon />
                        <time>{dateTime}</time>
                    </div>
                    <div className={classes.address}>
                        <AddressIcon />
                        <address>{address}</address>
                    </div>
                </div>
                <div className={classes.actions}>
                    <Button link={link}>
                        <span>Explore Event</span>
                        <span className={classes.icon}>
                            <ArrowRightIcon />
                        </span>
                    </Button>
                </div>
            </div>
        </li>
    )
}

export default EventItem;