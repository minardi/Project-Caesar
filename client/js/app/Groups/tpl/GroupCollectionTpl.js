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
        '<div class="row content-row">',
            '<h1>Groups ',
                '<% if (userRole === "Coordinator" || userRole === "Administrator") { %>',
                    '<button type="button" class="btn btn-primary add-new-group">Add New</button>',
                '<% } %>',
            '</h1>',
            '<div class="searcher col-md-12">',
            '</div>',
            '<div class="col-md-12" id="main">',
            '</div>',
            '<nav class="content-pagination">',
            '</nav>',
        '</div>',
    '</div>',
    '<div class="top-nav" id="down-navig">',
        '<span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>',
    '</div>'
].join(''));