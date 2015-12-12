var moment = require('moment');

var eventList = [
    {
        type: 'Practics',
        dateTime: moment().hour(8).minute(0),
        groupID: '5669cb7c723b4830166eaea5',
        duration: 4
    },
    {
        type: 'Lecture',
        dateTime: moment().hour(8).minute(30).add(1, 'd'),
        groupID: '5669cb7c723b4830166eaea5',
        duration: 4
    },
    {
        type: 'Consulting',
        dateTime: moment().hour(10).minute(0).add(2, 'd'),
        groupID: '5669cb7c723b4830166eaea5',
        duration: 4
    },
    {
        type: 'Practics',
        dateTime: moment().hour(10).minute(30).add(3, 'd'),
        groupID: '5669cb7c723b4830166eaea5',
        duration: 4
    },
    {
        type: 'Lecture',
        dateTime: moment().hour(12).minute(0).add(4, 'd'),
        groupID: '5669cb7c723b4830166eaea5',
        duration: 4
    },
    {
        type: 'Consulting',
        dateTime: moment().hour(12).minute(30).add(5, 'd'),
        groupID: '5669cb7c723b4830166eaea5',
        duration: 4
    },
    {
        type: 'Practics',
        dateTime: moment().hour(14).minute(0).add(6, 'd'),
        groupID: '5669cb7c723b4830166eaea5',
        duration: 4
    },
    {
        type: 'Lecture',
        dateTime: moment().hour(14).minute(30).add(7, 'd'),
        groupID: '5669cb7c723b4830166eaea5',
        duration: 4
    },
    {
        type: 'Consulting',
        dateTime: moment().hour(16).minute(0).add(8, 'd'),
        groupID: '5669cb7c723b4830166eaea5',
        duration: 4
    },
    {
        type: 'Practics',
        dateTime: moment().hour(16).minute(30).add(9, 'd'),
        groupID: '5669cb7c723b4830166eaea5',
        duration: 4
    },
    {
        type: 'Lecture',
        dateTime: moment().hour(18).minute(00).add(10, 'd'),
        groupID: '5669cb7c723b4830166eaea5',
        duration: 4
    },
    {
        type: 'Consulting',
        dateTime: moment().hour(18).minute(30).add(11, 'd'),
        groupID: '5669cb7c723b4830166eaea5',
        duration: 4
    }
];

module.exports = eventList;