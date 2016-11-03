angular.module('imageUrl').service('imageLoader', function (Upload) {
  return {
    uploadImage: function (url, file) {
      return Upload.upload({
        url: url,
        data: {file: file}
      })
    }
  }
});

angular.module('imageUrl').controller('imageUrlCtrl', function ($scope, imageLoader) {
  $scope.addImage = addImage;
  $scope.addModel = addModel;
  $scope.removeModel = removeModel;
  $scope.$watch('file', uploadFile);
  $scope.isUploading = false;
  $scope.uploadError = false;


  function fieldByPath(obj, path) {
    var p = path.split('.');
    var res = obj;
    for (var i = 0; i < p.length; i++) {
      if (obj.hasOwnProperty(p[i])) {
        res = obj[path];
      } else {
        return null;
      }
    }

    return res;
  }

  function uploadFile(file) {
    if (!file || !$scope.form.uploadService) return;

    $scope.isUploading = true;
    $scope.uploadError = false;
    $scope.uploadProgress = 0;
    imageLoader.uploadImage($scope.form.uploadService.url, file)
      .then(function (resp) {
        var path = $scope.form.uploadService.responsePath;
        var imageId = fieldByPath(resp.data, path);
        console.log(imageId);
        $scope.model = ($scope.form.baseImageUrl || '') + imageId;
      }, function (resp) {
        console.log(resp);
        $scope.uploadError = true;
      }, function (evt) {
        $scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);

      }).finally(function () {
      $scope.isUploading = false;
    });
  };

  function addImage() {
    $scope.$uploadImage.click();
  }

  function addModel() {
    if(!$scope.model.images) {
      $scope.model.images = [];
    }
    $scope.model.images.push({url: ""});
  }
  function removeModel(index) {
    $scope.model.images.splice(index, 1);
    if($scope.model.default && $scope.model.default.index === index) {
      $scope.model.default = null;
    }
  }
  $scope.$watch('model.default.index', function() {
    if($scope.model.default || $scope.model.default != null) {
      $scope.model.default.url = $scope.model.images[$scope.model.default.index].url;
    }
  });
});

angular.module('imageUrl').directive('imageUrl', function () {
  return {
    restrict: 'E',
    scope: {'form': '=', schema: '=', model: '='},
    templateUrl: 'src/templates/image-url.html',
    controller: 'imageUrlCtrl',
    link: function (scope, element) {
      scope.$uploadImage = element.find('input[type=file]');
    }
  };
});
