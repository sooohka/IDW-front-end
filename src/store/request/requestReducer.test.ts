import reducer, { initialState } from "./index";
import actions from "./requestActions";

const TEST_URL = "test-url";
const TEST_URL1 = "test-url1";

describe("Request-reducer", () => {
  let initState: typeof initialState;

  beforeEach(() => {
    initState = { requests: [] };
  });

  describe("startRequestAction", () => {
    it("with normal request", () => {
      initState = reducer(initState, actions.startRequest({ url: TEST_URL }));
      expect(initState).toStrictEqual({
        requests: [{ status: "loading", url: TEST_URL, error: null }],
      });
    });

    it("with duplicated request", () => {
      initState = reducer(initState, actions.startRequest({ url: TEST_URL }));
      expect(() => {
        reducer(initState, actions.startRequest({ url: TEST_URL }));
      }).toThrowError("중복된 요청입니다");
      expect(initState).toStrictEqual({
        requests: [{ status: "loading", url: TEST_URL, error: null }],
      });
    });

    it("with multiple request", () => {
      initState = reducer(initState, actions.startRequest({ url: TEST_URL }));
      initState = reducer(initState, actions.startRequest({ url: TEST_URL1 }));
      expect(initState).toStrictEqual({
        requests: [
          { status: "loading" as RequestStatus, url: TEST_URL, error: null },
          { status: "loading" as RequestStatus, url: TEST_URL1, error: null },
        ],
      });
    });
  });

  describe("failRequestAction", () => {
    it("with none existing request", () => {
      expect(() => {
        reducer(initState, actions.failRequest({ error: new Error("에러"), url: TEST_URL }));
      }).toThrowError("요청이 존재하지 않습니다");
    });

    it("with normal fail", () => {
      initState = reducer(initState, actions.startRequest({ url: TEST_URL }));
      initState = reducer(initState, actions.failRequest({ error: Error("에러"), url: TEST_URL }));
      expect(initState).toStrictEqual({
        requests: [{ url: TEST_URL, status: "failed", error: Error("에러") }],
      });
    });

    it("with multiple fail", () => {
      initState = reducer(initState, actions.startRequest({ url: TEST_URL }));
      initState = reducer(initState, actions.startRequest({ url: TEST_URL1 }));
      initState = reducer(initState, actions.failRequest({ url: TEST_URL, error: Error("Err") }));
      initState = reducer(initState, actions.failRequest({ url: TEST_URL1, error: Error("Err1") }));
      expect(initState).toStrictEqual({
        requests: [
          { error: Error("Err"), url: TEST_URL, status: "failed" },
          { error: Error("Err1"), url: TEST_URL1, status: "failed" },
        ],
      });
    });
  });

  // finish request작성
  describe("endRequestAction", () => {
    it("with normal end", () => {
      initState = reducer(initState, actions.startRequest({ url: TEST_URL }));
      initState = reducer(initState, actions.endRequest({ url: TEST_URL }));
      expect(initState).toStrictEqual({
        requests: [],
      });
    });

    it("with none existing end", () => {
      initState = reducer(initState, actions.startRequest({ url: TEST_URL }));
      expect(() => {
        reducer(initState, actions.endRequest({ url: TEST_URL1 }));
      }).toThrowError("요청이 존재하지 않습니다");
      expect(initState).toStrictEqual({
        requests: [{ url: TEST_URL, status: "loading", error: null }],
      });
    });

    test("with multiple end", () => {
      initState = reducer(initState, actions.startRequest({ url: TEST_URL }));
      initState = reducer(initState, actions.startRequest({ url: TEST_URL1 }));
      initState = reducer(initState, actions.endRequest({ url: TEST_URL }));
      initState = reducer(initState, actions.endRequest({ url: TEST_URL1 }));
      expect(initState).toStrictEqual({
        requests: [],
      });
    });
  });
});
