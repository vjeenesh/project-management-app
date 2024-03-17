import Tasks from "./components/Tasks";

export default function ProjectDetail({
  project,
  onProjectDelete,
  onAddNewTask,
  onDeleteTask,
  tasks,
}) {
  const formattedDate = new Date(project.dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1>{project.title}</h1>
          <button
            onClick={() => onProjectDelete(project.id)}
            className="text-stone-600 hover:text-stone-950"
          >
            Delete project
          </button>
        </div>
        <p className="mb-4 text-stone-400">{formattedDate}</p>
        <p className="text-stone-600 whitespace-pre-wrap">
          {project.description}
        </p>
      </header>
      <Tasks
        tasks={tasks}
        onAddNewTask={onAddNewTask}
        onDeleteTask={onDeleteTask}
      />
    </div>
  );
}
