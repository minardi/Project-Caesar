templates.myGroupsTpl = _.template([
    '<div class="my-groups form-group" id="my-groups-field">',
        '<input type="checkbox" name = "my-groups-checkbox" id="my-groups" autocomplete="off" <%= isMy ? "checked" : "" %> />',
        '<div class="btn-group">',
            '<label for="my-groups" class="btn btn-warning">',
                '<span class="glyphicon glyphicon-ok"></span>',
                '<span> </span>',
            '</label>',
            '<label for="my-groups" class="btn btn-default active">',
                'My groups',
            '</label>',
        '</div>',
    '</div>'
].join(''));
