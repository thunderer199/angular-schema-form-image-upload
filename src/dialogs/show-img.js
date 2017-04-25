angular.module('imageUrl')
  .controller("showImgFullSize", ["$scope", "$uibModalInstance", "options",
              function ($scope, $uibModalInstance, options) {

    $scope.title = options["title"];
    $scope.url = options["url"];

    $scope.imgHeight = 350;
    $scope.maxScaleValue = 6;
    $scope.currentScaleValue = 1;

    $scope.cancel = function() {
      $uibModalInstance.close();
    };
    $scope.download = function () {
      window.open($scope.url);
    };

    $scope.scalePlus = function () {
      if($scope.currentScaleValue < $scope.maxScaleValue) {
        $scope.currentScaleValue++;
      }
    };

    $scope.scaleMinus = function () {
      if($scope.currentScaleValue > 1) {
        $scope.currentScaleValue--;
      }
    };
}]);