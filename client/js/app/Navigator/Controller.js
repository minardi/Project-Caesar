'use strict';
(function (This) {
    This.Controller = (function () {
        function Constructor () {
            var $leftArrow = $('.left-arrow'),
                $rightArrow = $('.right-arrow'),
                currentLayer = 'Center',
                previousRoute = '/',
                cropper = new RegExp('\\w*(\/|$)'),
                routes = {
                    'Left': {
                        '': '/Contributors',
                        'Locations': '/Contributors',
                        'Groups': '/Contributors'
                    },
                    'Right': {
                        '': '/Schedule',
                        'Locations': '/Schedule',
                        'Groups': '/Schedule'
                    }
                },
                layers = {
                    'Contributors': 'Left',
                    '': 'Center',
                    'Locations': 'Center',
                    'Groups': 'Center',
                    'Schedule': 'Right'
                };
            
            $leftArrow.on('click', function () {
                processNavigation('Left');
            });
            $rightArrow.on('click', function () {
                processNavigation('Right');
            });
            
            function processNavigation (direction) {
                $('.notifications').empty();
                currentLayer = layers[cropper.exec(Backbone.history.getFragment())[0].replace('/','')];
                
                if (currentLayer === 'Center') {
                    previousRoute = Backbone.history.getFragment();
                    currentLayer = direction;
                    navigate(direction);
                } else {
                    if (currentLayer !== direction) {
                        back();
                    }
                }
            }
            
            function navigate (direction) {
                cs.router.navigate(routes[direction][cropper.exec(Backbone.history.getFragment())[0].replace('/','')], {trigger: true});
            }
            
            function back () {
                cs.router.navigate(previousRoute, {trigger: true});
            }
            
            return this;
        }
        
        return Constructor;
    })();
})(App.Navigator);