import { getCompetitionInfo } from "../../logic/competitions";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import events from "./../../logic/events";
import CompetitionEvent from "./CompetitionEvent/CompetitionEvent";
import EventSelect from "../../Components/EventSelect/EventSelect";
import { Box, CircularProgress, Link, Typography } from "@mui/material";
import { Event, PublicWCIF } from "../../logic/interfaces";
import { Event as EventInterface } from "@wca/helpers";

const Competition = () => {
  const navigate = useNavigate();
  const { competitionId } = useParams<{ competitionId: string }>();
  const [competition, setCompetition] = useState<PublicWCIF | null>(null);
  const [competitionEvents, setCompetitionEvents] = useState<Event[]>([]);
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (competitionId) {
        const info = await getCompetitionInfo(competitionId);
        if (info) {
          setCompetition(info);
          info.events.forEach((e: EventInterface) => {
            const event = events.find((event) => event.id === e.id);
            if (event) {
              setCompetitionEvents((prev) => [...prev, event]);
              if (events[0].id === e.id) setEvent(event);
            }
          });
        } else {
          navigate("/wca");
        }
      }
    };
    fetchData();
  }, [competitionId, navigate]);
  const handleEventChange = (id: string) => {
    const newEvent = events.find((e) => e.id === id);
    if (newEvent) {
      setEvent(newEvent);
    }
  };
  if (!competition) return <CircularProgress />;
  return (
    <>
      <Box
        sx={{
          display: "flex !important",
          flexDirection: "column !important",
          justifyContent: "center !important",
          alignItems: "center !important",
          textAlign: "center !important",
          mt: 3,
        }}
      >
        <Typography variant="h4">
          <Link
            href={`https://worldcubeassociation.org/competitions/${competition.id}`}
            sx={{ textDecoration: "none" }}
            target="_blank"
          >
            {competition.name}
          </Link>
        </Typography>
        <EventSelect
          selectedEvent={event}
          events={competitionEvents}
          eventChange={handleEventChange}
        />
        {competition && competition.id && event ? (
          <CompetitionEvent competition={competition} event={event} />
        ) : (
          <CircularProgress />
        )}
      </Box>
    </>
  );
};

export default Competition;
