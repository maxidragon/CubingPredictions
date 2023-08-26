import PublicIcon from "@mui/icons-material/Public";
import Flag from "react-world-flags";

function CompetitionFlagIcon(props: { country: string | null | undefined }) {
  if (props.country) {
    return <Flag code={props.country.toLowerCase()} />;
  } else {
    return <PublicIcon />;
  }
}

export default CompetitionFlagIcon;
