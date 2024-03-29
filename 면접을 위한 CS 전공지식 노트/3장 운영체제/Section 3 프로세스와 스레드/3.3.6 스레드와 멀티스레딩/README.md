# 스레드와 멀티스레딩

###### 스레드
스레드는 프로세스의 실행 가능한 가장 작은 단위이다. 프로세스는 여러 스레드를 가질 수 있다.<br/>
코드, 데이터, 스택, 힙을 각각 생성하는 프로세스와는 달리 스레드는 코드, 데이터, 힙은 스레드끼리 서로 공유한다.<br/>

###### 멀티스레딩
프로세스 내 작업을 여러 개의 스레드, 멀티 스레드로 처리하는 기법이며 스레드끼리 서로 자원을 공유하기 때문에 효율성이 높다.<br/>
예를 들어 웹 요청을 처리할 때 새 프로세스를 생성하는 대신 스레드를 사용하는 웹 서버의 경우<br/>
훨씬 적은 리소스를 소비하며, 한 스레드가 중단되어도 다른 스레드는 실행 상태일 수 있기 때문에<br/>
중단되지 않은 빠른 처리가 가능하다. 또한, 동시성에도 큰 장점이 있다.<br/>
하지만 한 스레드에 문제가 생기면 다른 스레드에도 영향을 끼쳐 스레드로 이루어져 있는 프로세스에 영향을 줄 수 있는 단점이 있다.
