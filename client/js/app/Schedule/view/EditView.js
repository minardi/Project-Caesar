'use strict';
(function (This) {
    This.EditView = Backbone.View.extend({
        tpl: templates.editViewTpl,
        class: 'container',
        initialize: function (options) {
            this.location = options.location;
            this.group = options.group;
        },
        render: function () {
            var parameters = {
                types: Object.keys(This.EventTypes),
                offices: getCollection('/rest/offices'),
                rooms: getCollection('/rest/rooms')
            };
            if (!this.group) {
                parameters['groups'] = collections.groups;
            }
            this.$el.empty().append(this.tpl(parameters));

            function getCollection(url) {
                var Model = Backbone.Model.extend();
                var Collection = Backbone.Collection.extend({
                   model: Model,
                   url: url
                });

                var list = new Collection(); 
                list.fetch({async: false});
                console.log(list);
                return list;
            }
            return this;
        },
        addEvent: function (eventJSON) {
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