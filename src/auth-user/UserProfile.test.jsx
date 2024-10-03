import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { UserProvider } from "../test-common/testSetup";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import WanderlystApi from "../utils/api";
import UserProfile from "./UserProfile";
import UserEditForm from "./UserEditForm";
import { beforeEach, afterEach, expect, describe, test } from "vitest";

describe("UserProfile Component", () => {
    // mock api method to return testadmin info
    beforeEach(() => {
        vi.spyOn(WanderlystApi, "getUser").mockResolvedValue({
            username: "testadmin",
            firstName: "testfirst",
            lastName: "testlast",
            location: "testlocation",
            bio: "testbio",
            profilePic: null,
            isAdmin: true,
            createdAt: '2024-10-01',
            likes: [],
            itineraries: []
        });
    });
    
    // Restore mocks after tests
    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("renders without crashing", async () => {
        await waitFor(() => {render(
            <MemoryRouter initialEntries={['/users/profile/testadmin']}>
                <UserProvider>
                    <UserProfile />
                </UserProvider>
            </MemoryRouter>)
        });
    });
            
    test("matches snapshot", async () => {
        const {asFragment, findByText} = render(
            <MemoryRouter initialEntries={['/users/profile/testadmin']}>
                <UserProvider>
                    <UserProfile />
                </UserProvider>
            </MemoryRouter>)

        // wait for element that shows user data has loaded
        await findByText('testfirst testlast');
        expect(asFragment()).toMatchSnapshot()
    });

    test("works as expected: toggling displays", async () => {
        const { container, getByText } = render(
            <MemoryRouter initialEntries={['/users/profile/testadmin']}>
                <UserProvider>
                    <UserProfile />
                </UserProvider>
            </MemoryRouter>)
        
   
        // user itineraries tab shows on initial load
        await waitFor(() => {
            expect(getByText('Start sharing itineraries!')).toBeInTheDocument()
        });
     
        // click likes tab
        const likesBtn = container.querySelector(`.bi-bookmark-heart`).parentElement;
        fireEvent.click(likesBtn);

        // user likes tab now displays
        await waitFor(() => {
            expect(getByText('Start exploring and liking itineraries!')).toBeInTheDocument()
        });
    });

    test("edit profile button navigates to edit form", async () => {
        const {getByText} = render(
            <MemoryRouter initialEntries={['/users/profile/testadmin']}>
                <UserProvider>
                    <Routes>
                        <Route path="/users/profile/testadmin" element={<UserProfile />} />
                        <Route path="/users/profile/edit" element={<div>User Edit Form</div>}/>
                    </Routes>
                </UserProvider>
            </MemoryRouter>)
        
        await waitFor(() => {
            expect(getByText('@testadmin')).toBeInTheDocument()
        });
        
        // click edit profile button
        fireEvent.click(getByText("Edit Profile"));

        // check for reroute
        expect(getByText("User Edit Form")).toBeInTheDocument();
    })
});