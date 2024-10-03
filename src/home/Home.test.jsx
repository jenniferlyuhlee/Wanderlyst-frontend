import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { UserProvider } from "../test-common/testSetup";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import pickRandom from "../helpers/random";
import { beforeEach, afterEach, expect, describe, test, vi } from "vitest";

describe("Home component: currUser", () => {
    
    // mock random func in link randomizer for consistent snapshot tests
    vi.mock("../helpers/random", () => ({
        __esModule: true,
        default: vi.fn(() => "Foodie"),
    }));

    // restore mocks
    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("renders as without crashing", () => {
        render(
            <MemoryRouter>
                <UserProvider>
                    <Home />
                </UserProvider>
            </MemoryRouter>)
    });
    test("matches snapshot", () => {
        const {asFragment} = render(
                            <MemoryRouter>
                                <UserProvider>
                                    <Home/>
                                </UserProvider>
                            </MemoryRouter>)
        expect(asFragment()).toMatchSnapshot();
    });
    test("renders home for logged in users", () => {
        const {getByText} = render(
                            <MemoryRouter>
                                <UserProvider currUser>
                                    <Home/>
                                </UserProvider>
                            </MemoryRouter>)
        expect(getByText("Explore a tag")).toBeInTheDocument()
    });
});


describe("Home component: anon", () => {
    test("renders as without crashing", () => {
        render(
            <MemoryRouter>
                <UserProvider currUser = {null}>
                    <Home />
                </UserProvider>
            </MemoryRouter>)
    });
    test("matches snapshot", () => {
        const {asFragment} = render(
                            <MemoryRouter>
                                <UserProvider currUser = {null}>
                                    <Home/>
                                </UserProvider>
                            </MemoryRouter>)
        expect(asFragment()).toMatchSnapshot();
    });
    test("renders home for anonymous users", () => {
        const {getByText} = render(
                            <MemoryRouter>
                                <UserProvider currUser = {null}>
                                    <Home/>
                                </UserProvider>
                            </MemoryRouter>)
        expect(getByText("Join now")).toBeInTheDocument()
    });
});