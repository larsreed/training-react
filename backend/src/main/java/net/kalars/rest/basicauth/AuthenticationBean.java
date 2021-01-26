package net.kalars.rest.restfulws.basicauth;

public class AuthenticationBean {

    private final String message;

    public String getMessage() {
        return message;
    }

    public AuthenticationBean(final String messsage) {
        this.message = messsage;
    }

    @Override
    public String toString() {
        return "AuthenticationBean {" +
                "message='" + message + '\'' +
                '}';
    }
}