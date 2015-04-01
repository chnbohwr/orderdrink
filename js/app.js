'use strict';
var module = angular.module('app', ['onsen']);

module.controller('AppController', function ($scope,$rootScope) {
    ons.ready(mainReady);

    function mainReady() {
        if (!localStorage.hasAuth) {
            $scope.MainNavi.pushPage('templates/login/login.html');
        }
    }
    window.scope_main = $scope;
    window.rootscope = $rootScope;
});