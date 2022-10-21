/*
* yield : '무엇인가를 내어 주다'

* 지금까지의 내용을 정리해 보자면...
    - generator 함수는 이터러블/이터레이터를 생성해주는 함수이다.
    - generator 함수 안에서 yield를 사용해 순회할 값을 생성하고 조작할 수 있다.
    - odds 라는 홀수만 출력하는 함수가 있다면, 
    - limit 제너레이터로 이터러블을 받아 해당 limit까지 이터레이션하는 이터러블을 만들어 순회할 수 있고
    - limit에 전달되는 이터러블을, inifinity라는 무한대로 동작할 수 있는 이터러블을 만들어 전달할 수 있다.

*/

function* infinity(i = 0) {
  while (true) yield i++;
}

const iterator2 = infinity();
// console.log(iterator2.next());
// console.log(iterator2.next());
// console.log(iterator2.next());
// console.log(iterator2.next());
// 내가 next()를 실행했을 때에만 값이 평가되므로, 무한히 반복한다고 해서 에러가 발생하지는 않게된다.

// l과 이터러블을 받아서 이터러블의 값을 yield 하다가, 그 값이 l이 되는 순간 탈출한다.
function* limit(l, iterable) {
  for (const a of iterable) {
    yield a;
    if (a === l) return;
  }
}

// 위에서 작성한 infinity generator와 limit generator를 활용해 아래와 같이 작성할 수 있다.
function* odds(l) {
  for (const a of limit(l, infinity(1))) {
    if (a % 2) yield a;
    if (a === l) return;
  }
}

const iterator = odds(10);
// console.log(iterator.next());
// for (const a of iterator) console.log(a);

////////////////////////////////////////////////
// generator with 전개연산자, 구조분해
// generator는 이터러블/이터레이터 프로토콜을 따른다.
// 따라서 js에서 이터러블 프로토콜을 따르는 다른 문법, 라이브러리, 함수와 함께 사용될 수 있다.

console.log(...odds(10));
console.log([...odds(10), ...odds(10)]);

const [head, ...tail] = odds(5);
console.log(head, tail); // 1 [3,5]
