import { useState } from "react";

import ProjectsSideBar from "./components/ProjectsSideBar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectDetail from "./ProjectDetail";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      const newProject = {
        ...projectData,
        id: new Date().toISOString(),
      };

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleCancelProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleOnSelectProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  function handleProjectDelete(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: projectsState.projects.filter((project) => project.id !== id),
        tasks: projectsState.tasks.filter((task) => task.projectId !== id),
      };
    });
  }

  function addNewTask(text) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: [
          ...prevState.tasks,
          {
            id: new Date().toISOString(),
            text: text,
            projectId: prevState.selectedProjectId,
          },
        ],
      };
    });
  }

  function deleteTask(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: projectsState.tasks.filter((task) => task.id !== id),
      };
    });
  }

  let content = (
    <ProjectDetail
      project={projectsState.projects.find(
        (project) => project.id === projectsState.selectedProjectId
      )}
      onProjectDelete={handleProjectDelete}
      onAddNewTask={addNewTask}
      tasks={projectsState.tasks.filter(
        (task) => task.projectId === projectsState.selectedProjectId
      )}
      onDeleteTask={deleteTask}
    />
  );

  if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onAddNewProject={handleStartAddProject} />;
  } else if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject
        onNewProjectSave={handleAddProject}
        onCancelProject={handleCancelProject}
      />
    );
  }

  return (
    <>
      <main className="h-screen my-8 flex gap-8">
        <ProjectsSideBar
          onAddNewProject={handleStartAddProject}
          projects={projectsState.projects}
          selectedProjectId={projectsState.selectedProjectId}
          onSelectProject={handleOnSelectProject}
        />
        {content}
      </main>
    </>
  );
}

export default App;
