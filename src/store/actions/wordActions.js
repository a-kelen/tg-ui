import axios from '../axios';
import {
    GET_WORDS,
    GET_WORDS_PENDING,
    GET_WORDS_ERROR,
    GET_WORD_STATS,
    GET_WORD_STATS_PENDING,
    GET_WORD_STATS_BY_CHANNEL,
    GET_WORD_STATS_BY_CHANNEL_PENDING,
    GET_WORD_STATS_BY_CHANNEL_ERROR,
    GET_WORD_STATS_ERROR,
    GET_WORD_GLOBAL_LINE,
    GET_WORD_GLOBAL_LINE_ERROR,
    GET_WORD_GLOBAL_LINE_PENDING,
    GET_WORD_CHANNEL_GLOBAL_LINE,
    GET_WORD_CHANNEL_GLOBAL_LINE_PENDING,
    GET_WORD_CHANNEL_GLOBAL_LINE_ERROR
} from '../types';

export const getAllWords = () => async dispatch => {
    dispatch({ type: GET_WORDS_PENDING });
    try {
        const res = await axios.get(`/all-words`)
        dispatch( {
            type: GET_WORDS,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: GET_WORDS_ERROR,
            payload: console.log(e),
        })
    }
}

export const getWordGlobalLibe = (word) => async dispatch => {
    dispatch({ type: GET_WORD_GLOBAL_LINE_PENDING });
    try {
        const res = await axios.post(`/words/global-line`, { word })
        dispatch( {
            type: GET_WORD_GLOBAL_LINE,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: GET_WORD_GLOBAL_LINE_ERROR,
            payload: console.log(e),
        })
    }
}

export const getWordStats = (word) => async dispatch => {
    dispatch({ type: GET_WORD_STATS_PENDING });
    try {
        const res = await axios.post(`/words/stats`, { word })
        dispatch( {
            type: GET_WORD_STATS,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: GET_WORD_STATS_ERROR,
            payload: console.log(e),
        })
    }
}

export const getWordStatsByChannel = (channel_id, word) => async dispatch => {
    dispatch({ type: GET_WORD_STATS_BY_CHANNEL_PENDING });
    try {
        const res = await axios.post(`/words/channel/stats/`, {
            channel_id,
            word
        })
        dispatch( {
            type: GET_WORD_STATS_BY_CHANNEL,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: GET_WORD_STATS_BY_CHANNEL_ERROR,
            payload: console.log(e),
        })
    }
}

export const getWordChannelLine = (channel, word) => async dispatch => {
    dispatch({ type: GET_WORD_CHANNEL_GLOBAL_LINE_PENDING });
    try {
        const res = await axios.post(`/channels/word-line`, {
            channel_id: channel,
            word
        })
        dispatch({
            type: GET_WORD_CHANNEL_GLOBAL_LINE,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: GET_WORD_CHANNEL_GLOBAL_LINE_ERROR,
            payload: console.log(e),
        })
    }
}

