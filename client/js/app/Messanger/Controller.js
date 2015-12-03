'use strict';
(function (This) {
    This.Controller = function () {
        var $el = $('.messanger-wrap');

        this.showInformation = function (message) {
            var informView = new This.InformView();

            informView.set(message, templates.informTpl, 'info');
            $el.append(informView.render().el);
        };

        this.showWarning = function (message) {
            var warningView = new This.InformView();

            warningView.set(message, templates.warningTpl, 'warning');
            $el.append(warningView.render().el);
        }

        this.showError = function (message) {
            var errorView = new This.InformView();

            errorView.set(message, templates.errorTpl, 'error');
            $el.append(errorView.render().el);
        }

        this.confirmationDialog = function (message, callback) {
            var confirmView = new This.ConfirmView();

            confirmView.set(message, callback);
            $el.append(confirmView.render().el);
        }

        this.hintNotification = function (message, element) {
            var hintNotification = new This.HintNotification();

            hintNotification.set(message, element);
            $el.append(hintNotification.render().el);
        } 

        return this;
    }

})(App.Messanger);
