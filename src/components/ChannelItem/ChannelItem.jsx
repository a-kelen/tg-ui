import { Card, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import './ChannelItem.css';

export function ChannelItem({id, name, total_messages}) {
    return (
        <Link to={`/channel/${id}`}>
            <Card className="channel-item" onClick={() => {}}>
                <Typography variant="h5">{name}</Typography>
                <Typography variant="body-1">{total_messages} message{total_messages > 1 ? 's' : ''}</Typography>
            </Card>
        </Link>
        
    )
}