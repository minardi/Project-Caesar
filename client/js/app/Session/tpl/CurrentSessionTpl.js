templates.currentSessionTpl = _.template([
    '<span class="glyphicon glyphicon-user" aria-hidden="true"></span> ',
    '<%= name %>,<br>',
    '<%= role %><br>',
    '<input type=\'button\' id=\'logoutButton\' value=\'Log Out\' class=\'btn btn-xs btn-primary\'>'
].join(''));