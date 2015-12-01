templates.groupCollectionTpl = _.template([
	'<button name="btnLocations" class="btn btn-default">Locations</button>',
	'<table class="table group-list list-group">',
		'<tr>',
			'<th class="name-header"><span>Name</span></th>',
			'<th class="location-header"><span>Location</span></th>',
			'<th class="status-header"><span>Status</span></th>',
		'</tr>',
	'</table>',
].join(''));
