# Backend Setup Guide (AWS EC2 + Spring Boot + AWS RDS)

## Project Structure

```
registration-system/
└── backend/
```

---

# Requirements

* Ubuntu 24.04 LTS
* Java 17
* Maven
* Git
* MySQL Client
* AWS EC2 Instance
* AWS RDS MySQL Database
* Gmail App Password
* GitHub Repository

---

# Step 1 : Update Ubuntu

```bash
sudo apt update
sudo apt upgrade -y
```

---

# Step 2 : Install Java 17

```bash
sudo apt install openjdk-17-jdk -y
```

Verify

```bash
java -version
```

---

# Step 3 : Install Maven

```bash
sudo apt install maven -y
```

Verify

```bash
mvn -version
```

---

# Step 4 : Install Git

```bash
sudo apt install git -y
```

Verify

```bash
git --version
```

---

# Step 5 : Clone Repository

```bash
git clone https://github.com/SauravBagade/registration-system.git
```

Go to backend

```bash
cd registration-system/backend
```

---

# Step 6 : Install MySQL Client

```bash
sudo apt install mysql-client -y
```

Verify

```bash
mysql --version
```

---

# Step 7 : Download AWS RDS SSL Certificate

```bash
wget https://truststore.pki.rds.amazonaws.com/global/global-bundle.pem
```

Verify

```bash
ls
```

Output

```
global-bundle.pem
```

---

# Step 8 : Connect AWS RDS

```bash
mysql \
-h database-1.cluster-c4jwm28o6g8c.us-east-1.rds.amazonaws.com \
-P 3306 \
-u root \
-p \
--ssl-mode=VERIFY_IDENTITY \
--ssl-ca=./global-bundle.pem
```

---

# Step 9 : Create Database

```sql
SHOW DATABASES;

CREATE DATABASE otp_auth;

SHOW DATABASES;
```

---

# Step 10 : Use Database

```sql
USE otp_auth;

SHOW TABLES;
```

Initially

```
Empty Set
```

---

# Step 11 : Configure Spring Boot

Open

```
src/main/resources/application.properties
```

Example

```properties
spring.application.name=registration-system

spring.datasource.url=jdbc:mysql://database-1.cluster-c4jwm28o6g8c.us-east-1.rds.amazonaws.com:3306/otp_auth
spring.datasource.username=root
spring.datasource.password=YOUR_DATABASE_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

server.port=8080

spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=YOUR_GMAIL
spring.mail.password=YOUR_APP_PASSWORD

spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

---

# Step 12 : Build Project

```bash
mvn clean package
```

Generated JAR

```
target/registration-system-0.0.1-SNAPSHOT.jar
```

---

# Step 13 : Run Application

```bash
java -jar target/registration-system-0.0.1-SNAPSHOT.jar
```

---

# Step 14 : Verify Tables

Login again

```bash
mysql \
-h database-1.cluster-c4jwm28o6g8c.us-east-1.rds.amazonaws.com \
-P 3306 \
-u root \
-p \
--ssl-mode=VERIFY_IDENTITY \
--ssl-ca=./global-bundle.pem
```

```sql
USE otp_auth;

SHOW TABLES;
```

Expected Output

```
users

blacklisted_token
```

---

# Step 15 : Verify Users

```sql
SELECT * FROM users;
```

---

# Useful SQL Commands

```sql
SHOW DATABASES;

USE otp_auth;

SHOW TABLES;

SELECT * FROM users;

SELECT * FROM blacklisted_token;

DESC users;

EXIT;
```

---

# Useful Linux Commands

```bash
pwd

ls

history

cd

nano

cat

ps -ef | grep java

kill -9 <PID>
```

---

# Rebuild Application

```bash
mvn clean package
```

---

# Restart Application

```bash
pkill -f registration-system

java -jar target/registration-system-0.0.1-SNAPSHOT.jar
```

---

# Verify Application

```
http://EC2_PUBLIC_IP:8080
```

Swagger

```
http://EC2_PUBLIC_IP:8080/swagger-ui/index.html
```

---

# Technologies Used

* Spring Boot
* Spring Security
* JWT Authentication
* Spring Data JPA
* Hibernate
* MySQL
* AWS RDS
* AWS EC2
* Maven
* Java 17
* Gmail SMTP
* Git
* GitHub

---

# Author

**Saurav Bagade**

GitHub

https://github.com/SauravBagade
