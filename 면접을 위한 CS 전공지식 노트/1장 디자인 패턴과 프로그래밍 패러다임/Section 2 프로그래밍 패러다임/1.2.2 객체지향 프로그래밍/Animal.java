class Animal {
    public void bark() {
        System.out.println("mumu! mumu!");
    }
}

class Dog extends Animal {
    @Override
    public void bark() {
        System.out.println("wal! wal!");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog();
        dog.bark();
    }
}