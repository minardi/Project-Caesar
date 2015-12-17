'use strict';
(function (This) {
    This.GroupDeleteView = Backbone.View.extend({
        tagName: 'div',
        tpl: templates.groupDeleteTpl,

        events: {
            'click .close-btn, .close': 'closeView',
            'click .delete': 'deleteGroup'
        },

        render: function () {
            this.$el.html(this.tpl());

            return this;
        },

        closeView: function () {
            var thisView = this;
            this.$el.find('.modal').modal('hide');
            this.$el.on('hidden.bs.modal', function () {
                thisView.remove();
            });
        },

        deleteGroup: function () {
            this.model.destroy({wait: true});
            cs.messenger.showInformation('Group deleted');
            this.closeView();
        }
    });
})(App.Groups);