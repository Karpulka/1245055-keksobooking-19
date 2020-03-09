'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png'];

  var onFileChange = function (previewElm, createElement, evt) {
    var currentElm = evt.currentTarget;
    var file = currentElm.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (createElement) {
          renderPhotoElm(previewElm, reader.result, fileName);
        } else {
          previewElm.src = reader.result;
        }
      });

      reader.readAsDataURL(file);
    }
  };

  var renderPhotoElm = function (photoContainer, fileSrc, fileName) {
    if (fileSrc) {
      var currentPhoto = photoContainer.querySelector('img');

      if (currentPhoto) {
        currentPhoto.remove();
      }

      var fragment = document.createDocumentFragment();
      var img = document.createElement('img');
      img.src = fileSrc;
      img.alt = fileName;
      fragment.appendChild(img);

      photoContainer.appendChild(fragment);
    }
  };

  window.file = {
    onFileChange: onFileChange
  };
})();
