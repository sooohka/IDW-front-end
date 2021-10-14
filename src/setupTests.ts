// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import server from "./mocks/server";

beforeAll(() => server.listen());
beforeEach(() => {
  class MockedIntersectionObserver {
    observe() {
      return null;
    }

    disconnect() {
      return null;
    }
  }

  global.console = { ...global.console, log: () => {} };
  global.IntersectionObserver = MockedIntersectionObserver;
  server.resetHandlers();
});
afterAll(() => server.close());
