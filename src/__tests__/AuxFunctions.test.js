import { convertEpoch } from "../AuxFunctions";

describe("convert times", () => {
  it("should return a time string in the morning", () => {
    expect(convertEpoch("1572797664")).toBe("11:14AM Sun Nov 03 2019");
  });
  it("should return a time string in the afternooon", () => {
    expect(convertEpoch("1572797664")).toBe("11:14AM Sun Nov 03 2019");
  });
  it("should return a time string during midnight", () => {
    expect(convertEpoch("1572754320")).toBe("12:12AM Sun Nov 03 2019");
  });
  it("should return a time string during noon", () => {
    expect(convertEpoch("1572801120")).toBe("12:12PM Sun Nov 03 2019");
  });
});