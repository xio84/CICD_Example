const request = require("supertest");
const app = require('../app');
let Blog = require("../Models/Blog");

const {describe, expect, test, beforeAll, afterAll, beforeEach} = require('@jest/globals');

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