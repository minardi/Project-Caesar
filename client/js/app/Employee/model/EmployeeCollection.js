'use strict';
(function (This)  {
    This.EmployeeCollection = Backbone.Collection.extend({
        model: This.Employee,
        url: '/rest/employees',
        
        filter: function (role) {
            var filteredCollection = new App.Employee.EmployeeCollection();
            this.forEach(function (item) {
                if (item.get('role') === role) {
                    filteredCollection.push(item);
                }
            });
            return filteredCollection;
        }
    });
})(App.Employee);