'use strict';
(function (This) {
    This.GroupView = Backbone.View.extend({
        tagName: 'div',
        className: 'col-md-4',
        tpl: templates.groupTpl,

        events: {
            'dblclick': 'showStudents',
            'click .content-item .close': 'deleteGroup'
        },
        
        initialize: function () {
            this.model.on('change', function () {
                this.render();
            }, this);
            this.model.on('destroy', function () {
                this.remove();
            }, this);
        },

        render: function () {
            this.$el.html(this.tpl(this.model.toJSON()));

            return this;
        },
        
        showStudents: function () {
            alert(this.model.get('students').join());
        },

        deleteGroup: function () {
            var thisGroup = this.model;
            $('#groupDelete').modal('show');
            $('#groupDelete .delete').on('click', destroyGroup);
            
            function destroyGroup () {
                thisGroup.destroy({wait: true});
                $('#groupDelete').modal('hide');
                $('#groupDelete .delete').off('click', destroyGroup);
            };
        }
    });
})(App.Groups);