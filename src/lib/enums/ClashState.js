import { Enumify } from "enumify";

export class ClashState extends Enumify {
  static TeacherAction = new ClashState()
  static StudentReaction = new ClashState()
  static StudentAction = new ClashState()
  static TeacherReaction = new ClashState()
}

export function nextState(state) {
  switch (state) {
    case ClashState.TeacherAction:
      return ClashState.StudentReaction
    case ClashState.StudentReaction:
      return ClashState.StudentAction
    case ClashState.StudentAction:
      return ClashState.TeacherReaction
    case ClashState.TeacherReaction:
      return ClashState.TeacherAction
    default:
      throw new Error('ClashState not handled')
  }
}

export function getAppropriateActionState(player) {
  switch (player) {
    case 'student':
      return ClashState.StudentAction
    case 'teacher':
      return ClashState.TeacherAction
    default:
      throw new Error('Incorrect player type given: ' + player)
  }                     
}