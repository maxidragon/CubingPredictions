import {useEffect, useState} from "react";
import {getPodiumForEvent} from "../../../logic/competitions";
import {Box, Typography} from "@mui/material";

const Podium = (props: any) => {
    const [ranking, setRanking] = useState<any>([]);
    useEffect(() => {
        const generateRankingData = () => {
            console.log(props.competition, props.event);
            if (props.competition.persons) {
                const generatedRanking = getPodiumForEvent(props.competition, props.event.id);
                console.log(generatedRanking);
                setRanking(generatedRanking);
            }
        };
        generateRankingData();
    }, [props.competition, props.event]);
    return (
        <>
            <Box sx={{mb: 5, mt: 2}}>
              
                {ranking && ranking.firstPlace && ranking.secondPlace && ranking.thirdPlace && (
                    <>
                      <Typography variant="h5">Competition is over.</Typography>
                        <Typography variant="h5">Podium for {props.event.name}</Typography>
                        <Typography
                            variant="body1">1. {ranking.firstPlace.name} {ranking.firstPlace.wcaId}</Typography>
                        <Typography
                            variant="body1">2. {ranking.secondPlace.name} {ranking.secondPlace.wcaId}</Typography>
                        <Typography
                            variant="body1">3. {ranking.thirdPlace.name} {ranking.thirdPlace.wcaId}</Typography>

                    </>
                )}
            </Box>
        </>
    );
};

export default Podium;