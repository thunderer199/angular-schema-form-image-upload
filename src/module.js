angular.module('imageUrl', [
  'schemaForm',
  'templates',
  'ngFileUpload',
  'ui.bootstrap',
  'ui-notification'
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
