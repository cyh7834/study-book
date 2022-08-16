public class CoffeeFactory {
    public static Coffee getCoffee(String type, int price) {
        if ("Latte".equalsIgnoreCase(type))
            return new Latte(price);
        else if ("Americano".equalsIgnoreCase(type))
            return new Americano(price);
        else
            return new DefaultCoffee();
    }
}
