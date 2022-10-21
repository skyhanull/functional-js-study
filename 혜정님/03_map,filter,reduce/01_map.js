/*
* 함수형 프로그래밍에서는 함수가 인자와 리턴값으로 소통하는 것을 권장한다.
* 즉 함수 안에서 함수 외부에 영향을 주도록 만드는 것이 아니라, 새로운 값으로 리턴해서
그 이후에 변경을 하도록 권장하고 있다.

* 왜 map 메서드를 사용하지 않고 직접 map 함수를 구현하고 있는것이지..? 
=> 이터러블에서도 map 함수를 쓸 수 있도록 한다.

* 무엇을 할 것인가에 집중하는 것이 함수형 프로그래밍 패러다임이다. 

*/

const products = [
  {name: '반팔티', price: 15000},
  {name: '긴팔티', price: 25000},
  {name: '칠부반팔티', price: 35000},
  {name: '칠부바지', price: 45000},
  {name: '구부바지', price: 55000},
];

// map
// iter 를 인자로 받는다? 이터러블을 인자로 받는다는 의미.
// f => 어떤 값을 새로운 값으로 할지 f함수에 인자로 넣어 결정한다.
const map = (f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
};

// 어떤 요소를 mapping 할 것인지 선택하는 보조함수를 전달할 수 있다.
console.log(map(p => p.name, products));

// 아래는 기존 Array.prototype.map을 활용하는 방법인데
// 앞으로 강의에 등장하겠지만, 내부 동작에서도 위 방식과 차이가 발생할 수 있다.
// console.log(products.map(product => product.name));

//////////////////////////////////////////////////////////////////////////////
// [이터러블 프로토콜을 따른 map의 다형성]

/*

* 기존 map 메서드는 배열 메서드이기 때문에, NodeList 처럼 Array like 이터러블에는 적용할 수 없다. 

* document.querySelectorAll 같은 웹API 의 데이터는 이터러블 프로토콜을 따르므로, 위와 같이 이터러블에서도 사용할 수 있는 함수를 정의하는 것이 사용성이 좋다.

*/

let set = new Set([1, 2, 3]);
// console.log(set.map(el => el)); // 동작하지 않음
console.log(map(el => el, set)); // 동작한다.

// 제너레이터로 이터러블/이터레이터를 만들어보쟈
function* gen(l) {
  for (let i = 1; i <= l; i++) {
    yield i;
  }
}

// 이렇게 만든 이터레이터를 이터러블로 map에 전달한다.
const iter = gen(5);
console.log(map(el => el, iter));

let m = new Map();
m.set('a', 10);
m.set('b', 20);

// 조합을 바꾼 새로운 맵 객체를 만들 수도 있다.
console.log(new Map(map(([k, a]) => [k, a * 2], m)));
