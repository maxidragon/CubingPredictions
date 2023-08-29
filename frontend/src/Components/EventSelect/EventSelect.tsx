import { useEffect } from "react";
import { Event } from "../../logic/interfaces";
import { IconButton, Tooltip } from "@mui/material";

const EventSelect = (props: {
  events: Event[];
  selectedEvent: Event | null;
  eventChange: (id: string) => void;
}) => {
  useEffect(() => {
    if (!props.selectedEvent && props.events.length > 0) {
      props.eventChange(props.events[0].id);
    }
  }, [props.selectedEvent, props.events, props.eventChange]);

  return (
    <div>
      {props.events &&
        props.events.map((event: Event) => (
          <Tooltip title={event.name} placement="top" key={event.id}>
            <IconButton onClick={() => props.eventChange(event.id)}>
              <span
                className={`cubing-icon event-${event.id}`}
                style={{
                  opacity: event.id === props.selectedEvent?.id ? 1 : 0.3,
                }}
              />
            </IconButton>
          </Tooltip>
        ))}
    </div>
  );
};
export default EventSelect;
