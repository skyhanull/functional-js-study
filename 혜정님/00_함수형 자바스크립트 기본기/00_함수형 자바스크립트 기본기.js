/*
* 평가 : 코드가 계산되어 값을 만드는 것
* 일급 : 값으로 다룰 수 있다는 의미

# 값으로 다룰 수 있다는 것은...
    - 변수에 담을 수 있다.
    - 함수의 전달 인자로 사용될 수 있다.
    - 함수의 결과로 사용될 수 있다.

* 일급함수 : 함수는 값으로 다뤄질 수 있다.
* 자바스크립트에서 함수는 일급 객체이다.
* 따라서 함수를 변수에 담을 수도 있고, 함수를 인자로 전달할 수도 있고, 함수가 함수를 리턴할 수도 있다.

* 고차함수 : 함수를 값으로 다루는 함수
    - 함수를 인자로 받아서 실행하는 함수
    - 함수를 만들어서 리턴하는 함수
*/

//////////////////////////////////////////////

// [함수를 인자로 받아서 실행하는 함수]
// * apply1은 함수를 받아서 실행하는 고차함수
// * add2는 인자로 전달되는 함수
const apply1 = f => f(1);
const add2 = a => a + 2;

console.log(apply1(add2));
// apply1 => (add2) => add2(1)
// apply1 => 1 => 1 + 2
// result : 3

// applicative programming : ??
const times = (f, n) => {
  let i = -1;
  while (++i < n) f(i);
};

times(console.log, 3);
// 0 1 2

// 위 times 함수는 함수와 숫자 n을 받아 n번 만큼 함수를 실행시켜주는 함수이다.
// 현재 코드에서는 실행시켜질 함수를 console.log로 전달하고 숫자 3을 전달했으므로
// times 내부 로직에 따라 i가 3 이전이 될 때 까지 i를 넣어 콘솔을 출력한다.

// 이러한 프로그래밍 방식을 applicative programming 이라고 한다.

//////////////////////////////////////////////

// [함수를 만들어서 리턴하는 함수 (클로저를 만드는 함수)]

// b => a + b 를 리턴하는, a를 인자로 받는 함수.
// b => a + b 는 상위 스코프 a를 참조하는 클로저.
const addMaker = a => b => a + b;
const add10 = addMaker(10); // add10 = (b => 10 + b) 이다.

add10(5); // 10 => 5 => 10 + 5; // 15
