import { verify } from 'crypto'
import {test,expect} from '../../helpers/fixtures/page.fixture'
import {Note} from '../../helpers/page-objects/note'
import { teardown } from '../../helpers/common/teardown';
import { fetchTestData } from '../../helpers/data-factory/note'


test.describe('Delete a note successfully',()=> { 

    let notes = fetchTestData()
    test.beforeEach('Login',async ({loginPage,request}) => {

    })
        
    test(`Delete a note with the confirmation`, async ({note}) => {
        let title = notes[1]!.title + (test.info().workerIndex).toString()
        await note.goToHome()
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
    let notes = fetchTestData()
    test.beforeEach('Login',async ({loginPage,request}) => {

    })
    test(`Cancel deleting a note `, async ({note,page}) => {
        title = notes[1]!.title + (test.info().workerIndex).toString()
        await note.goToHome()
        await test.step('Click on the button Delete',async () => {
            
            await note.deleteNote(title,false);
        })

        await test.step('Verify if the note exists',async () => {

            await note.verifyNoteExist(title,notes[1]!.description,notes[1]!.category,false)
        })
        
    })
    
    test.afterEach(`Teardown - Delete a note`, async ({page}) => {
        await teardown(page, title)
    })
})
    


