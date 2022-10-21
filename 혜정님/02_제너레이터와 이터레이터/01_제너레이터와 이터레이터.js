/*
[제너레이터/이터레이터]
* 제너레이터 : 이터레이터이자 이터러블을 생성하는 함수, 즉 이터레이터를 리턴하는 함수이다?

* yield를 사용해서 순회할 값을 정하고 이터레이터/이터러블을 만들 수 있다. 즉, 제너레이터를 사용하면 자바스크립트에서는 어떤 값이든 순회가 가능하게 만들 수 있다. 

* 이는 함수형 프로그래밍에서 중요한 의미이다. 

*/

// 이터레이터를 리턴하는 함수 제너레이터
// 제너레이터 함수는 앞에 * 표시를 붙여준다.
function* generator() {
  // 몇 번의 next로 value를 꺼내줄지 결정한다.
  yield 1;
  // 순회할 값을 나열하여 정의하는 것이라 아래와 같이 정의할 수도 있다.
  if (false) yield 2;
  yield 3;

  // next가 실행되고 마지막에 done이 true가 되면 리턴되는 값이다. 순회할 때 이 값은 출력되지 않는다.
  return 100;
}

// generator 함수의 리턴값은 이터레이터
const iterator = generator();
// 따라서 이터레이터의 next 메서드를 실행할 수 있다.
console.log(iterator.next()); // { value: 1, done: false }

// generator는 well-formed 이터레이터를 리턴한다.
// 이터레이터의 Symbol.iterator 의 리턴값이 자기자신!
console.log(iterator[Symbol.iterator]() === iterator); // true

// generator의 실행 결과값이 이터레이터이자 이터러블이므로, 아래와 같이 for..of 문으로 순회할 수 있다.
for (const a of generator()) console.log(a);
