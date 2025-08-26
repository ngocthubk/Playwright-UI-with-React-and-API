import { Page,expect,test } from '@playwright/test';
import {AddNote} from './add-note'

export class Note{

    private readonly ctrAddNote;
    private readonly ctrNoteCheckLct: string;
    private readonly ctrNote: string
    private readonly ctrNoteDlt: string
    private readonly ctrCnfDelete
    private readonly ctrCncDelete
    

     /** Constructor of class Note
    @param page the fixture Page
    */
    constructor(public readonly page: Page) {
        
        this.ctrNoteCheckLct = `_react=mr[note.title="#noteTitle#"]`
        this.ctrNote = '_react=wr[note.title="#noteTitle#"][note.description="#noteDsc#"][note.category="#noteCtg#"]'
        this.ctrNoteDlt = `_react=rt[message="#noteTitle#"]`
        this.ctrAddNote = this.page.getByRole('button',{name: '+ Add Note'}); 
        this.ctrCnfDelete = this.page.getByTestId('note-delete-confirm');
        this.ctrCncDelete = this.page.getByTestId('note-delete-cancel-2');
        
     }

    /** Open the form Add new note
     * @param title The title of the note
    */
    async openAddNote(){

        await this.ctrAddNote.click();
    }

    /** Add a note
     * @param title The title of the note
     * @param dsc The description of the note
     * @param category The category of the note, the possible values can be Work, Home, Personal
     * @param complete True or false
     * 
      */
    async addNote(title: string, dsc: string, category: string, complete: boolean){
        let addNote = await new AddNote(this.page)
        await this.openAddNote()
        await addNote.inputNote(title, dsc, category, complete)
        await addNote.clickCreate()
        await this.page.locator(this.ctrNote.replace('#noteTitle#',title).replace('#noteDsc#',dsc).replace('#noteCtg#',category))
    }
    /** Complete a note
     * @param title The title of the note
      */
    async completeNote(title: string){

        await this.page.locator(this.ctrNoteCheckLct.replace('#noteTitle#',title)).check()
    }

    /** Delete a note
     * @param title The title of the note
      */
    async deleteNote(title: string, confirm: boolean){
            await this.page.locator(this.ctrNoteDlt.replace('#noteTitle#',title)).click();
            if (confirm){
                await test.step('Confirm the deletion',async () => {

                    await this.ctrCnfDelete.click();
                    console.log('deleted')
                    await this.ctrCnfDelete.waitFor({ state: "detached" })
                })
            }else{
                await test.step('Cancel the deletion',async () => {

                    await this.ctrCncDelete.click();
                })
            }
        

    }

    /** Verify if a note exists
     * @param title The title of the note
     * @param dsc The description of the note
     * @param category The category of the note, the possible values can be Work, Home, Personal
     * @param complete True or false
     * 
      */
    async verifyNoteExist(title: string, dsc: string,category: string,complete: boolean){
        
        await expect.soft(await this.page.locator(this.ctrNote.replace('#noteTitle#',title).replace('#noteDsc#',dsc).replace('#noteCtg#',category)+`[note.completed=${complete}]`)).toBeVisible();
        
    }

    /** Verify if a note completes
     * @param title The title of the note
     * @param complete True or false
     * 
      */
    async verifyNoteComplete(title: string, complete: boolean){
       
        await expect.soft(await this.page.locator(this.ctrNoteCheckLct.replace('#noteTitle#',title)+`[note.completed=${complete}]`)).toBeVisible()
       
    }
    /** Verify if a note does not exist
     * @param title The title of the note
     * @param complete True or false
     * 
      */
    async verifyNoteNotExist(title: string){
        
        await expect.soft(await this.page.locator(this.ctrNote.replace('#noteTitle#',title))).not.toBeVisible();
        
    }
}
