templates.errorTpl = _.template([
    '<div class="darkback-error">',
        '<div class="modal-dialog error">',
            '<div class="modal-content">',
                '<div class="modal-body">',
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
                    '<%= message %>',
                '</div>',
            '</div>',
        '</div>',
    '</div>'
].join(''));