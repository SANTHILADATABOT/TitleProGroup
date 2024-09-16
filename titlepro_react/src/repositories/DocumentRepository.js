import CommonVariables from "../layouts/CommonVariables";

class DocumentRepository {
    //document view
    static document_view_index = async (formData) => {
        const formDataLoad = { ...formData, user_id: CommonVariables.userId };
        const response = await fetch(`${CommonVariables.apiUrl}/document_view_index`, {method: 'POST',headers: {'Content-Type': 'application/json',},body: JSON.stringify(formDataLoad)});
        return (response.ok)?response.json():[];
    };
    static document_view_logs = async (formData) => {
        const formDataLoad = { ...formData, user_id: CommonVariables.userId };
        const response = await fetch(`${CommonVariables.apiUrl}/document_view_logs`, {method: 'POST',headers: {'Content-Type': 'application/json',},body: JSON.stringify(formDataLoad)});
        return (response.ok)?response.json():[];
    };
    static document_view_insert_file = async (formData) => {
        formData.append('userId', CommonVariables.userId);
        const response = await fetch(`${CommonVariables.apiUrl}/document_view_insert_file`, {method: 'POST',body: formData,headers: {}});
        return (response.ok)?response.json():[];
    };
    static document_view_insert_folder = async (formData) => {
        const formDataLoad = { ...formData, user_id: CommonVariables.userId };
        const response = await fetch(`${CommonVariables.apiUrl}/document_view_insert_folder`, {method: 'POST',headers: {'Content-Type': 'application/json',},body: JSON.stringify(formDataLoad)});
        return (response.ok)?response.json():[];
    };
    static document_view_rename = async (formData) => {
        const formDataLoad = { ...formData, user_id: CommonVariables.userId };
        const response = await fetch(`${CommonVariables.apiUrl}/document_view_rename`, {method: 'POST',headers: {'Content-Type': 'application/json',},body: JSON.stringify(formDataLoad)});
        return (response.ok)?response.json():[];
    };
    static document_view_get_count = async (formData) => {
        const formDataLoad = { ...formData, user_id: CommonVariables.userId };
        const response = await fetch(`${CommonVariables.apiUrl}/document_view_get_count`, {method: 'POST',headers: {'Content-Type': 'application/json',},body: JSON.stringify(formDataLoad)});
        return (response.ok)?response.json():[];
    };
    static document_view_delete = async (formData) => {
        const formDataLoad = { ...formData, user_id: CommonVariables.userId };
        const response = await fetch(`${CommonVariables.apiUrl}/document_view_delete`, {method: 'POST',headers: {'Content-Type': 'application/json',},body: JSON.stringify(formDataLoad)});
        return (response.ok)?response.json():[];
    };
    
}

export default DocumentRepository;
