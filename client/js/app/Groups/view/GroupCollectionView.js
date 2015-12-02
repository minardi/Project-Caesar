'use strict';
(function (This) {
    This.GroupCollectionView = Backbone.View.extend({
        tagName: 'div',
        className: 'row content-row',
        tpl: templates.groupCollectionTpl,

        events: {
            'click [name="btnLocations"]': 'routeToLocations'
        },

        initialize: function () {
            this.collection = collections.groups;
            this.listenTo(this.collection, 'add', this.renderOne);
        },

        render: function () {
            this.$el.html(this.tpl());
            this.renderAll();
			
            return this;
        },
		
		renderAll: function () {
			this.collection.forEach(this.renderOne, this);
		},

        renderOne: function (model) {
            var groupView = new This.GroupView({model: model});
            this.$el.append(groupView.render().el);
        }
    });
})(App.Groups);