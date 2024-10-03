import React from 'react';
import { fireEvent, render, waitFor } from "@testing-library/react";
import { UserProvider } from "../test-common/testSetup";
import { MemoryRouter } from 'react-router-dom';
import WanderlystApi from '../utils/api';
import ItinDetails from './ItinDetails';
import { beforeEach, afterEach, vi, expect, describe, test  } from 'vitest';

// Mock the GoogleMap component
describe("ItinDetails component", () => {
    //mock toggleLike
    const mockToggleLike = vi.fn().mockResolvedValue(true);

    // mock google map component
    vi.mock('./GoogleMap', () => ({
        __esModule: true,
        default: () => <div data-testid="mock-google-map">Mock Google Map</div>
    }));

    // Mock the APIProvider to avoid using real API keys
    vi.mock('@vis.gl/react-google-maps', () => ({
        __esModule: true,
        APIProvider: ({ children }) => <div>{children}</div>
     }));

    beforeEach(() => {
        // mock api method getItin returning test data
        vi.spyOn(WanderlystApi, "getItin").mockResolvedValue({
            id: 1,
            username: "testuser",
            title: "test title",
            city: "test city",
            country: "test country",
            duration: "1",
            description: "test desc",
            createdAt: "2024-10-01",
            likes: 1,
            places: [
                    {
                     address: "test address",
                     description: "test place desc",
                     name: "test place",
                     seq: 1,
                    },
                 ],
            tags:  ["testTag"]
        });

        // mock api method deleteItin
        vi.spyOn(WanderlystApi, "deleteItin").mockResolvedValue("deleted");

    });
    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("renders without crashing", async () => {
       await waitFor(() => {render(
            <MemoryRouter initialEntries={['/itineraries/1']}>
                <UserProvider hasLikedItin={() => true}>
                    <ItinDetails/>
                </UserProvider>
            </MemoryRouter>)
        });
    });

    test("matches snapshot", async () => {
        const {getByText, asFragment, getByTestId} = render(
            <MemoryRouter initialEntries={['/itineraries/1']}>
                <UserProvider hasLikedItin={() => true}>
                    <ItinDetails/>
                </UserProvider>
            </MemoryRouter>);

        // wait and check that itinerary is displayed
        await waitFor(() => {
            expect(getByText("test title")).toBeInTheDocument();
            expect(getByTestId("mock-google-map")).toBeInTheDocument();
        });
        expect(asFragment()).toMatchSnapshot();
    });

    test("user can toggle like itinerary", async () => {
        const {getByText, container} = render(
            <MemoryRouter initialEntries={['/itineraries/1']}>
                <UserProvider hasLikedItin={() => false} toggleLike={mockToggleLike}>
                    <ItinDetails/>
                </UserProvider>
            </MemoryRouter>);

        // wait and check that itinerary is displayed
        await waitFor(() => {
            expect(getByText("test title")).toBeInTheDocument();
        });
        
        // click heart and checks that it shows as "liked"
        const likeBtn = container.querySelector(".bi-heart");
        fireEvent.click(likeBtn);
        expect(container.querySelector(".bi-heart-fill")).toBeInTheDocument;
    });

    test("user can delete itinerary", async () => {
        const {getByText, container} = render(
            <MemoryRouter initialEntries={['/itineraries/1']}>
                <UserProvider currUser = {{username: "testuser"}}
                              hasLikedItin={() => false} 
                              toggleLike={mockToggleLike}>
                    <ItinDetails/>
                </UserProvider>
            </MemoryRouter>);

        // wait and check that itinerary is displayed
        await waitFor(() => {
            expect(getByText("test city, test country")).toBeInTheDocument();
        });
        
        // click trash and checks that deleteItin was called
        const deleteBtn = container.querySelector(".bi-trash3-fill");
        fireEvent.click(deleteBtn);
        expect(WanderlystApi.deleteItin).toBeCalled();
    });
});
