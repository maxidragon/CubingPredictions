import React from 'react';
import PublicIcon from '@mui/icons-material/Public';
import Flag from 'react-world-flags'

function CompetitionFlagIcon(props: any) {

    if (props.country) {
        return <Flag code={props.country.toLowerCase()} />;
    } else {
        return <PublicIcon />;
    }
}

export default CompetitionFlagIcon;