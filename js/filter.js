'use strict';

(function () {
  var mapFilter = document.querySelector('.map__filters');
  var mapFilterSelects = mapFilter.querySelectorAll('.map__filter');

  var getRank = function (item, filterValues) {
    var rank = 0;
    filterValues.forEach(function (parameter) {
      rank = parameter.value === item.offer[parameter.name] ? rank + 1 : rank;
    });
    return rank;
  };

  var sortData = function (data, filterValues, previos, current) {
    var difference = getRank(current, filterValues) - getRank(previos, filterValues);
    if (difference === 0) {
      difference = data.indexOf(previos) - data.indexOf(current);
    }
    return difference;
  };

  var setFilter = function (data) {
    if (data.length > 0) {
      var filterValues = getFilterValues();
      if (filterValues.length > 0) {
        var sort = sortData.bind(null, data, filterValues);
        data.sort(sort);
      }
    }
    return data;
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
