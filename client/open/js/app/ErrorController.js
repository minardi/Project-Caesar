'use strict';
(function (This)  {
    This.ErrorController = function () {
        var $el = $('#container');

        start();

        function start () {
            cs.mediator.subscribe('error404', renderErrorPage, {}, this);
        }

        function renderErrorPage () {
            var errorView = new This.ErrorView();
            $el.empty().append(errorView.render().el);
        }
    }
})(App);