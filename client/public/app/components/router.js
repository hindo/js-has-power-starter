;(function(app, jshp, window){

var utils = app.utils;

var router = function() {
    var currentLocation = {};
    var defaultLocation = '';
    var defaultAction = function() {
        throw Error('No default action provided');
    };
    var routes = [];

    function init() {
        console.log('init');
    }

    function getRoute(name) {
        return routes.filter(function(item) {
            return item.name === name;
        });
    }

    function registerLocation(name, callback) {
        var route = {};
        if (utils.test(name, 'string') && utils.test(callback, 'function')) {
            routes = routes.filter(function(item){
                return item.name !== name;
            });

            route.name = name;
            route.callback = callback;

            routes.push(route);
        }
    }

    function runDefaultLocation() {
        window.location.hash = defaultLocation;
    }

    function getCurrentLocation() {
        return currentLocation;
    }

    function setCurrentLocation(location) {
        currentLocation = location;
    }

    function setMountingPoint(element) {
        mountingPoint = element;
    }

    function setDefaultLocation(name) {
        if (utils.test(name, 'string')) {
            defaultLocation = name;
        }
    }

    function start() {
        window.addEventListener('hashchange', function(event) {
            var hash = window.location.hash.replace('#', '');
            var route = getRoute(hash);
            if (!route.length) {
                throw Error('No matching route found!');
                defaultAction();
            } else {
                setCurrentLocation(event.target.location);
                var content = route.pop().callback(currentLocation);
                jshp.empty(mountingPoint);
                jshp.append(content, mountingPoint);
            }
        });
    }

    return {
        init: init,
        start: start,
        setMountingPoint: setMountingPoint,
        getCurrentLocation: getCurrentLocation,
        registerLocation: registerLocation,
        runDefaultLocation: runDefaultLocation,
        setDefaultLocation: setDefaultLocation,
    };
};

app.router = router();

})(window.app, window.jshp, window);
