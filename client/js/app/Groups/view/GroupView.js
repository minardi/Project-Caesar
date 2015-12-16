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

            Backbone.Validation.bind(this);
        },

        render: function () {
            var userRole = cs.currentUser.getRole();

            this.$el.html(this.tpl($.extend(
                this.model.toJSON(),
                {userRole: userRole}
            )));

            return this;
        },
        
        showStudents: function () {
            
        },

        editGroup: function () {
            var groupEditView = new This.GroupAddEditView({
                    model: this.model, 
                    tpl: templates.groupEditTpl
                }),
                $modalWrap = $('.modal-wrap');

            $modalWrap.html(groupEditView.render().el);
            $modalWrap.find('.modal').modal({backdrop: 'static'});
        },

        deleteGroup: function () {
            var groupDeleteView = new This.GroupDeleteView({model: this.model}),
                $modalWrap = $('.modal-wrap');

            $modalWrap.html(groupDeleteView.render().el);
            $modalWrap.find('.modal').modal('show');
        }
    });
})(App.Groups);