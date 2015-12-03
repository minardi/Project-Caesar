templates.groupModalDeleteTpl = _.template([
    '<div class="modal fade" id="groupDelete" tabindex="-1" role="dialog">',
        '<div class="modal-dialog">',
            '<div class="modal-content">',
                '<div class="modal-header">',
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
                    '<h4 class="modal-title">You want to delete group</h4>',
                '</div>',
                '<div class="modal-body">',
                    '<p>Please confirm, that you want to delete group?</p>',
                '</div>',
                '<div class="modal-footer">',
                    '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>',
                    '<button type="button" class="btn btn-primary delete">Delete</button>',
                '</div>',
            '</div>',
        '</div>',
    '</div>'
].join(''));