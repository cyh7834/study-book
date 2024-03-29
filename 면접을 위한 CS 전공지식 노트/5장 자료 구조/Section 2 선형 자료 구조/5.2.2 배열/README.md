# 배열
배열은 같은 타입의 변수들로 이루어져 있고, 크기가 정해져 있으며, 인접한 메모리 위치에 있는<br/>
데이터를 모아놓은 집합이다. 또한, 중복을 허용하고 순서가 있다.<br/>
여기서 설명하는 배열은 '정적 배열'을 기반으로 설명한다. 탐색에 O(1)이 되어 랜덤 접근이 가능하다.<br/>
삽입과 삭제에는 O(n)이 걸린다. 따라서 데이터 추가와 삭제를 많이 하는 것은 연결 리스트, 탐색을 많이 하는 것은 배열로 하는 것이 좋다.<br/>
배열은 인덱스에 해당하는 원소를 빠르게 접근해야 하거나 간단하게 데이터를 쌓고 싶을 때 사용한다.<br/>

###### 랜덤 접근과 순차적 접근
직접 접근이라고 하는 랜덤 접근은 동일한 시간에 배열과 같은 순차적인 데이터가 있을 때 임의의 인덱스에<br/>
해당하는 데이터에 접근할 수 있는 기능이다. 이는 데이터를 저장된 순서대로 검색해야 하는 순차적 접근과는 반대이다.<br/>

###### 배열과 연결 리스트 비교
배열은 상자를 순서대로 나열한 데이터 구조이며 몇 번째 상자인지만 알면 해당 상자의 요소를 확인할 수 있다.<br/>
연결 리스트는 상자를 선으로 연결한 형태의 데이터 구조이며, 상자 안의 요소를 알기 위해서는 하나씩 상자 내부를 확인해봐야<br/>
한다는 점이 다르다.<br/>
