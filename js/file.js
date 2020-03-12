'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var FILE_ERROR_MESSAGE = 'Для загрузки доступны только файлы формата .gif, .jpg, .jpeg, .png';

  var defaultPhotoContainer = document.querySelector('.ad-form__photo');

  var onValueChange = function (previewElement, createElement, evt) {
    var currentElement = evt.currentTarget;
    var file = currentElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (createElement) {
          renderPhotoElement(previewElement, reader.result, fileName);
        } else {
          previewElement.src = reader.result;
        }
      });

      reader.readAsDataURL(file);
    } else {
      window.util.showErrorMessage(FILE_ERROR_MESSAGE);
    }
  };

  var renderPhotoElement = function (photoContainer, fileSrc, fileName) {
    if (fileSrc) {
      remove();

      var fragment = document.createDocumentFragment();
      var img = document.createElement('img');
      img.src = fileSrc;
      img.alt = fileName;
      fragment.appendChild(img);

      photoContainer.appendChild(fragment);
    }
  };

  var remove = function () {
    var currentPhoto = defaultPhotoContainer.querySelector('img');

    if (currentPhoto) {
      currentPhoto.remove();
    }
  };

  window.file = {
    onValueChange: onValueChange,
    remove: remove
  };
})();
