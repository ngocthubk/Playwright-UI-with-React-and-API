import { test as base } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';
import {Note} from '../../helpers/page-objects/note'
import testData from '../../test-data/note.json'
import { AddNote } from '../page-objects/add-note';

/* @Author: Thu Nguyen */

type PagesFixtures = {
    loginPage: LoginPage;
    note: Note;

}
/* Extend the test() of playwright for the PagesFixture */
export const test = base.extend<PagesFixtures>({
    loginPage: async ({page},use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(process.env.email!,process.env.password!);
        // To wait for logging in successfully          
        await use(loginPage);
    },
    note: async ({page},use) => {
        const note = new Note(page);
        let addNote = new AddNote(page)
        await addNote.addNote(testData[0]!.title,testData[0]!.description,testData[0]!.category,testData[0]!.completed)        
        await use(note);
        await note.deleteNote(testData[0]!.title)
    },
   
});

export { expect } from '@playwright/test';