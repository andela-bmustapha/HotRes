

// service for file uplaod

app.factory('imageUploader', ['$upload', function($upload) {

  return {
    imageUpload: function(file) {
      return $upload.upload({
        url: '/api/files',
        file: file
      });
    }
  };
}]);