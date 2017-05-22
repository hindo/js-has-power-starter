;(function(app) {

    function test(val, type) {
        if (val && typeof val === type) {
            return true;
        }
        return false;
    }

    function errorHandler(error) {
        console.log(error);
    }

    app.utils = {
        test: test,
        errorHandler, errorHandler
    };

})(window.app);
