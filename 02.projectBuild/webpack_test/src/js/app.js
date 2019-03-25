import add from './module1';
import { sum, mul } from './module2';
import { name, age } from './module3';
import data from '../json/data';

import '../less/test1.less';
import '../less/test2.less';
// import '../index.html';

console.log(add(1, 2));
console.log(sum(1, 2, 3, 4));
console.log(mul(2, 3));
console.log(name, age);
console.log(data);