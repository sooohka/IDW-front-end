import worldCupThunks from "./worldCupThunks";
import reducer, { initialState } from "./index";
import gameExample from "../../assets/temp/gameExample.json";
import { redux } from "../../test-utils";

const STATE_NAME = "worldCupState";

describe("worldCupThunk", () => {
  let initState: typeof initialState;
  let makeThunk: any;

  const selectTargetForTest = (time: number) => {
    const notSelected = [];
    for (let i = 0; i < time; i += 1) {
      const [one, two] = initState.currentTargetIds as [number, number];
      initState = makeThunk(worldCupThunks.selectTarget({ targetId: one }));
      notSelected.push(two);
    }
    return notSelected;
  };
  beforeEach(() => {
    initState = JSON.parse(JSON.stringify(initialState));
    makeThunk = redux.useStore(STATE_NAME, initState, reducer).makeThunk;
  });

  describe("initializeWorldCup", () => {
    it("when api request successes", async () => {
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
    it("when api request fails", async () => {
      await expect(
        makeThunk(worldCupThunks.initializeWorldCup({ level: 16, worldCupId: 1 })),
      ).rejects.toThrowError();
      expect(initState).toStrictEqual(initialState);
    });
  });

  describe("selectTarget", () => {
    it("with normal behavior", async () => {
      initState = await makeThunk(worldCupThunks.initializeWorldCup({ level: 8, worldCupId: 1 }));
      const [one, two] = initState.currentTargetIds as [number, number];
      initState = makeThunk(worldCupThunks.selectTarget({ targetId: one }));

      expect(initState.currentTargetIds).not.toContain(one);
      expect(initState.currentTargetIds).not.toContain(two);
    });

    it("when selecting none existing target", async () => {
      initState = await makeThunk(worldCupThunks.initializeWorldCup({ level: 8, worldCupId: 1 }));
      const [one, two] = initState.currentTargetIds as [number, number];
      expect(() => {
        makeThunk(worldCupThunks.selectTarget({ targetId: initState.remainingTargetIds[2] }));
      }).toThrowError("선택된 타겟이 없습니다.");
    });

    it("when currentTargetIds's length is below 2(should throw error)", async () => {
      initState = await makeThunk(worldCupThunks.initializeWorldCup({ level: 8, worldCupId: 1 }));
      const [one, two] = initState.currentTargetIds as [number, number];
      initState.currentTargetIds.pop();
      expect(() => {
        makeThunk(worldCupThunks.selectTarget({ targetId: one }));
      }).toThrowError("현재 타겟들의 길이가 2 이하입니다");
    });

    it("8강에서 4강으로 간 상황", async () => {
      initState = await makeThunk(worldCupThunks.initializeWorldCup({ level: 8, worldCupId: 1 }));
      const notSelected = selectTargetForTest(4);
      expect(initState.level).toBe(4);
      expect(initState.remainingTargetIds).toHaveLength(4);
      notSelected.forEach((v) => expect(initState.remainingTargetIds).not.toContain(v));
      expect(initState.selectedTargetIds).toHaveLength(0);
      expect(initState.currentTargetIds).toHaveLength(2);
      const isCurrentTargetsFromRemainingTargets = initState.currentTargetIds.every((v) =>
        initState.remainingTargetIds.some((a) => a === v),
      );
      expect(isCurrentTargetsFromRemainingTargets).toBeTruthy();
    });

    it("when winner is set", async () => {
      initState = await makeThunk(worldCupThunks.initializeWorldCup({ level: 8, worldCupId: 1 }));
      const notSelected = selectTargetForTest(7);
      expect(notSelected).toHaveLength(7);
      expect(initState.selectedTargetIds[0]).toStrictEqual(initState.winnerId);
    });
  });
});
