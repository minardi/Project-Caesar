'use strict';
(function (This) {
    This.Controller = Backbone.Controller.extend({
        start: function () {
            this.messangerWrap = $('.messanger-wrap');
        },

        showInformation: function (message) {
            var informView = new This.InformView();

            informView.set(message, templates.informTpl, 'info');
            this.messangerWrap.append(informView.render().el);
        },

        showWarning: function (message) {
            var warningView = new This.InformView();

            warningView.set(message, templates.warningTpl, 'warning');
            this.messangerWrap.append(warningView.render().el);
        },

        showError: function (message) {
            var errorView = new This.InformView();

            errorView.set(message, templates.errorTpl, 'error');
            this.messangerWrap.append(errorView.render().el);
        },

        confirmationDialog: function (message, callback, closeCallback) {
            var confirmView = new This.ConfirmView();

            confirmView.set(message, callback, closeCallback);
            this.messangerWrap.append(confirmView.render().el);
        },

        hintNotification: function (message, element) {
            var hintNotification = new This.HintNotification();

            hintNotification.set(message, element);
            this.messangerWrap.append(hintNotification.render().el);
        } 
    });
})(App.Messanger);
