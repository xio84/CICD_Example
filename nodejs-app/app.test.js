const request = require("supertest");
const app = require('./app');

// import {describe, expect, test} from '@jest/globals';

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