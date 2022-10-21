/*
[사용자 정의 이터러블, 이터러블/이터레이터 프로토콜 정의]

* 대부분의 라이브러리에서 순회가 가능한 값들은 이 프로토콜을 따른다.
* 라이브러리 뿐 아니라 웹 API에 구현된 값들도 이 프로토콜을 따른다.
* 예시로 DOM 엘리먼트도 for...of 문으로 순회할 수 있다. => 배열이 아니라 이터러블이기 때문에. 

*/
////////////////////////////////////////////////////
// [사용자 정의 이터러블]
const iterable = {
  // 대괄호를 사용하는 이유 : symbol이라서.
  [Symbol.iterator]() {
    let i = 3;
    return {
      next() {
        return i === 0 ? {done: true} : {value: i--, done: false};
      },
      // 이터레이터가 자신의 이터레이터로써 자기 자신을 리턴해야함.
      [Symbol.iterator]() {
        return this;
      },
    };
  },
};

let iterator = iterable[Symbol.iterator]();
// console.log(iterator.next()); // { value: 3, done: false }
// console.log(iterator.next()); // { value: 2, done: false }
// console.log(iterator.next()); // {{ value: 1, done: false }
// console.log(iterator.next()); // { done: true }

// iterator.next(); // 한 번 실행한 뒤에 반복하면 진행된 시점 이후부터 반복시작.
for (const a of iterator) console.log(a); // 3,2,1 이터러블,이터레이터 프로토콜에 의해 순회가 가능해진다.

////////////////////////////////////////////////////
// [잘 구현된 이터러블 : Array]
// iterator를 따로 분리해 실행한 뒤 그 이후부터 for...of로 순회할 수 있다.
const arr2 = [1, 2, 3];
let iterator2 = arr2[Symbol.iterator]();
// iterator2.next();
// for (const a of iterator2) console.log(a);

// 잘 구현된 이터러블은 이터레이터를 분리하여, 분리된 이터레이터의 이터레이터를 확인했을 때 이터레이터 자신이 된다.
// console.log(iterator2[Symbol.iterator]() === iterator2); // true
