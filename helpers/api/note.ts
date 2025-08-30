import { APIRequestContext } from '@playwright/test';

let token = process.env.authToken
export type FullNote ={
        id: string,
        title: string,
        description: string,
        category: string,
        completed: boolean,
        created_at: string,
        updated_at: string,
        user_id: string
}
export async function getNotes(request: APIRequestContext):Promise<FullNote[]>{
    let token = process.env.authToken
    let response = await request.get('api/notes',{headers: {
        accept: 'application/json',
        'x-auth-token': token!
    }})
    let json = await response.json()
    return json.data

}
export async function deleteNote(request: APIRequestContext, id:string){

    
    let response = await request.delete('api/notes',{headers: {
        accept: 'application/json',
        'x-auth-token': token!
    },
    params:{'title':id,

    }
})
    let json = await response.json()
    return json.data
}