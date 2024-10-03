import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { UserProvider } from "../test-common/testSetup";
import { MemoryRouter} from "react-router-dom";
import WanderlystApi from "../utils/api";
import ItinForm from "./ItinForm";
import { beforeEach, afterEach, expect, describe, test} from "vitest";

describe("ItinForm component", () => {
    // Mock API method to prevent actual submission and redirect
    beforeEach(() => {
        vi.spyOn(WanderlystApi, "createItin").mockResolvedValue(false);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("renders without crashing", () => {
        render(
            <MemoryRouter>
                <UserProvider>
                    <ItinForm />
                </UserProvider>
            </MemoryRouter>)
    });
    test("matches snapshot", () => {
        const {asFragment} = render(
            <MemoryRouter>
                <UserProvider>
                    <ItinForm />
                </UserProvider>
            </MemoryRouter>);
        expect(asFragment()).toMatchSnapshot();
    });

    test("handleChange being called when form fields change", async () => {
        const {getByLabelText, getByText} = render(
            <MemoryRouter>
                <UserProvider>
                    <ItinForm />
                </UserProvider>
            </MemoryRouter>);
        
        // check that regular form fields being controlled
        const titleInput = getByLabelText("Title");
        
        // fire change event
        fireEvent.change(titleInput, {target: {value: "Test Itin"}});
        await waitFor(()=> {
            expect(titleInput.value).toBe("Test Itin");
        })
    });

    test("handleTagChange being called when tags selected", async () => {
        const {getByLabelText} = render(
            <MemoryRouter>
                <UserProvider>
                    <ItinForm />
                </UserProvider>
            </MemoryRouter>);
        
        // check that regular form fields being controlled
        const tagInput = getByLabelText("Foodie");
        
        // fire change event
        fireEvent.click(tagInput)
        await waitFor(()=> {
            expect(tagInput.checked).toBe(true);
        });
        fireEvent.click(tagInput)
        await waitFor(()=> {
            expect(tagInput.checked).toBe(false);
        });
    });

    test("handlePlaceChange being called when place form is updated", async () => {
        const {debug, getByLabelText} = render(
            <MemoryRouter>
                <UserProvider>
                    <ItinForm />
                </UserProvider>
            </MemoryRouter>);
        debug();
        // check that regular form fields being controlled
        const placeInput = getByLabelText("Place Name");
        
        // fire change event
        fireEvent.change(placeInput, {target: {value: "Test Place"}});
        await waitFor(()=> {
            expect(placeInput.value).toBe("Test Place");
        })
    });

    test("calls createItin when place form is updated", async () => {
        const { container, getByLabelText, getByText} = render(
            <MemoryRouter>
                <UserProvider>
                    <ItinForm />
                </UserProvider>
            </MemoryRouter>);

        // fill out form fields
        fireEvent.change(getByLabelText("Title"), {target: {value: "test title"}});
        fireEvent.change(getByLabelText("Days"), {target: {value: "1"}});
        fireEvent.change(getByLabelText("City"), {target: {value: "test city"}});
        fireEvent.change(getByLabelText("Country"), {target: {value: "test country"}});
        fireEvent.change(container.querySelector("#description"), {target: {value: "test desc"}});
        fireEvent.click(getByLabelText("Foodie"));
        fireEvent.change(getByLabelText("Place Name"), {target: {value: "test place"}});
        fireEvent.change(getByLabelText("Address"), {target: {value: "test address"}});
        fireEvent.change(container.querySelector("#description1"), {target: {value: "test place desc"}});
        
        // "submit" form
        const btn = getByText("Share");
        fireEvent.click(btn);
        
        // wait for mock func to be called
        await waitFor(() => {
            expect(WanderlystApi.createItin).toHaveBeenCalledWith({
                    city: "test city",
                    country: "test country",
                    description: "test desc",
                    duration: "1",
                    places: [
                            {
                             address: "test address",
                             description: "test place desc",
                             name: "test place",
                             seq: 1,
                            },
                         ],
                    tags:  ["1"],
                    title: "test title",
                }
            );
        });
    });
});