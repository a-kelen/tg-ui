import {
    GET_WORDS,
    GET_WORDS_PENDING,
    GET_WORD_STATS,
    GET_WORD_STATS_PENDING,
    GET_WORD_STATS_BY_CHANNEL,
    GET_WORD_STATS_BY_CHANNEL_PENDING,
    GET_WORD_GLOBAL_LINE,
    GET_WORD_GLOBAL_LINE_PENDING,
    GET_WORD_CHANNEL_GLOBAL_LINE,
    GET_WORD_CHANNEL_GLOBAL_LINE_PENDING
} from '../types';

const initialState = {
    words: [],
    wordsLoading: true,

    wordStats: null,
    wordStatsLoading: false,

    wordStatsByChannel: null,
    wordStatsByChannelLoading: false,

    wordGlobalLine: null,
    wordGlobalLineLoading: false,

    wordChannelGlobalLine: null,
    wordChannelGlobalLineLoading: false,
};

export default function mapState(state = initialState, action) {
    switch(action.type){
        case GET_WORDS:
            return {
                ...state, 
                words: action.payload,
                wordsLoading: false
            };
        case GET_WORD_STATS:
            return {
                ...state, 
                wordStats: action.payload,
                wordStatsLoading: false
            };
        case GET_WORD_STATS_BY_CHANNEL:
            return {
                ...state, 
                wordStatsByChannel: action.payload,
                wordStatsByChannelLoading: false
            };
        case GET_WORD_GLOBAL_LINE:
            return {
                ...state, 
                wordGlobalLine: action.payload,
                wordGlobalLineLoading: false
            };
        case GET_WORD_CHANNEL_GLOBAL_LINE:
            return {
                ...state, 
                wordChannelGlobalLine: action.payload,
                wordChannelGlobalLineLoading: false
            };

        case GET_WORDS_PENDING:
            return {
                ...state, 
                words: [],
                wordsLoading: true
            };
        case GET_WORD_STATS_PENDING:
            return {
                ...state, 
                wordStats: null,
                wordStatsLoading: true
            };
        case GET_WORD_STATS_BY_CHANNEL_PENDING:
            return {
                ...state, 
                wordStatsByChannel: null,
                wordStatsByChannelLoading: true
            };
        case GET_WORD_GLOBAL_LINE_PENDING:
            return {
                ...state, 
                wordGlobalLine: null,
                wordGlobalLineLoading: true
            };
        case GET_WORD_CHANNEL_GLOBAL_LINE_PENDING:
            return {
                ...state, 
                wordChannelGlobalLine: null,
                wordChannelGlobalLineLoading: true
            };
        default: 
            return state;
    }
}
