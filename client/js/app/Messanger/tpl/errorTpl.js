templates.errorTpl = _.template([
	'<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">',
	    '<div class="modal-dialog error" role="document">',
	        '<div class="modal-content">',
	            '<div class="modal-header">',
	                '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
	                '<h4 class="modal-title" id="gridSystemModalLabel">Error</h4>',
	            '</div>',
	            '<div class="modal-body">',
	                '<%= message %>',
	            '</div>',
	        '</div>',
	    '</div>',
	'</div>'
].join(''));