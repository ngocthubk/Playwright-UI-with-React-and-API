import {test,expect} from '../../helpers/fixtures/page.fixture'
import {Note} from '../../helpers/page-objects/note'
import { AddNote } from '../../helpers/page-objects/add-note'
import {fetchTestData,TestData} from '../../helpers/data-factory/note'
import { getNotes,FullNote,deleteNote, createNote, getNote } from '../../helpers/api/note';
import { request } from 'http';

test.describe('Create a note',()=> {
       let note
       let noteId
       let testData = fetchTestData()    
       let noteAPI      
       
    testData?.forEach(({title,description,category,completed}) => {
        test(`Create a note ${title}`, async ({page,request,loginPage}) => {
            let noteTitle = title +  (test.info().workerIndex).toString()
                        
            await test.step('Create a new note',async () => {
                noteAPI = await createNote(request,noteTitle,description,category)
                console.log(noteAPI)
                noteId = noteAPI.id
            }) 
            await test.step('Verify the response',async () => {
                
                await expect(noteAPI).toHaveProperty('title',noteTitle)
                await expect(noteAPI).toHaveProperty('description',description)
                await expect(noteAPI).toHaveProperty('category',category)
                await expect(noteAPI).toHaveProperty('completed',false)
            }) 
            await test.step('Verify if the note really exists',async () => {
                
                await getNote(request,noteAPI.id)
            })         

            await test.step('Verify if the note exists on the UI',async () => {
                note = await new Note(page)
                await note.goToHome()
                await note.verifyNoteExist(noteTitle,description,category,false)
            })            
        
        })
    })

    // Teardown
    test.afterEach('Teardown - Delete a note',async ({page,request}) => {
        
        // await deleteNote(request,noteId);
        await page.close()
    })
})

