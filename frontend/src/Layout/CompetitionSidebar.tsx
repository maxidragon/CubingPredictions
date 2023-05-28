import {List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import events from '../logic/events';
import "@cubing/icons";

const CompetitionSidebar = (props: any) => {
    return (
        <>
            <List>
                {props.competition.events && props.competition.events.map((competitionEvent: any) => (
                    <ListItemButton key={competitionEvent.id} onClick={() => {
                        props.onEventChange(competitionEvent.id);
                    }}>
                        <ListItemIcon>
                            <span className={`cubing-icon event-${competitionEvent.id}`} style={{opacity: 1, fontSize: 24}} />
                        </ListItemIcon>
                        <ListItemText primary={events.find(e => e.id === competitionEvent.id)?.name} />
                    </ListItemButton>
                ))}
            </List>
        </>
    )
};


export default CompetitionSidebar;