'use strict';
(function (This) {
    This.Controller = function() {
        var $el = $('#main-container');
        this.collection = collections.contributors;
        console.log(this.collection)
        cs.mediator.subscribe('ShowContributors', showContributors, {}, this);

        function showContributors () {
            this.collection.fetch()
                .done(renderContributorCollection);
        }

        function renderContributorCollection (){
            var contributorCollectionView = new This.ContributorCollectionView();
            $el.append(contributorCollectionView.render().el);
        }
        return this;
    };
})(App.Contributors);