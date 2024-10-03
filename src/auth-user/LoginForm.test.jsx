import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { UserProvider } from "../test-common/testSetup";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "./LoginForm";
import { beforeEach, afterEach, expect, describe, test, vi } from "vitest";

const mockLogin = vi.fn().mockResolvedValue({success: true});

describe("LoginForm Component", () => {
    beforeEach(()=> {
        mockLogin.mockClear();
    });

    test("renders without crashing: anon", () => {
        render(
        <MemoryRouter>
            <UserProvider currUser = {null}>
                <LoginForm login={mockLogin} />
            </UserProvider>
        </MemoryRouter>)
    });
            
    
    test("matches snapshot", () => {
        const {asFragment} = render(
                            <MemoryRouter>
                                <UserProvider currUser = {null}>
                                    <LoginForm login={mockLogin}/>
                                </UserProvider>
                            </MemoryRouter>)
        expect(asFragment()).toMatchSnapshot();
    });

    test("calls passed function with inputted values", async () => {
        const { getByRole, getByLabelText } = render(
            <MemoryRouter>
                <UserProvider currUser = {null}>
                    <LoginForm login={mockLogin} />
                </UserProvider>
            </MemoryRouter>);
       
        // capture fields and login button
        const username = getByLabelText("Username");
        const password = getByLabelText("Password");
        const btn = getByRole("button");

        // fill in fields and submit
        fireEvent.change(username, {target: {value: 'testuser'}});
        fireEvent.change(password, {target: {value: 'password'}});
        fireEvent.click(btn);
        
        await waitFor(() => expect(mockLogin).toHaveBeenCalled());
        await waitFor(() => expect(mockLogin).toHaveBeenCalledWith({
          username: 'testuser',
          password: 'password'
        }));

    });
})
