angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('src/templates/image-url-plugin.html','<div ng-if="form.readonly && $$value$$ && $$value$$.length > 0"\r\n     class="panel panel-default schema-form-{{form.type}} {{form.htmlClass}}">\r\n  <div class="panel-heading">\r\n    <label ng-show="showTitle()">{{form.title}}</label>\r\n  </div>\r\n\r\n  <div class="panel-body">\r\n    <img class="img-responsive" ng-src="{{$$value$$}}" alt="">\r\n\r\n    <button ng-if="form.description" class="btn btn-default pull-right"\r\n            ng-click="tab.show_index = !tab.show_index ? $index : tab.show_index !== $index ? $index : null">\r\n      <i class="glyphicon glyphicon-question-sign"></i>\r\n    </button>\r\n  </div>\r\n\r\n  <div class="panel-footer" ng-if="form.feedback || (form.description && tab.show_index === $index )">\r\n    <span ng-if="form.feedback !== false" class="form-control-feedback" aria-hidden="true"></span>\r\n    <div ng-show="tab.show_index === $index" class="help-block" sf-message="form.description"></div>\r\n  </div>\r\n</div>\r\n\r\n<div class="form-group schema-form-{{form.type}} {{form.htmlClass}}"\r\n     ng-if="!form.readonly"\r\n     ng-class="{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess(), \'has-feedback\': form.feedback !== false }">\r\n  <label class="control-label {{form.labelHtmlClass}}" ng-class="{\'sr-only\': !showTitle()}"\r\n         for="{{form.key.slice(-1)[0]}}">{{form.title}}</label>\r\n\r\n  <div ng-class="{\'input-group\': form.description || hasSuccess() }"\r\n       ng-if="!form.fieldAddonLeft && !form.fieldAddonRight">\r\n\r\n    <image-url schema="schema" form="form" model="$$value$$"></image-url>\r\n\r\n  </div>\r\n\r\n  <div ng-if="form.fieldAddonLeft || form.fieldAddonRight"\r\n       ng-class="{\'input-group\': (form.fieldAddonLeft || form.fieldAddonRight)}">\r\n        <span ng-if="form.fieldAddonLeft"\r\n              class="input-group-addon"\r\n              ng-bind-html="form.fieldAddonLeft"></span>\r\n\r\n    <image-url schema="schema" form="form" model="$$value$$"></image-url>\r\n\r\n    <span ng-if="form.fieldAddonRight"\r\n          class="input-group-addon"\r\n          ng-bind-html="form.fieldAddonRight"></span>\r\n  </div>\r\n\r\n  <span ng-if="hasError() || hasSuccess()"\r\n        id="{{form.key.slice(-1)[0] + \'Status\'}}"\r\n        class="sr-only">{{ hasSuccess() ? \'(success)\' : \'(error)\' }}</span>\r\n\r\n  <div ng-show="$index === tab.show_index" class="help-block" sf-message="form.description"></div>\r\n</div>');
$templateCache.put('src/templates/image-url.html','<div>\r\n  <input ng-show="form.key"\r\n         type="{{form.type}}"\r\n         step="any"\r\n         sf-changed="form"\r\n         placeholder="{{form.placeholder}}"\r\n         class="form-control {{form.fieldHtmlClass}}"\r\n         id="{{form.key.slice(-1)[0]}}"\r\n         ng-model-options="form.ngModelOptions"\r\n         ng-model="model"\r\n         ng-disabled="form.readonly"\r\n         schema-validate="form"\r\n         name="{{form.key.slice(-1)[0]}}"\r\n         aria-describedby="{{form.key.slice(-1)[0] + \'Status\'}}">\r\n\r\n  <span class="input-group-btn">\r\n    <button class="btn btn-default" ng-if="hasSuccess() && form.feedback !== false" disabled="disabled">\r\n      <i class="glyphicon glyphicon-ok" style="color: #3c763d;"></i>\r\n    </button>\r\n\r\n    <button ng-if="form.description" class="btn btn-default"\r\n            ng-click="tab.show_index = !tab.show_index ? $index : tab.show_index !== $index ? $index : null">\r\n      <i class="glyphicon glyphicon-question-sign"></i>\r\n    </button>\r\n  </span>\r\n\r\n\r\n  <input type="file" ngf-select ng-model="file" name="file" ngf-model-invalid="errorFile"\r\n         id="file-selector" accept="{{form.extensions}}" style="display: none; visibility: hidden;">\r\n  <button class="btn btn-default" ng-click="addImage()" ng-if="!model || model.length == 0">\r\n    <i class="glyphicon glyphicon-plus-sign"></i>&nbsp;<span>Add image</span>\r\n  </button>\r\n\r\n  <img class="img-thumbnail" ng-show="form.key" ng-src="{{model}}" alt="" width="{{form.preview.width}}"\r\n       ng-if="model && model.length > 0"\r\n       height="{{form.preview.height}}">\r\n\r\n  <div class="progress" ng-if="isUploading">\r\n    <div class="progress-bar" role="progressbar" ng-style="{\'width\': uploadProgress + \'%\'}"\r\n         aria-valuenow="{{uploadProgress}}" aria-valuemin="0" aria-valuemax="100">\r\n      {{uploadProgress}}%\r\n    </div>\r\n  </div>\r\n\r\n  <div ng-if="uploadError">\r\n    Errors:\r\n    <p>\r\n      File upload unsuccessful\r\n    </p>\r\n  </div>\r\n</div>');}]);
angular.module('imageUrl', [
  'schemaForm',
  'templates',
  'ngFileUpload'
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
