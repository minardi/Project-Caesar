'use strict';
(function (This) {
    This.Controller = function () {
        var informationView = new This.InformationView(),
            warningView = new This.WarningView(),
            errorView = new This.ErrorView(),
            confirmView = new This.ConfirmView(),
            hintNotification = new This.HintNotification();

        this.showInformation = function (message) {
            informationView.set(message);
            $('body').append(informationView.render().el);
        };

        this.showWarning = function (message) {
            warningView.set(message);
            $('body').append(warningView.render().el);
        }

        this.showError = function (message) {
            errorView.set(message);
            $('body').append(errorView.render().el);
        }

        this.confirmationDialog = function (message, callback) {
            confirmView.set(message, callback);
            $('body').append(confirmView.render().el);
        }

        this.hintNotification = function (message, element) {
            hintNotification.set(message, element);
            $('body').append(hintNotification.render().el);
        } 

        return this;
    }

})(App.Notifications);
