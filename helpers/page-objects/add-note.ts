import { Page,expect,test } from '@playwright/test';
import {Note} from './note'

export class AddNote{

    private readonly ctrCtg
    private readonly ctrCmp
    private readonly ctrTtl
    private readonly ctrDsc
    private readonly ctrCrt
    private readonly ctrCnc
    

     /** Constructor of class AddNote
    @param page the fixture Page
    */
    constructor(public readonly page: Page) {
        
        this.ctrCtg = this.page.getByTestId('note-category')   
        this.ctrCmp = this.page.getByTestId('note-completed');
        this.ctrTtl = this.page.getByTestId('note-title');
        this.ctrDsc = this.page.getByTestId('note-description')
        this.ctrCrt = this.page.getByTestId('note-submit')
        this.ctrCnc = this.page.getByTestId('note-cancel')

     }

     /** Add a note
     * @param title The title of the note
     * @param dsc The description of the note
     * @param category The category of the note, the possible values can be Work, Home, Personal
     * @param complete True or false
     * 
      */
    async addNote(title: string, dsc: string, category: string, complete: boolean){
        let note = await new Note(this.page)
        await note.openAddNote()
        await this.inputNote(title, dsc, category, complete)
        await this.ctrCrt.click()
    }

     /** Input in the form Add new note
     * @param title The title of the note
     * @param dsc The description of the note
     * @param category The category of the note, the possible values can be Work, Home, Personal
     * @param complete True or false
     * 
      */
    async inputNote(title: string, dsc: string, category: string, complete: boolean){
        await this.ctrCtg.selectOption(category)
        if (complete)
            await this.ctrCmp.check()
        await this.ctrTtl.fill(title)
        await this.ctrDsc.fill(dsc)

    }

    /* Click on the button Create */
    async clickCreate(){
        await this.ctrCrt.click()
    }

    /* Click on the button Cancel */
    async clickCancel(){
        await this.ctrCrt.cancel()
    }

}
