var moment = require('moment'),
    someGroup = 'aaa', 
    eventList = [
        {
            type: 'Practics',
            dateTime: moment().hour(8).minute(0),
            groupID: someGroup,
            duration: 4
        },
        {
            type: 'Lecture',
            dateTime: moment().hour(8).minute(30).add(1, 'd'),
            groupID: someGroup,
            duration: 4
        },
        {
            type: 'Consulting',
            dateTime: moment().hour(10).minute(0).add(2, 'd'),
            groupID: someGroup,
            duration: 4
        },
        {
            type: 'Practics',
            dateTime: moment().hour(10).minute(30).add(3, 'd'),
            groupID: someGroup,
            duration: 4
        },
        {
            type: 'Lecture',
            dateTime: moment().hour(12).minute(0).add(4, 'd'),
            groupID: someGroup,
            duration: 4
        },
        {
            type: 'Consulting',
            dateTime: moment().hour(12).minute(30).add(5, 'd'),
            groupID: someGroup,
            duration: 4
        },
        {
            type: 'Practics',
            dateTime: moment().hour(14).minute(0).add(6, 'd'),
            groupID: someGroup,
            duration: 4
        },
        {
            type: 'Lecture',
            dateTime: moment().hour(14).minute(30).add(7, 'd'),
            groupID: someGroup,
            duration: 4
        },
        {
            type: 'Consulting',
            dateTime: moment().hour(16).minute(0).add(8, 'd'),
            groupID: someGroup,
            duration: 4
        },
        {
            type: 'Practics',
            dateTime: moment().hour(16).minute(30).add(9, 'd'),
            groupID: someGroup,
            duration: 4
        },
        {
            type: 'Lecture',
            dateTime: moment().hour(18).minute(00).add(10, 'd'),
            groupID: someGroup,
            duration: 4
        },
        {
            type: 'Consulting',
            dateTime: moment().hour(18).minute(30).add(11, 'd'),
            groupID: someGroup,
            duration: 4
        }
    ];

module.exports = eventList;