import { test as base, APIRequestContext } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';
import {Note} from '../../helpers/page-objects/note'
import {fetchTestData,TestData} from '../../helpers/data-factory/note'
import { AddNote } from '../page-objects/add-note';
import notes from '../../test-data/note.json'
import { getNotes,FullNote } from '../api/note';


/* @Author: Thu Nguyen */

type PagesFixtures = {
    loginPage: LoginPage;
    note: Note;
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
    note: async ({page,request},use) => {
        const note = await new Note(page);

        let title = notes[1]!.title + (test.info().workerIndex).toString()
        await note.addNote(title,notes[1]!.description,notes[1]!.category,notes[1]!.completed)        
        await use(note);

        
    },
    multiNote: async ({page,request},use) => {
        test.setTimeout(100_000)
        const note = await new Note(page);
        for (let item of notes){
            let title = item!.title + (test.info().workerIndex).toString()
            // Cannot create a note through API, because a 
            await note.addNote(title,item!.description,item!.category,item.completed)        
        }
        await use(note);        
        
    },
   
});

export { expect } from '@playwright/test';