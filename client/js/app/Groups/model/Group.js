'use strict';
(function (This) {
    This.Group = Backbone.Model.extend({
        urlRoot: '/group',
        
        defaults: function () {
            return {
                name: '',
                direction: '',
                location: '',
                startDate: '',
                finishDate: '',
                status: '',
                teachers: [],
                experts: [],
                students: []
            };
        },
		
		initialize: function(data) {
			var startDate = new Date(data.startDate),
				finishDate = new Date(data.finishDate);
			this.set({'startDate': startDate.toISOString().slice(0, 10),
					 'finishDate': finishDate.toISOString().slice(0, 10)});
		},

        validation: {
            name: [
                {
                    required: true,
                    msg: 'Field cannot be empty'
                },
                {
                    maxLength: 15,
                    msg: 'Max length is 15 symbols'
                },
                {
                    minLength: 9,
                    msg: 'Min length is 2 symbols'
                }
            ],
            startDate: [
                {
                    startDate: true,
                    msg: 'Select data'
                }
            ],
            location: [
                {
                    location: true,
                    msg: 'Select location'
                }
            ],
            status: [
                {
                    status: true,
                    msg: 'Select status'
                }                
            ]    
        }
    });
})(App.Groups);