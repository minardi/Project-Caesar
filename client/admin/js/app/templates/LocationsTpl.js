templates.locationTpl = _.template([
    '<td><%= city %></td>',
    '<td><%= country %></td>',
    '<td>',
        '<button class="btn btn-info edit">Edit</button>',
        '<button class="btn btn-danger delete">Delete</button>',
    '</td>'
].join(''));
templates.locationsCollectionTpl = _.template([
    '<thead>',
        '<th>City</th>',
        '<th>Country</th>',
        '<th class="actions">Action</th>',
    '</thead>',
    '<tbody>',
    '</tbody>'
].join(''));
templates.locationAddTpl = _.template([
    '<div class="modal fade" tabindex="-1" role="dialog">',
        '<div class="modal-dialog">',
            '<div class="modal-content">',
                '<div class="modal-header">',
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
                    '<h4 class="modal-title">Add New Location</h4>',
                '</div>',
                '<div class="modal-body">',
                    '<div class="input-group">',
                        '<label>City</label>',
                        '<input type="text" class="form-control" name="City" placeholder="Dnipro" aria-describedby="basic-addon1">',
                    '</div>',
                    '<div class="input-group">',
                        '<label>Country</label>',
                        '<input type="text" class="form-control" name="Country" placeholder="Ukraine" aria-describedby="basic-addon1">',
                    '</div>',
                '</div>',
                '<div class="modal-footer clearfix">',
                    '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>',
                    '<button type="button" class="btn btn-primary add-new-location">Add</button>',
                '</div>',
            '</div>',
        '</div>',
    '</div>'
].join(''));
templates.locationEditTpl = _.template([
    '<div class="modal fade" tabindex="-1" role="dialog">',
        '<div class="modal-dialog">',
            '<div class="modal-content">',
                '<div class="modal-header">',
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
                    '<h4 class="modal-title">Edit Location</h4>',
                '</div>',
                '<div class="modal-body">',
                    '<div class="input-group">',
                        '<label>City</label>',
                        '<input type="text" class="form-control" name="City" placeholder="Dnipro" aria-describedby="basic-addon1" value="<%= city %>">',
                    '</div>',
                    '<div class="input-group">',
                        '<label>Country</label>',
                        '<input type="text" class="form-control" name="Country" placeholder="Ukraine" aria-describedby="basic-addon1" value="<%= country %>">',
                    '</div>',
                '</div>',
                '<div class="modal-footer clearfix">',
                    '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>',
                    '<button type="button" class="btn btn-primary submit">Submit</button>',
                '</div>',
            '</div>',
        '</div>',
    '</div>'
].join(''));