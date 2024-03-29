# IP 주소 체계
IP 주소는 IPv4와 IPv6로 나뉜다. IPv4는 32비트를 8비트 단위로 점을 찍어 표기하며,<br/>
123.45.67.89 같은 방식으로 주소를 나타낸다. IPv6는 64비트를 16비트 단위로 점을 찍어 표기하며,<br/>
2001:db8::ff00:42:8329 같은 방식으로 주소를 나타낸다.<br/>
추세는 IPv6로 가고 있지만 아직은 IPv4 방식이 많이 쓰이고있다.<br/>
<br/>

###### 클래스 기반 할당 방식
초기에는 A, B, C, D, E 다섯 개의 클래스로 구분하여 IP를 표현하는 클래스 기반 할당 방식(CIDR)을 사용했다.<br/>
클래스 A는 첫 번째 바이트, 클래스 B는 두 번째 바이트, 클래스 C는 세 번째 바이트 까지를 네트워크 주소로 사용하고<br/>
나머지 바이트는 호스트 주소로 사용한다. 클래스 D는 브로드캐스트용 주소로 사용되고, <br/>
클래스 E는 예비용 주소로 사용된다.<br/>
비트의 맨 앞 자리를 '구분 비트'라고 하는데, 클래스 A의 경우 0, 클래스 B의 경우 10, 클래스 C의 경우 110으로<br/>
시작하여 클래스 A는 0.0.0.0 ~ 127.255.255.255 범위의 IP를 사용할 수 있고,<br/>
클래스 B는 128.0.0.0 ~ 191.255.255.255 범위의 IP를 사용할 수 있다.<br/>
클래스 C는 192.0.0.0 ~ 223.255.255.255 범위의 IP를 사용한다.<br/>
IP의 첫 주소는 네트워크 구별 주소로 사용되고, 마지막 주소는 브로드캐스트 주소로 사용된다.<br/>
예를 들어 클래스 A로 12.0.0.0 이라는 네트워크를 부여받았을때 12.0.0.0은 네트워크 구별주소,<br/>
12.255.255.255는 브로드캐스트용 주소로 사용되고, 12.0.0.1 ~ 12.255.255.254 까지를 호스트 주소로 사용할 수 있다.<br/>
하지만 이 방식은 버리는 주소가 생기는 단점이 있고 이를 해소하기 위해 DHCP와 IPv6, NAT가 나왔다.<br/>
<br/>

###### DHCP
DHCP는 IP 주소 및 기타 통신 매개변수를 자동으로 할당하기 위한 네트워크 관리 프로토콜이다.<br/>
많은 라우터와 게이트웨이 장비에 DHCP 기능이 있고, 이를 통해 대부분의 가정용 네트워크에서 IP 주소를<br/>
자동으로 할당받아 사용한다.<br/>
<br/>

###### NAT
NAT는 패킷이 라우팅 장치를 통해 전송되는 동안 패킷의 IP 주소 정보를 수정하여 IP 주소를 다른 주소로<br/>
매핑하는 방법이다. IPv4 주소 체계만으로는 많은 주소들을 모두 감당하지 못하는 단점이 있는데,<br/>
이를 해결하기 위해 NAT로 공인 IP와 사설 IP로 나눠서 많은 주소를 처리한다.<br/>
NAT를 통해 사설 IP를 공인 IP로 변환하거나 공인 IP를 사설 IP로 변환하는데 쓰인다.<br/>
<br/>

###### 공유기와 NAT
NAT를 쓰는 이유는 주로 여러 대의 호스트가 하나의 공인 IP 주소를 사용하여 인터넷에 접속하기 위함이다.<br/>
예를 들어 인터넷 회선 하나를 개통하고 인터넷 공유기를 달아서 여러 PC를 연결하여 사용할 수 있는데,<br/>
이것이 가능한 이유는 인터넷 공유기에 NAT 기능이 탑재되어 있기 때문이다.<br/>
<br/>

###### NAT를 이용한 보안
NAT를 이용하면 내부 네트워크에서 사용하는 IP 주소와 외부에 드러나는 IP 주소를 다르게 유지할 수 있기 때문에<br/>
내부 네트워크에 대한 어느 정도의 보안이 가능해진다.<br/>
