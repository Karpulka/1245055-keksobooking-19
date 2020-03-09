'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var FILE_ERROR_MESSAGE = 'Для загрузки доступны только файлы формата .gif, .jpg, .jpeg, .png';

  var defaultPhotoContainer = document.querySelector('.ad-form__photo');

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
    } else {
      window.util.showErrorMessage(FILE_ERROR_MESSAGE);
    }
  };

  var renderPhotoElm = function (photoContainer, fileSrc, fileName) {
    if (fileSrc) {
      removePhoto();

      var fragment = document.createDocumentFragment();
      var img = document.createElement('img');
      img.src = fileSrc;
      img.alt = fileName;
      fragment.appendChild(img);

      photoContainer.appendChild(fragment);
    }
  };

  var removePhoto = function () {
    var currentPhoto = defaultPhotoContainer.querySelector('img');

    if (currentPhoto) {
      currentPhoto.remove();
    }
  };

  window.file = {
    onFileChange: onFileChange,
    removePhoto: removePhoto
  };
})();
