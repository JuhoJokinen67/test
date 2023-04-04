package com.devikone.routes;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.concurrent.TimeUnit;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import io.restassured.RestAssured;
import static org.awaitility.Awaitility.await;

@QuarkusTest
public class RouteTest {

    @Test
    public void httpStatus200Test() {
        RestAssured.get("/")
            .then()
            .assertThat()
            .statusCode(200);
    }

    @Test
    public void httpStatus404Test() {
        RestAssured.get("/thisdoesnotexist")
            .then()
            .assertThat()
            .statusCode(404);
    }

    @Test
    public void httpHappeningsStatus200Test() {
        RestAssured.get("/happenings")
            .then()
            .assertThat()
            .statusCode(200);
    }

    @Test
    public void testQuarkusLog() {
        await().atMost(10L, TimeUnit.SECONDS).pollDelay(1, TimeUnit.SECONDS).until(() -> {
            String log = new String(Files.readAllBytes(Paths.get("target/quarkus.log")), StandardCharsets.UTF_8);
            return log.contains("Started route-in");
        });
    }

}
