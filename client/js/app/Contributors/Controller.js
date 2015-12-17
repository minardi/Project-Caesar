'use strict';
(function (This) {
    This.Controller = function() {
        var $el = $('#main-container');
        this.collection = collections.contributors;

        cs.mediator.subscribe('ShowContributors', renderContributorCollection, {}, this);

        function renderContributorCollection (){
            var contributorCollectionView = new This.ContributorCollectionView();
            $el.empty().append(contributorCollectionView.render().el);
        }
        return this;
    };
})(App.Contributors);