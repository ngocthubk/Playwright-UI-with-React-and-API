import { Page,expect,test } from '@playwright/test';
import {Note} from './note'

export class AddNote{

    private readonly ctrCtg
    private readonly ctrCmp
    private readonly ctrTtl
    private readonly ctrDsc
    private readonly ctrCrt
    private readonly ctrCnc
    

     /** Constructor of class Note
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

    async addNote(title: string, dsc: string, category: string, complete: boolean){
        let note = await new Note(this.page)
        await note.openAddNote()
        await this.inputNote(title, dsc, category, complete)
        await this.ctrCrt.click()
    }

    async inputNote(title: string, dsc: string, category: string, complete: boolean){
        await this.ctrCtg.selectOption(category)
        if (complete)
            await this.ctrCmp.check()
        await this.ctrTtl.fill(title)
        await this.ctrDsc.fill(dsc)

    }

    async clickCreate(){
        await this.ctrCrt.click()
    }

    async clickCancel(){
        await this.ctrCrt.cancel()
    }

}
