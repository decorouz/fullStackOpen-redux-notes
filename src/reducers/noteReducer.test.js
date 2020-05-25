import noteReducer from './noteReducer'
import deepFreeze from 'deep-freeze'

describe('noteReducer', () => {
  test('returns new state with action NEW_NOTE', () => {
    const state = []
    const action = {
      type: 'NEW_NOTE',
      data: {
        content: 'this app is in the redux store',
        important: true,
        id: 1,
      },
    }

    deepFreeze(state)
    const newState = noteReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(action.data)
  })

  test('return new state with action TOGGLE_IMPORTANCE', () => {
    const state = [
      {
        content: 'this app is in the redux store',
        important: false,
        id: 1,
      },
      {
        content: 'state changes are made with action',
        important: true,
        id: 2,
      },
    ]

    const action = {
      type: 'TOGGLE_IMPORTANCE',
      data: {
        id: 1,
      },
    }

    deepFreeze(state)
    const newState = noteReducer(state, action)

    expect(newState).toHaveLength(2)
    expect(newState).toContainEqual(state[1])

    expect(newState).toContainEqual({
      content: 'this app is in the redux store',
      important: true,
      id: 1,
    })
  })
})
