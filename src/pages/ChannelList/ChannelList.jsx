import { List, ListItem, Typography } from "@mui/material";
import { ChannelItem } from "../../components/ChannelItem/ChannelItem";
import { connect } from 'react-redux';

import './ChannelList.css';

function Component({channels}) {
    const sortedChannels = channels.sort((a, b) => b.total_messages - a.total_messages)
    return (
        <div className="channel-list">
            <Typography className="channels-title" variant="h4">Channels ({sortedChannels.length})</Typography>
            <List>
                {sortedChannels.map(channel => (
                    <ListItem key={channel.id}>
                        <ChannelItem {...channel}></ChannelItem>
                    </ListItem>))
                }
            </List>
        </div>
    )
}

const mapStateToProps  = (state) => ({ channels: state.channels.channels });
export const ChannelList = connect(mapStateToProps, {})(Component);
