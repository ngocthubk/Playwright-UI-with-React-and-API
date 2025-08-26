import { verify } from 'crypto'
import {test,expect,testData} from '../../helpers/fixtures/page.fixture'
import {Note} from '../../helpers/page-objects/note'
import {fetchTestData} from '../../helpers/data-factory/note'

test.describe('Delete a note successfully',()=> { 
    test.beforeEach('Login',async ({loginPage,request}) => {

    })
        
    test(`Delete a note with the confirmation`, async ({note,page}) => {
   
        await test.step('Click on the button Delete',async () => {
            
            await note.deleteNote(testData[0]!.title,true);
        })

        await test.step('Verify if the note exists',async () => {

            await note.verifyNoteNotExist(testData[0]!.title)
        })
        
    })
    test.afterEach(`Close the page `, async ({page}) => {
        await page.close()
    })
})

test.describe('Delete a note unsuccessfully',()=> {

    test.beforeEach('Login',async ({loginPage,request}) => {

    })
    test(`Cancel deleting a note `, async ({note,page}) => {
   
        await test.step('Click on the button Delete',async () => {
            
            await note.deleteNote(testData[0]!.title,false);
        })

        await test.step('Verify if the note exists',async () => {

            await note.verifyNoteExist(testData[0]!.title,testData[0]!.description,testData[0]!.category,testData[0]!.completed)
        })
        
    })
    test.afterEach(`Teardown - Delete a note`, async ({page}) => {
        let note = await new Note(page)
        await note.deleteNote(testData[0]!.title,true)
        await page.close()
    })
})
    


