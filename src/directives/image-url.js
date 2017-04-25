angular.module('imageUrl').service('imageLoader', ['Upload', function (Upload) {
  return {
    uploadImage: function (url, file) {
      return Upload.upload({
        url: url,
        data: {file: file}
      })
    }
  }
}]);

angular.module('imageUrl').controller('imageUrlCtrl', ['$scope', 'imageLoader', 'Notification', "$uibModal", "$http",
      function ($scope, imageLoader, Notification, $uibModal, $http) {
  $scope.addImage = addImage;
  $scope.addModel = addModel;
  $scope.removeModel = removeModel;
  ///$scope.$watch('file', uploadFile);
  $scope.uploadFile = uploadFile;
  $scope.uploadFiles = uploadFiles;
  $scope.moveElement = moveElement;
  $scope.showImageFullSize = showImageFullSize;
  $scope.isLocalImgUrl = isLocalImgUrl;
  $scope.turnElement = turnElement;
  $scope.isUploading = [];

  var localUrlPath = "/ws/img/download/";

  if(!$scope.model) {
    $scope.model = {};
  }
  if(!$scope.model.images) {
    $scope.model.images = [];
  }
  if(!$scope.model.default) {
    $scope.model.default = {};
  }

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

  function uploadFiles (files, errorFiles) {
    angular.forEach(files, function(file) {
      var index = addModel();
      uploadFile(file, null, index);
    })
  }

  function uploadFile(file, errorFile, index) {

    if (!file || !$scope.form.uploadService) return;

    $scope.isUploading[index] = true;
    $scope.uploadProgress = 0;
    imageLoader.uploadImage($scope.form.uploadService.url, file)
      .then(function (resp) {
        var path = $scope.form.uploadService.responsePath;
        var imageId = fieldByPath(resp.data, path);
        console.log(imageId);
        $scope.model.images[index].url = ($scope.form.baseImageUrl || '') + imageId;
      }, function (resp) {
        Notification.error({title: 'Errors', message: 'File upload unsuccessful'});
        console.log(resp);
      }, function (evt) {
        $scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);

      }).finally(function () {
      $scope.isUploading[index] = false;
    });
  };

  function addImage(index) {
    //$scope.$uploadImage.click();
    var uploadImageLink = angular.element(document.querySelector('#file-selector' + index));
    uploadImageLink.click();
  }

  function addModel() {
    if(!$scope.model.images) {
      $scope.model.images = [];
    }
    $scope.model.images.push({url: ""});
    //return last index of images
    return $scope.model.images.length - 1;
  }
  function removeModel(index) {
    var modalInstance = $uibModal.open({
      templateUrl: "src/dialogs/confirm.html",
      controller: "confirmCtrl",
      resolve: {
        options: {
          title: "Remove element",
          question: "Do you really want to remove image?"
        }
      }
    });

    modalInstance.result.then(function () {
      $scope.model.images.splice(index, 1);
      if($scope.model.default && $scope.model.default.index === index) {
        $scope.model.default = null;
      }
    }, function () {

    });
  }
  function showImageFullSize(url) {
    var modalInstance = $uibModal.open({
      templateUrl: "src/dialogs/show-img.html",
      controller: "showImgFullSize",
      resolve: {
        options: {
          title: "Image in full size",
          url: url
        }
      }
    });
  }

  // directionValue can be 0 or -1. Zero - because we will remove element in the function before acion.
  function moveElement (index, directionValue) {
    var tmpImage = $scope.model.images[index];

    if($scope.model.default) {
      // var directionValueDef = directionValue === 0 ? 1 : -1;
      switch ($scope.model.default.index) {
        case index:
          {
            $scope.model.default.index = index+directionValue;
          }
          break;
        case (index + directionValue):
          {
            $scope.model.default.index = index;
          }
          break;
      }
    }
    $scope.model.images.splice(index, 1);
    $scope.model.images.splice(index+directionValue, 0, tmpImage);
  }
  
  function isLocalImgUrl(url) {
    return url.startsWith(localUrlPath);
  }

  function turnElement (model, angle) {
    var id = model.url.slice(localUrlPath.length);
    $http({
      method: "GET",
      url: "ws/img/rotate/" + id + "/" + angle
    }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      if(response && response.data && response.data.imageId) {
        model.url = localUrlPath + response.data.imageId;
      } else {
        Notification.error({title: 'Error',
          message: "The response hasn't image id."});
      }
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      Notification.error({title: 'Error',
        message: "Something went wrong! The image couldn't be turned. Server message: " + response});
    });
  }

  $scope.$watch('model.default.index', function() {
    if(!$.isEmptyObject($scope.model.default) && ($scope.model.default || $scope.model.default != null)) {
      $scope.model.default.url = $scope.model.images[$scope.model.default.index].url;
    }
  });
}]);

angular.module('imageUrl').directive('imageUrl', function () {
  return {
    restrict: 'E',
    scope: {'form': '=', schema: '=', model: '='},
    templateUrl: 'src/templates/image-url.html',
    controller: 'imageUrlCtrl',
    link: function (scope, element) {
      //scope.$uploadImage = element.find('input[type="file"]');
    }
  };
});
