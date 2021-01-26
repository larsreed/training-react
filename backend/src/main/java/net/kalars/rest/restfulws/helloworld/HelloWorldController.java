package net.kalars.rest.restfulws.helloworld;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class HelloWorldController {

    @GetMapping(path = "/hello")
    public String helloWorld() {
        return "Hello World!";
    }

    @GetMapping(path = "/hello-bean")
    public HelloWorldBean helloBean() {
        return new HelloWorldBean("Hello World!");
    }

    @GetMapping(path = "/hello-var/{name}")
    public HelloWorldBean helloVar(final @PathVariable String name) {
        return new HelloWorldBean("Hello, " + name + "!");
    }
}