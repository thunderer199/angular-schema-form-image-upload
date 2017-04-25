angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('src/dialogs/confirm.html','<div class="dialog">\n  <div class="modal-header">\n    <h3 class="modal-title">{{title}}</h3>\n  </div>\n  <div class="modal-body">\n    {{question}}\n  </div>\n  <div class="modal-footer">\n    <button class="btn btn-primary" ng-click="ok()">Ok</button>\n    <button class="btn btn-warning" ng-click="cancel()">Cancel</button>\n  </div>\n</div>');
$templateCache.put('src/dialogs/show-img.html','<div class="dialog">\n  <div class="modal-header">\n    <h3 class="modal-title">{{title}}</h3>\n  </div>\n  <div class="modal-body">\n    <div class="img-thumbnail" id="divContainer" style="height: 350px; overflow: scroll;">\n      <img id="imageView" ng-src="{{url}}" alt="" style="{{\'height: \'+ (imgHeight*currentScaleValue) + \'px;\'}}"/>\n    </div>\n  </div>\n  <div class="modal-footer">\n    <button class="btn btn-default" ng-click="scalePlus()" ng-disabled="!(currentScaleValue < maxScaleValue)">\n      <span class="glyphicon glyphicon-zoom-in"></span>\n    </button>\n    <button class="btn btn-default" ng-click="scaleMinus()" ng-disabled="!(currentScaleValue > 1)">\n      <span class="glyphicon glyphicon-zoom-out"></span>\n    </button>\n    <button class="btn btn-default" ng-click="download()">Download Image</button>\n    <button class="btn btn-warning" ng-click="cancel()">Ok</button>\n  </div>\n</div>');
$templateCache.put('src/templates/image-url-plugin.html','<div ng-if="form.readonly && $$value$$ && $$value$$.length > 0"\n     class="panel panel-default schema-form-{{form.type}} {{form.htmlClass}}">\n  <div class="panel-heading">\n    <label ng-show="showTitle()">{{form.title}}</label>\n  </div>\n\n  <div class="panel-body">\n    <img class="img-responsive" ng-src="{{$$value$$}}" alt="">\n\n    <button ng-if="form.description" class="btn btn-default pull-right"\n            ng-click="tab.show_index = !tab.show_index ? $index : tab.show_index !== $index ? $index : null">\n      <i class="glyphicon glyphicon-question-sign"></i>\n    </button>\n  </div>\n\n  <div class="panel-footer" ng-if="form.feedback || (form.description && tab.show_index === $index )">\n    <span ng-if="form.feedback !== false" class="form-control-feedback" aria-hidden="true"></span>\n    <div ng-show="tab.show_index === $index" class="help-block" sf-message="form.description"></div>\n  </div>\n</div>\n\n<div class="form-group schema-form-{{form.type}} {{form.htmlClass}}"\n     ng-class="{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess(), \'has-feedback\': form.feedback !== false }">\n  <label class="control-label {{form.labelHtmlClass}}" ng-class="{\'sr-only\': !showTitle()}"\n         for="{{form.key.slice(-1)[0]}}" >{{form.title}}</label>\n\n  <div ng-class="{\'input-group\': form.description || hasSuccess() }"\n       ng-if="!form.fieldAddonLeft && !form.fieldAddonRight">\n\n    <image-url schema="schema" form="form" model="$$value$$"></image-url>\n\n  </div>\n\n  <div ng-if="form.fieldAddonLeft || form.fieldAddonRight"\n       ng-class="{\'input-group\': (form.fieldAddonLeft || form.fieldAddonRight)}">\n        <span ng-if="form.fieldAddonLeft"\n              class="input-group-addon"\n              ng-bind-html="form.fieldAddonLeft"></span>\n\n    <image-url schema="schema" form="form" model="$$value$$"></image-url>\n\n    <span ng-if="form.fieldAddonRight"\n          class="input-group-addon"\n          ng-bind-html="form.fieldAddonRight"></span>\n  </div>\n\n  <span ng-if="hasError() || hasSuccess()"\n        id="{{form.key.slice(-1)[0] + \'Status\'}}"\n        class="sr-only">{{ hasSuccess() ? \'(success)\' : \'(error)\' }}</span>\n\n  <div ng-show="$index === tab.show_index" class="help-block" sf-message="form.description"></div>\n</div>');
$templateCache.put('src/templates/image-url.html','<div>\n  <div ng-if="model && model.images" ng-repeat="modelOne in model.images track by $index">\n    <div class="input-group">\n      <span class="input-group-addon">{{$index + 1}}</span>\n      <input ng-show="form.key"\n             type="{{form.type}}"\n             step="any"\n             sf-changed="form"\n             placeholder="{{form.placeholder}}"\n             class="form-control {{form.fieldHtmlClass}}"\n             id="{{form.key.slice(-1)[0]}}"\n             ng-model-options="form.ngModelOptions"\n             ng-model="modelOne.url"\n             ng-disabled="form.readonly"\n             name="{{form.key.slice(-1)[0]}}"\n             aria-describedby="{{form.key.slice(-1)[0] + \'Status\'}}" />\n      <div class="input-group-btn" ng-if="!form.readonly">\n        <button class="btn btn-default" data-toggle="tooltip"\n                title="move up"\n                ng-click="moveElement($index, -1)"\n                ng-disabled="$index === 0">\n          <i class="glyphicon glyphicon-chevron-up"></i>\n        </button>\n        <button class="btn btn-default"\n                data-toggle="tooltip"\n                title="move down"\n                ng-click="moveElement($index, 1)"\n                ng-disabled="$index === model.images.length -1">\n          <i class="glyphicon glyphicon-chevron-down"></i>\n        </button>\n        <button type="file" class="btn btn-primary"\n                data-toggle="tooltip"\n                title="upload to server"\n                ngf-select="uploadFile($file, $errorFile, $index)"\n                accept="{{form.extensions}}"\n                ng-if="!(modelOne.url && modelOne.url.length === 0)">\n          <i class="glyphicon glyphicon-upload"></i>\n        </button>\n        <button class="btn btn-danger"\n                ng-click="removeModel($index)"\n                data-toggle="tooltip"\n                title="remove">\n          <i class="glyphicon glyphicon-trash"></i>\n        </button>\n      </div>\n    </div>\n    <div class="radio pull-left" ng-show="form.key">\n      <label><input type="radio" name="defaultImage" ng-model="model.default.index" ng-value="$index" ng-disabled="form.readonly"/>Default image</label>\n    </div>\n    <div class="clearfix"></div>\n    <span class="input-group-btn">\n      <button class="btn btn-default" ng-if="hasSuccess() && form.feedback !== false" disabled="disabled">\n        <i class="glyphicon glyphicon-ok" style="color: #3c763d;"></i>\n      </button>\n\n      <button ng-if="form.description" class="btn btn-default"\n              ng-click="tab.show_index = !tab.show_index ? $index : tab.show_index !== $index ? $index : null">\n        <i class="glyphicon glyphicon-question-sign"></i>\n      </button>\n    </span>\n\n\n    <img class="img-thumbnail" style="cursor: pointer;"\n         ng-show="form.key"\n         ng-src="{{isLocalImgUrl(modelOne.url) ? (modelOne.url + \'/\' + form.preview.width): modelOne.url}}" alt=""\n         width="{{form.preview.width}}"\n         height="{{form.preview.height}}"\n         ng-if="modelOne.url && modelOne.url.length > 0"\n         ng-click="showImageFullSize(modelOne.url)"/><br/>\n    <div ng-if="isLocalImgUrl(modelOne.url) && !form.readonly">\n      <button class="btn btn-default" ng-click="turnElement(modelOne, -90)"><i class="fa fa-undo" aria-hidden="true"></i>Turn left</button>\n      <button class="btn btn-default" ng-click="turnElement(modelOne, 90)"><i class="fa fa-repeat" aria-hidden="true"></i>Turn right</button>\n    </div>\n\n    <div class="progress" ng-if="isUploading[$index]">\n      <div class="progress-bar" role="progressbar" ng-style="{\'width\': uploadProgress + \'%\'}"\n           aria-valuenow="{{uploadProgress}}" aria-valuemin="0" aria-valuemax="100">\n        {{uploadProgress}}%\n      </div>\n    </div>\n  </div>\n\n  <button class="btn btn-primary" ng-click="addModel()" ng-if="!form.readonly">Add</button>\n\n  <button type="file" class="btn btn-default"\n          ngf-select="uploadFiles($files, $errorFiles, $index)" multiple\n          accept="{{form.extensions}}"\n          ng-if="!form.readonly && (!modelOne.url || modelOne.url.length == 0)">\n    <i class="glyphicon glyphicon-plus-sign"></i>&nbsp;<span>Add Image\'s list</span>\n  </button>\n\n</div>');}]);
angular.module('imageUrl', [
  'schemaForm',
  'templates',
  'ngFileUpload',
  'ui.bootstrap',
  'ui-notification'
]).config(['schemaFormDecoratorsProvider', function(schemaFormDecoratorsProvider) {

  schemaFormDecoratorsProvider.addMapping(
    'bootstrapDecorator',           // Name of the decorator you want to add to.
    'image-url',                      // Form type that should render this add-on
    'src/templates/image-url-plugin.html'  // Template name in $templateCache
  );

  schemaFormDecoratorsProvider.addMapping(
    'bootstrapReportDecorator',           // Name of the decorator you want to add to.
    'image-url',                      // Form type that should render this add-on
    'src/templates/image-url-plugin.html' // Template name in $templateCache
  );

}]);

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
