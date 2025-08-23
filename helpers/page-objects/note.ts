import { Page,expect,test } from '@playwright/test';

export class Note{

    private readonly ctrAddNote;
    private readonly ctrNoteCheckLct: string;
    private readonly ctrNote: string
    private readonly ctrNoteDlt: string
    private readonly ctrCnfDelete
    

     /** Constructor of class Note
    @param page the fixture Page
    */
    constructor(public readonly page: Page) {
        
        this.ctrNoteCheckLct = `_react=mr[note.title="#noteTitle#"]`
        this.ctrNote = '_react=wr[note.title="#noteTitle#"][note.description="#noteDsc#"][note.category="#noteCtg#"]'
        this.ctrNoteDlt = `_react=rt[message="#noteTitle#"]`
        this.ctrAddNote = this.page.getByRole('button',{name: '+ Add Note'}); 
        this.ctrCnfDelete = this.page.getByTestId('note-delete-confirm');
     }

    /** Open the form Add new note
     * @param title The title of the note
    */
    async openAddNote(){

        await this.ctrAddNote.click();
    }

    /** Complete a note
     * @param title The title of the note
      */
    async completeNote(title: string){

        await this.page.locator(this.ctrNoteCheckLct.replace('#noteTitle#',title)).click();
    }

    /** Delete a note
     * @param title The title of the note
      */
    async deleteNote(title: string){

        await this.page.locator(this.ctrNoteDlt.replace('#noteTitle#',title)).click();

        await test.step('Confirm the deletion',async () => {

            await this.ctrCnfDelete.click();
        })
    }

    /** Verify if a note exists
     * @param title The title of the note
     * @param dsc The description of the note
     * @param category The category of the note, the possible values can be Work, Home, Personal
     * @param complete True or false
     * 
      */
    async verifyNoteExist(title: string, dsc: string,category: string,complete: boolean){
        
        await expect(await this.page.locator(this.ctrNote.replace('#noteTitle#',title).replace('#noteDsc#',dsc).replace('#noteCtg#',category)+`[note.completed=${complete}]`)).toBeVisible();
        
    }

    /** Verify if a note completes
     * @param title The title of the note
     * @param complete True or false
     * 
      */
    async verifyNoteComplete(title: string, complete: boolean){
       
        await expect(await this.page.locator(this.ctrNoteCheckLct.replace('#noteTitle#',title)+`[note.completed=${complete}]`)).toBeVisible()
       
    }
    /** Verify if a note does not exist
     * @param title The title of the note
     * @param complete True or false
     * 
      */
    async verifyNoteNotExist(title: string, dsc: string,category: string,complete: boolean){
        
        await expect(await this.page.locator(this.ctrNote.replace('#noteTitle#',title).replace('#noteDsc#',dsc).replace('#noteCtg#',category))).not.toBeVisible();
        
    }
}
