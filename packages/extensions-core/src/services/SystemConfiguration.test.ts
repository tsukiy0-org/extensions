import UUID from "pure-uuid";
import { SystemConfiguration } from "./SystemConfiguration";

describe("SystemConfiguration", () => {
  const sut = new SystemConfiguration();

  it("when has value then return value", () => {
    const actual = sut.get("NODE_ENV");

    expect(actual).toEqual("test");
  });

  it("when no value then throw", () => {
    const action = () => sut.get(new UUID(4).toString());

    expect(action).toThrowError();
  });
});
