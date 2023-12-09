"use client";
import { ProjectInterface, SessionInterface } from "@/common.types";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import FormField from "./FormField";
import CustomMenu from "./CustomMenu";
import { categoryFilters } from "@/constants";
import Button from "./Button";
import { createNewProject, fetchToken, updateProject } from "@/lib/actions";
import { useRouter } from "next/navigation";

type Props = {
  type: string;
  session: SessionInterface;
  project?: ProjectInterface
};
const ProjectForm = ({ type, session, project }: Props) => {
  const router = useRouter();
  //states
  const [isSubmitting, setisSubmitting] = useState(false)
  const [form, setForm] = useState({
    title: project?.title || "",
    image: project?.image || "",
    description: project?.description || "",
    liveSiteUrl: project?.liveSiteUrl || "",
    githubUrl: project?.githubUrl || "",
    category: project?.category || "",
  })

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setisSubmitting(true);
    const {token} = await fetchToken()
    console.log("token",token);
    
    try {
      if(type === 'create'){
        await createNewProject(form, session?.user?.id, token);
        router.push('/')
      }
      if(type === 'edit')
      await updateProject(form, project?.id as string, token)
    router.push('/')
    alert('Project created succesfully')
    } catch (error) {
      console.error(error);
    } finally {
      setisSubmitting(false)
    }
  };
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0]
    if(!file) return ;
    if(!file.type.includes('image')){
      return alert('Please upload a supported image')
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      handleStateChange('image', result)
    }
  };

  const handleStateChange = (fieldName:string, value:string) => {
    setForm((prevState) => (
      { ...prevState, [fieldName]: value }
    ))
  }



  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && "Choose a poster for your project"}
        </label>
        <input
          id="image"
          type="file"
          accept="'image/*"
          required={type === "create"}
          className="form_image-input"
          onChange={handleChangeImage}
        />
        {form.image && (
          <Image
            src={form?.image}
            className="sm:p-10 object-contain z-20"
            alt="project_poster"
            fill
          />
        )}
      </div>
      <FormField
        title= 'Title'
        state={form.title}
        placeholder='Freebbble'
        setState={(value) => handleStateChange('title',value)}
      />
      <FormField 
        title= 'Description'
        state={form.description}
        placeholder='Showcase and discover remakable developer projects.'
        setState={(value) => handleStateChange('description',value)}
      />
      <FormField 
        type= 'url'
        title= 'Website URL'
        state={form.liveSiteUrl}
        placeholder='Freebbble'
        setState={(value) => handleStateChange('liveSiteUrl',value)}
      />
      <FormField 
      type= 'url'
        title= 'GitHub URL'
        state={form.githubUrl}
        placeholder='Freebbble'
        setState={(value) => handleStateChange('githubUrl',value)}
      />
      
      <CustomMenu
        title='Category'
        state={form.category}
        filters={categoryFilters}
        setState={(value)=>handleStateChange('category',value)}
      />
      <div className="flexStart w-full">
        <Button
          title={isSubmitting ? `${type === "create" ? "Creating" : "Editing"}` : `${type === "create" ? "Create" : "Edit"}`}
          type= 'submit'
          leftIcon= {isSubmitting ? "" : '/plus.svg'}
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  );
};

export default ProjectForm;
