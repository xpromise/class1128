import add from './module1';
import { sum, mul } from './module2';
import { name, age } from './module3';

console.log(add(1, 2));
console.log(sum(1, 2, 3, 4));
console.log(mul(2, 3));
console.log(name, age);