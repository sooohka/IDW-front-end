import reducer, { initialState } from "../index";
import worldCupActions from "../worldCupActions";
import dummy from "../../../assets/temp/gameExample.json";
import { CurrentTargetIds } from "../types";

const { finishCurrentLevel, initializeWorldCup, setCurrentTargetIds, reset, selectTarget } =
  worldCupActions;

describe("worldCupActions", () => {
  let state: typeof initialState;
  let dummyTargets: Target[];
  let initializedState: typeof initialState;

  beforeEach(() => {
    dummyTargets = dummy.data.targets.slice(0, 8);
  });

  describe("initialize", () => {
    beforeEach(() => {
      state = JSON.parse(JSON.stringify(initialState));
    });

    it("when level is odd and under 2", () => {
      expect(() => {
        state = reducer(state, initializeWorldCup({ level: 11, targets: [], title: "hi" }));
      }).toThrowError("level은 짝수, 2이상이여야 합니다");

      expect(() => {
        state = reducer(state, initializeWorldCup({ level: 8, targets: [], title: "hi" }));
      }).toThrowError("level과 타겟들의 길이는 같아야 합니다");
    });

    it("when level is 8 and target's length is 8", () => {
      state = reducer(state, initializeWorldCup({ level: 8, targets: dummyTargets, title: "hi" }));

      expect(state.targets).toHaveLength(8);
      expect(state.remainingTargetIds).toHaveLength(8);
      expect(state.title).toBe("hi");
      expect(state.targets).toBe(dummyTargets);
    });
  });

  describe("reset", () => {
    beforeEach(() => {
      state = JSON.parse(
        JSON.stringify({
          level: 8,
          targets: dummy.data.targets,
          title: dummy.data.title,
          winnerId: null,
          selectedTargetIds: [],
          remainingTargetIds: dummy.data.targets.map((target) => target.id),
          currentTargetIds: dummy.data.targets.slice(0, 2).map((target) => target.id) as [
            number,
            number,
          ],
        }),
      );
    });

    it("reset", () => {
      state = reducer(state, reset());
      expect(state).toBe(initialState);
    });
  });

  describe("finishCurrentLevel", () => {
    beforeEach(() => {
      state = JSON.parse(
        JSON.stringify({
          level: 8,
          targets: dummy.data.targets,
          title: dummy.data.title,
          winnerId: null,
          selectedTargetIds: [],
          remainingTargetIds: dummy.data.targets.map((target) => target.id),
          currentTargetIds: dummy.data.targets.slice(0, 2).map((target) => target.id) as [
            number,
            number,
          ],
        }),
      );
    });

    it("when remainingTarget remains", () => {
      expect(() => {
        state = reducer(state, finishCurrentLevel());
      }).toThrowError("remainingTarget이 남아있습니다");
    });

    // FIXME: not good Test
    it("when remainingTarget's length is zero(normal behavior)", () => {
      for (let i = 0; i < 4; i += 1) {
        const [one, two] = state.currentTargetIds as CurrentTargetIds;
        state = reducer(state, selectTarget({ targetId: one }));
        if (i !== 3) state = reducer(state, setCurrentTargetIds());
      }

      state = reducer(state, finishCurrentLevel());

      expect(state.level).toBe(4);
      expect(state.remainingTargetIds).toHaveLength(4);
      expect(state.selectedTargetIds).toHaveLength(0);
      expect(state.currentTargetIds).toHaveLength(2);
    });
  });

  describe("selectTarget", () => {
    beforeEach(() => {
      initializedState = JSON.parse(
        JSON.stringify({
          level: 8,
          targets: dummy.data.targets,
          title: dummy.data.title,
          winnerId: null,
          selectedTargetIds: [],
          remainingTargetIds: dummy.data.targets.map((target) => target.id),
          currentTargetIds: dummy.data.targets.slice(0, 2).map((target) => target.id) as [
            number,
            number,
          ],
        }),
      );
      state = initializedState;
    });

    it("when select target id of cur", () => {
      const [one, two] = state.currentTargetIds as CurrentTargetIds;
      state = reducer(state, selectTarget({ targetId: one }));

      state.remainingTargetIds.forEach((v) => {
        expect(v).not.toBe(one);
        expect(v).not.toBe(two);
      });
      expect(state.selectedTargetIds[0]).toBe(one);
    });

    it("when selecting none existing target id", () => {
      const [one, two] = state.currentTargetIds;
      const nonExistingTargetId = state.remainingTargetIds.find((id) => id !== one && id !== two)!;
      expect(() => {
        state = reducer(state, selectTarget({ targetId: nonExistingTargetId }));
      }).toThrowError("선택된 타겟이 없습니다");
    });
  });
});
