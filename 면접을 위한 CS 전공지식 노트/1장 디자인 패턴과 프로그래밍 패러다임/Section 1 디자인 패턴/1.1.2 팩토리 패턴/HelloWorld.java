public class HelloWorld {
    public static void main(String[] args) {
        Coffee latte = CoffeeFactory.getCoffee("Latte", 4000);
        Coffee americano = CoffeeFactory.getCoffee("Americano", 3000);
        System.out.println("Factory latte ::" + latte);
        System.out.println("Factory americano ::" + americano);

        /*Factory latte ::Hi this coffee is 4000
        Factory americano ::Hi this coffee is 3000*/

        //CoffeeFactory 라는 상위 클래스가 중요한 틀을 결정하고
        //Coffee 추상 클래스와 Coffee를 상속받아 생성되는 Latte, Americano 클래스가 구체적인 내용을 결정한다.
    }
}
