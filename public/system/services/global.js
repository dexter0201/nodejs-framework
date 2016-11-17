angular.module('dexter.system').factory('Global', [function () {
    var _this = this;

    _this._data = {
        user: window.user,
        authenticated: window.user && window.user.roles
    };

    return _this._data;
}]);