import React from "react";
import { render } from "@testing-library/react";
import { UserProvider } from "../test-common/testSetup";
import { MemoryRouter} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import UserProfile from "../auth-user/UserProfile";
import { expect, describe, test, vi} from "vitest";

describe("ProtectedRoute component", () => {
    test("renders without crashing", () => {
        render(
            <MemoryRouter>
                <UserProvider>
                    <ProtectedRoute />
                </UserProvider>
            </MemoryRouter>)
    });
    test("matches snapshot", () => {
        const {asFragment} = render(
            <MemoryRouter>
                <UserProvider>
                    <ProtectedRoute/>
                </UserProvider>
            </MemoryRouter>)
        expect(asFragment()).toMatchSnapshot();
    });
});