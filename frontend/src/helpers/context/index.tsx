import React, { useReducer, Reducer, Dispatch } from 'react'

export interface IDispatchArguments {
  type: Actions
  payload?: any
}

export enum ModalName {
  none = 'none',
  createNewPersonModal = 'createNewPersonModal'
}

export enum Actions {
  toggleProgressIndicator = 'TOGGLE_PROGRESS_INDICATOR',
  updateCurrentModal = 'UPDATE_CURRENT_MODAL'
}

export interface State {
  isProgressIndicatorVisible: boolean
  currentModal: ModalName
}

const initialState: State = {
  isProgressIndicatorVisible: false,
  currentModal: ModalName.none
}

const reducer: Reducer<State, IDispatchArguments> = (
  state: State = initialState,
  action: IDispatchArguments
): State => {
  switch (action.type) {
    case Actions.toggleProgressIndicator:
      return {
        ...state,
        isProgressIndicatorVisible: !state.isProgressIndicatorVisible
      }
    case Actions.updateCurrentModal:
      return {
        ...state,
        currentModal: action.payload
      }
    default:
      return state
  }
}

export const Context = React.createContext<[State, Dispatch<IDispatchArguments>]>([
  initialState,
  (action: IDispatchArguments) => reducer(initialState, action)
])

export const ContextProvider = ({ children }: { children: React.ReactChild }): JSX.Element => (
  <Context.Provider value={useReducer(reducer, initialState)}>{children}</Context.Provider>
)

export const toggleProgressIndicator = (dispatch: React.Dispatch<IDispatchArguments>): void => {
  dispatch({ type: Actions.toggleProgressIndicator })
}

export const openModal = (dispatch: React.Dispatch<IDispatchArguments>, modalName: ModalName): void => {
  dispatch({ type: Actions.updateCurrentModal, payload: modalName })
}

export const closeModal = (dispatch: React.Dispatch<IDispatchArguments>): void => {
  dispatch({ type: Actions.updateCurrentModal, payload: ModalName.none })
}
