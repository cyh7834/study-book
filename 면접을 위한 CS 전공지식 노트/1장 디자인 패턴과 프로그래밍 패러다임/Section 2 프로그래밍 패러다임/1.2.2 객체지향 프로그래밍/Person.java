class Person {
    public void eat(String a) {
        System.out.println("I eat " + a);
    }

    public void eat(String a, String b) {
        System.out.println("I eat " + a + " and " + b);
    }
}

public class Life {
    public static void main(String[] args) {
        Person person = new Person();
        person.eat("apple");
        person.eat("tomato", "banana");
    }
}