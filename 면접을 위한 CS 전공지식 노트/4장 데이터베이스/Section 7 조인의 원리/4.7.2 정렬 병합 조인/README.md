# 정렬 병합 조인
정렬 병합 조인이란 각각의 테이블을 조인할 필드 기준으로 정렬하고 정렬이 끝난 이후에 조인 작업을 수행하는 조인이다.<br/>
조인할 때 쓸 적절한 인덱스가 없고 대용량의 테이블들을 조인하고 조인 조건으로 < 와 > 등 범위 비교 연산자가 있을 때 쓴다.
