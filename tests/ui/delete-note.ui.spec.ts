import { verify } from 'crypto'
import {test,expect} from '../../helpers/fixtures/page.fixture'
import {Note} from '../../helpers/page-objects/note'
import deleteNoteData from '../../test-data/delete-note.json'


test.describe('Delete a note successfully',()=> { 
    test.beforeEach('Login',async ({loginPage,request}) => {

    })
        
    test(`Delete a note with the confirmation`, async ({deleteNote,page}) => {
        let title = deleteNoteData[0]!.title + (test.info().workerIndex).toString()
        await test.step('Click on the button Delete',async () => {
            
            await deleteNote.deleteNote(title,true);
        })

        await test.step('Verify if the note exists',async () => {

            await deleteNote.verifyNoteNotExist(title)
        })
        
    })
    test.afterEach(`Close the page `, async ({page}) => {
        await page.close()
    })
})

test.describe('Delete a note unsuccessfully',()=> {
    let title
    test.beforeEach('Login',async ({loginPage,request}) => {

    })
    test(`Cancel deleting a note `, async ({deleteNote,page}) => {
        title = deleteNoteData[0]!.title + (test.info().workerIndex).toString()
        await test.step('Click on the button Delete',async () => {
            
            await deleteNote.deleteNote(title,false);
        })

        await test.step('Verify if the note exists',async () => {

            await deleteNote.verifyNoteExist(title,deleteNoteData[0]!.description,deleteNoteData[0]!.category,deleteNoteData[0]!.completed)
        })
        
    })
    test.afterEach(`Teardown - Delete a note`, async ({page}) => {
        let note = await new Note(page)
        await note.deleteNote(title,true)
        await page.close()
    })
})
    


