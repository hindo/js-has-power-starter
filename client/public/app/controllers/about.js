;(function(app, jshp) {

    function aboutController(location) {
        console.log('about controller');
        var p = jshp.create('p');
        p.textContent = 'About controller';

        return p;
    }

    app.controllers.about = aboutController;

})(window.app = window.app || {}, window.jshp);
