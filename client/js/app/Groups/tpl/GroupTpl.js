templates.groupTpl = _.template([
         '<div class="content-item">',
			'<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>',
			'<h4><%= name %></h4>',
			'<p><%= startDate %> - <%= finishDate %></p>',
			'<p><span><%= direction %> </span></p>',
		'</div>'
].join(''));