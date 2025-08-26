import { verify } from 'crypto'
import {test,expect,testData} from '../../helpers/fixtures/page.fixture'
import {Note} from '../../helpers/page-objects/note'


test.describe('Interact with a note',()=> {
    test.beforeEach('Login',async ({loginPage,request}) => {

    })
       
    test(`Complete a note `, async ({note,page}) => {
   
        await test.step('Complete a note',async () => {
            
            await note.completeNote(testData[0]!.title);
        })

        await test.step('Verify if the note exists',async () => {
            test.slow();
            await note.verifyNoteComplete(testData[0]!.title,true)
        })
        
    })
    test.afterEach(`Teardown - Delete a note `, async ({page}) => {
        let note = await new Note(page)
        await note.deleteNote(testData[0]!.title,true)
        await page.close()
    })
    
    
})
    


