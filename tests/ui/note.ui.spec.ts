import { verify } from 'crypto'
import {test,expect} from '../../helpers/fixtures/page.fixture'
import {Note} from '../../helpers/page-objects/note'
import testData from '../../test-data/note.json'
import { AddNote } from '../../helpers/page-objects/add-note'

test.describe('Create a note',()=> {
       let note
       let noteTitle
    testData.forEach(({title,description,category,completed}) => {
        test(`Create a note ${title}`, async ({loginPage,page}) => {
            note = await new Note(page);
            noteTitle = title
            let addNote = await new AddNote(page)
            await test.step('Open the popup Add a Note',async () => {
                await note.openAddNote()

            })

            await test.step('Input in the form',async () => {
                await addNote.inputNote(title,description,category,completed);

            })

             await test.step('Click on the button Create',async () => {
                await addNote.clickCreate()

            })

            await test.step('Verify if the note exists',async () => {
                test.slow();
                await note.verifyNoteExist(title,description,category,completed)
            })
        
        })
    })
    // Teardown
    test.afterEach('Delete a note',async ({page}) => {
        test.slow();
        await note.deleteNote(noteTitle);
        await page.close()
    })
})

