import React from 'react';
import {render} from "@testing-library/react"
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import {expect, describe, test } from "vitest";

describe("App component", () => {
    test('renders without crashing', function() {
        render(<MemoryRouter>
                  <App />
              </MemoryRouter>)
    });

    test('matches snapshot ', function() {
        const {asFragment} = render(
            <MemoryRouter>
              <App />
            </MemoryRouter>
        );
        expect(asFragment()).toMatchSnapshot();
    });
        
});
