# pp-client-ip-demo

# Running the Web Application with Docker Compose

This repository contains a Node.js web application along with a MySQL database configured using Docker Compose. The application allows storing and retrieving client IP addresses.

## Prerequisites

- Docker
- Docker Compose

## Getting Started

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/mabdulmoghni/pp-assignment.git
    cd pp-assignment/client-ip-app
    ```

2. Create a `.env` file in the root directory of the repository and add the following environment variables:

    ```plaintext
    DB_HOST=mysql
    DB_NAME=your_database_name
    DB_USER=your_database_username
    DB_PASSWORD=your_database_password
    ```

    Replace `your_database_name`, `your_database_username`, and `your_database_password` with your actual MySQL database configuration.

3. Start the application using Docker Compose:

    ```bash
    docker-compose up -d
    ```

4. The application should now be running. You can access it at http://localhost:3000.

## Testing the Application [Development Mode]

1. Open a web browser and navigate to http://localhost:3000/client-ip.

    - This endpoint will store the public IP address in the database and display the message "Public IP saved to database :)" in the browser.

2. To verify that the IP address was stored, access http://localhost:3000/client-ip/list.

    - This endpoint will return a JSON array containing all client IP addresses stored in the database.

## Stopping the Application

To stop the application and remove the containers, run:

```bash
docker-compose down
```

## CI/CD

Github actions will auto trigger docker build, push image to AWS ECR. and Deploy the pp-client-ip-demo app helm-chart with its dependencies to the EKS Cluster.
Check github actions logs :)  

```bash
kubectl get ingress
```

notice the ingress ALB Address
```bash
curl http://ALB_Address/client-ip
curl http://ALB_Address/client-ip/list
```

## TODO
Currently we are using alb on http. needs to add AWS ACM and https support
