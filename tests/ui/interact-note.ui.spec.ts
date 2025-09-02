import { verify } from 'crypto'
import {test,expect} from '../../helpers/fixtures/page.fixture'
import {Note} from '../../helpers/page-objects/note'
import {fetchTestData,TestData} from '../../helpers/data-factory/note'
import { teardown } from '../../helpers/common/teardown';

test.describe('Interact with a note',()=> {
    let title
    let notes = fetchTestData()
    test.beforeEach('Login',async ({loginPage}) => {

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
    test.afterEach('Teardown',async ({page}) =>{
         await teardown(page, title)
    })
          
})
    


