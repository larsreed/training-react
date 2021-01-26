package net.kalars.rest.restfulws.helloworld;

public class HelloWorldBean {

    private final String message;

    public String getMessage() {
        return message;
    }

    public HelloWorldBean(final String messsage) {
        this.message = messsage;
    }

    @Override
    public String toString() {
        return "HelloWorldBean {" +
                "message='" + message + '\'' +
                '}';
    }
}