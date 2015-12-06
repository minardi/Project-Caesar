'use strict';
(function (This) {
    This.Controller = function () {
        var $el = $('.main-menu');

        start();

        function start () {
            renderMenu();
        }

        function renderMenu (){
            var menuView = new This.MenuView();
            $el.append(menuView.render().el);
        }
    }
})(App.Menu);