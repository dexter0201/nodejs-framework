window.bootstrap = function () {
    angular.bootstrap(document, ['dexter']);
};

window.init = function () {
    window.bootstrap();
};

angular.element(document).ready(function() {
    window.init();
});
