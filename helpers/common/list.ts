import { FullNote } from '../api/note';

/** Extract a note ID from a list of notes 
 * @param notes: an array of notes, which is searched for a note ID
 * @param noteTitle the title of the respective note, of which ID is returned
 * Return ID of the note which has the title as @param noteTitle
*/
export function extractNoteID(notes: FullNote[], noteTitle:string):string{
    let noteID = ''
    if (notes && notes?.length > 0)
        notes?.forEach(async ( {title,id})=>{
                    if (title==noteTitle)
                    {
                        noteID = id
                    }
                })

    return noteID    
}