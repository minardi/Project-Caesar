templates.loginSuccessTpl = _.template([
	'<%= name %>,<br>',
    '<%= role %><br>',
    '<input type=\'button\' id=\'logoutButton\' value=\'Log Out\'>'
].join(''));