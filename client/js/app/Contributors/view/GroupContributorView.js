'use strict';
(function (This) {
    This.GroupContributorView = Backbone.View.extend({
        tagName: 'div',
        className: '',
        tpl: templates.groupContributorTpl,

        events: {
            'click': 'renderContributors'
        },

        initialize: function () {
            this.collection = collections.contributors;
        },

        renderContributors: function () {
            var id = this.model.get('_id'),
                $elContributors = $('#main-container'),
                filtered, contributorCollectionView;
            this.baseUrl = 'Contributors/';
            cs.mediator.publish('show', this.baseUrl + id);
            filtered = this.collection.filter(function (model) {
                return model.get('groupITA') === id;
            });
            contributorCollectionView = new This.ContributorCollectionView(filtered);
            $elContributors.empty().append(contributorCollectionView.render().el);
        },

        render: function () {
            this.$el.html(this.tpl(this.model.toJSON()));
            return this;
        }
    });
})(App.Contributors);