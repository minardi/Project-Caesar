'use strict';
(function (This) {
    This.ContributorCollectionView = Backbone.View.extend({
        tagName: 'div',
        className: '',
        tpl: templates.contributorCollectionTpl,

        initialize: function () {
        },

        render: function () {
            this.$el.html(this.tpl());
            return this;
        },

        renderAll: function () {
            this.collection.forEach(this.renderOne, this);
        },

        renderOne: function () {
            var contributorView = new This.ContributorView({model: contributor});
            this.$el.append(contributorView.render().el);
        }
    });
})(App.Contributors);