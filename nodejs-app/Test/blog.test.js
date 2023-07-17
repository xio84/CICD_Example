const request = require("supertest");
const app = require('../app');
let Blog = require("../Models/Blog");

const {describe, expect, test, befo} = require('@jest/globals');

const connection = require("../MongooseController/connection")
beforeAll(() => {
  return connection.connect()
})

afterAll(() => {
  return connection.disconnect()
})

describe("Test the root path", () => {
  test("It should response the GET method", () => {
    return request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("It should respond with a text", () => {
    return request(app)
      .get("/")
      .then(response => {
        expect(response.text).toBe('Hello World!');
      });
  });
});

describe("Blogs", () => {
    beforeEach(() => {
      return Blog.deleteMany({})
    });
    describe("/GET blog", () => {
      test("it should GET all the blogs", () => {
        return request(app)
          .get("/api/blogs")
          .then((res) => {
            expect(res.statusCode).toBe(200)
            expect(res.body.data).toBeInstanceOf(Array)
            expect(res.body.data.length).toBe(0)
          });
      });
    });
    describe("/POST blog", () => {
    test("it should new POST a blog", (done) => {
        let blog = {
        title: "This is the first blog",
        body: "This is a blog post",
        image:
            "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        };
        request(app)
        .post("/api/blogs")
        .send(blog)
        .end((err, res) => {
            expect(res.statusCode).toBe(200)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body.status).toBe("success")
            done();
        });
    });
    });
    describe("/GET/:id blog", () => {
    test("it should GET a blog by the id", (done) => {
        let blog = new Blog({
        title: "This is the first blog",
        body: "This is a blog post",
        image:
            "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        });
        blog.save()
        .then((blog) => {
        request(app)
            .get("/api/blogs/" + blog.id)
            .send(blog)
            .end((err, res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body).toBeInstanceOf(Object)
                expect(res.body.status).toBe("success")
                done();
            });
        });
    });
    });
    describe("/PUT/:id blog", () => {
    test("it should UPDATE a blog given the id", (done) => {
        let blog = new Blog({
        title: "This is the first blog",
        body: "This is a blog post",
        image:
            "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        });
        blog.save()
        .then((blog) => {
        console.log(blog.id);
        request(app)
            .put("/api/blogs/" + blog.id)
            .send({
            title: "The first blog was updated",
            body: "This is a blog post",
            image:
                "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
            })
            .end((err, res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body).toBeInstanceOf(Object)
                expect(res.body.status).toBe("success")
                done();
            });
        });
    });
    });
    describe("/DELETE/:id blog", () => {
    test("it should DELETE a blog given the id", (done) => {
        let blog = new Blog({
        title: "This is the first blog",
        body: "This is a blog post",
        image:
            "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        });
        blog.save()
        .then((blog) => {
        request(app)
        .delete("/api/blogs/" + blog.id)
        .end((err, res) => {
            expect(res.statusCode).toBe(200)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body.status).toBe("success")
            done();
        });
        });
    });
    });
})