import { useEffect, useState } from "react";
import $ from "jquery";
import AdminRepository from "../../../../repositories/AdminRepository";
import Swal from "sweetalert2";
import Select from "react-select";
import "./switch_style.css";
import LoadingSpinner from "../../../inc/components/LoadingSpinner";

const UserPermission = () => {
  const [loading, setLoading] = useState(false);
  const refreshTable = () => {
    setLoading(true);
    fetch_data();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  var [user_type_list, set_user_type_list] = useState([]);
  var [user_type_id, set_user_type_id] = useState("");
  var [formData, setFormData] = useState([]);
  var [selectAllChecked, setSelectAllChecked] = useState(false);
  var [checked1, setChecked1] = useState(false);
  var [disabled1, setDisabled1] = useState(false);
  useEffect(() => {
    const fetch_data1 = async () => {
      var response1 = await AdminRepository.user_permission_get_user_type({});
      if (response1) {
        if (response1?.status === "SUCCESS") {
          var user_type_list1 = [{ value: "", label: "Select User Type" }];
          (response1?.user_permission_get_user_type || []).forEach(
            (request1, index) => {
              user_type_list1.push({
                value: request1.user_type_id,
                label: request1.user_type_name,
              });
            }
          );
          set_user_type_list(user_type_list1);
        }
      }
    };
    fetch_data1();
  }, []);

  const userTypeChange = async (e) => {
    set_user_type_id(e.value);
  };

  useEffect(() => {
    fetch_data();
  }, [user_type_id]);

  const fetch_data = async () => {
    if (user_type_id !== "") {
      var response1 = await AdminRepository.user_permission_creation_index({
        user_type_id: user_type_id,
      });
      if (response1) {
        if (response1?.status === "SUCCESS") {
          const menuPermission_values = response1?.menuPermission_values || [];
          const user_permission_creation_index =
            response1?.user_permission_creation_index || [];
          var formData1 = [];
          setChecked1(false);
          setDisabled1(false);
          Object.entries(user_permission_creation_index).forEach(
            ([index, menuItem]) => {
              var opt1 = [];
              if (menuItem.remove_options.indexOf("view") === -1) {
                opt1.push("View");
              }
              if (menuItem.remove_options.indexOf("add") === -1) {
                opt1.push("Add");
              }
              if (menuItem.remove_options.indexOf("edit") === -1) {
                opt1.push("Edit");
              }
              if (menuItem.remove_options.indexOf("delete") === -1) {
                opt1.push("Delete");
              }
              menuItem.more_options.forEach((opt2) => opt1.push(opt2));
              var options = [];
              var checked1_all = 0;
              opt1.forEach((permissionType) => {
                var checked1 = false;
                try {
                  if (["View", "Add", "Edit", "Delete"].indexOf(permissionType) !== -1) {
                    if (menuPermission_values[index][permissionType] === "1") {
                      checked1 = true;
                    }
                  } else if (menuPermission_values[index]["more_options"][permissionType] === "1")  {
                    checked1 = true;
                  }
                } catch {
                  checked1 = false;
                }
                options.push({ label: permissionType, checked: checked1 });
                if (checked1) {
                  checked1_all++;
                }
              });
              options.unshift({
                label: "Select All",
                checked: checked1_all === opt1.length,
              });
              var sub_screen = [];
              if (!Array.isArray(menuItem.sub)) {
                Object.entries(menuItem.sub).forEach(([index_sub, subItem]) => {
                  var sub_opt1 = [];
                  if (subItem.remove_options.indexOf("view") === -1) {
                    sub_opt1.push("View");
                  }
                  if (subItem.remove_options.indexOf("add") === -1) {
                    sub_opt1.push("Add");
                  }
                  if (subItem.remove_options.indexOf("edit") === -1) {
                    sub_opt1.push("Edit");
                  }
                  if (subItem.remove_options.indexOf("delete") === -1) {
                    sub_opt1.push("Delete");
                  }
                  subItem.more_options.forEach((opt2) => sub_opt1.push(opt2));
                  var sub_options = [];
                  sub_opt1.forEach((permissionType) => {
                    var checked1 = false;
                    try {
                      if (["View", "Add", "Edit", "Delete"].indexOf(permissionType) !== -1) {
                        if (menuPermission_values[index_sub][permissionType] === "1") {
                          checked1 = true;
                        }
                      } else if (menuPermission_values[index_sub]["more_options"][permissionType] === "1") {
                        checked1 = true;
                      }
                    } catch {
                      checked1 = false;
                    }
                    sub_options.push({
                      label: permissionType,
                      checked: checked1,
                    });
                  });
                  sub_screen.push({
                    user_screen_id: index_sub,
                    screen_name: subItem.screen_name,
                    options: sub_options,
                  });
                });
              }
              formData1.push({
                user_screen_id: index,
                screen_name: menuItem.screen_name,
                options: options,
                sub_screen: sub_screen,
              });
            }
          );
          setFormData(formData1);
        }
      }
    } else {
      setFormData([]);
    }
  };

  const handleChangeSelectAll = (e) => {
    const valu = e.target.checked;
    setSelectAllChecked(valu);
    var formData1 = JSON.parse(JSON.stringify(formData));
    for (let i1 = 0; i1 < formData1.length; i1++) {
      for (let i2 = 0; i2 < formData1[i1].options.length; i2++) {
        formData1[i1].options[i2].checked = valu;
      }
      for (let i2 = 0; i2 < formData1[i1].sub_screen.length; i2++) {
        for (let i3 = 0; i3 < formData1[i1].sub_screen[i2].options.length; i3++) {
          formData1[i1].sub_screen[i2].options[i3].checked = valu;
        }
      }
    }
    setFormData(formData1);
  };

  const handleChange = (e) => {
    const valu = e.target.checked;
    const main_screen = parseInt(e.target.dataset.main_screen);
    const sub_screen = parseInt(e.target.dataset.sub_screen);
    const options = parseInt(e.target.dataset.options);
    var formData1 = JSON.parse(JSON.stringify(formData));
    if (sub_screen === 0) {
      formData1[main_screen].options[options].checked = valu;
      if (options === 0) {
        for (let i2 = 1; i2 < formData1[main_screen].options.length; i2++) {
          formData1[main_screen].options[i2].checked = valu;
        }
        for (let i2 = 0; i2 < formData1[main_screen].sub_screen.length; i2++) {
          for (
            let i3 = 0;
            i3 < formData1[main_screen].sub_screen[i2].options.length;
            i3++
          ) {
            formData1[main_screen].sub_screen[i2].options[i3].checked = valu;
          }
        }
      } else {
        const label = formData1[main_screen].options[options].label;
        for (let i2 = 0; i2 < formData1[main_screen].sub_screen.length; i2++) {
          for (
            let i3 = 0;
            i3 < formData1[main_screen].sub_screen[i2].options.length;
            i3++
          ) {
            if (
              label === formData1[main_screen].sub_screen[i2].options[i3].label
            ) {
              formData1[main_screen].sub_screen[i2].options[i3].checked = valu;
            }
          }
        }
      }
    } else {
      formData1[main_screen].sub_screen[sub_screen - 1].options[
        options
      ].checked = valu;
    }
    setFormData(formData1);
  };

  const submit_users_permission = async (e) => {
    e.preventDefault();
    if (user_type_id !== "") {
      const btn_str = document.getElementById("upload-btn").innerHTML;
      document.getElementById("upload-btn").disabled = true;
      document.getElementById(
        "upload-btn"
      ).innerHTML = `<i class="fa fa-spinner fa-spin"></i> ${btn_str}`;
      try {
        var permissions = [];
        for (let i1 = 0; i1 < formData.length; i1++) {
          var options = [];
          for (let i2 = 1; i2 < formData[i1].options.length; i2++) {
            options.push(formData[i1].options[i2]);
          }
          permissions.push({
            user_screen_id: formData[i1].user_screen_id,
            options: options,
          });
          for (let i2 = 0; i2 < formData[i1].sub_screen.length; i2++) {
            permissions.push({
              user_screen_id: formData[i1].sub_screen[i2].user_screen_id,
              options: formData[i1].sub_screen[i2].options,
            });
          }
        }
        var response1 = await AdminRepository.user_permission_creation_update({
          user_type_id: user_type_id,
          permissions: permissions,
        });
        if (response1) {
          if (response1?.status === "SUCCESS") {
            Swal.fire({
              title: "User Permission Saved Successfully",
              //text: 'This alert will close in 3 seconds.',
              icon: "success",
              timer: 1000,
              timerProgressBar: true,
              showConfirmButton: false,
            }).then((result) => {
              refreshTable();
            });
          }
        }
      } catch (error) {
        //console.error('Error submitting form:', error);
      }
      document.getElementById("upload-btn").disabled = false;
      document.getElementById("upload-btn").innerHTML = btn_str;
    }
  };
  
  return (
    <div className="container-fluid">
      <div className="page-header pb-0">
        <div className="row">
          <div className="col-lg-6 main-header">
            <h2>
              User <span>Permissions</span>
            </h2>
          </div>
          <div className="col-lg-6" style={{ textAlign: "right" }}>
            <button
              className="btn btn-info"
              onClick={() => refreshTable()}
            >
              <i className="fa fa-refresh"></i>
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">
              User Type <span className="text-danger">*</span>
            </label>
            <Select
              id="user_type_id"
              className="form-control p-0 col-sm-12"
              name="user_type_id"
              onChange={(selectedOptions) =>
                userTypeChange(selectedOptions, "user_type_id")
              }
              options={user_type_list}
              value={user_type_list.filter((option) => {
                if (user_type_id === option?.value) {
                  return user_type_id === option?.value;
                }
              })}
            />
          </div>
        </div>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : (formData.length > 0 ? (
        <div className="row">
          <div className="col-sm-12">
            <div className="row">
              <div className="col-md-6">
                <h6 className="mt-4 mb-3">Permissions</h6>
              </div>
              <div className="col-md-6" style={{ textAlign: "right" }}>
                <label className="form-label me-1">Select All</label>
                <label className="perm_switch">
                  <input
                    className="perm_switch_input"
                    type="checkbox"
                    onChange={handleChangeSelectAll}
                    checked={selectAllChecked || checked1}
                    disabled={disabled1}
                  />
                  <span className="perm_switch_slider"></span>
                </label>
              </div>
            </div>
          </div>
          <div className="col-sm-12">
            {formData.map((formData1, index) => (
              <div className="mb-2">
                <ul className="list-group">
                  <li
                    className="list-group-item border-bottom-2"
                    aria-current="true"
                  >
                    <div className="row">
                      <div className="col-md-3">{formData1.screen_name}</div>
                      <div
                        className="col-md-9"
                        style={{ textAlign: "right" }}
                      >
                        {formData1.options.map((options, index_opt) => (
                          <div
                            className="me-2"
                            style={{ display: "inline-flex" }}
                          >
                            <label className="form-label me-1">
                              {options.label}
                            </label>
                            <label className="perm_switch">
                              <input
                                className="perm_switch_input"
                                type="checkbox"
                                data-main_screen={index}
                                data-sub_screen={0}
                                data-options={index_opt}
                                onChange={handleChange}
                                checked={options.checked || checked1}
                                disabled={disabled1}
                              />
                              <span className="perm_switch_slider"></span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </li>
                  {formData1.sub_screen.length > 0 ? (
                    <li className="list-group-item p-1">
                      <div className="row">
                        {formData1.sub_screen.map((sub_screen, index_sub) => (
                          <div className="col-md-2">
                            <ul className="list-group">
                              <li
                                className="list-group-item border-bottom-2 fw-600"
                                aria-current="true"
                              >
                                {sub_screen.screen_name}
                              </li>
                              <li className="list-group-item p-1">
                                <div className="p-0 m-1 bg-light border-0">
                                  {sub_screen.options.map(
                                    (options, index_optsub) => (
                                      <div className="d-flex justify-content-between align-items-center v-align-middle">
                                        <label className="form-check-label">
                                          {options.label}
                                        </label>
                                        <label className="perm_switch">
                                          <input
                                            className="perm_switch_input"
                                            type="checkbox"
                                            data-main_screen={index}
                                            data-sub_screen={index_sub + 1}
                                            data-options={index_optsub}
                                            onChange={handleChange}
                                            checked={
                                              options.checked || checked1
                                            }
                                            disabled={disabled1}
                                          />
                                          <span className="perm_switch_slider"></span>
                                        </label>
                                      </div>
                                    )
                                  )}
                                </div>
                              </li>
                            </ul>
                          </div>
                        ))}
                      </div>
                    </li>
                  ) : (
                    <></>
                  )}
                </ul>
              </div>
            ))}
          </div>
          <div className="col-sm-12 text-end">
            <button
              className="btn btn-primary"
              id="upload-btn"
              onClick={submit_users_permission}
              type="button"
            >
              Save Permission
            </button>
          </div>
        </div>
      ) : (
        <></>
      )
    )}
    </div>
  );
};

export default UserPermission;
