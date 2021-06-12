import { BaseError } from "./BaseError";

class TestError extends BaseError {}

describe("BaseError", () => {
  it("name is class name", () => {
    const actual = new TestError();

    expect(actual.name).toEqual("TestError");
  });

  it("instanceof Error, BaseError and self", () => {
    const actual = new TestError();

    expect(actual).toBeInstanceOf(Error);
    expect(actual).toBeInstanceOf(BaseError);
    expect(actual).toBeInstanceOf(TestError);
  });
});
