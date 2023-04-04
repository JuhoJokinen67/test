package com.devikone.routes;

import org.apache.camel.builder.RouteBuilder;

public class Routes extends RouteBuilder {

    @Override
    public void configure() throws Exception {

        from("platform-http:/happenings")
            .routeId("route-in")
            .log("IN :: Polling Data")
            .setBody(simple("{\"hello\": \"world\"}"));

    }
}
