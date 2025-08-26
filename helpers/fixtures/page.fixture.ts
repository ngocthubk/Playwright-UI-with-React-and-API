import { test as base, APIRequestContext } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';
import {Note} from '../../helpers/page-objects/note'
import {fetchTestData,TestData} from '../../helpers/data-factory/note'
import { AddNote } from '../page-objects/add-note';
import deleteNoteData from '../../test-data/delete-note.json'
import interactNoteData from '../../test-data/interact-note.json'

/* @Author: Thu Nguyen */

type PagesFixtures = {
    loginPage: LoginPage;
    deleteNote: Note;
    interactNote: Note;

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
        // await page.close()
        
    },
   
});

export { expect } from '@playwright/test';