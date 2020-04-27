import R from "ramda";
import { overIf, overPaths, overPath, eachPath, eachOperation } from "../utils";

describe("overIf", () => {
  it("invokes over fn if key exists", () => {
    const spyFn = jest.fn();
    const fn = overIf(R.lensProp("test"), spyFn);
    fn({ test: "hello" });
    expect(spyFn).toHaveBeenCalledWith("hello");
  });

  it("does not invoke over fn if key does not exists", () => {
    const spyFn = jest.fn();
    const fn = overIf(R.lensProp("test"), spyFn);
    fn({ not: "hello" });
    expect(spyFn).not.toHaveBeenCalled();
  });
});

describe("overPaths", () => {
  const spyFn = jest.fn();
  const fn = overPaths(spyFn);
  const testPaths = {
    "/hello": {
      get: {},
      post: {},
    },
  };

  beforeEach(() => spyFn.mockReset());

  it("invokes over fn on paths", () => {
    fn({ paths: testPaths });
    expect(spyFn).toHaveBeenCalledWith(testPaths);
  });
});

describe("overPath", () => {
  const testPaths = {
    "/hello": {
      get: {},
      post: {},
    },
    "/test": {
      get: {},
    },
  };

  it("invokes over fn on path", () => {
    const spyFn = jest.fn();
    const fn = overPath("/hello", spyFn);
    fn({ paths: testPaths });
    expect(spyFn).toHaveBeenCalledWith(testPaths["/hello"]);
  });
});

describe("eachPath", () => {
  const spyFn = jest.fn();
  const fn = eachPath(spyFn);
  const testPaths = {
    "/hello": {
      get: {},
      post: {},
    },
    "/test": {
      get: {},
    },
  };

  it("invokes fn on each path", () => {
    fn({ paths: testPaths });
    expect(spyFn).toHaveBeenCalledTimes(2);
    expect(spyFn).toHaveBeenNthCalledWith(1, testPaths["/hello"]);
    expect(spyFn).toHaveBeenNthCalledWith(2, testPaths["/test"]);
  });
});

describe("eachOperation", () => {
  const spyFn = jest.fn();
  const fn = eachOperation(spyFn);
  const testPaths = {
    "/hello": {
      get: {},
      post: {},
    },
    "/test": {
      put: {},
    },
    "/v2/test": {
      put: {},
    },
  };

  it("invokes fn on each operation of each path", () => {
    fn({ paths: testPaths });
    expect(spyFn).toHaveBeenCalledTimes(4);
    expect(spyFn).toHaveBeenNthCalledWith(1, testPaths["/hello"]["get"]);
    expect(spyFn).toHaveBeenNthCalledWith(2, testPaths["/hello"]["post"]);
    expect(spyFn).toHaveBeenNthCalledWith(3, testPaths["/test"]["put"]);
    expect(spyFn).toHaveBeenNthCalledWith(4, testPaths["/v2/test"]["put"]);
  });
});
