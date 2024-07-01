let rank = [3, 0, 2, 1];
let obj = [{a:'apple'}, {b: 'orange'}, {c:'banana'}, {d:'pear'}];

obj.sort((a, b) => {
  return rank[obj.indexOf(a)] - rank[obj.indexOf(b)];

});

console.log(obj);
// ['B', 'D', 'C', 'A'];