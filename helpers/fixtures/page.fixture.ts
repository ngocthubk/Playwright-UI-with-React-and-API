import { test as base, APIRequestContext } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';
import {Note} from '../../helpers/page-objects/note'
import {fetchTestData,TestData} from '../../helpers/data-factory/note'
import { AddNote } from '../page-objects/add-note';
import deleteNoteData from '../../test-data/delete-note.json'
import interactNoteData from '../../test-data/interact-note.json'
import notes from '../../test-data/note.json'
import { getNotes,FullNote } from '../api/note';


/* @Author: Thu Nguyen */

type PagesFixtures = {
    loginPage: LoginPage;
    deleteNote: Note;
    interactNote: Note;
    multiNote: Note

}
/* Extend the test() of playwright for the PagesFixture */
export const test = base.extend<PagesFixtures>({
    loginPage: async ({page,request},use) => {
        const loginPage = await new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(process.env.email!,process.env.password!);
        // To wait for logging in successfully          
        await use(loginPage);
    },
    deleteNote: async ({page,request},use) => {
        const note = await new Note(page);

        let title = deleteNoteData[0]!.title + (test.info().workerIndex).toString()
        await note.addNote(title,deleteNoteData[0]!.description,deleteNoteData[0]!.category,deleteNoteData[0]!.completed)        
        await use(note);

        
    },
    interactNote: async ({page,request},use) => {
        const note = await new Note(page);
        let title = interactNoteData[0]!.title + (test.info().workerIndex).toString()
        await note.addNote(title,interactNoteData[0]!.description,interactNoteData[0]!.category,interactNoteData[0]!.completed)        
        await use(note);
        await note.deleteNote(title,true)
        await page.close()
        
    },
    multiNote: async ({page,request},use) => {
        const note = await new Note(page);
        for (let item of notes){
            let title = item!.title + (test.info().workerIndex).toString()
            await note.addNote(title,item!.description,item!.category,item.completed)        
        }
        await use(note);
        let items: FullNote[] = await getNotes(request)
        console.log(items)
        items?.forEach(async ( {id})=>{
            
            await note.deleteNote(id,true)        
        })
        
    },
   
});

export { expect } from '@playwright/test';