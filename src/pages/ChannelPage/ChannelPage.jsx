import { Autocomplete, TablePagination, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { WordChart } from '../../components/WordChart/WordChart'
import './ChannelPage.css';
import { generateMessagesLine, generateWordLine } from "../../utils/generateLines";
import { getChannelWordLine, getChannelTopWords } from '../../store/actions/channelActions'

function Page({ 
    channels,
    allWords,
    channelWordLine,
    channelTopWords,
    getChannelWordLine,
    getChannelTopWords
}) {
    let { id } = useParams();

    const targetChannel = React.useMemo(() => {
        return channels.find(x => x.id === id);
    }, [id, channels]);

    const [selectedWord, setSelectedWord] = React.useState(null);
    React.useEffect(() => {
        if (selectedWord) {
            const w = selectedWord.key;
            getChannelWordLine(targetChannel.id, w)
        }
    }, [selectedWord]);

    const messagesLine = React.useMemo(() => {
        if (!targetChannel)
            return generateMessagesLine([]);
        return generateMessagesLine(targetChannel.messages_by_day);
    }, [id, channels]);

    const wordLine = React.useMemo(() => {
        if (!channelWordLine)
            return generateWordLine('word', []);
        return generateWordLine(selectedWord.key, channelWordLine);
    }, [channelWordLine]);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const [orderBy, setOrderBy] = React.useState('count');
    const handleChangeOrder = (event, newOrder) => {
        setOrderBy(newOrder);
    };
      
    React.useEffect(() => {
        getChannelTopWords(id, rowsPerPage, page+1);
    }, [page, rowsPerPage]);

    const rows = channelTopWords?.words ?? [];
    const totalWordsCount = channelTopWords?.total ?? 0;

    const selectWords = React.useMemo(() => {
        return allWords.map(x => ({ label: x.word, key: x.word}));
    }, [allWords]);

    return <div className="page">
        {
            targetChannel ? (
            <div>
                <div className="channel-header">
                <Typography variant="h4" className="channel-name">{targetChannel?.name}</Typography>
                <Typography variant="body-2">{targetChannel?.total_messages} messages</Typography>
            </div>

            <div>
                <Typography variant="h5">Top words</Typography>
                
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Word</TableCell>
                            <TableCell align="right">Count</TableCell>
                            <TableCell align="right">Dispersion</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <TableRow
                            key={row.word}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row.word}
                            </TableCell>
                            <TableCell align="right">{row.count}</TableCell>
                            <TableCell align="right">{Number(row.dispersion).toFixed(3)}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 30, 100]}
                    component="div"
                    count={totalWordsCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
            <Typography variant="h5">Daily message count</Typography>
            <div className="diagram">
                <WordChart data={messagesLine}></WordChart>
            </div>
            <Typography variant="h5">Word time series by channel</Typography>
            <Autocomplete
                disablePortal
                id="word-select"
                options={selectWords}
                value={selectedWord}
                onChange={(event, newValue) => {
                    setSelectedWord(newValue);
                }}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Word ..." />}
            />
            {!!channelWordLine && 
                (
                    <div className="diagram">
                        <WordChart data={wordLine}></WordChart>
                    </div>
                )
            }
            </div>
        ): null}
    </div>
}


const mapStateToProps  = (state) => ({ 
    channels: state.channels.channels,
    channelWordLine: state.channels.channelWordLine,
    channelTopWords: state.channels.channelTopWords,
    allWords: state.words.words
});
export const ChannelPage = connect(mapStateToProps, {
    getChannelWordLine,
    getChannelTopWords
})(Page);
