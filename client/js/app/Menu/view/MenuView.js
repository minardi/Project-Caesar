'use strict';
(function (This) {
    This.MenuView = Backbone.View.extend({
        tagName: 'li',
        className: '',
        tpl: templates.menuTpl,

        events: {
            'click .locations': 'showLocations',
            'click .groups': 'showGroups'
        },

        initialize: function () {
        },

        render: function () {
            this.$el.html(this.tpl());
            return this;
        },

        showLocations: function () {
            cs.mediator.publish('ChangedMenu', '/Locations');
        },

        showGroups: function () {
            cs.mediator.publish('ChangedMenu', '/Groups');
        }
    });
})(App.Menu);