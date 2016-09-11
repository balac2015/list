const Suite = require("./default-suite").Suite;
const Immutable = require("immutable");
const Denque = require("denque");

const Finger = require("../dist/finger");
const {Cons} = require("../dist/list");

const n = 10000;

let tree = undefined;
for (let i = 0; i < n; ++i) {
  tree = Finger.append(i, tree);
}
console.log(tree.suffix[tree.suffix.length - 1]);

module.exports = Suite("append")
  .add("Array", function() {
    let arr = [];
    for (let i = 0; i < n; ++i) {
      arr.push(i);
    }
    return arr.length === n;
  })
  .add("Pure array", function() {
    let arr = [];
    for (let i = 0; i < n; ++i) {
      arr = arr.concat([i]);
    }
    return arr.length === n;
  })
  .add("Immutable.js", function() {
    let list = new Immutable.List();
    for (let i = 0; i < n; ++i) {
      list = list.push(i);
    }
    return list.size === n;
  })
  .add("Denque", function() {
    let denque = new Denque();
    for (let i = 0; i < n; ++i) {
      denque.push(i);
    }
    return denque.length === n;
  })
  .add("Cons", function() {
    let cons = undefined;
    for (let i = 0; i < n; ++i) {
      cons = new Cons(i, cons);
    }
    return cons.value === n - 1;
  })
  .add("Finger", function() {
    let tree = undefined;
    for (let i = 0; i < n; ++i) {
      tree = Finger.append(i, tree);
    }
    return tree.suffix[tree.suffix.length - 1] === n - 1;
  })
  .run();