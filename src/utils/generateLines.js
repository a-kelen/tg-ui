import moment from 'moment';

export function generateMessagesLine(messages) {
    // secondary - count
    // primary - date
    const data = messages.map(x => ({
        primary: moment(x.date, 'DD/MM/YYYY').toDate(),
        secondary: x.count
    }))

    data.sort((a, b) => a.primary - b.primary)
    return [
        {
            label: 'messages',
            data
        }
    ]
}

export function generateWordLine(word, messages) {
    // secondary - count
    // primary - date
    const data = messages.map(x => ({
        primary: moment(x.date, 'DD/MM/YYYY').toDate(),
        secondary: x.count
    }))
    
    return [
        {
            label: word,
            data
        }
    ]
}


export function generateWordComparisonLines(channelLeft, channelRight, messagesPair) {
    // secondary - count
    // primary - date
    const leftData = messagesPair.left_line.map(x => ({
        primary: moment(x.date, 'DD/MM/YYYY').toDate(),
        secondary: x.count
    }));

    const rightData = messagesPair.right_line.map(x => ({
        primary: moment(x.date, 'DD/MM/YYYY').toDate(),
        secondary: x.count
    }));

    
    return [
        {
            label: channelLeft,
            data: leftData
        },
        {
            label: channelRight,
            data: rightData
        }
    ]
}

