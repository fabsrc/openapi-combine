import { OpenAPIV3 } from "openapi-types";
import { mergeDeepLeft, map } from "ramda";
import { combine } from "../combine";

const createTestSchema = (
  data: Partial<OpenAPIV3.Document> = {}
): OpenAPIV3.Document =>
  mergeDeepLeft(data, {
    openapi: "3.0.0",
    info: {
      title: "",
      version: "",
    },
    paths: {},
  });

describe("combine", () => {
  it("returns static string for `openapi` field", () => {
    const testSchema = createTestSchema();
    expect(combine([testSchema])).toHaveProperty("openapi", "3.0.2");
  });

  it("returns `info` field from last schema", () => {
    const testSchemas = map(
      (idx) => createTestSchema({ info: { title: idx, version: idx } }),
      ["schema1", "schema2", "schema3"]
    );
    expect(combine(testSchemas)).toHaveProperty("info", {
      title: "schema3",
      version: "schema3",
    });
  });

  it("returns flattened `servers` field", () => {
    const testSchema1 = createTestSchema({
      servers: [
        { description: "11", url: "", variables: {} },
        { description: "12", url: "", variables: {} },
      ],
    });
    const testSchema2 = createTestSchema({
      servers: [
        { description: "21", url: "", variables: {} },
        { description: "22", url: "", variables: {} },
      ],
    });
    expect(combine([testSchema1, testSchema2])).toHaveProperty("servers", [
      { description: "11", url: "", variables: {} },
      { description: "12", url: "", variables: {} },
      { description: "21", url: "", variables: {} },
      { description: "22", url: "", variables: {} },
    ]);
  });

  it("returns merged `paths` field", () => {
    const testSchema1 = createTestSchema({
      paths: {
        "/test1": {
          get: {
            summary: "test1",
          },
        },
      },
    });
    const testSchema2 = createTestSchema({
      paths: {
        "/test2": {
          post: {
            summary: "test2",
          },
        },
      },
    });
    expect(combine([testSchema1, testSchema2])).toHaveProperty("paths", {
      "/test1": {
        get: {
          summary: "test1",
        },
      },
      "/test2": {
        post: {
          summary: "test2",
        },
      },
    });
  });

  it("returns merged `components` field", () => {
    const testSchema1 = createTestSchema({
      components: {
        schemas: {
          test1: {
            type: "string",
          },
        },
      },
    });
    const testSchema2 = createTestSchema({
      components: {
        responses: {
          test2: {
            description: "test2",
          },
        },
      },
    });
    expect(combine([testSchema1, testSchema2])).toHaveProperty("components", {
      schemas: {
        test1: {
          type: "string",
        },
      },
      responses: {
        test2: {
          description: "test2",
        },
      },
    });
  });

  it("returns flattened `security` field", () => {
    const testSchema1 = createTestSchema({
      security: [{ test1: ["1"] }],
    });
    const testSchema2 = createTestSchema({
      security: [{ test2: ["2"] }],
    });
    expect(combine([testSchema1, testSchema2])).toHaveProperty("security", [
      { test1: ["1"] },
      { test2: ["2"] },
    ]);
  });

  it("returns flattened `tags` field", () => {
    const testSchema1 = createTestSchema({
      tags: [{ name: "11" }, { name: "12" }],
    });
    const testSchema2 = createTestSchema({
      tags: [{ name: "21" }, { name: "22" }],
    });
    expect(combine([testSchema1, testSchema2])).toHaveProperty("tags", [
      { name: "11" },
      { name: "12" },
      { name: "21" },
      { name: "22" },
    ]);
  });

  it("returns `externalDocs` field from last schema", () => {
    const testSchema1 = createTestSchema({
      externalDocs: { description: "1", url: "1" },
    });
    const testSchema2 = createTestSchema({
      externalDocs: { description: "2", url: "2" },
    });
    expect(combine([testSchema1, testSchema2])).toHaveProperty("externalDocs", {
      description: "2",
      url: "2",
    });
  });
});
