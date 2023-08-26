import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import Row from "../../../Components/PredictionsTable/Row/Row";
import { CircularProgress } from "@mui/material";
import { getAllUserPredictions } from "../../../logic/predictions";
import { UserPrediction } from "../../../logic/interfaces";

const UserPodiumPredictions = (props: { userId: number }) => {
  const [predictions, setPredictions] = useState<UserPrediction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getAllUserPredictions(props.userId);
      console.log(data);
      setPredictions(data);
    };
    fetchData();
    setIsLoading(false);
  }, [props.userId]);
  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper} sx={{ maxWidth: "50%", mb: 10 }}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Competition</TableCell>
                <TableCell>Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {predictions.map((prediction: UserPrediction) => (
                <Row key={prediction.competitionId} row={prediction} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default UserPodiumPredictions;
