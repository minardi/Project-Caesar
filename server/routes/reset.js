var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    groupList = require('../reset_data/group-list.js'),
    locationList = require('../reset_data/location-list.js'),
    userList = require('../reset_data/user-list.js'),
    eventList = require('../reset_data/event-list.js'),
    officeList = require('../reset_data/office-list.js'),
    roomList = require('../reset_data/room-list.js'),
    contributorList = require('../reset_data/contributors-list.js'),
    employeeList = require('../reset_data/employees-list.js'),
    async = require('async');

require('../models/Location');
require('../models/User');
require('../models/Session');
require('../models/Event');
require('../models/Office');
require('../models/Room');
require('../models/Group');
require('../models/Contributor');
require('../models/Employee');
    
router.get('/', function(req, res) {
    mongoose.connection.db.dropDatabase(function(err, result) {
        var GroupModel = mongoose.model('Group'),
            LocationModel = mongoose.model('LocationModel'),
            UserModel = mongoose.model('User'),
            EventModel = mongoose.model('Event'),
            OfficeModel = mongoose.model('Office'),
            RoomModel = mongoose.model('Room'),
            ContributorModel = mongoose.model('Contributor'),
            EmployeeModel = mongoose.model('Employee'),

            groupInDb, locationInDb, userInDb, 
            officeInDb, roomInDb, contributorInDb, employeeInDb;

        groupList.forEach(function (groupJSON) {
            groupInDb = GroupModel(groupJSON);
            groupInDb.save(function (err) {
                if (err) {
                    console.log(err);
                }
            });
        });

        locationList.forEach(function (locationJSON) {
            locationInDb = LocationModel(locationJSON);
            locationInDb.save(function (err) {
                if (err) {
                    console.log(err);
                }
            });
        });

        userList.forEach(function (userJSON) {
            userInDb = UserModel(userJSON);
            userInDb.save(function (err) {
                if (err) {
                    console.log(err);
                }
            }); 
        });    
        
        async.eachSeries(eventList, function (eventJSON, callback) {
            var eventInDb = EventModel(eventJSON);
            GroupModel.find({}, function (err, groups) {
                eventInDb.groupID = groups[Math.floor(Math.random() * groups.length)]._id;
                async.setImmediate(function () {
                    eventInDb.save(function (err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                    callback();
                });
            }); 
        }, function () {
            console.log('ok');
        });

        officeList.forEach(function (officeJSON) {
            officeInDb = OfficeModel(officeJSON);
            officeInDb.save(function (err) {
                if (err) {
                    console.log(err);
                }
            });
        });

        roomList.forEach(function (roomJSON) {
            roomInDb = RoomModel(roomJSON);
            roomInDb.save(function (err) {
                if (err) {
                    console.log(err);
                }
            });
        });

        contributorList.forEach(function (contributorJSON) {
            contributorInDb = ContributorModel(contributorJSON);
            contributorInDb.save(function (err) {
                if (err) {
                    console.log(err);
                }
            });
        });

        employeeList.forEach(function (employeeJSON) {
            employeeInDb = EmployeeModel(employeeJSON);
            employeeInDb.save(function (err) {
                if (err) {
                    console.log(err);
                }
            });
        });

        res.render('reset', { title: 'Reset' });
    });
});

module.exports = router;


