import { verify } from 'crypto';
import { NoteType,fetchTestData } from '../../helpers/data-factory/note';
import {test,expect} from '../../helpers/fixtures/page.fixture'
import { Note } from '../../helpers/page-objects/note';
import { getNotes,FullNote,deleteNote, createNote, getNote } from '../../helpers/api/note';
import { teardownAll } from '../../helpers/common/teardown';


/* Assume that the business is changed. But the real API are not updated.
Mock API is used instead to test the new feature.*/
test.describe('Show notes',()=> {
  let note
  let notes = fetchTestData()  
  // let request
  test.beforeEach('Login',async ({loginPage},testInfo) => {
      testInfo.setTimeout(testInfo.timeout + 30000);
    })
  
/* Now only all uncompleted notes are shown when clicking on the button All. 
 */
test("Show all uncompleted Notes - Mock API",{tag: ['@mockAPI']}, async ({ multiNote }) => {
  test.setTimeout(300_000)  
    await test.step('Click on the button All',async ({})=>{
        await multiNote.openAllNotes()
    })  
    
    for (let item of notes){
      let title = item.title+(test.info().workerIndex).toString()
      if (item.completed)
        await multiNote.verifyNoteNotExist(title)
      else        
        await multiNote.verifyNoteExist(title,item.description,item.category,item.completed)

    } 
  })

  /*  Now only uncompleted personal notes are shown when clicking on the button Personal. 
 */
test("Show all uncompleted Personal Notes - Mock API",{tag: ['@mockAPI'],}, async ({  multiNote,page }) => {
    test.setTimeout(300_000)  

    await multiNote.openPersonalNotes()

    for (let item of notes){
      let title = item.title+(test.info().workerIndex).toString()
      if (!item.completed && item.category == 'Personal')
         await multiNote.verifyNoteExist(title,item.description,item.category,item.completed)
      else
         await multiNote.verifyNoteNotExist(title)        

    }        
});

})