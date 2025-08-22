import { verify } from 'crypto'
import {test,expect} from '../../helpers/fixtures/page.fixture'
import {Note} from '../../helpers/page-objects/note'
import testData from '../../test-data/note.json'

test.describe('Create a note',()=> {
    let note
    let noteTitle
    test.beforeEach('Add a note',async ({loginPage}) => {
        
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
})
    


