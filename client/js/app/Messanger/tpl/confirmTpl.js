templates.confirmTpl = _.template([
'<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">',
    '<div class="modal-dialog confirm" role="document">',
        '<div class="modal-content">',
            '<div class="modal-header">',
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
                '<h4 class="modal-title" id="gridSystemModalLabel">Modal title</h4>',
            '</div>',
            '<div class="modal-body">',
                '<%= message %>',
            '</div>',
            '<div class="modal-footer">',
                '<button type="button" class="btn btn-default">Close</button>',
                '<button type="button" class="btn btn-primary">Save changes</button>',
            '</div>',
        '</div>',
    '</div>',
'</div>'
].join(''));