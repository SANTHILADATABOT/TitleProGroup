import CommonVariables from "../layouts/CommonVariables";

class AdminRepository {
    //user type creation
    static user_type_creation_index = async (formData) => {
        const response = await fetch(`${CommonVariables.apiUrl}/user_type_creation_index`, {method: 'POST',headers: {'Content-Type': 'application/json',},body: JSON.stringify(formData)});
        return (response.ok)?response.json():[];
    };
    static user_type_creation_insert = async (formData) => {
        const response = await fetch(`${CommonVariables.apiUrl}/user_type_creation_insert`, {method: 'POST',headers: {'Content-Type': 'application/json',},body: JSON.stringify(formData)});
        return (response.ok)?response.json():[];
    };
    static user_type_creation_edit = async (formData) => {
        const response = await fetch(`${CommonVariables.apiUrl}/user_type_creation_edit`, {method: 'POST',headers: {'Content-Type': 'application/json',},body: JSON.stringify(formData)});
        return (response.ok)?response.json():[];
    };
    static user_type_creation_update = async (formData) => {
        const response = await fetch(`${CommonVariables.apiUrl}/user_type_creation_update`, {method: 'POST',headers: {'Content-Type': 'application/json',},body: JSON.stringify(formData)});
        return (response.ok)?response.json():[];
    };
    static user_type_creation_delete = async (formData) => {
        const response = await fetch(`${CommonVariables.apiUrl}/user_type_creation_delete`, {method: 'POST',headers: {'Content-Type': 'application/json',},body: JSON.stringify(formData)});
        return (response.ok)?response.json():[];
    };
    
    //user creation
    static user_creation_index = async (formData) => {
        const response = await fetch(`${CommonVariables.apiUrl}/user_creation_index`, {method: 'POST',headers: {'Content-Type': 'application/json',},body: JSON.stringify(formData)});
        return (response.ok)?response.json():[];
    };
    static user_creation_create = async (formData) => {
        const response = await fetch(`${CommonVariables.apiUrl}/user_creation_create`, {method: 'POST',headers: {'Content-Type': 'application/json',},body: JSON.stringify(formData)});
        return (response.ok)?response.json():[];
    };
    static user_creation_insert = async (formData) => {
        const response = await fetch(`${CommonVariables.apiUrl}/user_creation_insert`, {method: 'POST',headers: {'Content-Type': 'application/json',},body: JSON.stringify(formData)});
        return (response.ok)?response.json():[];
    };
    static user_creation_edit = async (formData) => {
        const response = await fetch(`${CommonVariables.apiUrl}/user_creation_edit`, {method: 'POST',headers: {'Content-Type': 'application/json',},body: JSON.stringify(formData)});
        return (response.ok)?response.json():[];
    };
    static user_creation_update = async (formData) => {
        const response = await fetch(`${CommonVariables.apiUrl}/user_creation_update`, {method: 'POST',headers: {'Content-Type': 'application/json',},body: JSON.stringify(formData)});
        return (response.ok)?response.json():[];
    };
    static user_creation_delete = async (formData) => {
        const response = await fetch(`${CommonVariables.apiUrl}/user_creation_delete`, {method: 'POST',headers: {'Content-Type': 'application/json',},body: JSON.stringify(formData)});
        return (response.ok)?response.json():[];
    };

    //user screen
    static user_screen_creation_index = async (formData) => {
        const response = await fetch(`${CommonVariables.apiUrl}/user_screen_creation_index`, {method: 'POST',headers: {'Content-Type': 'application/json',},body: JSON.stringify(formData)});
        return (response.ok)?response.json():[];
    };
    static user_screen_creation_create = async (formData) => {
        const response = await fetch(`${CommonVariables.apiUrl}/user_screen_creation_create`, {method: 'POST',headers: {'Content-Type': 'application/json',},body: JSON.stringify(formData)});
        return (response.ok)?response.json():[];
    };
    static user_screen_creation_insert = async (formData) => {
        const response = await fetch(`${CommonVariables.apiUrl}/user_screen_creation_insert`, {method: 'POST',headers: {'Content-Type': 'application/json',},body: JSON.stringify(formData)});
        return (response.ok)?response.json():[];
    };
    static user_screen_creation_edit = async (formData) => {
        const response = await fetch(`${CommonVariables.apiUrl}/user_screen_creation_edit`, {method: 'POST',headers: {'Content-Type': 'application/json',},body: JSON.stringify(formData)});
        return (response.ok)?response.json():[];
    };
    static user_screen_creation_update = async (formData) => {
        const response = await fetch(`${CommonVariables.apiUrl}/user_screen_creation_update`, {method: 'POST',headers: {'Content-Type': 'application/json',},body: JSON.stringify(formData)});
        return (response.ok)?response.json():[];
    };
    static user_screen_creation_delete = async (formData) => {
        const response = await fetch(`${CommonVariables.apiUrl}/user_screen_creation_delete`, {method: 'POST',headers: {'Content-Type': 'application/json',},body: JSON.stringify(formData)});
        return (response.ok)?response.json():[];
    };
    
    //user permissions
    static user_permission_get_user_type = async (formData) => {
        const response = await fetch(`${CommonVariables.apiUrl}/user_permission_get_user_type`, {method: 'POST',headers: {'Content-Type': 'application/json',},body: JSON.stringify(formData)});
        return (response.ok)?response.json():[];
    };
    static user_permission_creation_index = async (formData) => {
        const response = await fetch(`${CommonVariables.apiUrl}/user_permission_creation_index`, {method: 'POST',headers: {'Content-Type': 'application/json',},body: JSON.stringify(formData)});
        return (response.ok)?response.json():[];
    };
    static user_permission_creation_update = async (formData) => {
        const response = await fetch(`${CommonVariables.apiUrl}/user_permission_creation_update`, {method: 'POST',headers: {'Content-Type': 'application/json',},body: JSON.stringify(formData)});
        return (response.ok)?response.json():[];
    };
    
    //user logs
    static user_logs_index = async (formData) => {
        const response = await fetch(`${CommonVariables.apiUrl}/user_logs_index`, {method: 'POST',headers: {'Content-Type': 'application/json',},body: JSON.stringify(formData)});
        return (response.ok)?response.json():[];
    };
}

export default AdminRepository;
