import RequestReducer, { initialState } from "./index";
import actions, { RequestActions } from "./requestActions";

const TEST_URL = "test-url";
const TEST_URL1 = "test-url1";
const TEST_URL2 = "test-url2";

describe("Request-reducer", () => {
  let initState: typeof initialState;

  beforeEach(() => {
    initState = { requests: [] };
  });

  describe("startRequestAction", () => {
    beforeEach(() => {
      initState = { requests: [] };
    });
    test("normal request", () => {
      const request = { status: "loading" as RequestStatus, url: TEST_URL, error: null };
      expect(RequestReducer(initState, actions.startRequest({ url: TEST_URL }))).toStrictEqual({
        requests: [request],
      });
    });

    test("duplicated request", () => {
      const request = { status: "loading" as RequestStatus, url: TEST_URL, error: null };
      initState.requests.push(request);
      expect(RequestReducer(initState, actions.startRequest({ url: TEST_URL }))).toStrictEqual({
        requests: [request],
      });
    });

    test("multiple request", () => {
      const request = { status: "loading" as RequestStatus, url: TEST_URL, error: null };
      const request2 = { status: "loading" as RequestStatus, url: TEST_URL1, error: null };
      initState.requests.push(request);
      expect(RequestReducer(initState, actions.startRequest({ url: TEST_URL1 }))).toStrictEqual({
        requests: [request, request2],
      });
    });
  });

  describe("failRequestAction", () => {
    beforeEach(() => {
      initState = { requests: [] };
    });

    test("find not existing request", () => {
      expect(() => {
        RequestReducer(initState, actions.failRequest({ error: new Error("에러"), url: TEST_URL }));
      }).toThrowError("요청이 존재하지 않습니다");
    });

    test("normal fail", () => {
      initState.requests.push({ error: null, url: TEST_URL, status: "loading" });
      expect(
        RequestReducer(initState, actions.failRequest({ error: new Error("에러"), url: TEST_URL })),
      ).toStrictEqual({ requests: [{ url: TEST_URL, status: "failed", error: Error("에러") }] });
    });

    test("duplicated fail but different message", () => {
      initState.requests.push({ error: null, url: TEST_URL1, status: "loading" });
      initState.requests.push({ error: null, url: TEST_URL, status: "loading" });
      initState.requests.push({ error: new Error("에러"), url: TEST_URL, status: "failed" });
      expect(
        RequestReducer(
          initState,
          actions.failRequest({ error: new Error("다른 에러"), url: TEST_URL }),
        ),
      ).toStrictEqual({
        requests: [
          { error: null, url: TEST_URL1, status: "loading" },
          { error: new Error("다른 에러"), url: TEST_URL, status: "failed" },
          { error: new Error("에러"), url: TEST_URL, status: "failed" },
        ],
      });
    });

    test("multiple fail", () => {});
  });

  // finish request작성
});
