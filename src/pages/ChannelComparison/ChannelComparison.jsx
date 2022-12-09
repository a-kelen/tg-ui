import { Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React from "react";
import { connect } from 'react-redux';
import { WordChart } from "../../components/WordChart/WordChart";
import { 
    getVocabularComparision,
    getWordComparision
} from '../../store/actions/channelActions';
import { generateWordComparisonLines } from "../../utils/generateLines";
import './ChannelComparison.css';

export function Page({
    allWords,
    channels,
    channelsVocabularComparison,
    channelsWordComparison,
    getVocabularComparision,
    getWordComparision
}) {
    
    const [targetWordname, setTargetWordname] = React.useState(null);
    const selectWords = React.useMemo(() => {
        return allWords.map(x => ({ label: x.word, key: x.word}));
    }, [allWords]);
    

    const [selectedLeftChannel, setSelectedLeftChannel] = React.useState('');
    const handleLeftChannelSelect = (e) => {
        setSelectedLeftChannel(e.target.value)
    }
    const [selectedRightChannel, setSelectedRightChannel] = React.useState('');
    const handleRightChannelSelect = (e) => {
        setSelectedRightChannel(e.target.value)
    }
    React.useEffect(() => {
        if (selectedLeftChannel && selectedRightChannel) {
            getVocabularComparision(selectedLeftChannel, selectedRightChannel)
        }
    }, [selectedLeftChannel, selectedRightChannel]);

    React.useEffect(() => {
        if (targetWordname?.key && selectedLeftChannel && selectedRightChannel) {
            getWordComparision(selectedLeftChannel, selectedRightChannel, targetWordname.key)
        }
    }, [targetWordname, selectedLeftChannel, selectedRightChannel]);

    const comparedLines = React.useMemo(() => {
        if (!channelsWordComparison || !targetWordname?.key || !selectedLeftChannel || !selectedRightChannel) 
            return null;
        const leftChannelName = channels.find(x => x.id == selectedLeftChannel).name;
        const rightChannelName = channels.find(x => x.id == selectedRightChannel).name;
        return generateWordComparisonLines(leftChannelName, rightChannelName, channelsWordComparison);
    }, [channelsWordComparison]);

    console.log(comparedLines)

    return <div className="page">
       <Typography variant="h4">Channels comparision</Typography>

       <FormControl className="select" fullWidth>
            <InputLabel id="left-channel-select-label">Left Channel</InputLabel>
            <Select size="small"
                value={selectedLeftChannel}
                labelId="left-channel-select-label"
                id="channel-left-select"
                label="Channel"
                onChange={handleLeftChannelSelect}
                defaultValue=""
            >
                {channels.filter(c => c.id !== selectedRightChannel)
                    .map(c => (<MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>))
                }
            </Select>
        </FormControl>
        <FormControl className="select" fullWidth>
            <InputLabel id="right-channel-select-label"> Right Channel</InputLabel>
            <Select size="small"
                value={selectedRightChannel}
                labelId="right-channel-select-label"
                id="channel-right-select"
                label="Channel"
                onChange={handleRightChannelSelect}
                defaultValue=""
            >
                {channels.filter(c => c.id !== selectedLeftChannel)
                    .map(c => (<MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>))
                }
            </Select>
        </FormControl>
        <div className="division">
            <div className="property">
                <Typography variant="body-2 property-label">By vocabular:</Typography>
                <Typography variant="body-2">{ !!channelsVocabularComparison ? channelsVocabularComparison?.toFixed(2) : 0 }%</Typography>
            </div>
        </div>

        <div className="compare-by-word">
            <Autocomplete
                disablePortal
                disabled={!selectedLeftChannel && !selectedRightChannel}
                id="word-select"
                value={targetWordname}
                onChange={(event, newValue) => {
                    setTargetWordname(newValue);
                }}
                options={selectWords}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Word ..." />}
            />
            {comparedLines && (
                <div className="diagram">
                    <WordChart data={comparedLines}/>
                </div>
            )}
        </div>
    </div>
}

const mapStateToProps  = (state) => ({ 
    allWords: state.words.words,
    channels: state.channels.channels,
    channelsWordComparison: state.channels.channelsWordComparison,
    channelsVocabularComparison: state.channels.channelsVocabularComparison
});
export const ChannelComparison = connect(mapStateToProps, {
    getVocabularComparision,
    getWordComparision
})(Page);
