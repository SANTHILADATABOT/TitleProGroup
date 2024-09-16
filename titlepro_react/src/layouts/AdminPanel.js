import { useEffect } from "react";
import $ from "jquery";
import NavBar from "../src/inc/navbar";
import SideBar from "../src/inc/sidebar";
import { useLocation } from "react-router-dom";
const AdminPanel = ({ page }) => {
  const {pathname} = useLocation();
  useEffect(() => {
    /* document.querySelector('.img__btn').addEventListener('click', function() {
            document.querySelector('.cont').classList.toggle('s--signup');
        }); */
    (function () {
      "use strict";
      $(".mobile-toggle").click(function () {
        $(".nav-menus").toggleClass("open");
      });
      $(".mobile-search").click(function () {
        $("#demo-input").toggleClass("open");
      });
      $(".bookmark-search").click(function () {
        $(".form-control-search").toggleClass("open");
      });
    })();

    $(".loader-wrapper").slideUp("slow", function () {
      $(this).remove();
    });

    $(window).on("scroll", function () {
      if ($(this).scrollTop() > 600) {
        $(".tap-top").fadeIn();
      } else {
        $(".tap-top").fadeOut();
      }
    });
    $(".tap-top").click(function () {
      $("html, body").animate(
        {
          scrollTop: 0,
        },
        600
      );
      return false;
    });

    (function () {
      "use strict";
      var $ripple = $(".js-ripple");
      $ripple.on("click.ui.ripple", function (e) {
        var $this = $(this);
        var $offset = $this.parent().offset();
        var $circle = $this.find(".c-ripple__circle");
        var x = e.pageX - $offset.left;
        var y = e.pageY - $offset.top;
        $circle.css({
          top: y + "px",
          left: x + "px",
        });
        $this.addClass("is-active");
      });
      $ripple.on(
        "animationend webkitAnimationEnd oanimationend MSAnimationEnd",
        function (e) {
          $(this).removeClass("is-active");
        }
      );
    })();

    $(".chat-menu-icons .toogle-bar").click(function () {
      $(".chat-menu").toggleClass("show");
    });

    $("#flip-btn").click(function () {
      $(".flip-card-inner").addClass("flipped");
    });

    $("#flip-back").click(function () {
      $(".flip-card-inner").removeClass("flipped");
    });

    $("#document-toggle").click(function () {
      $("#myScrollspy").toggleClass("close");
      $(".document-header").toggleClass("close-header");
    });

    // sidebar menu
    $(".iconMenu-bar li").click(function () {
      $(".iconMenu-bar li").removeClass("open");
      if ($(".iconsidebar-menu").hasClass("iconbar-mainmenu-close")) {
        $(".iconsidebar-menu").removeClass("iconbar-mainmenu-close");
      }
      $(this).addClass("open");
    });

    $(function () {
      // this will get the full URL at the address bar
      const current_url = window.location.href.trim();
      $(".iconMenu-bar li").removeClass("open");
      var url_list = [];
      $(".iconbar-mainmenu li .menu_link").each(function () {
        const active_urls = JSON.parse(this.dataset.active_urls);
        for(let ch1 = 0;ch1 < active_urls.length;ch1++){
          if (current_url.includes(active_urls[ch1])) {
            $(this).closest("li").addClass("active");
            $(this).addClass("active");
            $(this).closest("li").parent().parent().addClass("open");
          }
        }
      });
    });

    $(".mobile-sidebar #sidebar-toggle").click(function () {
      var $this = $(".iconsidebar-menu");

      if ($this.hasClass("iconbar-second-close")) {
        //$this.removeClass();
        $this.removeClass("iconbar-second-close").addClass("iconsidebar-menu");
      } else if ($this.hasClass("iconbar-mainmenu-close")) {
        $this
          .removeClass("iconbar-mainmenu-close")
          .addClass("iconbar-second-close");
      } else {
        $this.addClass("iconbar-mainmenu-close");
      }
    });

    if ($(window).width() <= 991) {
      $(".iconsidebar-menu").addClass("iconbar-mainmenu-close");
      $(".iconMenu-bar").removeClass("active");
      $(".iconsidebar-menu").addClass("iconbar-second-close");
      $(".iconsidebar-menu").removeClass("iconbar-mainmenu-close");
    }
  }, []);

  return (
    <div className="App">
      {/* <div className="loader-wrapper">
            <div className="typewriter">
                <h1>New Era Admin Loading..</h1>
            </div>
            </div> */}
      <div className="page-wrapper">
        <div className="page-main-header">
          <NavBar />
        </div>
        <div className="page-body-wrapper">
          <div className="iconsidebar-menu">
            <SideBar />
          </div>
          <div className="right-sidebar" id="right_side_bar">
            <div>
              <div className="container p-0">
                <div className="modal-header p-l-20 p-r-20">
                  <div className="col-sm-8 p-0">
                    <h6 className="modal-title f-w-700">Contacts Status</h6>
                  </div>
                  <div className="col-sm-4 text-end p-0">
                    <i className="me-2" data-feather="settings"></i>
                  </div>
                </div>
              </div>
              <div className="friend-list-search mt-0">
                <input type="text" placeholder="search friend" />
                <i className="fa fa-search"></i>
              </div>
              <div className="p-l-30 p-r-30">
                <div className="chat-box">
                  <div className="people-list friend-list custom-scrollbar">
                    <ul className="list">
                      <li className="clearfix">
                        <img
                          className="rounded-small user-image"
                          src="assets/images/user/1.jpg"
                          alt=""
                        />
                        <div className="status-circle online"></div>
                        <div className="about">
                          <div className="name">Vincent Porter</div>
                          <div className="status"> Online</div>
                        </div>
                      </li>
                      <li className="clearfix">
                        <img
                          className="rounded-small user-image"
                          src="assets/images/user/2.jpg"
                          alt=""
                        />
                        <div className="status-circle away"></div>
                        <div className="about">
                          <div className="name">Ain Chavez</div>
                          <div className="status"> 28 minutes ago</div>
                        </div>
                      </li>
                      <li className="clearfix">
                        <img
                          className="rounded-small user-image"
                          src="assets/images/user/8.jpg"
                          alt=""
                        />
                        <div className="status-circle online"></div>
                        <div className="about">
                          <div className="name">Kori Thomas</div>
                          <div className="status"> Online</div>
                        </div>
                      </li>
                      <li className="clearfix">
                        <img
                          className="rounded-small user-image"
                          src="assets/images/user/4.jpg"
                          alt=""
                        />
                        <div className="status-circle online"></div>
                        <div className="about">
                          <div className="name">Erica Hughes</div>
                          <div className="status"> Online</div>
                        </div>
                      </li>
                      <li className="clearfix">
                        <img
                          className="rounded-small user-image"
                          src="assets/images/user/5.jpg"
                          alt=""
                        />
                        <div className="status-circle offline"></div>
                        <div className="about">
                          <div className="name">Ginger Johnston</div>
                          <div className="status"> 2 minutes ago</div>
                        </div>
                      </li>
                      <li className="clearfix">
                        <img
                          className="rounded-small user-image"
                          src="assets/images/user/6.jpg"
                          alt=""
                        />
                        <div className="status-circle away"></div>
                        <div className="about">
                          <div className="name">Prasanth Anand</div>
                          <div className="status"> 2 hour ago</div>
                        </div>
                      </li>
                      <li className="clearfix">
                        <img
                          className="rounded-small user-image"
                          src="assets/images/user/7.jpg"
                          alt=""
                        />
                        <div className="status-circle online"></div>
                        <div className="about">
                          <div className="name">Hileri Jecno</div>
                          <div className="status"> Online</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="page-body"
            style={{
              marginLeft:
                pathname !== "/order-entry" &&
                pathname !== "/order-entry/form" &&
                pathname !== "/tasks-list" &&
                !pathname.startsWith("/order-entry/form/")
                  ? "300px"
                  : "92px",
            }}
          >
            {page}
          </div>
          <footer className="footer">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-6 footer-copyright">
                  <p className="mb-0">
                    Copyright © 2024 Title Pro. All rights reserved.
                  </p>
                </div>
                <div className="col-md-6">
                  <p className="pull-right mb-0">
                    Hand-crafted & made with<i className="fa fa-heart"></i>
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
