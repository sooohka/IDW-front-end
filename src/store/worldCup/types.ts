export type CurrentTargetIds = [number, number];
export interface WorldCupReducer {
  title: string;
  targets: Target[];
  remainingTargetIds: number[];
  currentTargetIds: CurrentTargetIds | [];
  selectedTargetIds: number[];
  level: number; // 2의 배수
  winnerId: number | null;
}
