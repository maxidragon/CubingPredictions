import {Link, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
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
                        {props.persons.map((person: any) => (
                            <TableRow key={person.id}>
                                <TableCell>

                                </TableCell>
                                <TableCell>
                                    {person.name}
                                </TableCell>
                                <TableCell>
                                    {person.wcaId &&
                                    <Link href={`https://worldcubeassociation.org/persons/${person.wcaId}`} underline="none" target="_blank">
                                        {person.wcaId}
                                    </Link>
                                    }
                                </TableCell>
                                <TableCell>{person.score}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    )
};

export default RankingTable;