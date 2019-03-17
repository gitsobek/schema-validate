"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { expect } = require("chai");
const uuid = require("uuid/v1");
require("../index");

function test(opts) {
  const fields = {
    content: {
      type: opts.type || String
    }
  };

  fields.content[opts.validator] =
    opts.args !== null && opts.args !== undefined ? opts.args : true;

  const modelName = "Model".concat(`${uuid()}`);
  const TestSchema = new Schema(fields);
  const Test = mongoose.model(modelName, TestSchema);

  if (opts.valid) {
    opts.valid.forEach(function(validItem) {
      const test = new Test({ content: validItem });
      test.validate(function(err) {
        expect(err).to.not.exist;
        if (opts.assert) {
          opts.assert(test.content);
        }
      });
    });
  }

  if (opts.invalid) {
    opts.invalid.forEach(function(invalidItem) {
      const test = new Test({ content: invalidItem });
      test.validate(function(err) {
        expect(err).to.exist;
        expect(error.errors).to.exist;
        expect(error.errors.content.value).to.be.eql(invalid);
        expect(err).to.be.instanceof(Error);
        if (opts.assert) {
          opts.assert(test.content);
        }
      });
    });
  }
}

describe("Test written validators", () => {
  it("should sort elements in array", () => {
    test({
      type: [String],
      validator: "sort",
      valid: [["key", "glass", null, "book", undefined, "glass"]],
      assert: function(val) {
        expect(val).to.be.eql(["book", "glass", "glass", "key"]);
      }
    });
  });

  it("should sort elements in array in ascending order", () => {
    test({
      type: [Number],
      validator: "sort",
      valid: [[4, 3, 27, 1]],
      assert: function(val) {
        expect(val).to.be.eql([1, 3, 4, 27]);
      }
    });
  });

  it("should sort only unique elements in array", () => {
    test({
      type: [String],
      validator: "uniqSort",
      valid: [["key", "glass", null, "book", undefined, "glass"]],
      assert: function(val) {
        expect(val).to.be.eql(["book", "glass", "key"]);
      }
    });
  });

  it("should sort elements in array in wrong order", () => {
    test({
      type: [String],
      validator: "uniqSort",
      valid: [["b", "c", "a", "c"]],
      assert: function(val) {
        expect(val).to.be.not.eql(["a", "b", "c", "c"]);
      }
    });
  });
});
