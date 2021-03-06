import test from 'ava'
import searchFromNotes from 'browser/lib/search'
import { dummyNote } from '../fixtures/TestDummy'
import _ from 'lodash'

const pickContents = (notes) => notes.map((note) => { return note.content })

let noteList = { noteMap: [] }
let note1, note2

test.before(t => {
  const data1 = { type: 'MARKDOWN_NOTE', content: 'content1', tags: ['tag1'] }
  const data2 = { type: 'MARKDOWN_NOTE', content: 'content1\ncontent2', tags: ['tag1', 'tag2'] }
  note1 = dummyNote(data1)
  note2 = dummyNote(data2)

  noteList.noteMap = [note1, note2]
})

test('it can find notes by tags or words', t => {
  // [input, expected content (Array)]
  const testCases = [
    ['#tag1', [note1.content, note2.content]],
    ['#tag1 #tag2', [note2.content]],
    ['#tag1 #tag2 #tag3', []],
    ['content1', [note1.content, note2.content]],
    ['content1 content2', [note2.content]],
    ['content1 content2 content3', []]
  ]

  testCases.forEach((testCase) => {
    const [input, expectedContents] = testCase
    const results = searchFromNotes(noteList, input)
    t.true(_.isEqual(pickContents(results).sort(), expectedContents.sort()))
  })
})
