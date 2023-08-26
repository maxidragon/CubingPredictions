import { Typography } from "@mui/material";

const TooLateToAdd = () => {
  return (
    <>
      <Typography variant="h6" color="red" style={{ flexGrow: 1 }}>
        Sorry, you can't add your prediction right now. This final has already
        started.
      </Typography>
    </>
  );
};

export default TooLateToAdd;
