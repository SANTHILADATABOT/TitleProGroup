import { useAuth } from "../../../utils/auth/authContext";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/reducers/AuthSlice";
const NavBar = () => {
    const {logoutAuth} = useAuth();
    const disapatch = useDispatch()
  const toggleFullScreen = () => {
    if (
      (document.fullScreenElement && document.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)
    ) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  };
  const logout_fun = () => {
    disapatch(logout());
    logoutAuth();
  };
  return (
    <>
      <div className="main-header-right">
        <div className="main-header-left text-center">
          <div className="logo-wrapper">
            <a href={`${window.location.protocol + "//" + window.location.host}`}>
              <img
                src={`${window.location.protocol + "//" + window.location.host}/assets/img/dashboard/newtitlelogo.png?v=${Math.random()}`}
                style={{
                  height: "105px",
                  width: "250px",
                  marginLeft: "-25px",
                }}
                alt=""
              />
            </a>
          </div>
        </div>
        <div className="mobile-sidebar">
          <div className="flex-grow-1 text-end switch-sm">
            <label className="form-label switch ms-3">
              <i
                className="font-primary"
                id="sidebar-toggle"
                data-feather="align-center"
              ></i>
            </label>
          </div>
        </div>
        <div className="vertical-mobile-sidebar">
          <i className="fa fa-bars sidebar-bar"> </i>
        </div>
        <div className="nav-right col pull-right right-menu">
          <ul className="nav-menus">
            <li>
              <form className="form-inline search-form" action="#" method="get">
                <div className="form-group">
                  <div className="Typeahead Typeahead--twitterUsers">
                    <div className="u-posRelative">
                      <input
                        className="Typeahead-input form-control-plaintext"
                        id="demo-input"
                        type="text"
                        name="q"
                        placeholder="Search Your Order..."
                      />
                      <div
                        className="spinner-border Typeahead-spinner"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                      <span className="d-sm-none mobile-search">
                        <i data-feather="search"></i>
                      </span>
                    </div>
                    <div className="Typeahead-menu"></div>
                  </div>
                </div>
              </form>
            </li>
            <li>
              <a className="text-dark" href="#!" onClick={toggleFullScreen}>
                <i data-feather="maximize"></i>
              </a>
            </li>
            <li className="onhover-dropdown">
              <img
                className="img-fluid img-shadow-warning"
                src={`${window.location.protocol + "//" + window.location.host}/assets/images/dashboard/notification.png?v=${Math.random()}`}
                alt=""
              />
              <ul className="onhover-show-div notification-dropdown">
                <li className="gradient-primary">
                  <h5 className="f-w-700">Notifications</h5>
                  <span>You have 6 unread messages</span>
                </li>
                <li>
                  <div className="d-flex">
                    <div className="notification-icons bg-success me-3">
                      <i className="mt-0" data-feather="thumbs-up"></i>
                    </div>
                    <div className="flex-grow-1">
                      <h6>Someone Likes Your Posts</h6>
                      <p className="mb-0"> 2 Hours Ago</p>
                    </div>
                  </div>
                </li>
                <li className="pt-0">
                  <div className="d-flex">
                    <div className="notification-icons bg-info me-3">
                      <i className="mt-0" data-feather="message-circle"></i>
                    </div>
                    <div className="flex-grow-1">
                      <h6>3 New Comments</h6>
                      <p className="mb-0"> 1 Hours Ago</p>
                    </div>
                  </div>
                </li>
                <li className="bg-light txt-dark">
                  <a href="#">All </a> notification
                </li>
              </ul>
            </li>
            <li className="onhover-dropdown">
              {" "}
              <span className="d-flex user-header">
                <img
                  className="img-fluid"
                  src={`${window.location.protocol + "//" + window.location.host}/assets/images/dashboard/user.png?v=${Math.random()}`}
                  alt=""
                />
              </span>
              <ul className="onhover-show-div profile-dropdown">
                <li className="gradient-primary">
                  <h5 className="f-w-600 mb-0">Title Pro</h5>
                  <span>Admin User</span>
                </li>
                <li>
                  <i data-feather="user"> </i> Profile
                </li>
                {/* <li>
                  <i data-feather="message-square"> </i> Inbox
                </li>
                <li>
                  <i data-feather="file-text"> </i> Taskboard
                </li>
                <li>
                  <i data-feather="settings"> </i> Settings
                </li> */}
                <li onClick={logout_fun}>
                  <i className="fa fa-power-off"> </i> Logout
                </li>
              </ul>
            </li>
          </ul>
          <div className="d-lg-none mobile-toggle pull-right">
            <i data-feather="more-horizontal"></i>
          </div>
        </div>
        <script id="result-template" type="text/x-handlebars-template">
          <div className="ProfileCard u-cf">
            <div className="ProfileCard-avatar">
              <i className="pe-7s-home"></i>
            </div>
            <div className="ProfileCard-details">
              <div className="ProfileCard-realName">{/* {{name}} */}</div>
            </div>
          </div>
        </script>
        <script id="empty-template" type="text/x-handlebars-template">
          <div className="EmptyMessage">
            Your search turned up 0 results. This most likely means the backend
            is down, yikes!
          </div>
        </script>
      </div>
    </>
  );
};

export default NavBar;
