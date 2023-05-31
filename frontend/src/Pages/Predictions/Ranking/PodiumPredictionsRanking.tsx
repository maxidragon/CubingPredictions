import {useState} from 'react';
import {Box, Container, Typography} from "@mui/material";
import RankingTable from '../../../Components/RankingTable/RankingTable';

const PodiumPredictionsRanking = () => {
    const [persons, setPersons] = useState<any>([]);
    return (
        <>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 8,
                    pb: 6,
                }}
            >
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
            </Box>
        </>
    )
};

export default PodiumPredictionsRanking;