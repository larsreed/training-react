package net.kalars.rest.restfulws.com.in28minutes.rest.webservices.restfulwebservices.jwt.resource;

import java.io.Serializable;

public class  JwtTokenRequest implements Serializable {
  
  private static final long serialVersionUID = -5616176897013108345L;

  private String username;
    private String password;

    /*
    {
        "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpbjI4bWludXRlcyIsImV4cCI6MTYxMTI2ODg5NiwiaWF0IjoxNjEwNjY0MDk2fQ.1ICdQfoI5_vxowtfcc1PNTtxvGG7r5v2UACGgwzGDv_6pR1ym5CN3HRxY0ol6UD4cVacUzYQwuqdwwHwOGo7fA"
    }
*/
    public JwtTokenRequest() {
        super();
    }

    public JwtTokenRequest(String username, String password) {
        this.setUsername(username);
        this.setPassword(password);
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}