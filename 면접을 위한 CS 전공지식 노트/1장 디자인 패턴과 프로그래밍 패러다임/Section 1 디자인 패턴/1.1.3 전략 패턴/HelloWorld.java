public class HelloWorld {
    public static void main(String[] args) {
        ShoppingCart cart = new ShoppingCart();

        Item A = new Item("nike", 100);
        Item B = new Item("palace", 300);

        cart.addItem(A);
        cart.addItem(B);

        cart.pay(new LUNACardStrategy("test@example.com", "test1234"));
        cart.pay(new KAKAOCardStrategy("yoonho choi", "12345", "!23", "12/01"));

        /*400 paid using LUNACard.
        400 paid using KAKAOCard.
        쇼핑 카트에 아이템을 담아 LUNACard와 KAKAOCard라는 두 개의 전략으로 결제하는 코드.*/
    }
}
