templates.currentSessionTpl = _.template([
	'<div class="user-info-wrap">',
	    '<span class="glyphicon glyphicon-user" aria-hidden="true"></span><br>',
	    '<%= name %>,<br>',
	    '<%= role %><br>',
	'</div>',
    '<input type=\'button\' id=\'logoutButton\' value=\'Log Out\' class=\'btn btn-md btn-primary\'>'
].join(''));