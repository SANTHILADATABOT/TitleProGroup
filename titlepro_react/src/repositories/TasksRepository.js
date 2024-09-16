import CommonVariables from "../layouts/CommonVariables";

class TasksRepository {
  //Tasks
  static tasks_list_index = async (formData) => {
    const response = await fetch(`${CommonVariables.apiUrl}/tasks_list_index`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    return response.ok ? response.json() : [];
  };
}

export default TasksRepository;
