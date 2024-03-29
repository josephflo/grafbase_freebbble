import ProjectForm from "@/components/ProjectForm";
import Modal from "@/components/Modal";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { ProjectInterface } from "@/common.types";
import { getAllProjectDetails } from "@/lib/actions";

const EditProject = async ({params:{id}}:{params:{id:string}}) => {
  const session = await getCurrentUser();
  if (!session?.user) redirect("/");

  const result = await getAllProjectDetails(id) as {
    project?: ProjectInterface
  }

  return (
    <Modal>
      <h3 className="modal-head-text">Edit your Project</h3>
      <ProjectForm 
       type="edit" 
       session={session} 
       project={result?.project}
       />
    </Modal>
  );
};

export default EditProject;
