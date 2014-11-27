'use strict';

var app = angular.module("app", [
    'ngRoute',
    'ngResource'
]);

app.run(['$rootScope', '$window',

    function($rootScope, $window) {

        $rootScope.schema = $window.schema

    }

]);

angular.forEach(window.schema.models, function(model) {

    // Creating route
    app.config(['$routeProvider', function($routeProvider) {

        $routeProvider
            .when('/generic/' + model.collection, {
                templateUrl: 'templates/generic-list.html',
                controller: model.collection + 'ListController'
            })
            .when('/generic/' + model.collection + '/:id', {
                templateUrl: 'templates/generic-model.html',
                controller: model.collection + 'ModelController'
            });
    }]);

    // Creating resourse
    app.factory(model.name, ['$resource',
        function($resource) {
            return $resource(window.schema.url + model.collection + '/:id', {
                id: '@_id'
            }, {
                'get': {
                    method: 'GET'
                },
                'save': {
                    method: 'POST'
                },
                'update': {
                    method: 'PUT',
                    params: {
                        id: "@_id"
                    }
                },
                'query': {
                    method: 'GET',
                    isArray: true
                },
                'find': {
                    method: 'GET',
                    isArray: true
                },
                'remove': {
                    method: 'DELETE'
                }
            });
        }
    ]);

    // Creating list controller
    app.controller(model.collection + 'ListController', ['$scope', model.name,
        function($scope, Model) {

            $scope.models = Model.query();
            $scope.title = model.collection;
            $scope.collection = model.collection;
            $scope.paths = model.paths;

        }
    ]);

    // Creating item controller
    app.controller(model.collection + 'ModelController', ['$scope', '$route', '$location', model.name,
        function($scope, $route, $location, Model) {

            var id = $route.current.params.id;

            $scope.isAdd = false;
            $scope.paths = model.paths;

            if (id === 'add') {
                $scope.isAdd = true;
                $scope.model = new Model();
                $scope.title = 'New ' + model.name;
            } else {
                $scope.model = Model.get({
                    id: id
                });
                $scope.title = model.name;
            }

            $scope.submit = function(argument) {

                if ($scope.isAdd) {
                    $scope.model.$save(function () {
                        $location.path('/generic/' + model.collection);
                    });
                } else {
                    $scope.model.$update(function () {
                        $location.path('/generic/' + model.collection);
                    });
                }

            }

        }
    ]);
});


app.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .otherwise({
            redirectTo: '/'
        });

}]);
