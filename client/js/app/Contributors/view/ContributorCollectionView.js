'use strict';
(function (This) {
    This.ContributorCollectionView = Backbone.View.extend({
        tagName: 'div',
        className: 'center-content',
        tpl: templates.contributorCollectionTpl,

        initialize: function (collection) {
            this.collection = collection;
        },

        render: function () {
            this.$el.html(this.tpl());
            this.renderAll();
            return this;
        },

        renderAll: function () {
            this.collection.forEach(this.renderOne, this);
        },

        renderOne: function (contributor) {
            var contributorView = new This.ContributorView({model: contributor});
            this.$('#main').append(contributorView.render().el);
        }
    });
})(App.Contributors);