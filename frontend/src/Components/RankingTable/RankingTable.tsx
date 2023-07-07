import { Link, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import classes from "./RankingTable.module.css";
import { useEffect, useState } from "react";
const RankingTable = (props: any) => {
    const [persons, setPersons] = useState<any>([]);
    useEffect(() => {
        const sortedPersons = [...props.persons];
        sortedPersons.sort((a, b) => b.score - a.score);
        setPersons(sortedPersons);
    }, [props.persons]);
    return (
        <>
            <div className={classes.rankingTable}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Position</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>WCA ID</TableCell>
                            <TableCell>Score</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {persons.map((person: any, position: number) => {
                            let previousPosition = position - 1;
                            if (position > 0 && person.score === persons[previousPosition].score) {
                                position = persons[previousPosition].position;
                            } else {
                                person.position = position + 1;
                            }
                            return (
                                <TableRow key={person.user.id}>
                                    <TableCell>
                                        {person.position}
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/profile/${person.user.id}`} underline="none" component={RouterLink}>
                                            {person.user.username}
                                        </Link>

                                    </TableCell>
                                    <TableCell>
                                        {person.user.wcaId &&
                                            <Link href={`https://worldcubeassociation.org/persons/${person.user.wcaId}`} underline="none" target="_blank">
                                                {person.user.wcaId}
                                            </Link>
                                        }
                                    </TableCell>
                                    <TableCell>{person.score}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </>
    )
};

export default RankingTable;