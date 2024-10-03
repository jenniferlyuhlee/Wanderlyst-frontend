import React from "react";
import { render } from "@testing-library/react";
import { UserProvider } from "../test-common/testSetup";
import { MemoryRouter} from "react-router-dom";
import RouteList from "./RouteList";
import { beforeEach, afterEach, expect, describe, test, vi} from "vitest";

describe("RouteList component", () => {
    const mockSignup = vi.fn();
    const mockLogin = vi.fn();

    // mock random func in link randomizer for consistent snapshot tests
    beforeEach(() => {
        vi.mock("../helpers/random", () => ({
            __esModule: true,
            default: vi.fn(() => "Foodie"),
        }));
    });

    // restore mocks
    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("renders as without crashing", () => {
        render(
            <MemoryRouter>
                <UserProvider>
                    <RouteList login={mockLogin} signup = {mockSignup}/>
                </UserProvider>
            </MemoryRouter>)
    });

    test("matches snapshot", () => {
        const {asFragment} = render(
            <MemoryRouter>
                <UserProvider>
                    <RouteList login={mockLogin} signup = {mockSignup}/>
                </UserProvider>
            </MemoryRouter>)
        expect(asFragment()).toMatchSnapshot();
    });
});