"use strict";

const _ = require("lodash");
const mongoose = require("mongoose");
const SchemaArray = mongoose.Schema.Types.Array;
const StringArray = mongoose.Schema.Types.String;
const MongooseError = mongoose.Error;

MongooseError.messages.Array = MongooseError.messages.Array || {};

SchemaArray.prototype.sort = function sort(shouldSort) {
  if (arguments.length > 0 && !shouldSort) {
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
  if (arguments.length > 0 && !shouldSort) {
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
