import { Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import * as React from 'react';
import { WordChart } from "../../components/WordChart/WordChart";
import { connect } from 'react-redux';
import { 
    getWordGlobalLibe,
    getWordStats,
    getWordStatsByChannel,
    getWordChannelLine
} from '../../store/actions/wordActions'
import { generateWordLine } from "../../utils/generateLines";

import './WordPage.css'

function Page({ 
    allWords,
    channels,
    wordStats,
    getWordStats,
    wordGlobalLine,
    wordChannelGlobalLine,
    wordStatsByChannel,
    getWordGlobalLibe,
    getWordStatsByChannel,
    getWordChannelLine
}) {
    const [wordSelection, setWordSelection] = React.useState('global');
    const [targetWordname, setTargetWordname] = React.useState(null);

    const handleChangeWordSelection = (event, newSelection) => {
        setWordSelection(newSelection);
    };

    const targetWord = allWords.find(x => x.word === targetWordname?.key) ?? null;
    const wordExists = !!targetWord;
    
    React.useEffect(() => {
        if (targetWord) {
            getWordStats(targetWord.word);
            getWordGlobalLibe(targetWord.word);
        }
    }, [targetWord]);

    const wordLine = React.useMemo(() => {
        if (!wordGlobalLine)
            return null;
        return generateWordLine(targetWord?.word, wordGlobalLine);
    }, [wordGlobalLine]);

    const selectWords = React.useMemo(() => {
        return allWords.map(x => ({ label: x.word, key: x.word}));
    }, [allWords]);

    const [selectedChannel, setSelectedChannel] = React.useState('');
    const handleChannelSelect = (e) => {
        setSelectedChannel(e.target.value)
    }
    React.useEffect(() => {
        if (selectedChannel && targetWord) {
            getWordStatsByChannel(selectedChannel, targetWord.word);
            getWordChannelLine(selectedChannel, targetWord.word);
        }
    }, [selectedChannel, targetWord]);

    const wordChannelLine = React.useMemo(() => {
        if (!wordChannelGlobalLine)
            return null;
        return generateWordLine(targetWord?.word, wordChannelGlobalLine);
    }, [wordChannelGlobalLine]);

    
    
    return <div className="word-page">
        <Autocomplete
            disablePortal
            value={targetWordname}
            onChange={(event, newValue) => {
                setTargetWordname(newValue);
            }}
            id="word-select"
            options={selectWords}
            sx={{ width: 300 }}
            isOptionEqualToValue={() => true}
            renderInput={(params) => <TextField {...params} label="Word ..." />}
        />

       <div className="global-stats">
            <div className="division">
                <Typography variant="h6" className="g-title">Global stats</Typography>
                <div className="property">
                    <Typography variant="body-2 property-label">Global counts:</Typography>
                    <Typography variant="body-2">{targetWord?.count}</Typography>
                </div>
                <div className="property">
                    <Typography variant="body-2 property-label">Global dispersion:</Typography>
                    <Typography variant="body-2">{wordStats?.toFixed(3) ?? 0}</Typography>
                </div>
            </div>
            <div className="division">
                <FormControl fullWidth>
                    <InputLabel id="channel-select-label">Channel</InputLabel>
                    <Select size="small"
                        value={selectedChannel}
                        labelId="channel-select-label"
                        id="channel-select"
                        label="Channel"
                        onChange={handleChannelSelect}
                        defaultValue=""
                    >
                        {channels.map(c => (<MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>))}
                    </Select>
                </FormControl>
                <div className="property">
                    <Typography variant="body-2 property-label">Channel counts:</Typography>
                    <Typography variant="body-2">{wordStatsByChannel?.count ?? '-'}</Typography>
                </div>
                <div className="property">
                    <Typography variant="body-2 property-label">Channel dispersion:</Typography>
                    <Typography variant="body-2">{wordStatsByChannel?.dispersion?.toFixed(3) ?? '-'}</Typography>
                </div>
            </div>
        </div>

        <div>
            <div>
                <ToggleButtonGroup
                    color="primary"
                    value={wordSelection}
                    exclusive
                    disabled={!selectedChannel}
                    onChange={handleChangeWordSelection}
                    aria-label="Platform"
                >
                    <ToggleButton value="global">Global</ToggleButton>
                    <ToggleButton value="channel">By Channel</ToggleButton>
                </ToggleButtonGroup>
            </div>
            {wordLine && wordSelection == 'global' &&
                (
                    <div className="diagram">
                        <WordChart data={wordLine}/>
                    </div>
                )
            }
            {wordChannelLine && wordSelection == 'channel' &&
                (
                    <div className="diagram">
                        <WordChart data={wordChannelLine}/>
                    </div>
                )
            }
        </div>

    </div>
}

const mapStateToProps  = (state) => ({ 
    allWords: state.words.words,
    channels: state.channels.channels,
    wordStats: state.words.wordStats,
    wordStatsByChannel: state.words.wordStatsByChannel,
    wordGlobalLine: state.words.wordGlobalLine,
    wordChannelGlobalLine: state.words.wordChannelGlobalLine
});
export const WordPage = connect(mapStateToProps, {
    getWordGlobalLibe,
    getWordStats,
    getWordStatsByChannel,
    getWordStatsByChannel,
    getWordChannelLine
})(Page);
