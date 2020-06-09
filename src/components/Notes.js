import React from 'react'
// import noteService from '../services/notes'
import { toggleImportanceOf } from '../reducers/noteReducer'
import { useSelector, useDispatch } from 'react-redux'

const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content}
      <strong>{note.important ? ' important' : ''}</strong>
    </li>
  )
}

const Notes = () => {
  const dispatch = useDispatch()

  const notes = useSelector(({ filter, notes }) => {
    if (filter === 'ALL') {
      return notes
    }
    return filter === 'IMPORTANT'
      ? notes.filter((note) => note.important)
      : notes.filter((note) => !note.important)
  })

  const handleToggleImportance = (id) => {
    const note = notes.find((n) => n.id === id)
    const toggledNote = { ...note, important: !note.important }
    // const newNote = await noteService.update(id, toggledNote)

    dispatch(toggleImportanceOf(id, toggledNote))
  }

  return (
    <ul>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          handleClick={() => handleToggleImportance(note.id)}
        />
      ))}
    </ul>
  )
}

export default Notes
