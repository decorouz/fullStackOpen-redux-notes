import noteService from '../services/notes'

const noteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      return [...state, action.data]
    case 'INIT_NOTES':
      return action.data
    case 'TOGGLE_IMPORTANCE':
      const id = action.data.id

      // const noteToChange = state.find((n) => n.id === id)

      return state.map((note) =>
        note.id !== id
          ? note
          : {
              ...note,
              important: !note.important,
            }
      )
    default:
      return state
  }
}

// export const initializeNotes = (notes) => {
//   return {
//     type: 'INIT_NOTES',
//     data: notes,
//   }
// }

export const initializeNotes = () => {
  return async (dispatch) => {
    const notes = await noteService.getAll()
    dispatch({
      type: 'INIT_NOTES',
      data: notes,
    })
  }
}

// export const createNote = (data) => {
//   return {
//     type: 'NEW_NOTE',
//     data,
//   }
// }

export const createNote = (content) => {
  return async (dispatch) => {
    const newNote = await noteService.createNew(content)
    dispatch({
      type: 'NEW_NOTE',
      data: newNote,
    })
  }
}

// export const toggleImportanceOf = (id) => {
//   return {
//     type: 'TOGGLE_IMPORTANCE',
//     data: { id },
//   }
// }

export const toggleImportanceOf = (toggledNote) => {
  return async (dispatch) => {
    const newNote = await noteService.updateToggle(toggledNote)
    dispatch({
      type: 'TOGGLE_IMPORTANCE',
      data: newNote,
    })
  }
}

export default noteReducer
