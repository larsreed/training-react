package net.kalars.rest.basicauth;

public class AuthenticationBean {

    private final String message;

    public String getMessage() {
        return this.message;
    }

    public AuthenticationBean(final String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "AuthenticationBean {" +
                "message='" + this.message + '\'' +
                '}';
    }
}