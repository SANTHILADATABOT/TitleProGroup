import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";
import DocumentRepository from "../../../../repositories/DocumentRepository";
import CommonVariables from "../../../../layouts/CommonVariables";
import Swal from 'sweetalert2';
import { Tabs } from "antd";
import OrdersRepository from "../../../../repositories/OrdersRepository";
import DataTableComponent from "../../../inc/components/DataTableComponent";
import LoadingSpinner from "../../../inc/components/LoadingSpinner";
import UserRightsRepository from "../../../../repositories/UserRightsRepository";

const Document = () => {
    const navigate = useNavigate();

    var [table_col, set_table_col] = useState(["Sno", "Date", "User Name", "Entry Name", "Action"]);
    var [table_content_div, set_table_content_div] = useState([]);
    var [id_history, set_id_history] = useState(["0"]);
    var [id_history_pos, set_id_history_pos] = useState(0);
    var [selected_folder_id, set_selected_folder_id] = useState("0");
    var [selected_folder_path, set_selected_folder_path] = useState("/");
    var [file_view, set_file_view] = useState([]);
    
    const { order_id } = useParams();

    const [activeKey, setActiveKey] = useState("");
    const [items, setItems] = useState([]);

    useEffect(() => {
        document.title = `${CommonVariables.project_title} : Document`;

        getTabs("");

    }, []);
    
    const [loading, setLoading] = useState(false);
    const refreshTable = () => {
      setLoading(true);

      gotoFolder(selected_folder_id);
      fetch_logs_data();
      
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    var [user_rights, set_user_rights] = useState({});
    useEffect(() => {
      const fetch_data = async () => {
        var response1 = await UserRightsRepository.get_user_rights({user_type_id: CommonVariables?.userDetails?.user_type_id, user_screen_id: 23});
        if (response1) {
          if (response1?.status === "SUCCESS") {
            set_user_rights(response1?.get_user_rights);
          }
        }
      };
      fetch_data();
    }, [CommonVariables]);
  
    useEffect(() => {
        gotoFolder(selected_folder_id);
        
        fetch_logs_data();
    }, [order_id, user_rights]);

    const getTabs = async (cTab) => {
        const result = await OrdersRepository.orders_tab_index();
        if (result?.status === "SUCCESS") {
            setItems(result?.orders_tab_index[0]?.items.reverse());
            setActiveKey(cTab || order_id);
        }
    };

    const fetch_logs_data = async () => {
        var response1 = await DocumentRepository.document_view_logs({order_id: order_id});
        if(response1){
            if(response1?.status === 'SUCCESS'){
                var table_content_div1 = [];
                (response1?.orders_file_history || []).forEach((element, index) => {
                    var tb_row = [index+1, element?.created_datetime || '', element?.uploaded_by || '', element?.entry_name || '', (<div style={{width:"200px"}}>{element?.action || ''}</div>)];
                    table_content_div1.push(tb_row);
                });
                set_table_content_div(table_content_div1);
            }
        }
    };
    
    const gotoFolder = async (folder_id) => {
        var response1 = await DocumentRepository.document_view_index({folder_id: folder_id,order_id: order_id});
        if(response1){
            if(response1?.status === 'SUCCESS'){
                set_selected_folder_id(folder_id);
                set_selected_folder_path(response1?.folder_path || "/");
                set_file_view(response1?.document_view_index || []);
            }
        }
    };

    const openModel = (modelFor) => {
        if (modelFor === "newFile") {
            const selected_folder_id1 = selected_folder_id;
            var file_name = '';
            Swal.fire({
                title: "Add New File",
                showCancelButton: true,
                confirmButtonColor: "#28a745",
                confirmButtonText: `<i class="fas fa-file-circle-plus"></i> Add File`,
                cancelButtonText: "Cancel",
                input: "file",
                inputAttributes: {
                    placeholder: "Select File"
                },
                showLoaderOnConfirm: true,
                preConfirm: async (login) => {
                    if (!login) {
                        alert("Select File");
                        return false;
                    } else {
                        file_name = login;
                    }
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    if ((selected_folder_id1 !== '') && (file_name)) {
                        const file_type = file_name?.type.split('/');
                        var file_size = "0 KB";
                        const kilobytes = parseFloat(file_name?.size) / 1024;
                        // Calculate GB
                        const KB_IN_GB = 1024 * 1024;
                        const gb = (kilobytes / KB_IN_GB);
                        if(Math.floor(gb) > 0){
                            file_size = `${gb.toFixed(2)} GB`;
                        }else{
                            // Calculate MB
                            const KB_IN_MB = 1024;
                            const mb = (kilobytes / KB_IN_MB);
                            if(Math.floor(mb) > 0){
                                file_size = `${mb.toFixed(2)} MB`;
                            }else{
                                // Remaining KB
                                const kb = kilobytes;
                                file_size = `${kb.toFixed(2)} KB`;
                            }
                        }
                        const formData = new FormData();
                        formData.append('folder_id', selected_folder_id1);
                        formData.append('file_name', file_name?.name);
                        formData.append('type', ((file_type[0]==='image')?'image':'file'));
                        formData.append('extension', file_type[1]);
                        formData.append('file', file_name);
                        formData.append('size', file_size);
                        formData.append('order_id', order_id);
                        const get_init_datas = async () => {
                            const response = await DocumentRepository.document_view_insert_file(formData);
                            if (response != null) {
                                if (response?.status === 'SUCCESS') {
                                    gotoFolder(selected_folder_id1);
                                    fetch_logs_data();
                                    Swal.fire({
                                        title: response?.message,
                                        icon: 'success',
                                        timer: 1000,
                                        timerProgressBar: true,
                                        showConfirmButton: false,
                                    });
                                }else{
                                    Swal.fire({
                                        title: response?.message,
                                        icon: 'danger',
                                        timer: 1000,
                                        timerProgressBar: true,
                                        showConfirmButton: false,
                                    });
                                }
                            }
                        };
                        get_init_datas();
                    } else {
                        Swal.fire({
                            title: 'something went wrong',
                            icon: 'warning',
                            timer: 1000,
                            timerProgressBar: true,
                            showConfirmButton: false,
                        });
                    }
                }
            });
        }
        else if (modelFor === "newFolder") {
            const selected_folder_id1 = selected_folder_id;
            var folder_name = '';
            Swal.fire({
                title: "Add New Folder",
                showCancelButton: true,
                confirmButtonColor: "#28a745",
                confirmButtonText: `<i class="fa fa-folder-plus"></i> Add Folder`,
                cancelButtonText: "Cancel",
                input: "text",
                inputAttributes: {
                    placeholder: "Enter Folder Name"
                },
                showLoaderOnConfirm: true,
                preConfirm: async (login) => {
                    if (login === '') {
                        alert("Enter Folder Name");
                        return false;
                    } else {
                        folder_name = login;
                    }
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    if ((selected_folder_id1 !== '') && (folder_name !== '')) {
                        const get_init_datas = async () => {
                            const response = await DocumentRepository.document_view_insert_folder({ folder_id: selected_folder_id1, file_name: folder_name, order_id: order_id });
                            if (response != null) {
                                if (response?.status === 'SUCCESS') {
                                    gotoFolder(selected_folder_id1);
                                    fetch_logs_data();
                                    Swal.fire({
                                        title: response?.message,
                                        icon: 'success',
                                        timer: 1000,
                                        timerProgressBar: true,
                                        showConfirmButton: false,
                                    });
                                }else{
                                    Swal.fire({
                                        title: response?.message,
                                        icon: 'danger',
                                        timer: 1000,
                                        timerProgressBar: true,
                                        showConfirmButton: false,
                                    });
                                }
                            }
                        };
                        get_init_datas();
                    } else {
                        Swal.fire({
                            title: 'something went wrong',
                            icon: 'warning',
                            timer: 1000,
                            timerProgressBar: true,
                            showConfirmButton: false,
                        });
                    }
                }
            });
        }
        else if (modelFor === "delete") {
            var select_ids1 = document.getElementsByName('select_cb');
            var select_ids = [];
            for(let i1=0;i1<select_ids1.length;i1++){
                if(select_ids1[i1].checked){
                    select_ids.push(select_ids1[i1].value);
                }
            }
            if(select_ids.length > 0){
                deleteFile(select_ids);
            }
        }
    };

    const renameFile = (type, id, value) => {
        const selected_id1 = id;
        var folder_name = '';
        Swal.fire({
            title: "Rename "+type,
            showCancelButton: true,
            confirmButtonColor: "#28a745",
            confirmButtonText: `<i class="fa fa-save"></i> Save Change`,
            cancelButtonText: "Cancel",
            input: "text",
            inputValue: value,
            inputAttributes: {
                placeholder: "Enter "+type+" Name"
            },
            showLoaderOnConfirm: true,
            preConfirm: async (login) => {
                if (login === '') {
                    alert("Enter "+type+" Name");
                    return false;
                } else {
                    folder_name = login;
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                if ((selected_id1 !== '') && (folder_name !== '')) {
                    const get_init_datas = async () => {
                        const response = await DocumentRepository.document_view_rename({ id: selected_id1, file_name: folder_name, order_id: order_id });
                        if (response != null) {
                            if (response?.status === 'SUCCESS') {
                                gotoFolder(selected_folder_id);
                                fetch_logs_data();
                                Swal.fire({
                                    title: response?.message,
                                    icon: 'success',
                                    timer: 1000,
                                    timerProgressBar: true,
                                    showConfirmButton: false,
                                });
                            }else{
                                Swal.fire({
                                    title: response?.message,
                                    icon: 'danger',
                                    timer: 1000,
                                    timerProgressBar: true,
                                    showConfirmButton: false,
                                });
                            }
                        }
                    };
                    get_init_datas();
                } else {
                    Swal.fire({
                        title: 'something went wrong',
                        icon: 'warning',
                        timer: 1000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    });
                }
            }
        });
    };

    const deleteFile = (id) => {
        if(id.length > 0) {
            const get_init_datas = async () => {
                const response = await DocumentRepository.document_view_get_count({ id: JSON.stringify(id) });
                if (response != null) {
                    if (response?.status === 'SUCCESS') {
                        if((response?.files > 0) || (response?.Folders > 0)){
                            var file_size = "0 KB";
                            const kilobytes = parseFloat(response?.size);
                            // Calculate GB
                            const KB_IN_GB = 1024 * 1024;
                            const gb = (kilobytes / KB_IN_GB);
                            if(Math.floor(gb) > 0){
                                file_size = `${gb.toFixed(2)} GB`;
                            }else{
                                // Calculate MB
                                const KB_IN_MB = 1024;
                                const mb = (kilobytes / KB_IN_MB);
                                if(Math.floor(mb) > 0){
                                    file_size = `${mb.toFixed(2)} MB`;
                                }else{
                                    // Remaining KB
                                    const kb = kilobytes;
                                    file_size = `${kb.toFixed(2)} KB`;
                                }
                            }
                            proceedDelete(response?.ids, response?.files, response?.Folders, file_size);
                        }
                    }
                }
            };
            get_init_datas();
        }
    };
    const proceedDelete = (id, files, Folders, size) => {
        Swal.fire({
            title: "Delete Selected",
            text: `${Folders} Folders, ${files} Files, Total Size: ${size}`,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#D33',
            confirmButtonText: `<i class="fa fa-trash"></i> Confirm Delete`,
            cancelButtonText: "Cancel",
            closeOnConfirm: false,
            closeOnCancel: false
        }).then((result) => {
            if (result.isConfirmed) {
                const get_init_datas = async () => {
                    const response = await DocumentRepository.document_view_delete({ id: JSON.stringify(id), order_id: order_id, action_lb: `${Folders} Folders, ${files} Files, Total Size: ${size}` });
                    if (response != null) {
                        if (response?.status === 'SUCCESS') {
                            gotoFolder(selected_folder_id);
                            fetch_logs_data();
                            Swal.fire({
                                title: response?.message,
                                icon: 'success',
                                timer: 1000,
                                timerProgressBar: true,
                                showConfirmButton: false,
                            });
                        }else{
                            Swal.fire({
                                title: response?.message,
                                icon: 'danger',
                                timer: 1000,
                                timerProgressBar: true,
                                showConfirmButton: false,
                            });
                        }
                    }
                };
                get_init_datas();
            }
        });
    };

    const onChange = (newActiveKey) => {
        navigate(`/order-entry/${newActiveKey}/orders-documents`);
        setActiveKey(newActiveKey);
    };    
    
    const remove = async (targetKey) => {
        let newActiveKey = activeKey;
        let lastIndex = -1;
        const dataTab = { tab_id: targetKey };
        const result = await OrdersRepository.orders_tab_delete(dataTab);
        if (result?.status === "SUCCESS") {
            items.forEach((item, i) => {
                if (item.key === targetKey) {
                lastIndex = i - 1;
                }
            });
            const newPanes = items.filter((item) => item.key !== targetKey);
            if (newPanes.length && newActiveKey === targetKey) {
                if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
                } else {
                newActiveKey = newPanes[0].key;
                }
            }
            getTabs(newActiveKey);
            navigate(`/order-entry/${newActiveKey}/orders-documents`);
            setItems(newPanes);
            // setActiveKey(newActiveKey);
        }
    };
    
    const onEdit = (targetKey, action) => {
        remove(targetKey);
    };
    
    return (
        <>
        <div className="container-fluid">
            <div className="page-header">
                <div className="row">
                    <div className="col-lg-6 main-header">
                        <h2>Document <span></span></h2>
                    </div>
                    <div className="col-lg-6" style={{textAlign:"right"}}>
                        <button className="btn btn-info" onClick={()=>refreshTable()}><i className="fa fa-refresh"></i></button>
                    </div>
                </div>
                <div className="row" id="tabpanel">
                    <div className="col-lg-12">
                    <Tabs
                        hideAdd
                        type="editable-card"
                        onChange={onChange}
                        activeKey={activeKey}
                        onEdit={onEdit}
                        items={items}
                    />
                    </div>
                </div>
            </div>
            {loading ? (
              <LoadingSpinner />
            ) : (
            <div className="row">
                <div className="col-md-6">
                <DataTableComponent column={table_col} row_data={table_content_div} exportColumns={[0,1,2,3,4]} exportBtns={{excel:true,pdf:true}} exportTitle="Order File History" />
                </div>
                <div className="col-md-6">
                    <div className="common-file-manager">
                        <div className="filemanger">
                            <div className="top-menu">
                                <button onClick={() => openModel('newFile')}><i className="fas fa-file-circle-plus"></i>Add Files</button>
                                <button onClick={() => openModel('newFolder')}><i className="fa fa-folder-plus"></i>Add Folder</button>
                                <button onClick={() => openModel('delete')}><i className="fa fa-trash"></i>Delete</button>
                                <div className="btn ps-2 pe-2" style={{display:"inline",verticalAlign:"center",border:"none",margin:"4px"}}>
                                    <input type="checkbox" id="select_all_file_cb" onChange={(e)=>{
                                        const valu = e.target.checked;
                                        var select_ids1 = document.getElementsByName('select_cb');
                                        for(let i1=0;i1<select_ids1.length;i1++){
                                            select_ids1[i1].checked = valu;
                                        }
                                    }} />{" "}
                                    <label htmlFor="select_all_file_cb">Select All</label>
                                </div>
                            </div>
                            <div className="top-folder-path">
                                <div className="path-action-btns">
                                    <button id="backwardBtn" onClick={() => {}}><i className="fa fa-arrow-left"></i></button>
                                    <button id="forwardBtn" onClick={() => {}}><i className="fa fa-arrow-right"></i></button>
                                    <button onClick={() => gotoFolder("0")}><i className="fa fa-house"></i></button>
                                </div>
                                <div className="folder-path-write">
                                    <input className="folder-path-input" type="text" value={selected_folder_path} />
                                    <button className="block-btn-1" onClick={(e) => {gotoFolder(selected_folder_id); let i = e.target.closest('button').querySelector('i'); i.classList.add('fa-spin');setTimeout(() => {i.classList.remove('fa-spin');}, 1000);}}><i className="fa fa-arrows-rotate"></i></button>
                                </div>
                            </div>
                            {(file_view.length > 0)?(
                            <div className="file-manager-grid block-wrapper w-100">
                            {file_view.map((file_view1) => {
                                if(file_view1?.type === 'folder'){
                                    return (
                                        <div className="folder">
                                            <div style={{width:"100%",textAlign:"right"}}>
                                                <input type="checkbox" name="select_cb" value={file_view1?.id} style={{marginRight:"5px"}} />
                                            </div>
                                            <div className="folder-icon-container" onDoubleClick={() => gotoFolder(`${file_view1?.id}` || "0")}>
                                            <div className="folder-icon"></div>
                                            </div>
                                            <div className="common-space text-center">
                                            <p className="folder-name">{file_view1?.file_name || ""}<br/>{file_view1?.size || ""}</p>
                                            </div>
                                            <div style={{width:"100%",textAlign:"right"}}>
                                                <div className="dropdown action-dropdown">
                                                    <button type="button" className="btn p-0" data-bs-toggle="dropdown" aria-expanded="true" style={{border:"none"}}>
                                                        &nbsp;&nbsp;<i className="fas fa-ellipsis-v fs-5"></i>&nbsp;&nbsp;
                                                    </button>
                                                    <div className="dropdown-menu dropdown-menu-end shadow" data-popper-placement="bottom-end" style={{position: "absolute", inset: "0px 0px auto auto", margin: "0px", transform: "translate(-51px, 27px)"}}>
                                                        <div className="dropdown-item" onClick={() => gotoFolder(`${file_view1?.id}` || "0")}>
                                                            <i className="fas fa-folder-open text-primary fw-bold"></i>{" "}Open Folder
                                                        </div>
                                                        <div className="dropdown-item" onClick={()=>renameFile('Folder', file_view1?.id, file_view1?.file_name)}>
                                                            <i className="fas fa-edit text-primary fw-bold"></i>{" "}Rename
                                                        </div>
                                                        <div className="dropdown-item" onClick={()=>deleteFile([`${file_view1?.id}`])}>
                                                            <i className="fas fa-trash text-danger fw-bold"></i>{" "}Delete
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }else{
                                    return (
                                        <div className="file">
                                            <div style={{width:"100%",textAlign:"right"}}>
                                                <input type="checkbox" name="select_cb" value={file_view1?.id} style={{marginRight:"5px"}} />
                                            </div>
                                            {(file_view1?.type === 'image')?(
                                            <div className="image-preview">
                                                <img className="img-fluid" src={`${CommonVariables.file_path}/file_view/${file_view1?.saved_file}`} alt="mountain" />
                                            </div>
                                            ):(
                                            <div className="doc-icon-container">
                                                <div className="doc-icon">
                                                    <p>{file_view1?.extension || ""}</p>
                                                </div>
                                            </div>
                                            )}
                                            <div className="common-space text-center">
                                                <p className="file-name">{file_view1?.file_name || ""}</p><span>{file_view1?.size || ""}</span>
                                            </div>
                                            <div style={{width:"100%",textAlign:"right"}}>
                                                <div className="dropdown action-dropdown">
                                                    <button type="button" className="btn p-0" data-bs-toggle="dropdown" aria-expanded="true" style={{border:"none"}}>
                                                        &nbsp;&nbsp;<i className="fas fa-ellipsis-v fs-5"></i>&nbsp;&nbsp;
                                                    </button>
                                                    <div className="dropdown-menu dropdown-menu-end shadow" data-popper-placement="bottom-end" style={{position: "absolute", inset: "0px 0px auto auto", margin: "0px", transform: "translate(-51px, 27px)"}}>
                                                        <a href={`${CommonVariables.file_path}/file_view/${file_view1?.saved_file}`} download={`${file_view1?.file_name}`} className="dropdown-item">
                                                            <i className="fas fa-download text-primary fw-bold"></i>{" "}Download
                                                        </a>
                                                        <div className="dropdown-item" onClick={()=>renameFile('Folder', file_view1?.id, file_view1?.file_name)}>
                                                            <i className="fas fa-edit text-primary fw-bold"></i>{" "}Rename
                                                        </div>
                                                        <div className="dropdown-item" onClick={()=>proceedDelete([`${file_view1?.id}`], 1, 0, file_view1?.size)}>
                                                            <i className="fas fa-trash text-danger fw-bold"></i>{" "}Delete
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                            })}
                            </div>
                            ):(
                            <div className="folderEmpty w-100" style={{display:"block",padding:"50px"}}>
                                <h5 className="m-0">This folder is currently empty!</h5>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            )}
        </div>
        </>
    );
};

export default Document;
