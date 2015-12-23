'use strict';
(function (This) {
    This.ContributorCollectionView = Backbone.View.extend({
        tagName: 'div',
        className: 'center-content',
        tpl: templates.contributorCollectionTpl,

        initialize: function () {
            this.collection = collections.contributors;
        },

        renderFilterContributors: function (filter) {
            var filtered = this.collection.filter(filter);
            this.$el.html(this.tpl());
            this.renderAll(filtered);
            return this;
        },

        renderQCGroup: function () {
            return this.renderFilterContributors(function (model) {
                return model.get('groupITA') === 'QC';
            });
        },

        renderJSGroup: function () {
            return this.renderFilterContributors(function (model) {
                return model.get('groupITA') === 'JS';
            });
        },

        render: function () {
            this.$el.html(this.tpl());
            this.renderAll();
            return this;
        },

        renderAll: function (filtered) {
            filtered.forEach(this.renderOne, this);
        },

        renderOne: function (contributor) {
            var contributorView = new This.ContributorView({model: contributor});
            this.$('#main').append(contributorView.render().el);
        }
    });
})(App.Contributors);