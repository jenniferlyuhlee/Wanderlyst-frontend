import { expect, describe, test } from "vitest";
import cleanData from "./cleanData";

describe("cleanData helper func", () => {
    const dataSet1 = {
        field1: "test",
        emptyField1: "",
        field2: "test again",
        emptyField2: undefined
    };
    
    test("works as expected: cleans up data of empty fields", () => {
        expect(cleanData(dataSet1)).toEqual({
            field1: "test",
            field2: "test again"
        });
    });

    test("works as expected: full data sets are kept the same", () => {
        expect(cleanData({field: "field"})).toEqual({field:"field"});
    });

    const dataSet2 = {
        field1: [],
        field2: [1, 2],
        field3: "",
        field4: {innerField: "nested obj"},
        field5: {},
        field6: ""
    };
    
    test("works as expected: nested arrays and objects left alone", () => {
        expect(cleanData(dataSet2)).toEqual({
            field1: [],
            field2: [1, 2],
            field4: {innerField: "nested obj"},
            field5: {}
        })
    });
})