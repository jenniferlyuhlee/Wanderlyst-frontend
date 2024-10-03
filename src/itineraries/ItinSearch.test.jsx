import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { UserProvider } from "../test-common/testSetup";
import { MemoryRouter} from "react-router-dom";
import WanderlystApi from "../utils/api";
import ItinSearch from "./ItinSearch";
import { expect, describe, test} from "vitest";

describe("ItinSearch component", () => {
    // Mock the API methods before running tests
    beforeEach(() => {
        vi.spyOn(WanderlystApi, "getAllItins").mockResolvedValue([
            {
                id: 1,
                username: "testUser",
                title: "testItin1",
                city: "testCity1",
                country: "testCountry1",
                duration: 1, 
                description: "Itin for testing 1."
            },
            {
                id: 2,
                username: "testUser",
                title: "testItin2",
                city: "testCity2",
                country: "testCountry2",
                duration: 1, 
                description: "Itin for testing 2."
            }
        ]);
    });

    // Restore mocks after tests
    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("renders without crashing", () => {
        render(
            <MemoryRouter>
                <UserProvider>
                    <ItinSearch/>
                </UserProvider>
            </MemoryRouter>)
    });

    test("matches snapshot", () => {
        const {asFragment} = render(
            <MemoryRouter>
                <UserProvider>
                    <ItinSearch />
                </UserProvider>
            </MemoryRouter>)
        expect(asFragment()).toMatchSnapshot();
    });

    test("renders itineraries as expected", async () => {
        // mocking functions related to ItinCard
        const mockHasLikedItin = vi.fn().mockReturnValue(false);
        const mockToggleLike = vi.fn();

        const {getByText, asFragment} = render(
            <MemoryRouter>
                <UserProvider hasLikedItin={mockHasLikedItin} toggleLike={mockToggleLike}>
                    <ItinSearch />
                </UserProvider>
            </MemoryRouter>)

        // click search to get itineraries
        fireEvent.click(getByText("Search"));
        
        //check that itineraries display after search
        const itinerary1 = await waitFor(() => getByText("testItin1"));
        const itinerary2 = await waitFor(() => getByText("testItin2"));
  
        expect(itinerary1).toBeInTheDocument();
        expect(itinerary2).toBeInTheDocument();

    })
});