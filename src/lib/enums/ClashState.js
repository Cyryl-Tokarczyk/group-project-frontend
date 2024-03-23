import { Enumify } from "enumify";

export class ClashState extends Enumify {
  static MyAction = new ClashState()
  static OpponentReaction = new ClashState()
  static OpponentAction = new ClashState()
  static MyReaction = new ClashState()
  static _ = this.closeEnum();
}

export function nextState(state) {
  switch (state) {
    case ClashState.MyAction:
      return ClashState.OpponentReaction
    case ClashState.OpponentReaction:
      return ClashState.OpponentAction
    case ClashState.OpponentAction:
      return ClashState.MyReaction
    case ClashState.MyReaction:
      return ClashState.MyAction
    default:
      throw new Error('ClashState not handled')
  }
}

export function getAppropriateActionState(firstPlayer, userPlayerType) {
  if (firstPlayer == userPlayerType) {
    return ClashState.MyAction
  } else {
    return ClashState.OpponentAction
  }
}