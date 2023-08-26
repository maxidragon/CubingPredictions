import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";
import events from "../../../logic/events";
import {
  Box,
  Collapse,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Event, TablePrediction } from "../../../logic/interfaces";

const Row = (props: {
  row: {
    competitionId: string;
    competitionName: string;
    sumOfScore: number;
    predictions: TablePrediction[];
  };
}) => {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Link
            component={RouterLink}
            to={`/competitions/${row.competitionId}`}
            sx={{ textDecoration: "none" }}
          >
            {row.competitionName}
          </Link>
        </TableCell>
        <TableCell>{row.sumOfScore}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Event</TableCell>
                    <TableCell>Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.predictions.map((prediction: TablePrediction) => (
                    <TableRow key={prediction.event}>
                      <TableCell component="th" scope="row">
                        {events.find(
                          (event: Event) => event.id === prediction.event,
                        )?.name || ""}
                      </TableCell>
                      <TableCell>{prediction.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default Row;
