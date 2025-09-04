import { test as base, APIRequestContext } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';
import {Note} from '../../helpers/page-objects/note'
import {fetchTestData,NoteType} from '../../helpers/data-factory/note'
import { AddNote } from '../page-objects/add-note';
import { getNotes,FullNote,createNote } from '../api/note';

let notes = fetchTestData()

/* @Author: Thu Nguyen */

type APIFixtures = {
    noteRqs: APIRequestContext;

}
/* Extend the test() of playwright for the APIFixtures */
export const test = base.extend<APIFixtures>({
    noteRqs: async ({request},use) => {
        let noteRqs = request
        let title = notes![2].title + (test.info().workerIndex).toString()
            
        await createNote(noteRqs,title,notes![2].description,notes![2].category)                        
        
        // To wait for logging in successfully          
        await use(noteRqs);
    }
   
});

export { expect } from '@playwright/test';