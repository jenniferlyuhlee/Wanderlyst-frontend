import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { UserProvider } from "../test-common/testSetup";
import { MemoryRouter} from "react-router-dom";
import NavBar from "./NavBar";
import { expect, describe, test, vi} from "vitest";

describe("NavBar component: currUser", () => {
    test("renders as without crashing", () => {
        render(
            <MemoryRouter>
                <UserProvider>
                    <NavBar />
                </UserProvider>
            </MemoryRouter>)
    });
    test("matches snapshot", () => {
        const {asFragment} = render(
                        <MemoryRouter>
                            <UserProvider>
                                <NavBar/>
                            </UserProvider>
                        </MemoryRouter>)
        expect(asFragment()).toMatchSnapshot();
    });
    test("renders NavBar for anonymous users", () => {
        const {getByText} = render(
                            <MemoryRouter>
                                <UserProvider>
                                    <NavBar/>
                                </UserProvider>
                            </MemoryRouter>)
        expect(getByText("Explore")).toBeInTheDocument()
        expect(getByText("Share")).toBeInTheDocument()
        expect(getByText("Profile")).toBeInTheDocument()
    });
    test("calls logout when logout clicked", () => {
        const mockLogout = vi.fn();
        const {getByText} = render(
                <MemoryRouter>
                    <UserProvider logout = {mockLogout}>
                        <NavBar/>
                    </UserProvider>
                </MemoryRouter>)
        
        // Simulate a click on the logout button
        fireEvent.click(getByText("Logout"));

        // Assert that the mockLogout function was called
        expect(mockLogout).toHaveBeenCalled();
    })
});

describe("NavBar component: anon", () => {
    test("renders as without crashing", () => {
        render(
            <MemoryRouter>
                <UserProvider currUser = {null}>
                    <NavBar />
                </UserProvider>
            </MemoryRouter>)
    });
    test("matches snapshot", () => {
        const {asFragment} = render(
                        <MemoryRouter>
                            <UserProvider currUser = {null}>
                                <NavBar/>
                            </UserProvider>
                        </MemoryRouter>)
        expect(asFragment()).toMatchSnapshot();
    });
    test("renders NavBar for anonymous users", () => {
        const {getByText} = render(
                            <MemoryRouter>
                                <UserProvider currUser = {null}>
                                    <NavBar/>
                                </UserProvider>
                            </MemoryRouter>)
        expect(getByText("Login")).toBeInTheDocument()
        expect(getByText("Signup")).toBeInTheDocument()
    });
});