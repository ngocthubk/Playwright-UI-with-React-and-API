import { test as base, APIRequestContext } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';
import {Note} from '../../helpers/page-objects/note'
import {fetchTestData,NoteType} from '../../helpers/data-factory/note'
import { AddNote } from '../page-objects/add-note';
import { getNotes,FullNote, createNote } from '../api/note';
import { teardownAll } from '../../helpers/common/teardown';


/* @Author: Thu Nguyen */
let notes
type PagesFixtures = {
    loginPage: LoginPage;
    note: Note;   
    multiNote: Note
}
/* Extend the test() of playwright for the PagesFixture */
export const test = base.extend<PagesFixtures,{ forEachWorker: void }>({
    forEachWorker: [async ({},use)=>{
        notes = fetchTestData()
        use()
    },{ scope: 'worker', auto: true         
    }],
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
        await createNote(request,title,notes[1]!.description,notes[1]!.category)        
        await use(note);        
    },
    multiNote: async ({page,request},use) => {
        let noteTitles : string[] = new Array(0)
        test.setTimeout(300_000)
        console.log()
        const note = await new Note(page);
        await note.interceptRequest() 
        
        for (let item of notes){
            let title = item!.title + (test.info().workerIndex).toString()
            noteTitles.push(title)
            // Cannot create a note through API, creating a note through API does not accept the input 'completed'
            await note.addNote(title,item!.description,item!.category,item.completed)        
        }
        await use(note);
        
        await teardownAll(request,page,noteTitles)                
    }   
});

export { expect } from '@playwright/test';