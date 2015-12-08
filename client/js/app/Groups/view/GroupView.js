'use strict';
(function (This) {
    This.GroupView = Backbone.View.extend({
        tagName: 'div',
        className: 'col-md-4',
        tpl: templates.groupTpl,

        events: {
            'click .edit-group-ico': 'editGroup',
            'click .delete-group-ico': 'deleteGroup'
        },
        
        initialize: function () {
            this.listenTo(this.model, 'sync', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },

        render: function () {
            this.$el.html(this.tpl(this.model.toJSON()));

            return this;
        },
        
        showStudents: function () {
            alert(this.model.get('students').join());
        },

        editGroup: function () {
            var groupEditModalView = new This.GroupEditModalView({model: this.model});
            $('.modal-wrap.container').html(groupEditModalView.render().el);
        },

        deleteGroup: function () {
            var groupDeleteModalView = new This.GroupDeleteModalView({model: this.model});
            $('.modal-wrap.container').html(groupDeleteModalView.render().el);
        }
    });
})(App.Groups);