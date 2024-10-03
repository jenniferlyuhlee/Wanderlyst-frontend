import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { UserProvider } from "../test-common/testSetup";
import { MemoryRouter} from "react-router-dom";
import ItinCard from "./ItinCard";
import { expect, describe, test} from "vitest";

const testItin = {
    id: 1,
    username: "testUser",
    title: "testItin",
    city: "testCity",
    country: "testCountry",
    duration: 1, 
    description: "Itin for testing."
}


describe("ItinCard component", () => {
    let mockHasLikedItin;
    let mockToggleLike;
  
    // Mocking the hasLikedItin and toggleLike methods
    beforeEach(() => {
      mockHasLikedItin = vi.fn().mockReturnValue(false);
      mockToggleLike = vi.fn();
    });

    test("renders without crashing", () => {
        render(
            <MemoryRouter>
                <UserProvider hasLikedItin={mockHasLikedItin} 
                              toggleLike={mockToggleLike}>
                    <ItinCard itinerary={testItin}/>
                </UserProvider>
            </MemoryRouter>)
    });

    test("matches snapshot", () => {
        const {asFragment} = render(
            <MemoryRouter>
                <UserProvider hasLikedItin={mockHasLikedItin} 
                            toggleLike={mockToggleLike}>
                    <ItinCard itinerary={testItin}/>
                </UserProvider>
            </MemoryRouter>)

        expect(asFragment()).toMatchSnapshot();
    });

    test("toggleLike is called when heart clicked", async () => {
        const {container} = render(
            <MemoryRouter>
                <UserProvider hasLikedItin={mockHasLikedItin} 
                            toggleLike={mockToggleLike}>
                    <ItinCard itinerary={testItin}/>
                </UserProvider>
            </MemoryRouter>)

        // "like" itinerary
        const likeBtn = container.querySelector(".bi-heart");
        fireEvent.click(likeBtn);

        // check that toggleLike is called when clicked
        await waitFor(() => expect(mockToggleLike).toHaveBeenCalled());
        // check that liked heart displays
        expect(container.querySelector(".bi-heart-fill")).toBeInTheDocument();
    });
});