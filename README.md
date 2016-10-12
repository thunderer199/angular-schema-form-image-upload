**image-url plugin for angular-schema-form**
 
 Filter files with extension:
 `extensions: '.png,.jpg,.jpeg'`
 
 Config of uploading service:
``uploadService:
{
     url: '/ws/img/upload/',
     responsePath: 'imagesId'
}`` 
`url` - path to service
`responsePath` - path to field with image id

Path to service which returning image by id:
  * if id is XXX url will be - /ws/img/download/XXX 
``baseImageUrl: '/ws/img/download/'``

Size of image preview
`preview: {width: 100, height: 100}`
