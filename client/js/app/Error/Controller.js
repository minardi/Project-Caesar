'use strict';
(function (This)  {
    This.Controller = function () {
        var $el = $('#main-container');

        start();

        function start () {
            cs.mediator.subscribe('notFound', renderErrorPage, {}, this);
        }

        function renderErrorPage () {
            var errorView = new This.ErrorView();
            $el.empty().append(errorView.render().el);
        }
    }
})(App.Error);