"use strict";

const _ = require("lodash");
const mongoose = require("mongoose");

SchemaArray.prototype.sort = function sort(shouldSort) {
  if (!shouldSort) {
    return this;
  }
  return this.set(function(v, self) {
    let value = [].concat(v);
    value = _.compact(value);

    value = _.isString(shouldSort)
      ? _.orderBy(value, null, shouldSort)
      : _.orderBy(value);

    return value;
  });
};

SchemaArray.prototype.uniqSort = function uniqSort(shouldSort) {
  if (!shouldSort) {
    return this;
  }
  return this.set(function(v, self) {
    let value = [].concat(v);
    value = _.compact(value);

    value = _.uniq(value);

    value = _.isString(shouldSort)
      ? _.orderBy(value, null, shouldSort)
      : _.orderBy(value);

    return value;
  });
};
