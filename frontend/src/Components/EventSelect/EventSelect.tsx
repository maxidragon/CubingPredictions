import {IconButton, Tooltip} from "@mui/material";
import React from "react";
import "@cubing/icons";

const EventSelect = (props: any) => {
    console.log('eveents');
    return (
        <div>
            {props.events && props.events.map((event: any) => (
                <Tooltip title={event.name} placement="top" key={event.id}>
                    <IconButton onClick={() => props.eventChange(event.id)}>
              <span
                  className={`cubing-icon event-${event.id}`}
                  style={{opacity: event.id === props.selectedEvent.id ? 1 : 0.3}}
              />
                    </IconButton>
                </Tooltip>
            ))}
        </div>
    );
}
export default EventSelect;