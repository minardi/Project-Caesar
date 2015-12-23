'use strict';
(function (This) {
    This.GroupContributorCollectionView = Backbone.View.extend({
        tagName: 'div',
        className: '',
        tpl: templates.groupContributorCollectionTpl,

        initialize: function () {
           this.collection = collections.groupITA;
        },

        render: function () {
            this.$el.html(this.tpl());
            this.renderAll();
            return this;
        },

        renderAll: function () {
            this.collection.forEach(this.renderOne, this);
        },

        renderOne: function (group) {
            var groupView = new This.GroupContributorView({model: group});
            this.$el.append(groupView.render().el);
        }
    });
})(App.Contributors);