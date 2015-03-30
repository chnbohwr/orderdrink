'use strict';
var module = angular.module('app', ['onsen']);

module.controller('AppController', function ($scope) {
    ons.ready(mainReady);

    function mainReady() {
        if (!localStorage.hasAuth) {
            $scope.MainNavi.pushPage('templates/login/login.html');
        }
    }
    window.scope_main = $scope;
});