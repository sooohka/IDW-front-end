import { getType } from "typesafe-actions";
import actions, { RequestActions } from "./requestActions";

interface Request {
  status: RequestStatus;
  url: string;
  error: Error | null;
}
interface RequestReducer {
  requests: Request[];
}

export const initialState: RequestReducer = {
  requests: [],
};

const requestReducer = (state = initialState, action: RequestActions): RequestReducer => {
  switch (action.type) {
    case getType(actions.startRequest): {
      const { url } = action.payload;
      const newRequest: Request = { url, status: "loading", error: null };
      const existingRequest = state.requests.find((req) => req.url === url);
      if (existingRequest?.url === url) throw new Error("중복된 요청입니다");
      if (existingRequest) {
        return {
          ...state,
          requests: state.requests.map((req) => (req.url === url ? newRequest : req)),
        };
      }
      return { ...state, requests: [...state.requests, newRequest] };
    }
    case getType(actions.endRequest): {
      const { url } = action.payload;
      const existingRequest = state.requests.find((req) => req.url === url);
      if (!existingRequest) throw new Error("요청이 존재하지 않습니다");
      const filteredRequests = state.requests.filter((req) => req.url !== url);
      return { ...state, requests: filteredRequests };
    }

    case getType(actions.failRequest): {
      const { url, error } = action.payload;
      const requestExists = state.requests.find((req) => req.url === url);
      if (!requestExists) throw new Error("요청이 존재하지 않습니다");
      const errorRequest: Request = { url, status: "failed", error };
      const requests = state.requests.map((req) =>
        req.url === url && req.status === "loading" ? errorRequest : req,
      );
      return { ...state, requests };
    }
    default: {
      return state;
    }
  }
};

export default requestReducer;
