'use strict';
(function (This) {
    This.EditView = Backbone.View.extend({
    	render: function() {
    		return this;
    	},
    	addEvent: function(eventJSON) {
    		var newEvent,
    			groupId = collections.groups.models[0].get('_id');

    		eventJSON['groupID'] = groupId;
    		newEvent = new This.Event(eventJSON);	
			newEvent.save();

	        if (newEvent.isValid() && newEvent.isNew()) {
	            this.collection.add(newEvent);
	        }

    	},
    	deleteEvent: function() {
    		this.collection.last().destroy({wait: true});
    	}
    });
})(App.Schedule);