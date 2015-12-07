'use strict';
(function (This) {
    This.MenuView = Backbone.View.extend({
        tagName: 'div',
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
            cs.mediator.publish('SelectedMenu', '/Locations');
        },

        showGroups: function () {
            cs.mediator.publish('SelectedMenu', '/Groups');
        }
    });
})(App.Menu);