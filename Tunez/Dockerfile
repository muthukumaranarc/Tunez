FROM openjdk:17-jdk-alpine
WORKDIR /app
COPY target/Tunez-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 7000
CMD ["java", "-jar", "app.jar"]