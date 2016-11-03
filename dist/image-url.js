angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('src/templates/image-url-plugin.html','<div ng-if="form.readonly && $$value$$ && $$value$$.length > 0"\n     class="panel panel-default schema-form-{{form.type}} {{form.htmlClass}}">\n  <div class="panel-heading">\n    <label ng-show="showTitle()">{{form.title}}</label>\n  </div>\n\n  <div class="panel-body">\n    <img class="img-responsive" ng-src="{{$$value$$}}" alt="">\n\n    <button ng-if="form.description" class="btn btn-default pull-right"\n            ng-click="tab.show_index = !tab.show_index ? $index : tab.show_index !== $index ? $index : null">\n      <i class="glyphicon glyphicon-question-sign"></i>\n    </button>\n  </div>\n\n  <div class="panel-footer" ng-if="form.feedback || (form.description && tab.show_index === $index )">\n    <span ng-if="form.feedback !== false" class="form-control-feedback" aria-hidden="true"></span>\n    <div ng-show="tab.show_index === $index" class="help-block" sf-message="form.description"></div>\n  </div>\n</div>\n\n<div class="form-group schema-form-{{form.type}} {{form.htmlClass}}"\n     ng-if="!form.readonly"\n     ng-class="{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess(), \'has-feedback\': form.feedback !== false }">\n  <label class="control-label {{form.labelHtmlClass}}" ng-class="{\'sr-only\': !showTitle()}"\n         for="{{form.key.slice(-1)[0]}}">{{form.title}}</label>\n\n  <div ng-class="{\'input-group\': form.description || hasSuccess() }"\n       ng-if="!form.fieldAddonLeft && !form.fieldAddonRight">\n\n    <image-url schema="schema" form="form" model="$$value$$"></image-url>\n\n  </div>\n\n  <div ng-if="form.fieldAddonLeft || form.fieldAddonRight"\n       ng-class="{\'input-group\': (form.fieldAddonLeft || form.fieldAddonRight)}">\n        <span ng-if="form.fieldAddonLeft"\n              class="input-group-addon"\n              ng-bind-html="form.fieldAddonLeft"></span>\n\n    <image-url schema="schema" form="form" model="$$value$$"></image-url>\n\n    <span ng-if="form.fieldAddonRight"\n          class="input-group-addon"\n          ng-bind-html="form.fieldAddonRight"></span>\n  </div>\n\n  <span ng-if="hasError() || hasSuccess()"\n        id="{{form.key.slice(-1)[0] + \'Status\'}}"\n        class="sr-only">{{ hasSuccess() ? \'(success)\' : \'(error)\' }}</span>\n\n  <div ng-show="$index === tab.show_index" class="help-block" sf-message="form.description"></div>\n</div>');
$templateCache.put('src/templates/image-url.html','<div>\n  <div ng-repeat="modelOne in model.images track by $index">\n    {{modelOne}}\n    <input ng-show="form.key"\n           type="{{form.type}}"\n           step="any"\n           sf-changed="form"\n           placeholder="{{form.placeholder}}"\n           class="form-control {{form.fieldHtmlClass}}"\n           id="{{form.key.slice(-1)[0]}}"\n           ng-model-options="form.ngModelOptions"\n           ng-model="modelOne.url"\n           ng-disabled="form.readonly"\n           name="{{form.key.slice(-1)[0]}}"\n           aria-describedby="{{form.key.slice(-1)[0] + \'Status\'}}">\n    <div class="radio" ng-show="form.key">\n      <label><input type="radio" name="defaultImage" ng-model="model.default.index" ng-value="$index"/>Default image</label>\n    </div>\n    <button class="btn btn-primary" ng-click="removeModel($index)">Remove model</button>\n    <span class="input-group-btn">\n      <button class="btn btn-default" ng-if="hasSuccess() && form.feedback !== false" disabled="disabled">\n        <i class="glyphicon glyphicon-ok" style="color: #3c763d;"></i>\n      </button>\n\n      <button ng-if="form.description" class="btn btn-default"\n              ng-click="tab.show_index = !tab.show_index ? $index : tab.show_index !== $index ? $index : null">\n        <i class="glyphicon glyphicon-question-sign"></i>\n      </button>\n    </span>\n\n\n    <input type="file" ngf-select ng-model="file" name="file" ngf-model-invalid="errorFile"\n           id="file-selector" accept="{{form.extensions}}" style="display: none; visibility: hidden;">\n    <button class="btn btn-default" ng-click="addImage()" ng-if="!modelOne.url || modelOne.url.length == 0">\n      <i class="glyphicon glyphicon-plus-sign"></i>&nbsp;<span>Add image</span>\n    </button>\n\n    <img class="img-thumbnail" ng-show="form.key" ng-src="{{modelOne.url}}" alt="" width="{{form.preview.width}}"\n         ng-if="modelOne.url && modelOne.url.length > 0"\n         height="{{form.preview.height}}">\n\n    <div class="progress" ng-if="isUploading">\n      <div class="progress-bar" role="progressbar" ng-style="{\'width\': uploadProgress + \'%\'}"\n           aria-valuenow="{{uploadProgress}}" aria-valuemin="0" aria-valuemax="100">\n        {{uploadProgress}}%\n      </div>\n    </div>\n\n    <div ng-if="uploadError">\n      Errors:\n      <p>\n        File upload unsuccessful\n      </p>\n    </div>\n  </div>\n\n  <button class="btn btn-primary" ng-click="addModel()">Add model</button>\n</div>');}]);
angular.module('imageUrl', [
  'schemaForm',
  'templates',
  'ngFileUpload',
  'ui.bootstrap'
]).config(function(schemaFormDecoratorsProvider) {

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

});

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
