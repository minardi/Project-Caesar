templates.warningTpl = _.template([
    '<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">',
        '<div class="modal-dialog warning" role="document">',
            '<div class="modal-content">',
                '<div class="modal-body">',
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
                    '<%= message %>',
                '</div>',
            '</div>',
        '</div>',
    '</div>'
].join(''));