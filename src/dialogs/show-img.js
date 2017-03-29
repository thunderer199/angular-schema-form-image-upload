angular.module('imageUrl')
  .controller("showImgFullSize", ["$scope", "$uibModalInstance", "options",
              function ($scope, $uibModalInstance, options) {

    $scope.title = options["title"];
    $scope.url = options["url"];
    $scope.cancel = function() {
      $uibModalInstance.dismiss("cancel");
    };
    $scope.download = function () {
      window.open(url);
    }
}]);