templates.contextMenuTpl = _.template([
    '<ul id="contextMenu" class="dropdown-menu" role="menu" style="display:none" >',
        '<li><a tabindex="-1" href="#">Edit</a></li>',
        '<li class="divider"></li>',
        '<li><a tabindex="-1" href="#">Delete</a></li>',
    '</ul>'
].join(''));