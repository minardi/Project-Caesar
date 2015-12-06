'use strict';
(function (This) {
    This.Roles = (function () {       
        return {
            TEACHER: 'Teacher',
            COORDINATOR: 'Coordinator',
            ADMINISTRATOR: 'Administrator',
            RECRUITER: 'Recruiter',
            GUEST: 'Guest',
            TSE: 'TSE'
        };
    })();
})(App.Users);