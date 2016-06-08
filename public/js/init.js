window.bootstrap = function () {
    angular.bootstrap(document, ['KALEL']);
};

window.init = function () {
    window.bootstrap();
};

$(document).ready(function() {
    window.init();
});
