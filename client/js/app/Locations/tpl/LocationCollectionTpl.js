templates.locationCollectionTpl = _.template([
    '<div class="top-nav" id="up-navig">',
        '<span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>',
    '</div>',
    '<div class="content">',
        '<div class="row content-row">',
            '<h1>Locations</h1>',
        '</div>',
        '<div class="searcher col-md-12">',
        '</div>',
        '<div class="col-md-12 locations-list">',
        '</div>',
        '<nav class="content-pagination">',
        '</nav>',
    '</div>',
    '<div class="top-nav" id="down-navig">',
        '<span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>',
    '</div>'
].join(''));
