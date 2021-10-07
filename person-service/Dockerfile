# ========= BUILD =========
FROM maven:3-openjdk-11 as builder
WORKDIR /build

COPY pom.xml pom.xml
RUN mvn dependency:resolve

COPY . .
RUN mvn install

# ========= RUN =========
FROM openjdk:11
ENV APP_NAME person-service
# https://github.com/open-telemetry/opentelemetry-java-instrumentation
ENV JAVA_OPTS "$JAVA_OPTS \
  -Dotel.traces.exporter=jaeger \
  -Dotel.exporter.jaeger.endpoint=http://tempo:14250 \
  -Dotel.metrics.exporter=none \
  -Dotel.resource.attributes="service.name=${APP_NAME}" \
  -Dotel.javaagent.debug=false \
  -javaagent:/app/opentelemetry-javaagent-all.jar"

ADD https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/download/v1.6.2/opentelemetry-javaagent-all.jar /app/opentelemetry-javaagent-all.jar
COPY --from=builder /build/target/$APP_NAME-*.jar /app/$APP_NAME.jar

CMD java $JAVA_OPTS -jar /app/$APP_NAME.jar