import {
    GET_CHANNELS,
    GET_CHANNELS_PENDING,
    GET_CHANNELS_TOP_WORDS,
    GET_CHANNELS_TOP_WORDS_PENDING,
    GET_CHANNEL_WORD_LINE,
    GET_CHANNEL_WORD_LINE_PENDING,
    GET_VOCABULAR_COMPARISON,
    GET_VOCABULAR_COMPARISON_PENDING,
    GET_WORD_COMPARISON,
    GET_WORD_COMPARISON_PENDING,
} from '../types';

const initialState = {
    channels: [],
    channelsLoading: true,

    channelTopWords: null,
    channelTopWordsLoading: false,

    channelWordLine: null,
    channelWordLineLoading: false,

    channelsVocabularComparison: null,
    channelsVocabularComparisonLoading: false,

    channelsWordComparison: null,
    channelsWordComparisonLoading: false

};

export default function mapState(state = initialState, action) {
    switch(action.type){

        case GET_CHANNELS:
            return {
                ...state, 
                channels: action.payload,
                channelsLoading: false
            };
        case GET_CHANNELS_TOP_WORDS:
            return {
                ...state, 
                channelTopWords: action.payload,
                channelTopWordsLoading: false
            };
        case GET_CHANNELS_TOP_WORDS:
            return {
                ...state, 
                channelTopWords: action.payload,
                channelTopWordsLoading: false
            };
        case GET_CHANNEL_WORD_LINE:
            return {
                ...state, 
                channelWordLine: action.payload,
                channelWordLineLoading: false
            };
        case GET_VOCABULAR_COMPARISON:
            return {
                ...state, 
                channelsVocabularComparison: action.payload,
                channelsVocabularComparisonLoading: false
            };
        case GET_WORD_COMPARISON:
            return {
                ...state, 
                channelsWordComparison: action.payload,
                channelsWordComparisonLoading: false
            };

        case GET_CHANNELS_PENDING:
            return {
                ...state, 
                channels: [],
                channelsLoading: true
            };
        case GET_CHANNELS_TOP_WORDS_PENDING:
            return {
                ...state, 
                channelTopWords: null,
                channelTopWordsLoading: true
            };
        case GET_CHANNELS_TOP_WORDS_PENDING:
            return {
                ...state, 
                channelTopWords: null,
                channelTopWordsLoading: true
            };
        case GET_CHANNEL_WORD_LINE_PENDING:
            return {
                ...state, 
                channelWordLine: null,
                channelWordLineLoading: true
            };
        case GET_VOCABULAR_COMPARISON_PENDING:
            return {
                ...state, 
                channelsVocabularComparison: null,
                channelsVocabularComparisonLoading: true
            };
        case GET_WORD_COMPARISON_PENDING:
            return {
                ...state, 
                channelsWordVocabularComparison: null,
                channelsWordComparisonLoading: true
            };
        default: 
            return state;
    }
}
