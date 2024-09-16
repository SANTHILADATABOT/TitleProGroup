import CommonVariables from "../layouts/CommonVariables";

class ReportsRepository {
  // Orders Report
  static orders_report_index = async (formData) => {
    const response = await fetch(`${CommonVariables.apiUrl}/orders_report_index`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    return response.ok ? response.json() : [];
  };
  // Tasks Report
  static tasks_report_index = async (formData) => {
    const response = await fetch(`${CommonVariables.apiUrl}/tasks_report_index`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    return response.ok ? response.json() : [];
  };
}

export default ReportsRepository;
