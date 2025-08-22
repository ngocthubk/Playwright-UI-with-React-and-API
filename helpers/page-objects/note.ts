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

    async openAddNote(){

        await this.ctrAddNote.click();
    }

    async completeNote(title: string){

        await this.page.locator(this.ctrNoteCheckLct.replace('#noteTitle#',title)).click();
    }

    async deleteNote(title: string){

        await this.page.locator(this.ctrNoteDlt.replace('#noteTitle#',title)).click();

        await test.step('Confirm the deletion',async () => {

            await this.ctrCnfDelete.click();
        })
    }

    async verifyNoteExist(title: string, dsc: string,category: string,complete: boolean){
        
        await expect(await this.page.locator(this.ctrNote.replace('#noteTitle#',title).replace('#noteDsc#',dsc).replace('#noteCtg#',category)+`[note.completed=${complete}]`)).toBeVisible();
        
    }

    async verifyNoteComplete(title: string, complete: boolean){
       
        await expect(await this.page.locator(this.ctrNoteCheckLct.replace('#noteTitle#',title)+`[note.completed=${complete}]`)).toBeVisible()
       
    }

    async verifyNoteNotExist(title: string, dsc: string,category: string,complete: boolean){
        
        await expect(await this.page.locator(this.ctrNote.replace('#noteTitle#',title).replace('#noteDsc#',dsc).replace('#noteCtg#',category))).not.toBeVisible();
        
    }
}
