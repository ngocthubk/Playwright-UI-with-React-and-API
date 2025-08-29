import { verify } from 'crypto';
import { TestData } from '../../helpers/data-factory/note';
import {test,expect} from '../../helpers/fixtures/page.fixture'
import { Note } from '../../helpers/page-objects/note';
import notes from '../../test-data/note.json'


test.describe('Interact with a note',()=> {
  test.beforeEach('Login',async ({loginPage,request}) => {

    })
  test("Show all completed Notes - Mock API",{tag: ['@mockUI','@mockAPI'],}, async ({ page, request }) => {
    let token = process.env.authToken
    let response = await request.get('api/notes',{headers: {'accept':'application/json','x-auth-token': token!
      
    }})
      let json = await response.json()
      console.log(json.data)
      let jsonCompleted: TestData[] = new Array(0)
      for (let item of json.data){
        if (item.completed) 
          jsonCompleted.push(item)
      }
      console.log('completed is ')
      console.log(jsonCompleted)
    page.route('**/completed',async route => {
      
      
      await route.fulfill({status: 200,

        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify(jsonCompleted)})
      
    })
    
    let note = await new Note(page)
    await note.addButton();
    const buttons = await page.getByRole('button',{name:'Completed'});
    await buttons.click()
    console.log("Buttons count:", await buttons.count());
    
    await expect(page.getByRole('button',{name: 'Completed'})).toBeVisible()
});




/* Assume that the business is changed. Now only uncompleted notes are shown. But the real API are not updated.
Mock API is used instead to test the new feature.
 */
test("Show all uncompleted Notes - Mock API",{tag: ['@mockUI','@mockAPI'],}, async ({ page, multiNote }) => {
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
    
    
    
});
})