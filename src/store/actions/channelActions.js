import axios from '../axios';
import {
    GET_CHANNELS,
    GET_CHANNELS_ERROR,
    GET_CHANNELS_TOP_WORDS,
    GET_CHANNELS_TOP_WORDS_ERROR,
    GET_CHANNELS_TOP_WORDS_PENDING,
    GET_CHANNEL_WORD_LINE,
    GET_CHANNEL_WORD_LINE_ERROR,
    GET_CHANNEL_WORD_LINE_PENDING,
    GET_VOCABULAR_COMPARISON,
    GET_VOCABULAR_COMPARISON_ERROR,
    GET_VOCABULAR_COMPARISON_PENDING,
    GET_WORD_COMPARISON,
    GET_WORD_COMPARISON_ERROR,
    GET_WORD_COMPARISON_PENDING
} from '../types';

export const getChannels = () => async dispatch => {
    
    try {
        const res = await axios.get(`/channels`)
        dispatch( {
            type: GET_CHANNELS,
            payload: res.data
        })
    } 
    catch(e){
        dispatch( {
            type: GET_CHANNELS_ERROR,
            payload: console.log(e),
        })
    }
}

export const getChannelTopWords = (channel, pageSize = 30, page = 1, sort_type = 'count') => async dispatch => {
    dispatch({ type: GET_CHANNELS_TOP_WORDS_PENDING });
    try {
        const res = await axios.get(`/channels/${channel}/top-words?page=${page}&page_size=${pageSize}&sort_type=${sort_type}`)
        dispatch({
            type: GET_CHANNELS_TOP_WORDS,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: GET_CHANNELS_TOP_WORDS_ERROR,
            payload: console.log(e),
        })
    }
}

export const getChannelWordLine = (channel, word) => async dispatch => {
    dispatch({ type: GET_CHANNEL_WORD_LINE_PENDING });
    try {
        const res = await axios.post(`/channels/word-line`, {
            channel_id: channel,
            word
        })
        dispatch({
            type: GET_CHANNEL_WORD_LINE,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: GET_CHANNEL_WORD_LINE_ERROR,
            payload: console.log(e),
        })
    }
}

export const getVocabularComparision = (channel_left, channel_right) => async dispatch => {
    dispatch({ type: GET_VOCABULAR_COMPARISON_PENDING });
    try {
        const res = await axios.post(`/channels/vocabular-comparision`, {
            channel_left_id: channel_left,
            channel_right_id: channel_right
        })
        dispatch({
            type: GET_VOCABULAR_COMPARISON,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: GET_VOCABULAR_COMPARISON_ERROR,
            payload: console.log(e),
        })
    }
}

export const getWordComparision = (channel_left, channel_right, word) => async dispatch => {
    dispatch({ type: GET_WORD_COMPARISON_PENDING });
    try {
        const res = await axios.post(`/channels/word-comparision`, {
            channel_left_id: channel_left,
            channel_right_id: channel_right,
            word
        })
        dispatch({
            type: GET_WORD_COMPARISON,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: GET_WORD_COMPARISON_ERROR,
            payload: console.log(e),
        })
    }
}
