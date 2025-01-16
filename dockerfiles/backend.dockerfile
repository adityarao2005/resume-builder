FROM maven:3.9.9-amazoncorretto-21-alpine AS build

WORKDIR /app

COPY . .

RUN mvn clean compile package

FROM amazoncorretto:21-alpine AS runtime

WORKDIR /app

COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar .

ENV MONGODB_URI="mongodb://localhost:27017/backend"
ENV PYTHON_ML_SERVICE_URI="http://localhost:8000"

CMD ["java", "-jar", "backend-0.0.1-SNAPSHOT.jar"]