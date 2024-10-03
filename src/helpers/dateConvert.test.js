import { expect, describe, test } from "vitest";
import dateConvert from "./dateConvert";

describe("dateConvert helper func", () => {
    test("works as expected: dateString => month + year", () => {
        expect(dateConvert("09-27-2024")).toBe('Sep 2024');
        expect(dateConvert("10-8-2000")).toBe('Oct 2000');
        expect(dateConvert("1-1-2010")).toBe('Jan 2010');
        expect(dateConvert("07-7-34")).toBe('Jul 2034');
    });
})