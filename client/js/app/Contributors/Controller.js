'use strict';
(function (This) {
    This.Controller = function () {
        var $el = $('.notifications');
        var $elContributors = $('#main-container');
        this.collection = collections.contributors;

        cs.mediator.subscribe('ShowContributors', renderJSContributors, {}, this);
        cs.mediator.subscribe('ShowQCContributors', renderQCContributors, {}, this);
        cs.mediator.subscribe('ShowJSContributors', renderJSContributors, {}, this);

        cs.mediator.subscribe('ShowJSGroup', renderJSContributors, {}, this);
        cs.mediator.subscribe('ShowQCGroup', renderQCContributors, {}, this);

        function renderContributors () {
            var contributorCollectionView = new This.GroupContributorCollectionView();
            $el.empty().append(contributorCollectionView.render().el);
        }

        function renderQCContributors () {
            renderContributors();
            var contributorCollectionView = new This.ContributorCollectionView();
            $elContributors.empty().append(contributorCollectionView.renderQCGroup().el);
        }

        function renderJSContributors () {
            renderContributors();
            var contributorCollectionView = new This.ContributorCollectionView();
            $elContributors.empty().append(contributorCollectionView.renderJSGroup().el);
        }
        return this;
    };
})(App.Contributors);