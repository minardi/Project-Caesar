'use strict';
(function (This) {
    This.ConfirmView = Backbone.View.extend({
        tagName: 'div',
        className: 'message-wrap hide-message',
        tpl: templates.confirmTpl,

        set: function (message, callback1, callback2) {
            this.message = message;
            this.callback1 = callback1;
            this.callback2 = callback2;
        },

        render: function () {
            var message = this.message,
                callback1 = this.callback1,
                callback2 = this.callback2;

            BootstrapDialog.show({
                title: 'Confirm',
                message: message,
                closable: false,
                buttons: [{
                        id: 'btn-1',
                        label: 'Ok',
                        action: function (dialogItself) {
                            callback1();

                            dialogItself.close();
                        }
                    }, {
                        id: 'btn-2',
                        label: 'Close',
                        action: function (dialogItself) {
                            if (callback2 !== undefined ) callback2();
                            
                            dialogItself.close();
                        }
                    }
                ]
            });
        
            return this;
        }
    });
})(App.Messanger);