'use strict';
(function (This) {
    This.ConfirmView = Backbone.View.extend({
        tagName: 'div',
        className: 'message-wrap hide-message',

        set: function (message, okCallback, closeCallback) {
            this.message = message;
            this.okCallback = okCallback;
            this.closeCallback = closeCallback;
        },

        render: function () {
            var message = this.message,
                okCallback = this.okCallback,
                closeCallback = this.closeCallback;

            BootstrapDialog.show({
                title: 'Confirm',
                message: message,
                closable: false,
                buttons: [{
                        id: 'btn-1',
                        label: 'Ok',
                        action: function (dialogItself) {
                            okCallback();

                            dialogItself.close();
                        }
                    }, {
                        id: 'btn-2',
                        label: 'Close',
                        action: function (dialogItself) {
                            if (closeCallback) closeCallback();
                            
                            dialogItself.close();
                        }
                    }
                ]
            });
        
            return this;
        }
    });
})(App.Messanger);