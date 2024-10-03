import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { UserProvider } from "../test-common/testSetup";
import { MemoryRouter, Routes, Route} from "react-router-dom";
import TagCard from "./TagCard";
import { expect, describe, test} from "vitest";

const testTag = {
    name: "testTag",
    description: "Tag for testing."
}

describe("TagCard component", () => {
    test("renders without crashing", () => {
        render(
            <MemoryRouter>
                <UserProvider>
                    <TagCard tag={testTag}/>
                </UserProvider>
            </MemoryRouter>)
    });

    test("matches snapshot", () => {
        const {getByText, asFragment} = render(
            <MemoryRouter>
                <UserProvider>
                    <TagCard tag={testTag}/>
                </UserProvider>
            </MemoryRouter>)

        expect(asFragment()).toMatchSnapshot();
        expect(getByText("testTag")).toBeInTheDocument();
    });

    test("clicking card link works", () => {
        const {container, getByText} = render(
            <MemoryRouter>
                <UserProvider>
                    <Routes>
                        {/* Define route for the TagCard */}
                        <Route path="/" element={<TagCard tag={testTag} />} />
                        {/* Define the route you expect to navigate to */}
                        <Route path="/tags/:name" element={<div>Tag Details Page</div>} />
                    </Routes>
                </UserProvider>
            </MemoryRouter>)

        const cardLink = container.querySelector(".TagCard");
        fireEvent.click(cardLink);
        expect(getByText("Tag Details Page")).toBeInTheDocument();
    });
});