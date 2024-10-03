import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { UserProvider } from "../test-common/testSetup";
import { MemoryRouter} from "react-router-dom";
import PlaceForm from "./PlaceForm";
import { expect, describe, test} from "vitest";

describe("TagsSelect sub-form component", () => {
    const mockPlaceData = {
        name: "",
        address: "",
        description: "",
        image: ""
    }
    const mockHandlePlaceChange = vi.fn();

    test("renders without crashing", () => {
        render(
            <MemoryRouter>
                <UserProvider>
                    <PlaceForm index={1} 
                                placeData={mockPlaceData}
                                handlePlaceChange={mockHandlePlaceChange}/>
                </UserProvider>
            </MemoryRouter>)
    });

    test("matches snapshot", () => {
        const {asFragment} = render(
            <MemoryRouter>
                <UserProvider>
                    <PlaceForm index={1} 
                                placeData={mockPlaceData}
                                handlePlaceChange={mockHandlePlaceChange}/>
                </UserProvider>
            </MemoryRouter>);
        expect(asFragment()).toMatchSnapshot();
    });

    test("updates form data and handles change", () => {
        const {getByLabelText, getByText} = render(
            <MemoryRouter>
                <UserProvider>
                    <PlaceForm index={1} 
                                placeData={mockPlaceData}
                                handlePlaceChange={mockHandlePlaceChange}/>
                </UserProvider>
            </MemoryRouter>);

        const name = getByLabelText("Place Name");
        const address = getByLabelText("Address");

        // fill in field and check that place change handler is called
        fireEvent.change(name, {target: {value: 'testplace name'}});
        expect(mockHandlePlaceChange).toHaveBeenCalled();

        fireEvent.change(address, {target: {value: 'test address'}});
        expect(mockHandlePlaceChange).toHaveBeenCalled();
    });
});