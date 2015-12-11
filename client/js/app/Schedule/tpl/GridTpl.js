templates.gridTpl = _.template([
    '<div class="top-nav location-nav" id="up-navig">',
        '<span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>',
    '</div>',
    '<div class="content">',
        '<div class="row content-row">',
            '<h1>Schedule</h1>',
            //'<div class="buttons-centered">',
                '<button type="button" class="btn btn-primary schedule-margin" id="prevButton">Prev</button>',
                '<button type="button" class="btn btn-primary schedule-margin" id="nextButton">Next</button>',
            //'</div>',
            '<div id="grid">',
            '</div>',
        '</div>',
    '</div>'
    /*'<div class="top-nav location-nav" id="down-navig">',
        '<span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>',
    '</div>'*/
].join(''));