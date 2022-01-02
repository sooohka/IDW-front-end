import gameExample from "../../../assets/temp/gameExample.json";
import { redux } from "../../../test/test-utils";
import reducer, { initialState } from "../index";
import { CurrentTargetIds } from "../types";
import worldCupThunks from "../worldCupThunks";

const STATE_NAME = "worldCupState";

describe("worldCupThunk", () => {
  let initState: typeof initialState;
  let initStateAfterFetch: typeof initialState;
  let state: typeof initState;
  let makeThunk: any;

  beforeEach(() => {
    initState = JSON.parse(JSON.stringify(initialState));
    initStateAfterFetch = JSON.parse(
      JSON.stringify({
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
      }),
    );
  });

  describe("initializeWorldCup", () => {
    beforeEach(() => {
      makeThunk = redux.useStore(STATE_NAME, initState, reducer).makeThunk;
    });
    it("when api request successes", async () => {
      state = await makeThunk(worldCupThunks.initializeWorldCup({ level: 8, worldCupId: 1 }));
      expect(state).toStrictEqual(initStateAfterFetch);
    });
    it("when api request fails", async () => {
      expect(async () => {
        state = await makeThunk(worldCupThunks.initializeWorldCup({ level: 16, worldCupId: 1 }));
      }).rejects.toThrowError();
    });
  });

  describe("selectTarget", () => {
    beforeEach(() => {
      state = initStateAfterFetch;
      makeThunk = redux.useStore(STATE_NAME, state, reducer).makeThunk;
    });

    it("with normal behavior", async () => {
      const [one, two] = state.currentTargetIds as [number, number];
      state = makeThunk(worldCupThunks.selectTarget({ targetId: one }));
      expect(state.selectedTargetIds).toContain(one);
      expect(state.currentTargetIds).not.toContain(one);
      expect(state.currentTargetIds).not.toContain(two);
    });

    it("when selecting none existing target", async () => {
      const [one, two] = state.currentTargetIds as [number, number];
      const nonExistingTarget = state.remainingTargetIds.find((v) => v !== one && v !== two)!;

      expect(() => {
        makeThunk(worldCupThunks.selectTarget({ targetId: nonExistingTarget }));
      }).toThrowError("선택된 타겟이 없습니다.");
    });

    it("when currentTargetIds's length is below 2(should throw error)", async () => {
      const [one, two] = state.currentTargetIds as [number, number];
      // TODO: good not fix it later
      state.currentTargetIds.pop();

      expect(() => {
        makeThunk(worldCupThunks.selectTarget({ targetId: one }));
      }).toThrowError("현재 타겟들의 길이가 2 이하입니다");
    });

    it("8강에서 4강으로 간 상황", async () => {
      const notSelected = [];
      for (let i = 0; i < 4; i += 1) {
        const [one, two] = state.currentTargetIds as CurrentTargetIds;
        state = makeThunk(worldCupThunks.selectTarget({ targetId: one }));
        notSelected.push(two);
      }
      notSelected.forEach((v) => expect(state.remainingTargetIds).not.toContain(v));
      const isCurrentTargetsFromRemainingTargets = state.currentTargetIds.every((v) =>
        state.remainingTargetIds.some((a) => a === v),
      );

      expect(state.level).toBe(4);
      expect(state.remainingTargetIds).toHaveLength(4);
      expect(state.selectedTargetIds).toHaveLength(0);
      expect(state.currentTargetIds).toHaveLength(2);
      expect(isCurrentTargetsFromRemainingTargets).toBeTruthy();
    });

    it("when winner is set", async () => {
      const notSelected = [];
      for (let i = 0; i < 7; i += 1) {
        const [one, two] = state.currentTargetIds as CurrentTargetIds;
        state = makeThunk(worldCupThunks.selectTarget({ targetId: one }));
        notSelected.push(two);
      }

      expect(notSelected).toHaveLength(7);
      expect(state.selectedTargetIds[0]).toStrictEqual(state.winnerId);
    });
  });
});
