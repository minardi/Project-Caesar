/*templates.groupCollectionTpl = _.template([
    '<h1>Groups ',
        '<button type="button" class="btn btn-primary add-new-group pull-right">Add New</button>',
    '</h1>'
].join(''));*/

templates.groupCollectionTpl = _.template([
    '<div class="top-nav" id="up-navig">',
        '<span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>',
    '</div>',
    '<div class="content">',
        '<div class="row content-row" id="main">',
            '<h1>Groups ',
                '<button type="button" class="btn btn-primary add-new-group">Add New</button>',
            '</h1>',
        '</div>',
    '</div>',
    '<div class="top-nav" id="down-navig">',
        '<span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>',
    '</div>'
].join(''));