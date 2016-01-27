window.bootstrap = function () {
    // What is that meaning?
    angular.bootstrap(document, ['KALEL']);
};

window.init = function () {
    console.log('init app');
    window.bootstrap();
};

$(document).ready(function() {
    window.init();
});
