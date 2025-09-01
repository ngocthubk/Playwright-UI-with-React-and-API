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
export async function deleteNote(request: APIRequestContext, id:string):Promise<any>{
    
    let response = await request.delete(`api/notes/${id}`,{headers: {
        accept: 'application/json',
        'x-auth-token': token!
    }
})
    // let json = await response.json()
    return response
}

export async function createNote(request: APIRequestContext, title:string,description: string, category: string):Promise<any>{    
    let response = await request.post('api/notes',{headers: {
        'Accept': 'application/json',
        'x-auth-token': token!
    },
    form:{'title':`${title}`,
            'description': `${description}`,
            'category': `${category}`
    }
    })  
  
    console.log(response.statusText())
    console.log(await response.text())  
    if (response.ok()){
        
        let json = await response.json()
        return json.data
    }else
        return response
}

export async function getNote(request: APIRequestContext, id:string):Promise<any>{    
    let response = await request.get(`api/notes/${id}`,{headers: {
        accept: 'application/json',
        'x-auth-token': token!
    }
    })    
    if (response.ok()){
        
        let json = await response.json()
        return json.data
    }else
        return response
}