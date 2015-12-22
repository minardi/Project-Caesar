templates.myLocationGroupsTpl = _.template([
    '<div class="my-groups form-filter" id="my-location-field">',
        '<input type="checkbox" name = "my-location-checkbox" id="my-location" autocomplete="off" <%= (isMyLocation || location) ? "checked" : "" %> />',
        '<div class="btn-group">',
            '<label for="my-location" class="btn btn-warning">',
                '<span class="glyphicon glyphicon-ok"></span>',
                '<span> </span>',
            '</label>',
            '<label for="my-location" class="btn btn-default active">',
                '<% if (isMyLocation || !location) { %>',
                    'My location',
                '<% } else { %>',    
                    'Location: <%= location %>',
                '<% } %>',    
            '</label>',
        '</div>',
    '</div>'
].join(''));
