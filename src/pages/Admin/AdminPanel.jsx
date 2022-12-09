import { Button, Chip, Typography } from "@mui/material";
import './AdminPanel.css';

export function AdminPanel() {
    return <div className="page">
        <div className="division">
            <Typography variant="h6" className="g-title">System state</Typography>
            <div className="property">
                <Typography variant="body-2 property-label">Last day:</Typography>
                <Typography variant="body-2">14.09.2022</Typography>
            </div>
            <div className="property">
                <Typography variant="body-2 property-label">Next day:</Typography>
                <Typography variant="body-2">15.09.2022</Typography>
            </div>
        </div>
        <div className="runner">
            <Button className="run-btn" variant="outlined">Run next day</Button>
            <Chip label="Completed" color="success" />
        </div>
    </div>
}