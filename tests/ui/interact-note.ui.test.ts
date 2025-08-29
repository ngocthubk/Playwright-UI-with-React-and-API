import { verify } from 'crypto'
import {test,expect} from '../../helpers/fixtures/page.fixture'
import {Note} from '../../helpers/page-objects/note'
import interactNoteData from '../../test-data/interact-note.json'


test.describe('Interact with a note',()=> {
    test.beforeEach('Login',async ({loginPage,request}) => {

    })
       
    test(`Complete a note `, async ({interactNote,page}) => {
        let title = interactNoteData[0]!.title + (test.info().workerIndex).toString()
        await test.step('Complete a note',async () => {
            
            await interactNote.completeNote(title);
        })

        await test.step('Verify if the note exists',async () => {
            
            await interactNote.verifyNoteComplete(title,true)
        })
        
    })
          
})
    


