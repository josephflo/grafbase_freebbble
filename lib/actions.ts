import CreateProject from "@/app/create-project/page";
import { ProjectForm } from "@/common.types";
import { createProjectMutation, createUserMutation, deleteProjectMutation, getAllProjectsQuery, getProjectByIdQuery, getProjectsOfUserQuery, getUserQuery, projectsQuery, updateProjectMutation } from "@/graphql";
import { GraphQLClient } from "graphql-request"

const isProduction = process.env.NODE_ENV === 'production';
const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '' : 'http://127.0.0.1:4000/graphql'
const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' : 'letmein'
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000'

const client = new GraphQLClient(apiUrl)

const makeGraphQLClient = async (query: string, variables = {}) => {
  try {
    return await client.request(query, variables)
  } catch (error) {
    throw error;
  }
}

export const getUser = (email: string) => {
  client.setHeader('x-api-key', apiKey)
  return makeGraphQLClient(getUserQuery, {email})
}

export const createUser = (name: string,email: string, avatarUrl: string) => {
  client.setHeader('x-api-key', apiKey)
  const variables = {
    input: {
      name,email, avatarUrl
    }
  }
  return makeGraphQLClient(createUserMutation, variables)

}

export const uploadImage = async (imagePath: string) => {
  try {
    const response = await fetch(`${serverUrl}/api/upload`,{
      method: 'POST',
      body: JSON.stringify({ path: imagePath})
    })
    return response.json()
  } catch (error) {
    throw error;
  }
}

export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/auth/token`);
    return response.json()
  } catch (error) {
    throw error
  }
}

const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    return await client.request(query, variables);
  } catch (err) {
    throw err;
  }
};

export const createNewProject = async (form: ProjectForm, creatorId: string, token: string) => {
  const imageUrl = await uploadImage(form.image);

  if (imageUrl.url) {
    client.setHeader("Authorization", `Bearer ${token}`);
    
    const variables = {
      input: { 
        ...form, 
        image: imageUrl.url, 
        createdBy: { 
          link: creatorId 
        }
      }
    };

    return makeGraphQLRequest(createProjectMutation, variables);
  }
};

export const fetchAllProjects = (category?: string, endcursor?: string) => {
  client.setHeader('x-api-key', apiKey);
  
  const query = category ? projectsQuery : getAllProjectsQuery;
  const variables = category ? { category, endcursor } : { endcursor };
  
  return makeGraphQLRequest(query, variables);
  };

export const getAllProjectDetails = (id:string) => {
  client.setHeader('x-api-key', apiKey)
  return makeGraphQLClient(getProjectByIdQuery, {id})
}

export const getUserProjects = (id:string, last?:number) => {
  client.setHeader('x-api-key', apiKey)
  return makeGraphQLClient(getProjectsOfUserQuery, {id, last})
}


export const deleteProject = (id:string, token:number) => {
  client.setHeader("Authorization", `Bearer ${token}`);

  return makeGraphQLRequest(deleteProjectMutation, {id, token})
}

export const updateProject = async (form: ProjectForm ,projectId:string, token:number) => {
  function isBase64DataURL(value: string) {
    const base64Regex = /^data:image\/[a-z]+;base64,/;
    return base64Regex.test(value); 
  }
  let updatedForm = {...form}
  const isUploadingNewImage = isBase64DataURL(form.image)
  if(isUploadingNewImage){
    const imageUrl = await uploadImage(form.image);
    if(imageUrl.url){
      updatedForm= {
        ...form,
        image: imageUrl.url
      }
    }
  }
  const variables = {
    id: projectId,
    input: updatedForm,
  }

  client.setHeader("Authorization", `Bearer ${token}`);

  return makeGraphQLRequest(updateProjectMutation, variables)
}