import { verify } from 'crypto'
import {test,expect} from '../../helpers/fixtures/page.fixture'
import {Note} from '../../helpers/page-objects/note'
import { AddNote } from '../../helpers/page-objects/add-note'
import {fetchTestData,TestData} from '../../helpers/data-factory/note'
import _fetch from 'sync-fetch'

test.describe('Create a note',()=> {
       let note
       let noteTitle
       let testData = fetchTestData()          
       
    testData?.forEach(({title,description,category,completed}) => {
        test(`Create a note ${title}`, async ({loginPage,page,request}) => {
                      
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
    test.afterEach('Teardown - Delete a note',async ({page}) => {
        test.slow();
        await note.deleteNote(noteTitle,true);
        await page.close()
    })
})

