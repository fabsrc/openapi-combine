import { OpenAPIV3 } from "openapi-types";
import {
  excludePaths,
  excludePath,
  excludeOperationsFromPath,
  excludeOperationsFromPaths,
} from "../excludePaths";
import { Operation } from "../../types/Operation";

const testSchema: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "TestSchema",
    version: "0",
  },
  paths: {
    "/test/first": {
      get: {},
      post: {},
    },
    "/test/second": {
      get: {},
      post: {},
    },
    "/test/third": {
      get: {},
      post: {},
    },
  },
};

describe("excludePaths", () => {
  it("excludes specified paths from schema", () => {
    const testPaths = ["/test/first", "/test/second"];
    const fn = excludePaths(testPaths);
    const res = fn(testSchema);
    testPaths.forEach((testPath) => {
      expect(res).not.toHaveProperty(["paths", testPath]);
    });
  });
});

describe("excludePath", () => {
  it("excludes specified paths from schema", () => {
    const testPath = "/test/first";
    const fn = excludePath(testPath);
    expect(fn(testSchema)).not.toHaveProperty(["paths", testPath]);
  });
});

describe("excludeOperationsFromPath", () => {
  it("excludes specified operations from path in schema", () => {
    const testPath = "/test/first";
    const testOperations = [Operation.POST];
    const fn = excludeOperationsFromPath(testPath, testOperations);
    expect(fn(testSchema)).not.toHaveProperty([
      "paths",
      testPath,
      testOperations[0],
    ]);
  });
});

describe("excludeOperationsFromPaths", () => {
  it("excludes specified operations from paths in schema", () => {
    const testPathsAndOperations = {
      "/test/first": [Operation.GET],
      "/test/second": [Operation.POST],
    };
    const result = excludeOperationsFromPaths(testPathsAndOperations)(
      testSchema
    );
    expect(result).not.toHaveProperty(["paths", "/test/first", Operation.GET]);
    expect(result).not.toHaveProperty([
      "paths",
      "/test/second",
      Operation.POST,
    ]);
  });
});
