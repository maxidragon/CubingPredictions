import {useEffect, useState} from 'react';
import {Box, CircularProgress, Container, Typography} from "@mui/material";
import RankingTable from '../../../Components/RankingTable/RankingTable';
import {getPodiumPredictionsRanking} from "../../../logic/ranking";

const PodiumPredictionsRanking = () => {
    const [persons, setPersons] = useState<any>([]);
    const [loading, setIsLoading] = useState<boolean>(false);
    const fetchData = async () => {
        setIsLoading(true);
        return await getPodiumPredictionsRanking();
    };
    useEffect(() => {
        fetchData().then((data) => {
            setPersons(data);
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
        });
    }, []);
    return (
        <>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 8,
                    pb: 6,
                }}
            >
                {loading ? <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}><CircularProgress  /></Box> : (
                <Container sx={{display: 'flex', flexDirection: 'column'}}>
                    <Typography
                        variant="h4"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        Podium predictions ranking
                    </Typography>
                    <RankingTable persons={persons} />
                </Container>
                    )}
            </Box>
        </>
    )
};

export default PodiumPredictionsRanking;