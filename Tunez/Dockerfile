# Use Java 21 runtime
FROM eclipse-temurin:21-jdk-jammy

# Set working directory
WORKDIR /app

# Copy the built JAR file
COPY target/Tunez-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your Spring Boot app listens on
EXPOSE 7000

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
