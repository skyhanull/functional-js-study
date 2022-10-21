/*
* ES6 의 순회방식은 더 선언적이고 추상화되었다.

* for...of 문은 기존 for문과 동일하게 작동하는가? NO. 
* 인덱스가 존재하지 않는 set과 map 객체도 순회할 수 있다.

* Symbol.iterator는 심볼이다. 객체의 키 값으로 사용될 수 있다. 
* Symbol.iterator 속성에 특별한 함수가 포함된 경우 반복 가능한 객체가 된다.
* 이 함수를 null값으로 재할당하면 이터러블이 불가능한 것을 확인할 수 있다. 

[이터러블/이터레이터 프로토콜]
* 이터러블 : 이터레이터를 리턴하는 [Symbol.iterator]() 를 가진 값.
    - Sybmol.iterator 프로퍼티에 함수를 가진 array, set, map 등이 있다. 

* 이터레이터 : {value, done} 객체를 리턴하는 next()를 가진 값
    - iterator 에는 next라는 메서드가 있어서, iterator.next()를 하게 되면 {value, done} 이라는 속성을 가진 객체를 리턴받는다.

* 이터러블/이터레이터 프로토콜 : 이터러블이 for...of, 전개 연산자등과 함께 잘 동작하도록 한 규약
    - 어떤 이터러블이 이터레이터를 가지고 이에 따라 순회할 수 있다면 이터레이터 프로토콜을 따르는 이터러블이라고 할 수 있다.

    - ES6에서 이터러블은 KEY : VALUE로 접근하는 것이 아니라 이터러블, 이터레이터 프로토콜에 의해서 동작한다.

* iterator.next()에서 리턴하는 { value, done }객체
    - for...of 문에서 순회하는 요소는 next메서드로 생성된 객체의 value 값이다.

    - 반복을 진행하다가 done 값이 true가 되면 반복문을 탈출하도록 되어있다.

*/

const list = [1, 2, 3];

// [ES5 에서의 리스트 순회]
// 배열, 유사배열 모두 아래와 같은 방식(for loop)을 사용함.
for (var i = 0; i < list.length; i++) {
  //   console.log(list[i]);
}

// [ES6 에서의 리스트 순회]
// for...of loop 사용 : 더 선언적이고 간결하다.
for (const el of list) {
  //   console.log(el);
}

//////////////////////////////////////////////////////////////////////
// [Array, Set, Map : 이터러블/이터레이터 프로토콜 알아보기]
// 1. Array
const arr = [1, 2, 3];
console.log('Array --------------------');
for (const a of arr) console.log(a);
console.log(arr[Symbol.iterator]); // f values()

// 2.Set
console.log('Set ----------------------');
// set[Symbol.iterator] = null; // set is not iterable...
const set = new Set([1, 2, 3]);
for (const a of set) console.log(a);
// console.log(set[0]); //undefined
console.log(set[Symbol.iterator]); // f values()

// 3.Map
console.log('Map ----------------------');
const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);
for (const a of map) console.log(a);
// console.log(map[0]); //undefined
console.log(map[Symbol.iterator]); // ƒ entries()

// map의 메서드가 "iterator"를 리턴하므로 다양하게 활용할 수 있다.
console.log(map.keys()); // [Map Iterator] { 'a', 'b', 'c' }
console.log(map.values()); // [Map Iterator] { 1, 2, 3 }
console.log(map.entries()); // [Map Entries] { [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ] }

// => 이렇다는 것은 이터러블,이터레이터 프로토콜을 사용하여 반복하는 for...of 문에서 map.keys(), map.values() 등으로 리턴되는 이터레이터와 next 메서드를 활용해 key나 value 혹은 entries 로 순회할 수 있다는 의미.

// 이터레이터에 Symbol.iterator로 접근하면 자기 자신을 가리킨다.

// Symbol.iterator 확인
console.log('Iterator -----------------');
// console.log({hi: true, hello: false}[Symbol.iterator]); // undefined

const iterator = arr[Symbol.iterator](); // Array Iterator 객체를 리턴한다.
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }

const mapIterator = map[Symbol.iterator]();
console.log(mapIterator.next()); // { value: [ 'a', 1 ], done: false }

//////////////////////////////////////////////////////////////////////
console.log('Questions ----------------');
// Q1. Symbol.iterator로 접근하여 얻은 함수를 별도의 변수에 담아놓고 실행하려니 되지 않았다.이유가 뭘까?

const iteratorFunction = [1, 2, 3][Symbol.iterator];
// const iteratorTest1 = iteratorFunction();
// Uncaught TypeError: Cannot convert undefined or null to object 에러발생

// A1. this에 대해서 생각해 보세요.
// 해결
const iteratorTest2 = iteratorFunction.bind([1, 2, 3]); // this에 배열을 바인딩하여 새로운 함수를 만든다.
console.log(iteratorTest2); // bound values 라는 함수가 나온다.
const iteratorTest3 = iteratorTest2(); // 이 함수를 실행한 결과값을 찍어본다.
console.log(iteratorTest3); // Array Iterator가 나왔다.
console.log(iteratorTest3.next()); // { value: 1, done: false }
console.log(iteratorTest3.next()); // { value: 2, done: false }
console.log(iteratorTest3.next()); // { value: 3, done: false }
console.log(iteratorTest3.next()); // { value: undefined, done: true }
