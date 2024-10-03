import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { UserProvider } from "../test-common/testSetup";
import { MemoryRouter} from "react-router-dom";
import TagList from "./TagList";
import {expect, describe, test } from "vitest";

describe("TagList component", () => {
    test("renders without crashing", () => {
        render(
            <MemoryRouter >
                <UserProvider>
                    <TagList/>
                </UserProvider>
            </MemoryRouter>)
    });
    test("matches snapshot", () => {
        const{asFragment} = render(
            <MemoryRouter >
                <UserProvider>
                    <TagList/>
                </UserProvider>
            </MemoryRouter>)
        expect(asFragment()).toMatchSnapshot();
    });
    
    test("displays as expected: all tags in test setup", async () => {
        const{getByText} = render(
            <MemoryRouter >
                <UserProvider>
                    <TagList/>
                </UserProvider>
            </MemoryRouter>)
        
        await waitFor(() => {
            expect(getByText("Explore itineraries by tags")).toBeInTheDocument();
            expect(getByText("Foodie")).toBeInTheDocument();
            expect(getByText("Explorer")).toBeInTheDocument();
        });
    });

    test("matches snapshot", () => {
        const{asFragment} = render(
            <MemoryRouter >
                <UserProvider>
                    <TagList/>
                </UserProvider>
            </MemoryRouter>)
        expect(asFragment()).toMatchSnapshot();
    });
});