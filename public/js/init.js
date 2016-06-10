window.bootstrap = function () {
    angular.bootstrap(document, ['dexter']);
};

window.init = function () {
    window.bootstrap();
};

$(document).ready(function() {
    window.init();
});
