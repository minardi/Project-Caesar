templates.menuTpl = _.template([
    '<div id="logo" data-toggle="dropdown" class="dropdown-toggle"></div>',
    '<ul class="dropdown-menu">',
        '<li class="locations menu-item">Locations</li>',
        '<li class="groups menu-item">Groups</li>',
        '<li class="schedule menu-item">Schedule</li>',
        '<li class="contributors menu-item">Contributors</li>',
        '<li class="admin menu-item">Admin</li>',
    '</ul>'
].join(''));
