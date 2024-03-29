"use client";

import { deleteProject, fetchToken } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ProjectActions = ({ projectId }: { projectId: string }) => {
  const router = useRouter()
  //states
  const [isDeleting, setisDeleting] = useState(false);

  const handleDeleteProject = async () => {
    setisDeleting(true);
    const {token} = await fetchToken();
    try {
      await deleteProject(projectId, token)
      router.push('/')
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Link
        href={`/edit-project/${projectId}`}
        className="flexCenter edit-action_btn"
      >
        <Image src="/pencile.svg" width={15} height={15} alt="edit_button" />
      </Link>
      <button
        type="button"
        className={`flexCenter delete-action_btn ${
          isDeleting ? "bg-gray" : "bg-primary-purple"
        }`}
        onClick={handleDeleteProject}
      >
        <Image src="/trash.svg" width={15} height={15} alt="delete" />
      </button>
    </>
  );
};

export default ProjectActions;
