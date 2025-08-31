import { verify } from 'crypto'
import {test,expect} from '../../helpers/fixtures/page.fixture'
import {Note} from '../../helpers/page-objects/note'
import notes from '../../test-data/note.json'


test.describe('Delete a note successfully',()=> { 
    test.beforeEach('Login',async ({loginPage,request}) => {

    })
        
    test(`Delete a note with the confirmation`, async ({note,page}) => {
        let title = notes[1]!.title + (test.info().workerIndex).toString()
        await test.step('Click on the button Delete',async () => {
            
            await note.deleteNote(title,true);
        })

        await test.step('Verify if the note exists',async () => {

            await note.verifyNoteNotExist(title)
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
    test(`Cancel deleting a note `, async ({note,page}) => {
        title = notes[1]!.title + (test.info().workerIndex).toString()
        await test.step('Click on the button Delete',async () => {
            
            await note.deleteNote(title,false);
        })

        await test.step('Verify if the note exists',async () => {

            await note.verifyNoteExist(title,notes[1]!.description,notes[1]!.category,notes[1]!.completed)
        })
        
    })
    test('Complete a note ', async ({note}) => {
        title = notes[1]!.title + (test.info().workerIndex).toString()
        await test.step('Complete a note',async () => {
            
            await note.completeNote(title);
        })

        await test.step('Verify if the note exists',async () => {
            
            await note.verifyNoteComplete(title,true)
        })
        
    })
    test.afterEach(`Teardown - Delete a note`, async ({page}) => {
        let note = await new Note(page)
        await note.deleteNote(title,true)
        await page.close()
    })
})
    


