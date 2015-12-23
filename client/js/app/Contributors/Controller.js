'use strict';
(function (This) {
    This.Controller = function () {
        var $el = $('.notifications');
        var $elContributors = $('#main-container');
        this.collection = collections.contributors;

        cs.mediator.subscribe('ShowContributors', renderContributors, {}, this);
        cs.mediator.subscribe('ShowQCContributors', renderQCContributors, {}, this);
        cs.mediator.subscribe('ShowJSContributors', renderJSContributors, {}, this);


        function renderContributors () {
            var contributorCollectionView = new This.GroupContributorCollectionView();
            $el.empty().append(contributorCollectionView.render().el);
            $elContributors.empty();
        }

        function renderQCContributors() {
            renderContributors();
            var filtered = this.collection.filter(function (model) {
                return model.get('groupITA') === 'QC';
            });
            var contributorCollectionView = new This.ContributorCollectionView(filtered);
            $elContributors.append(contributorCollectionView.render().el);

        }

        function renderJSContributors() {
            renderContributors();
            var filtered = this.collection.filter(function (model) {
                return model.get('groupITA') === 'JS';
            });
            var contributorCollectionView = new This.ContributorCollectionView(filtered);
            $elContributors.append(contributorCollectionView.render().el);
        }

        return this;
    };
})(App.Contributors);