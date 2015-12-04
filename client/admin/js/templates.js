var templates = {
    locationTpl: ' \
        <td><%= city %></td> \
        <td><%= country %></td> \
        <td> \
            <button type="button" data-toggle="modal" \
                data-target="#edit-person-modal" class="btn btn-primary edit-person">Edit</button> \
            <button class="btn btn-success log">Log</button> \
            <button class="btn btn-danger delete">Delete</button> \
        </td> \
    ',
    locationsCollectionTpl: ' \
        <thead> \
            <th>City</th> \
            <th>Country</th> \
            <th class="actions">Action</th> \
        </thead> \
        <tbody> \
            <% _.each(locations, function (location) { %> \
                <%= location %> \
            <% }); %> \
        </tbody> \
    ',
    groupTpl: ' \
        <td><%= name %></td> \
        <td><%= direction %></td> \
        <td><%= location %></td> \
        <td><%= startDate %></td> \
        <td><%= finishDate %></td> \
        <td><%= status %></td> \
        <td> \
            <button type="button" data-toggle="modal" \
                data-target="#edit-person-modal" class="btn btn-primary edit">Edit</button> \
            <button class="btn btn-success log">Log</button> \
            <button class="btn btn-danger delete">Delete</button> \
        </td> \
    ',
    groupsCollectionTpl: ' \
        <thead> \
            <th>Name</th> \
            <th>Direction</th> \
            <th>Location</th> \
            <th>Start Date</th> \
            <th>Finish Date</th> \
            <th>Status</th> \
            <th class="actions">Action</th> \
        </thead> \
        <tbody> \
            <% _.each(groups, function (group) { %> \
                <%= group %> \
            <% }); %> \
        </tbody> \
    ',
    groupModalAddTpl: [
        '<div class="modal fade" id="groupAdd" tabindex="-1" role="dialog">',
            '<div class="modal-dialog">',
                '<div class="modal-content">',
                    '<div class="modal-header">',
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
                        '<h4 class="modal-title">Add New Group</h4>',
                    '</div>',
                    '<div class="modal-body">',
                        '<div class="input-group">',
                            '<label>Group name</label>',
                            '<input type="text" class="form-control" name="GroupName"placeholder="Group name" aria-describedby="basic-addon1">',
                        '</div>',
                        '<div class="input-group">',
                            '<label>Location name</label>',
                            '<select class="form-control">',
                                '<option>Dnipro</option>',
                                '<option>Lviv</option>',
                                '<option>Rovno</option>',
                            '</select>',
                        '</div>',
                        '<div class="input-group">',
                            '<label>Start Date</label>',
                            '<input type="text" class="form-control" placeholder="Group name" >',
                        '</div>',
                        '<div class="input-group">',
                            '<label>Finish Date</label>',
                            '<input type="text" class="form-control" placeholder="Group name" >',
                        '</div>',
                        '<div class="input-group">',
                            '<label>Status</label>',
                            '<select class="form-control">',
                                '<option>New</option>',
                                '<option>In progress</option>',
                                '<option>Old</option>',
                            '</select>',
                        '</div>',
                        '<div class="input-group">',
                            '<label>Teachers</label>',
                            '<input type="text" class="form-control" placeholder="Teachers" >',
                        '</div>',
                        '<div class="input-group">',
                            '<label>Experts</label>',
                            '<input type="text" class="form-control" placeholder="Experts" >',
                        '</div>',
                        '<div class="input-group">',
                            '<label>Students</label>',
                            '<input type="text" class="form-control" placeholder="Students" >',
                        '</div>',
                    '</div>',
                    '<div class="modal-footer">',
                        '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>',
                        '<button type="button" class="btn btn-primary add-new-group">Add</button>',
                    '</div>',
                '</div>',
            '</div>',
        '</div>'
    ].join(''),
    locationModalAddTpl: [
        '<div class="modal fade" id="locationAdd" tabindex="-1" role="dialog">',
            '<div class="modal-dialog">',
                '<div class="modal-content">',
                    '<div class="modal-header">',
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
                        '<h4 class="modal-title">Add New Location</h4>',
                    '</div>',
                    '<div class="modal-body">',
                        '<div class="input-group">',
                            '<label>Group name</label>',
                            '<input type="text" class="form-control" name="GroupName"placeholder="Group name" aria-describedby="basic-addon1">',
                        '</div>',
                        '<div class="input-group">',
                            '<label>Location name</label>',
                            '<select class="form-control">',
                                '<option>Dnipro</option>',
                                '<option>Lviv</option>',
                                '<option>Rovno</option>',
                            '</select>',
                        '</div>',
                        '<div class="input-group">',
                            '<label>Start Date</label>',
                            '<input type="text" class="form-control" placeholder="Group name" >',
                        '</div>',
                        '<div class="input-group">',
                            '<label>Finish Date</label>',
                            '<input type="text" class="form-control" placeholder="Group name" >',
                        '</div>',
                        '<div class="input-group">',
                            '<label>Status</label>',
                            '<select class="form-control">',
                                '<option>New</option>',
                                '<option>In progress</option>',
                                '<option>Old</option>',
                            '</select>',
                        '</div>',
                        '<div class="input-group">',
                            '<label>Teachers</label>',
                            '<input type="text" class="form-control" placeholder="Teachers" >',
                        '</div>',
                        '<div class="input-group">',
                            '<label>Experts</label>',
                            '<input type="text" class="form-control" placeholder="Experts" >',
                        '</div>',
                        '<div class="input-group">',
                            '<label>Students</label>',
                            '<input type="text" class="form-control" placeholder="Students" >',
                        '</div>',
                    '</div>',
                    '<div class="modal-footer">',
                        '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>',
                        '<button type="button" class="btn btn-primary add-new-group">Add</button>',
                    '</div>',
                '</div>',
            '</div>',
        '</div>'
    ].join(''),
}