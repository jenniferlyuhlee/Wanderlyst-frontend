import React from "react";
import { render } from "@testing-library/react";
import Alert from "./Alert";
import { expect, describe, test } from "vitest";

describe("Alert component", () => {
    test("renders without crashing", () => {
        render(<Alert />)
    });

    test("matches snapshot for error alerts", function() {
        let messages=["Password needs to be atleast 5 characters.", "Username taken."]
    
        const {asFragment}= render(
            <Alert type="danger" messages={messages}/>
        );
        expect(asFragment()).toMatchSnapshot();
    })

    test("matches snapshot for success alerts", function (){
        let messages=["Successful", "Saved"]
    
        const {asFragment} = render(
            <Alert type="success" messages={messages} />
        );
        expect(asFragment()).toMatchSnapshot();
    });
})