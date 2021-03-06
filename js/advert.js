'use strict';

(function () {
  var TypeTitle = {
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
  };

  var stringTemplates = {
    capacity: {
      rooms: '#value# комнаты',
      guests: 'Для #value# гостей'
    },
    time: {
      checkin: 'Заезд после #value#',
      checkout: 'Выезд до #value#',
      delimeter: ', '
    }
  };

  var map = document.querySelector('.map');
  var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var showListItemsByClass = function (listItems, classIndicators) {
    listItems.forEach(function (listItem) {
      var featureName = listItem.classList[1].split('--')[1];
      if (classIndicators.indexOf(featureName) === -1) {
        listItem.style.display = 'none';
      }
    });
  };

  var renderCardPhotos = function (cardElement, cardPhotos, cardPhotosParentBlock) {
    if (!cardPhotos.length) {
      return cardElement.querySelector('.popup__photo').remove();
    }
    cardElement.querySelector('.popup__photo').src = cardPhotos[0];
    cardPhotos.slice(1).forEach(function (photo) {
      var cardPhotoElement = cardElement.querySelector('.popup__photo').cloneNode();
      cardPhotoElement.src = photo;
      cardPhotosParentBlock.appendChild(cardPhotoElement);
    });
    return true;
  };

  var getInfoString = function (parameters, delimeter, templateParameter) {
    templateParameter = templateParameter ? templateParameter : '#value#';
    delimeter = delimeter ? delimeter : ' ';
    var result = '';
    if (parameters.length > 0) {
      result = result + parameters[0].template.replace(templateParameter, parameters[0].value);
      parameters.slice(1).forEach(function (item) {
        result = delimeter ? result + delimeter : result;
        if (item.value) {
          var templateString = item.template.replace(templateParameter, item.value);
          result = result + templateString[0].toLowerCase() + templateString.slice(1);
        }
      });
    }
    return result;
  };

  var renderCardElement = function (cardElement, values, attribute, selectorPrefix) {
    attribute = attribute ? attribute : 'textContent';
    selectorPrefix = selectorPrefix ? selectorPrefix : '.popup__';
    if (values) {
      for (var code in values) {
        if (values[code]) {
          cardElement.querySelector(selectorPrefix + code)[attribute] = values[code];
        } else {
          cardElement.querySelector(selectorPrefix + code).remove();
        }
      }
    }
  };

  var getInfoArguments = function (data, type) {
    if (!data) {
      return false;
    }

    var results = [];
    data.forEach(function (item) {
      var keys = Object.keys(item);
      if (item[keys[0]]) {
        var parameters = {
          value: item[keys[0]],
          template: stringTemplates[type][keys[0]]
        };
        results.push(parameters);
      }
    });
    return results;
  };

  var render = function (advert) {
    var cardElement = mapCardTemplate.cloneNode(true);
    var photosBlock = cardElement.querySelector('.popup__photos');
    var renderElement = renderCardElement.bind(null, cardElement);
    var offer = advert.offer;
    var price = offer.price ? offer.price + '₽/ночь' : '';
    var capacity = getInfoArguments([{rooms: offer.rooms}, {guests: offer.guests}], 'capacity');
    var time = getInfoArguments([{checkin: offer.checkin}, {checkout: offer.checkout}], 'time');
    var features = cardElement.querySelectorAll('.popup__features > .popup__feature');
    renderElement({
      'title': offer.title,
      'text--address': offer.address,
      'text--price': price,
      'type': TypeTitle[offer.type.toUpperCase()],
      'text--capacity': getInfoString(capacity),
      'text--time': getInfoString(time, stringTemplates.time.delimeter),
      'description': offer.description
    });
    showListItemsByClass(features, offer.features);
    renderCardPhotos(cardElement, offer.photos, photosBlock);
    renderElement({'avatar': advert.author.avatar}, 'src');
    return cardElement;
  };

  var show = function (advert) {
    remove();
    var newCard = window.advert.render(advert);
    var buttonCloseCard = newCard.querySelector('.popup__close');
    buttonCloseCard.addEventListener('click', onAdvertCardCloseClick);
    buttonCloseCard.addEventListener('keydown', onAdvertCardCloseEnterPress);
    document.addEventListener('keydown', onAdvertCardCloseEscape);
    map.insertBefore(newCard, map.querySelector('.map__filters-container'));
  };

  var onAdvertCardCloseEnterPress = function (evt) {
    window.util.isEnterEvent(evt, remove);
  };

  var onAdvertCardCloseClick = function () {
    remove();
  };

  var onAdvertCardCloseEscape = function (evt) {
    window.util.isEscapeEvent(evt, remove);
    document.removeEventListener('keydown', onAdvertCardCloseEscape);
  };

  var remove = function () {
    var card = map.querySelector('.map__card');
    if (card) {
      card.remove();
    }
  };

  window.advert = {
    render: render,
    show: show,
    remove: remove
  };
})();
