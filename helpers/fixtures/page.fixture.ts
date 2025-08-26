import { test as base, APIRequestContext } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';
import {Note} from '../../helpers/page-objects/note'
import {fetchTestData,TestData} from '../../helpers/data-factory/note'
import { AddNote } from '../page-objects/add-note';

/* @Author: Thu Nguyen */

type PagesFixtures = {
    loginPage: LoginPage;
    note: Note;

}
export let testData:TestData[]
/* Extend the test() of playwright for the PagesFixture */
export const test = base.extend<PagesFixtures>({
    loginPage: async ({page,request},use) => {
        testData =  fetchTestData()
        const loginPage = await new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(process.env.email!,process.env.password!);
        // To wait for logging in successfully          
        await use(loginPage);
    },
    note: async ({page,request},use) => {
        testData =  fetchTestData()
        const note = await new Note(page);
        let addNote = await new AddNote(page)
        await note.addNote(testData[0]!.title,testData[0]!.description,testData[0]!.category,testData[0]!.completed)        
        await use(note);
        // await note.deleteNote(testData[0]!.title,true)
        
    },
   
});

export { expect } from '@playwright/test';