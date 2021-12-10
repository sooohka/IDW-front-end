import reducer, { initialState } from "../index";
import worldCupActions from "../worldCupActions";
import dummy from "../../../assets/temp/gameExample.json";

const { finishCurrentLevel, initialize, reset, selectTarget } = worldCupActions;
describe("worldCupActions", () => {
  let initState: typeof initialState;
  let dummyTargets: Target[];
  beforeEach(() => {
    initState = JSON.parse(JSON.stringify(initialState));
    dummyTargets = dummy.data.targets.slice(0, 8);
  });

  describe("initialize", () => {
    it("when level is odd and under 2", () => {
      expect(() => {
        initState = reducer(initState, initialize({ level: 11, targets: [], title: "hi" }));
      }).toThrowError("level은 짝수, 2이상이여야 합니다");

      expect(() => {
        initState = reducer(initState, initialize({ level: 8, targets: [], title: "hi" }));
      }).toThrowError("level과 타겟들의 길이는 같아야 합니다");
    });
    it("when level is 8 and target's length is 8", () => {
      initState = reducer(initState, initialize({ level: 8, targets: dummyTargets, title: "hi" }));
      expect(initState.targets).toHaveLength(8);
      expect(initState.remainingTargetIds).toHaveLength(8);
      expect(initState.title).toBe("hi");
      expect(initState.targets).toBe(dummyTargets);
    });
  });
  describe("reset", () => {
    it("reset", () => {
      initState.title = "123";
      initState = reducer(initState, reset());
      expect(initState).toBe(initialState);
    });
  });

  describe("finishCurrentLevel", () => {
    it("when remainingTarget remains", () => {
      initState = reducer(initState, initialize({ level: 8, targets: dummyTargets, title: "ki" }));
      expect(() => {
        initState = reducer(initState, finishCurrentLevel());
      }).toThrowError("remainingTarget이 남아있습니다");
    });
    it("when remainingTarget's length is zero(normal behavior)", () => {
      initState = reducer(initState, initialize({ level: 8, targets: dummyTargets, title: "ki" }));
      initState.remainingTargetIds = [];
      initState.selectedTargetIds = [1, 2, 3, 4];
      initState.currentTargetIds = [];
      initState = reducer(initState, finishCurrentLevel());
      expect(initState.level).toBe(4);
      expect(initState.remainingTargetIds).toHaveLength(4);
      expect(initState.selectedTargetIds).toHaveLength(0);
      expect(initState.currentTargetIds).toHaveLength(2);
    });
  });

  describe("selectTarget", () => {
    it("when select target id of 1", () => {
      initState = { ...initState, currentTargetIds: [1, 2] };
      initState = reducer(initState, selectTarget({ selectedTargetId: 1 }));
      initState.remainingTargetIds.forEach((v) => {
        expect(v).not.toBe(1);
        expect(v).not.toBe(2);
      });
      expect(initState.selectedTargetIds[0]).toBe(1);
    });
    it("when selecting none existing target id", () => {
      initState = { ...initState, currentTargetIds: [1, 2] };
      expect(() => {
        initState = reducer(initState, selectTarget({ selectedTargetId: 3 }));
      }).toThrowError("선택된 타겟이 없습니다");
    });
  });
});
