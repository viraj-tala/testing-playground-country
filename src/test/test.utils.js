import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Add in any providers here if necessary:
// (ReduxProvider, ThemeProvider, etc)
const Providers = ({ children }) => {
  return children;

};

const customRender = (ui, options = {}) =>
  render(ui, { wrapper: Providers(MemoryRouter), ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };