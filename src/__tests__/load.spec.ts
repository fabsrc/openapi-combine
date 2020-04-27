import path from "path";
import { OpenAPIV2, OpenAPIV3 } from "openapi-types";
import { load } from "../load";

const testSchemaV3: OpenAPIV3.Document = {
  openapi: "3.0.2",
  info: {
    title: "TestSchema",
    version: "0",
  },
  paths: {},
};

const testSchemaV2: OpenAPIV2.Document = {
  swagger: "2.0",
  info: {
    title: "TestSchema",
    version: "0",
  },
  paths: {},
};

describe("load", () => {
  it("loads JSON file", async () => {
    const res = await load(path.join(__dirname, "./fixtures/openapi.json"));
    expect(res).toHaveProperty("openapi");
  });

  it("loads YAML file", async () => {
    const res = await load(path.join(__dirname, "./fixtures/openapi.yaml"));
    expect(res).toHaveProperty("openapi");
  });

  it("loads JS schema", async () => {
    const res = await load(testSchemaV3);
    expect(res).toHaveProperty("openapi");
  });

  it("converts Swagger schema to OpenAPI schema", async () => {
    const res = await load(testSchemaV2);
    expect(res).toHaveProperty("openapi");
  });
});
