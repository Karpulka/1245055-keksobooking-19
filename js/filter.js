'use strict';

(function () {
  var mapFilter = document.querySelector('.map__filters');
  var mapFilterSelects = mapFilter.querySelectorAll('.map__filter');

  var filterCallback = function (filterValues, item) {
    var check = true;
    filterValues.forEach(function (parameter) {
      if (item.offer[parameter.name] !== parameter.value) {
        check = false;
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
    mapFilterSelects.forEach(function (filter) {
      var value = filter.options[filter.selectedIndex].value;
      if (value !== 'any') {
        var parameter = {
          name: filter.getAttribute('name').split('-')[1],
          value: value
        };
        filterValues.push(parameter);
      }
    });
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

  mapFilterSelects.forEach(function (filter) {
    filter.addEventListener('change', onFilterChange);
  });

  window.filter = {
    setFilter: setFilter
  };
})();
