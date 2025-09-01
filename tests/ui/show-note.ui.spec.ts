import { verify } from 'crypto';
import { TestData } from '../../helpers/data-factory/note';
import {test,expect} from '../../helpers/fixtures/page.fixture'
import { Note } from '../../helpers/page-objects/note';
import notes from '../../test-data/note.json'
import { getNotes,FullNote,deleteNote } from '../../helpers/api/note';

test.describe('Interact with a note',()=> {
  test.beforeEach('Login',async ({loginPage,request}) => {

    })
  
/* Assume that the business is changed. Now only all uncompleted notes are shown when clicking on the button All. But the real API are not updated.
Mock API is used instead to test the new feature.
 */
test("Show all uncompleted Notes - Mock API",{tag: ['@mockUI','@mockAPI'],}, async ({ page, multiNote }) => {
  test.setTimeout(200_000)  
  let note = await new Note(page)
    await note.interceptRequest() 
  
    // await note.addButton();
    await note.openAllNotes()

    for (let item of notes){
      let title = item.title+(test.info().workerIndex).toString()
      if (item.completed)
        await note.verifyNoteNotExist(title)
      else
        
        await note.verifyNoteExist(title,item.description,item.category,item.completed)

    }
   
  })

  /* Assume that the business is changed. Now only uncompleted personal notes are shown when clicking on the button Personal. But the real API are not updated.
Mock API is used instead to test the new feature.
 */
test("Show all uncompleted Personal Notes - Mock API",{tag: ['@mockUI','@mockAPI'],}, async ({ page, multiNote }) => {
  test.setTimeout(200_000)  
  let note = await new Note(page)
    await note.interceptRequest() 
  
    // await note.addButton();
    await note.openPersonalNotes()

    for (let item of notes){
      let title = item.title+(test.info().workerIndex).toString()
      if (!item.completed && item.category == 'Personal')
       await note.verifyNoteExist(title,item.description,item.category,item.completed)
      else
         await note.verifyNoteNotExist(title)        

    }
    
    
});
 test.afterEach('Teardown',async ({request,page}) => {
      let items: FullNote[] = await getNotes(request)
        console.log(items)
        items?.forEach(async ( {id})=>{
            
            await deleteNote(request,id)        
        })
        await page.close()
    })
})