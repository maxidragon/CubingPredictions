import { Link, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import classes from "./RankingTable.module.css";

const RankingTable = (props: any) => {

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
                        {props.persons.map((person: any, position: number) => {
                             let previousScore = position > 0 ? props.persons[position - 1].score : null;
                             let previousPosition = position > 0 ? position - 1 : 0;
                                console.log(previousScore, person.score);
                             if (previousScore === person.score) {
                                 position = previousPosition;
                             }
                            return (
                                <TableRow key={person.user.id}>
                                    <TableCell>
                                        {position + 1}
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