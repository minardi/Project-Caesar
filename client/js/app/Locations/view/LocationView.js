'use strict';
(function (This) {
    This.LocationView = Backbone.View.extend({
        tagName: 'div',
        className: 'location-item col-md-4',
        tpl: templates.locationTpl,

        events: {
            'click': 'selectItem',
            'dblclick': 'routeToLocationGroups'
        },

        render: function () { 
            this.$el.html(this.tpl(this.getExtendedHash(this.model)));

            return this;
        },

        getExtendedHash: function (location) {
            var city = location.get('city'),
                locationJSON = location.toJSON(),
                currentDate = new Date();

            locationJSON['countGroups'] = collections.groups.filter(getCurrentGroups, this).length;

            return locationJSON;

            function getCurrentGroups (group) {
                return (group.get('location') === city) &&
                    (group.get('startDate') < currentDate.toISOString()) &&
                    (group.get('finishDate') > currentDate.toISOString())
            } 
        },

        routeToLocationGroups: function () {
            cs.mediator.publish('SelectedMenu', 'Groups/' + this.model.get('city'));
            cs.mediator.publish('RemoveLocationsView');
        },

        selectItem: function () {
            $('.content-item').removeClass('selected-location'); 
            this.$('div').addClass('selected-location');            
        }
    });
})(App.Locations);