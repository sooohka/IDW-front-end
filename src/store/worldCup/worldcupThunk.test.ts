import worldCupThunks from "./worldCupThunks";
import reducer, { initialState } from "./index";
import gameExample from "../../assets/temp/gameExample.json";
import { redux } from "../../test-utils";

const STATE_NAME = "worldCupState";

describe("worldCupThunk", () => {
  let initState: typeof initialState;
  let makeThunk: any;
  beforeEach(() => {
    initState = JSON.parse(JSON.stringify(initialState));
    makeThunk = redux.useStore(STATE_NAME, initState, reducer).makeThunk;
  });

  describe("initializeWorldCup", () => {
    test("with api request success", async () => {
      initState = await makeThunk(worldCupThunks.initializeWorldCup({ level: 8, worldCupId: 1 }));
      const state: typeof initialState = {
        level: 8,
        targets: gameExample.data.targets,
        title: gameExample.data.title,
        winnerId: null,
        selectedTargetIds: [],
        remainingTargetIds: gameExample.data.targets.map((target) => target.id),
        currentTargetIds: gameExample.data.targets.slice(0, 2).map((target) => target.id) as [
          number,
          number,
        ],
      };
      expect(initState).toStrictEqual(state);
    });
    test("with api request fail", async () => {
      await expect(
        makeThunk(worldCupThunks.initializeWorldCup({ level: 16, worldCupId: 1 })),
      ).rejects.toThrowError();
      expect(initState).toStrictEqual(initialState);
    });
  });

  describe("checkWorldCup", () => {
    test("", async () => {
      initState = await makeThunk(worldCupThunks.initializeWorldCup({ level: 8, worldCupId: 1 }));
      initState = makeThunk(worldCupThunks.finishCurrentLevel());
      expect(initState).toStrictEqual({});
    });
  });
});
