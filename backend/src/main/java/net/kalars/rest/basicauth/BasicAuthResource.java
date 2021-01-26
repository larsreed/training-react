package net.kalars.rest.restfulws.basicauth;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class BasicAuthResource {

    @GetMapping(path = "/basicauth")
    public AuthenticationBean authenticate() {
        System.out.println("authenticate..."+new Date());
        return new AuthenticationBean("Auth OK");
    }
}