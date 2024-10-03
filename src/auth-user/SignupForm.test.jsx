import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { UserProvider } from "../test-common/testSetup";
import { MemoryRouter } from "react-router-dom";
import SignupForm from "./SignupForm";
import { beforeEach, expect, describe, test } from "vitest";

const mockSignup = vi.fn().mockResolvedValue({success: true});

describe("SignupForm Component", () => {
    beforeEach(()=> {
        mockSignup.mockClear();
    });

    test("renders without crashing: anon", () => {
        render(
        <MemoryRouter>
            <UserProvider currUser = {null}>
                <SignupForm signup={mockSignup} />
            </UserProvider>
        </MemoryRouter>)
    });
            
    
    test("matches snapshot", () => {
        const {asFragment} = render(
                            <MemoryRouter>
                                <UserProvider currUser = {null}>
                                    <SignupForm signup={mockSignup}/>
                                </UserProvider>
                            </MemoryRouter>)
        expect(asFragment()).toMatchSnapshot();
    });

    test("calls passed function with inputted values", async () => {
        const { getByRole, getByLabelText } = render(
            <MemoryRouter>
                <UserProvider currUser = {null}>
                    <SignupForm signup={mockSignup} />
                </UserProvider>
            </MemoryRouter>);
   
        // capture fields and login button
        const firstName = getByLabelText("First Name");
        const lastName = getByLabelText("Last Name");
        const email = getByLabelText("Email");
        const username = getByLabelText("Username");
        const password = getByLabelText("Password");
        const btn = getByRole("button");

        // fill in fields and submit
        fireEvent.change(firstName, {target: {value: 'testfirst'}});
        fireEvent.change(lastName, {target: {value: 'testlast'}});
        fireEvent.change(email, {target: {value: 'test@email.com'}});
        fireEvent.change(username, {target: {value: 'testuser'}});
        fireEvent.change(password, {target: {value: 'password'}});
        fireEvent.click(btn);
        
        await waitFor(() => expect(mockSignup).toHaveBeenCalled());
        await waitFor(() => expect(mockSignup).toHaveBeenCalledWith({
          firstName: 'testfirst',
          lastName: 'testlast',
          email: 'test@email.com',
          username: 'testuser',
          password: 'password'
        }));

    });
})