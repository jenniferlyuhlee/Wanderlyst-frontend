import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { UserProvider } from "../test-common/testSetup";
import { MemoryRouter } from "react-router-dom";
import WanderlystApi from "../utils/api";
import UserEditForm from "./UserEditForm";
import { beforeEach, afterEach, expect, describe, test , vi} from "vitest";

describe("UserEditForm Component", () => {
    // Mock functions passed from context
    const mockSetCurrUser = vi.fn();
    
    // Mock the API methods before running tests
    beforeEach(() => {
        vi.spyOn(WanderlystApi, "updateUser").mockResolvedValue({
            username: "testadmin",
            firstName: "UpdatedFirst",
            lastName: "UpdatedLast",
            location: "UpdatedLocation",
            bio: "UpdatedBio",
            profilePic: "UpdatedPic",
            isAdmin: false
        });

        vi.spyOn(WanderlystApi, "deleteUser").mockResolvedValue(true);
    });

    // Restore mocks after tests
    afterEach(() => {
        vi.restoreAllMocks();
    });
 
    test("renders without crashing", () => {
        render(
        <MemoryRouter>
            <UserProvider setCurrUser = {mockSetCurrUser}>
                <UserEditForm />
            </UserProvider>
        </MemoryRouter>)
    });
            
    
    test("matches snapshot", () => {
        const {asFragment} = render(
                            <MemoryRouter>
                                <UserProvider setCurrUser = {mockSetCurrUser}>
                                    <UserEditForm />
                                </UserProvider>
                            </MemoryRouter>)
        expect(asFragment()).toMatchSnapshot();
    });

    test("calls updateUser on form submission", async () => {
        const {getByLabelText, getByText} = render(
            <MemoryRouter>
                <UserProvider setCurrUser = {mockSetCurrUser}>
                    <UserEditForm />
                </UserProvider>
            </MemoryRouter>);

        // capture fields and login button
        const firstName = getByLabelText("First Name");
        const lastName = getByLabelText("Last Name");
        const location = getByLabelText("Location");
        const bio = getByLabelText("Bio");
        const profilePic = getByLabelText("Profile Pic URL");
        const btn = getByText("Save");

        // fill in fields and submit
        fireEvent.change(firstName, {target: {value: 'updatedfirst'}});
        fireEvent.change(lastName, {target: {value: 'updatedlast'}});
        fireEvent.change(location, {target: {value: 'updatedlocation'}});
        fireEvent.change(bio, {target: {value: 'updatedbio'}});
        fireEvent.change(profilePic, {target: {value: 'https://updatedPic.jpg'}});
        fireEvent.click(btn);

        // waits for mock func to be called
        await waitFor(() => {
            expect(WanderlystApi.updateUser).toHaveBeenCalledWith("testadmin",
                {
                        username: "testadmin",
                        firstName: "updatedfirst",
                        lastName: "updatedlast",
                        location: "updatedlocation",
                        bio: "updatedbio",
                        profilePic: "https://updatedPic.jpg",
                    }
            );
        });
        // Check if success alert appears
        await waitFor(() => {
            expect(getByText("Updated successfully.")).toBeInTheDocument();
        })
    });

    test("calls deleteUser when delete button clicked", async () => {
        const {getByText} = render(
            <MemoryRouter>
                <UserProvider>
                    <UserEditForm />
                </UserProvider>
            </MemoryRouter>);

        // Click delete button
        fireEvent.click(getByText("Delete Account"));

        // wait for mock func to be called
        await waitFor(() => {
            expect(WanderlystApi.deleteUser).toHaveBeenCalledWith("testadmin");
        });
    })
})