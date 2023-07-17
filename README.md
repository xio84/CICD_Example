# CICD_Example

## Requirements
- Create an app using golang
- Create an app using Node.js
- Build the services
- Test the services
- Build the container image
- Store the image in a registry
- Deploy to k8s cluster
- Expose services to public internet using any DNS domain

## Tech Stack used
### Golang App
The Golang app will be a simple CRUD API that will serve the management & viewing of User data. The User data will consist of a name & description. The app will use gin framework for serving HTTP requests, mongo library for connecting to the mongoDB, strechr for quick test assertion.

### Node.js App
The Node.js app will be a simple CRUD API that will serve the management & viewing of Blogging data. The Blog data will consist of a title, body, image & timestamp. The app will use express.js framework for serving HTTP requests, mongoose library for connecting to the mongoDB, jest for unit testing. The app uses [this repository](https://github.com/icode247/crud-with-mongodb.git) for its boilerplate.

### Image Building & Storing
The images are built using the dockerfiles that are in each of the app folder, the image will use the go 1.20 & node 20 images as base image. The image will be publicly stored in Docker Hub registry under oksidiantafly/go-app and oksidiantafly/node-app.

### Kubernetes Deployment
The K8S cluster is deployed in a local bare metal Linux server that has access to a static IP, the cluster is built using K3S setup tool and will be using Nginx Ingress controller to proxy its HTTP traffic.

### Others
The app will be publicly available in the internet using an owned domain name (oksidian.com) that is linked to the already established static IP. The CI/CD of the app is done by a combination of self-hosted & cloud Github Actions runners.

Structure Diagram:
![Structure Diagram](./docs/structure.png)

## CI/CD Workflow
The CI/CD will implement a trunk based development workflow in which building & testing the app is done on main branch push / PR event triggers. The image is then built, pushed, and deployed when the main branch is pushed into a release branch (this is called a release event). The separation of main & release branch will help support quick hotfixes in the main branch.

Gitflow Diagram:
![Gitflow Diagram](./docs/gitflow.png)

## API Docs
The apps are now available for public use on the internet. Here are the APIs for accessing the apps:

### Go App
- Get user: GET oksidian.com/apis/goapp/user?id={user_id}

- Add User: POST oksidian.com/apis/goapp/user (JSON Body: {
    "name" : "{name}",
    "description": "{desc}"
})

- Delete user: DELETE oksidian.com/apis/goapp/user?id={user_id}

### Node App
- Get all blogs: GET oksidian.com/apis/nodeapp

- Create blog: POST oksidian.com/apis/nodeapp (JSON Body: {
    "title": "title",
    "body": "body",
    "image": "image_url"
})

- Get blog by ID: GET oksidian.com/apis/nodeapp/{blog_id}

- Update blog: PUT oksidian.com/apis/nodeapp/{blog_id}

- Delete blog: DELETE oksidian.com/apis/nodeapp/{blog_id}