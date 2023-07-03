import classes from "./Psychsheet.module.css";
import { Button, Link, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { generateRanking } from "../../../logic/competitions";
import { useEffect, useState } from "react";

const Psychsheet = (props: any) => {
    const [ranking, setRanking] = useState<any>([]);
    const [type, setType] = useState<string>('average');


    const handleTypeChange = () => {
        if (type === 'average') {
            setType('single');
        } else {
            setType('average');
        }
    }
    useEffect(() => {
        const generateRankingData = () => {
            if (props.competition.persons) {
                const generatedRanking = generateRanking(props.competition.persons, props.event, type);
                console.log(generatedRanking);
                setRanking(generatedRanking);
            }
        };
        generateRankingData();
    }, [props.competition.persons, type, props.event]);
    return (
        <>
            <Typography variant="h5">Psychsheet</Typography>
            <Button variant="contained" onClick={handleTypeChange}>Single/average</Button>
            <Typography variant="h6">Sorted by {type}</Typography>
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
                                    <TableCell>
                                        {player.notResult ? '' : position + 1}
                                    </TableCell>
                                </TableCell>
                                <TableCell>
                                    <Link href={`https://worldcubeassociation.org/persons/${player.wcaId}`}
                                        underline="none" target="_blank">
                                        {player.name}
                                    </Link>
                                </TableCell>
                                <TableCell>{player.result}</TableCell>
                                <TableCell>
                                    {player.notResult ? '' : player.worldRank}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    )


};

export default Psychsheet;