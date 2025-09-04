import {test,expect} from '../../helpers/fixtures/api.fixture'
import {Note} from '../../helpers/page-objects/note'
import { AddNote } from '../../helpers/page-objects/add-note'
import {fetchTestData,NoteType} from '../../helpers/data-factory/note'
import { getNotes,FullNote,deleteNote, createNote, getNote } from '../../helpers/api/note';
import { request } from 'http';
import {extractNoteID} from '../../helpers/common/list'
import { LoginPage } from '../../helpers/page-objects/login-page'

test.describe('Delete a note',()=> {
       let note
       let noteId
       let testData = fetchTestData()    
           
        test(`Delete a note successfully`, async ({page,noteRqs}) => {
            test.setTimeout(200_000)
            let noteTitle = testData![2].title +  (test.info().workerIndex).toString()
            let noteId
            let response
            let notes = await getNotes(noteRqs)
            noteId = extractNoteID(notes,noteTitle)
            await test.step('Create a new note',async () => {
                response = await deleteNote(noteRqs,noteId)
            }) 
            await test.step('Verify the response',async () => {

                await expect(response).toHaveProperty('success',true)
                await expect(response).toHaveProperty('status',200)
            }) 
            await test.step('Verify if the note really does not exist',async () => {
                
                response= await getNote(noteRqs,noteId)
                await expect(response).toHaveProperty('success',false)
                await expect(response).toHaveProperty('status',404)
            })         

            await test.step('Verify if the note does not exist on the UI',async () => {
                
                note = await new Note(page)
                let loginPage = await new LoginPage(page)
                loginPage.goto()
                loginPage.login(process.env.email!,process.env.password!)
                await note.openAllNotes()
                await note.verifyNoteNotExist(noteTitle)
            })                    
        })

    // Teardown
    test.afterEach('Teardown - Delete a note',async ({page,request}) => {
        
        await page.close()
    })
})

