import classes from "./Psychsheet.module.css";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {generateRanking} from "../../../logic/competitions";
import {useEffect, useState} from "react";

const Psychsheet = (props: any) => {
    const [ranking, setRanking] = useState<any>([]);

    const generateRankingData = () => {
        console.log(props.competition);
        if (props.competition.persons) {
            const generatedRanking = generateRanking(props.competition.persons, props.event, props.type);
            setRanking(generatedRanking);
        }
    };

    useEffect(() => {
        generateRankingData();
    }, [props.competition.persons]);
    return (
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
                                    {position+1}
                                </TableCell>
                                <TableCell>
                                    {player.name}
                                </TableCell>
                                <TableCell>{player.result}</TableCell>
                                <TableCell>{player.worldRank}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
    )
};

export default Psychsheet;