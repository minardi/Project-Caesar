'use strict';
(function (This) {
    This.GroupView = Backbone.View.extend({
        tagName: 'div',
		className: 'col-md-4',
        tpl: templates.groupTpl,
				
        initialize: function () {
            this.model.on('change', function () {
                this.render();
            }, this);
        },

        render: function () {
            this.$el.html(this.tpl(this.model.toJSON()));

            return this;
        }		
    });
})(App.Groups);