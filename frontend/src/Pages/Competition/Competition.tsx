import {getCompetitionInfo} from '../../logic/competitions';
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import events from './../../logic/events';
import CompetitionEvent from './CompetitionEvent/CompetitionEvent';
import EventSelect from "../../Components/EventSelect/EventSelect";
import {Box, CircularProgress, Typography} from "@mui/material";

const Competition = (props: any) => {
    const navigate = useNavigate();
    const {competitionId} = useParams<{ competitionId: string }>();
    const [competition, setCompetition] = useState<any>({});
    const [event, setEvent] = useState<any>({});

    useEffect(() => {
        const fetchData = async () => {
            if (competitionId) {
                const info = await getCompetitionInfo(competitionId);
                if (info) {
                    setCompetition(info);
                    setEvent(events.find(e => e.id === info.events[0].id));
                } else {
                    navigate('/wca');
                }
            }
        };
        fetchData();
    }, [competitionId, navigate]);
    const handleEventChange = (id: string) => {
        const newEvent = events.find(e => e.id === id);
        if (newEvent) {
            setEvent(newEvent);
        }
    };
    return (
        <>
            <Box sx={{
                display: 'flex !important',
                flexDirection: 'column !important',
                justifyContent: 'center !important',
                alignItems: 'center !important',
                textAlign: 'center !important',
                mt: 3
            }}>
                <Typography variant="h4">{competition.name}</Typography>
                <EventSelect selectedEvent={event} events={competition.events} eventChange={handleEventChange}/>
                {competition && competition.id ? <CompetitionEvent competition={competition} event={event}/>: <CircularProgress />}
            </Box>
        </>
    )
};

export default Competition;