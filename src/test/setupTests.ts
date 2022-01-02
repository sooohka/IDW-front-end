// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import server from "./mocks/server";

beforeAll(() => {
  server.listen();
  process.env = Object.assign(process.env, {
    REACT_APP_AWS_ACCESS_KEY: "AKIAVOARF6UC6LLQAD5P",
    REACT_APP_AWS_SECRET_KEY: "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",
    REACT_APP_AWS_BUCKET_NAME: "idw-images",
    REACT_APP_AWS_BUCKET_REGION: "ap-northeast-2",
    REACT_APP_AWS_BUCKET_URL: "https://idw-images.s3.ap-northeast-2.amazonaws.com",
    REACT_APP_SERVER_URL: "http://13.125.23.168:8080",
    REACT_APP_AWS_GATEWAY_URL: "https://dogemdas2c.execute-api.ap-northeast-2.amazonaws.com/v1",
    REACT_APP_CLOUDINARY_URL: "https://api.cloudinary.com/v1_1/demo/image/upload",
    REACT_APP_CLOUDINARY_UPLOAD_PRESET: "docs_upload_example_us_preset",
  });
});
beforeEach(() => {
  // class MockedIntersectionObserver {
  //   observe() {
  //     return null;
  //   }

  //   disconnect() {
  //     return null;
  //   }
  // }
  // // global.IntersectionObserver = MockedIntersectionObserver;
<<<<<<< HEAD

=======
>>>>>>> 92c4729 (chore: cra에서 webpack으로 이전)
  global.console = { ...global.console, debug: () => {} };
  Element.prototype.scrollIntoView = jest.fn();
  server.resetHandlers();
});
afterAll(() => server.close());
