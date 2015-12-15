templates.informTpl = _.template([
    '<div class="modal-dialog inform">',
        '<div class="modal-content">',
            '<div class="modal-body">',
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
                '<%= message %>',
            '</div>',
        '</div>',
    '</div>',
].join(''));