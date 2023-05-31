import classes from "./Psychsheet.module.css";
import {Box, Link, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import {generateRanking} from "../../../logic/competitions";
import {useEffect, useState} from "react";

const Psychsheet = (props: any) => {
    const [ranking, setRanking] = useState<any>([]);

    const generateRankingData = () => {
        if (props.competition.persons) {
            const generatedRanking = generateRanking(props.competition.persons, props.event, props.type);
            console.log(generatedRanking);
            setRanking(generatedRanking);
        }
    };

    useEffect(() => {
        generateRankingData();
    }, [props.competition.persons]);
    return (
        <>
            <Box sx={{mb: 5, mt: 2}}>
                <Typography variant="h5">Psychsheet</Typography>
                <div className={classes.rankingTable}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Position</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Result</TableCell>
                                <TableCell>WR</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ranking.map((player: any, position: number) => (
                                <TableRow key={player.id}>
                                    <TableCell>
                                        {position + 1}
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`https://worldcubeassociation.org/persons/${player.wcaId}`} underline="none" target="_blank">
                                            {player.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{player.result}</TableCell>
                                    <TableCell>{player.worldRank}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Box>
        </>
    )


};

export default Psychsheet;