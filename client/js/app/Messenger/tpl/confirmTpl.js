templates.confirmTpl = _.template([
'<div class="darkback-error">',
    '<div class="modal-dialog confirm">',
        '<div class="modal-content">',
            '<div class="modal-header">',
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
                '<h4 class="modal-title" id="gridSystemModalLabel">Title</h4>',
            '</div>',
            '<div class="modal-body">',
                '<%= message %>',
            '</div>',
            '<div class="modal-footer">',
                '<button type="button" class="btn btn-default closeBtn">Close</button>',
                '<button type="button" class="btn btn-primary okBtn">Ok</button>',
            '</div>',
        '</div>',
    '</div>',
'</div>'
].join(''));