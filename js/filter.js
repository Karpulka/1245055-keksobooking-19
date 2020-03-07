'use strict';

(function () {
  var BASE = 10;
  var Prices = {
    'middle': [10000, 50000],
    'low': [0, 10000],
    'high': [50000, +Infinity]
  };
  var mapFilter = document.querySelector('.map__filters');
  var mapFilterSelects = mapFilter.querySelectorAll('.map__filter');
  var mapFilterFeatures = mapFilter.querySelectorAll('.map__checkbox');

  var filterCallback = function (filterValues, item) {
    var check = true;

    filterValues.forEach(function (parameter) {
      var dataValue = item.offer[parameter.name];

      if (parameter.name === 'price') {
        check = dataValue >= parameter.value[0] && dataValue < parameter.value[1];
      } else if (parameter.name === 'features') {
        check = check && parameter.value.every(function (feature) {
          return item.offer.features.indexOf(feature) > -1;
        });
      } else {
        check = dataValue === parameter.value;
      }
    });

    return check;
  };

  var setFilter = function (data, count) {
    var resultData = data;
    if (data.length > 0) {
      var filterValues = getFilterValues();
      if (filterValues.length > 0) {
        var checkParameters = filterCallback.bind(null, filterValues);
        resultData = data.filter(checkParameters);
      }
    }
    return count ? resultData.slice(0, count) : resultData;
  };

  var getFilterValues = function () {
    var filterValues = [];
    var featuresValues = [];
    mapFilterSelects.forEach(function (filter) {
      var value = filter.options[filter.selectedIndex].value;
      if (value !== 'any') {
        var name = filter.getAttribute('name').split('-')[1];
        switch (name) {
          case 'rooms':
          case 'guests':
            value = parseInt(value, BASE);
            break;
          case 'price':
            value = Prices[value];
            break;
          default:
            value = value;
        }
        var parameter = {
          name: name,
          value: value
        };
        filterValues.push(parameter);
      }
    });
    mapFilterFeatures.forEach(function (feature) {
      if (feature.checked) {
        featuresValues.push(feature.value);
      }
    });
    if (featuresValues.length > 0) {
      var features = {
        name: 'features',
        value: featuresValues
      };
      filterValues.push(features);
    }
    return filterValues;
  };

  var onFilterChange = function () {
    window.data.load(onSuccess, window.util.showErrorMessage);
  };

  var onSuccess = function (data) {
    window.advert.removeCard();
    window.pin.removePins();
    window.pin.renderPins(data);
  };

  var setFilterChangeListener = function (filterFields) {
    if (filterFields.length > 0) {
      filterFields.forEach(function (filters) {
        filters.forEach(function (filter) {
          filter.addEventListener('change', onFilterChange);
        });
      });
    }
  };

  setFilterChangeListener([mapFilterSelects, mapFilterFeatures]);

  window.filter = {
    setFilter: setFilter
  };
})();
