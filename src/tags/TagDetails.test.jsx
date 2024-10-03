import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { UserProvider } from "../test-common/testSetup";
import { MemoryRouter} from "react-router-dom";
import WanderlystApi from "../utils/api";
import TagDetails from "./TagDetails";
import { beforeEach, afterEach, expect, describe, test } from "vitest";

describe("TagDetails component", () => {
    // mock api method to get testTag
    beforeEach(() => {
        vi.spyOn(WanderlystApi, "getTag").mockResolvedValue({
            name: "testTag",
            description: "Tag for testing.",
            itineraries: []
        })
    });
      
    // Restore mocks after tests
    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("renders without crashing", async () => {
        await waitFor(() => { render(
            <MemoryRouter initialEntries={['/tags/testTag']}>
                <UserProvider>
                    <TagDetails/>
                </UserProvider>
            </MemoryRouter>)
        });
    });

    test("matches snapshot", async () => {
        const {getByText, asFragment} = render(
            <MemoryRouter initialEntries={['/tags/testTag']}>
                <UserProvider>
                    <TagDetails/>
                </UserProvider>
            </MemoryRouter>)

        // wait and check that tag is displayed
        await waitFor(() => {
            expect(getByText("Tag for testing.")).toBeInTheDocument();
        });
        expect(asFragment()).toMatchSnapshot();
       
    });
    test("displays loading spinner initially", () => {
        const { container } = render(
            <MemoryRouter initialEntries={['/tags/testTag']}>
                <UserProvider>
                    <TagDetails />
                </UserProvider>
            </MemoryRouter>
        );

        // Expect loading spinner to appear before the API data is loaded
        expect(container.querySelector(".fa-spinner")).toBeInTheDocument();
    });

    test("displays error message if tag does not exist", async () => {
        // Mock API to throw an error
        WanderlystApi.getTag.mockRejectedValueOnce(new Error("Tag not found"));

        const {getByText} = render(
            <MemoryRouter initialEntries={['/tags/nonexistentTag']}>
                <UserProvider>
                    <TagDetails />
                </UserProvider>
            </MemoryRouter>
        );

        // Wait and check for the error message to appear
        await waitFor(() => {
            expect(getByText("Sorry this tag doesn't exist.")).toBeInTheDocument();
        });
    });

});