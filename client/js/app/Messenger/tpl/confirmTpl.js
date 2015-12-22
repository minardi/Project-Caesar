templates.confirmTpl = _.template([
'<div class="darkback-error">',
    '<div class="modal-dialog confirm">',
        '<div class="modal-content">',
            '<span class="icon">?</span>',
            '<div class="modal-body">',
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
                '<%= message %>',
            '</div>',
            '<div class="modal-footer">',
                '<button type="button" class="btn btn-default closeBtn">No</button>',
                '<button type="button" class="btn btn-primary okBtn">Yes</button>',
            '</div>',
        '</div>',
    '</div>',
'</div>'
].join(''));