'use strict';

function headerController($scope, $rootScope, notificationService, $location,$routeParams) {

    notificationService.forward('receiveNotification', $scope);
    notificationService.forward('identify', $scope);

    $scope.avatar = 'https://secure.gravatar.com/avatar/' + JSON.parse(localStorage.settings).avatar;
    $scope.notifications = notificationService.notifications;

    $scope.$on('socket:identify', function(e, data) {
        // identify to the server
        console.log('recieved identify request');
        notificationService.register();

    });

    $scope.$on('socket:receiveNotification', function(e, data) {
        console.log(data);
        notificationService.add({
            sender: data.sender,
            name: data.name,
            gistId: data.gistId,
            gravatar_id: data.gravatar_id
        });
        console.log({sender: data.sender,
            name: data.name,
            gistId: data.gistId,
            gravatar_id: data.gravatar_id});
    });

    $scope.loadExternalGist = function(id, user) {
        $location.url('/shared/' + user + '/' + id);
    };

    $scope.reject = function(id) {
        notificationService.remove(id);
    };

}