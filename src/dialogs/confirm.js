angular.module('imageUrl')
  .controller("confirmCtrl", ["$scope", "$uibModalInstance", "options",
              function ($scope, $uibModalInstance, options) {

    $scope.title = options["title"];
    $scope.question = options["question"];

    $scope.ok = function () {
      $uibModalInstance.close();
    };
    $scope.cancel = function() {
      $uibModalInstance.dismiss("cancel");
    };
}]);