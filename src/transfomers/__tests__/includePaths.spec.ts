import { OpenAPIV3 } from "openapi-types";
import {
  includePaths,
  includePath,
  includeOperationsFromPath,
  includeOperationsFromPaths,
} from "../includePaths";
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

describe("includePaths", () => {
  it("includes specified paths from schema", () => {
    const testPaths = ["/test/first", "/test/second"];
    const result = includePaths(testPaths)(testSchema);
    expect(result.paths).toEqual({
      [testPaths[0]]: expect.anything(),
      [testPaths[1]]: expect.anything(),
    });
  });
});

describe("includePath", () => {
  it("includes specified paths from schema", () => {
    const testPath = "/test/first";
    const result = includePath(testPath)(testSchema);
    expect(result.paths).toEqual({
      [testPath]: expect.anything(),
    });
  });
});

describe("includeOperationsFromPath", () => {
  it("includes specified operations from path in schema", () => {
    const testPath = "/test/first";
    const testOperations = [Operation.POST];
    const result = includeOperationsFromPath(
      testPath,
      testOperations
    )(testSchema);
    expect(result.paths).toHaveProperty(testPath, {
      [Operation.POST]: expect.anything(),
    });
  });
});

describe("includeOperationsFromPaths", () => {
  it("includes specified operations from paths in schema", () => {
    const testPathsAndOperations = {
      "/test/first": [Operation.GET],
      "/test/second": [Operation.POST],
    };
    const result = includeOperationsFromPaths(testPathsAndOperations)(
      testSchema
    );
    expect(result.paths).toHaveProperty("/test/first", {
      [Operation.GET]: expect.anything(),
    });
    expect(result.paths).toHaveProperty("/test/second", {
      [Operation.POST]: expect.anything(),
    });
  });
});
