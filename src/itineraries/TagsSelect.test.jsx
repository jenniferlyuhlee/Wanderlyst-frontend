import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { UserProvider } from "../test-common/testSetup";
import { MemoryRouter} from "react-router-dom";
import TagsSelect from "./TagsSelect";
import { expect, describe, test} from "vitest";


describe("TagsSelect sub-form component", () => {
    const mockSelectedTags = ["1"];
    const mockHandleTagChange = vi.fn();

    test("renders without crashing", () => {
        render(
            <MemoryRouter>
                <UserProvider>
                    <TagsSelect selectedTags={mockSelectedTags}
                                handleTagChange={mockHandleTagChange}/>
                </UserProvider>
            </MemoryRouter>)
    });

    test("matches snapshot", () => {
        const {asFragment} = render(
            <MemoryRouter>
                <UserProvider>
                    <TagsSelect selectedTags={mockSelectedTags}
                                handleTagChange={mockHandleTagChange}/>
                </UserProvider>
            </MemoryRouter>);
        expect(asFragment()).toMatchSnapshot();
    });

    test("handles selecting tags", () => {
        const {getByLabelText} = render(
            <MemoryRouter>
                <UserProvider>
                    <TagsSelect selectedTags={mockSelectedTags}
                                handleTagChange={mockHandleTagChange}/>
                </UserProvider>
            </MemoryRouter>);
 
        const Foodie = getByLabelText("Foodie")
        const Explorer = getByLabelText("Explorer")

        // expect already selected tags to be checked in the form
        expect(Foodie).toBeChecked();

        // simulate checking another tag
        fireEvent.click(Explorer);
        // check if handler function works on click
        expect(mockHandleTagChange).toHaveBeenCalled();
    });
});
