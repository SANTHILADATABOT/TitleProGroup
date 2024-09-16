import { useEffect, useState } from "react";
import $ from 'jquery';
import DataRepository from "../../../repositories/DataRepository";
import Swal from 'sweetalert2';
import './login.css';
import loginLogo from '../../../assets/img/dashboard/law_logo.png';
import { setCookie } from "../../../utils/lib/Cookie";
import { useDispatch } from "react-redux";
import { login } from "../../../store/reducers/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../utils/auth/authContext";
const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loginAuth} = useAuth();
    useEffect(() => {
      (function() {
        "use strict";
        $(".mobile-toggle").click(function(){
            $(".nav-menus").toggleClass("open");
        });
        $(".mobile-search").click(function(){
            $("#demo-input").toggleClass("open");
        });
        $(".bookmark-search").click(function(){
            $(".form-control-search").toggleClass("open");
        })
      })();
      
      $('.loader-wrapper').slideUp('slow', function() {
          $(this).remove();
      });
      
      $(window).on('scroll', function() {
          if ($(this).scrollTop() > 600) {
              $('.tap-top').fadeIn();
          } else {
              $('.tap-top').fadeOut();
          }
      });
      $('.tap-top').click( function() {
          $("html, body").animate({
              scrollTop: 0
          }, 600);
          return false;
      });
      
      (function() {
          "use strict";
          var $ripple = $(".js-ripple");
          $ripple.on("click.ui.ripple", function(e) {
              var $this = $(this);
              var $offset = $this.parent().offset();
              var $circle = $this.find(".c-ripple__circle");
              var x = e.pageX - $offset.left;
              var y = e.pageY - $offset.top;
              $circle.css({
                  top: y + "px",
                  left: x + "px"
              });
              $this.addClass("is-active");
          });
          $ripple.on(
              "animationend webkitAnimationEnd oanimationend MSAnimationEnd",
              function(e) {
                  $(this).removeClass("is-active");
              });
      })();
      
      $(".chat-menu-icons .toogle-bar").click(function(){
          $(".chat-menu").toggleClass("show");
      });
      
      
      $("#flip-btn").click(function(){
          $(".flip-card-inner").addClass("flipped")
      });
      
      $("#flip-back").click(function(){
          $(".flip-card-inner").removeClass("flipped")
      })
      
      $("#document-toggle").click(function(){
          $("#myScrollspy").toggleClass("close");
          $(".document-header").toggleClass("close-header");
      })
    }, []);

    var [formData, setFormData] = useState({mail_id:'',password:''});

    const handleChange = (e) => {
      setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
      }));
    };

    const signInCheck = async (e) => {
      e.preventDefault();
      
      const mail = (formData?.mail_id || '');
      const pwd = (formData?.password || '');
      if(!mail){
          alert('Enter Mail Id');
          $("#mail_id").focus();
          return false;
      }
      if(!pwd){
          alert('Enter Password');
          $("#password").focus();
          return false;
      }
      const response1 = await DataRepository.user_sign_in_check(formData);
      if(response1){
          if(response1?.status === 'SUCCESS'){
              Swal.fire({
                  title: 'User Login Successfully',
                  icon: 'success',
                  timer: 1000,
                  timerProgressBar: true,
                  showConfirmButton: false,
              });
              dispatch(login({response:response1}));
              loginAuth(response1);
              navigate('/dashboard')
          }else{
            Swal.fire({
                title: 'Login Fails',
                text: response1?.message,
                icon: 'warning',
                timer: 1000,
                timerProgressBar: true,
                showConfirmButton: false,
            }).then((result) => {
              //window.location.href = `${window.location.protocol + "//" + window.location.host}/dashboard`;
            });
          }
      }
  };

    return (
      <>
        <main
          className="d-flex align-items-center min-vh-100 py-3 py-md-0"
          style={{
            background:
              "linear-gradient(rgba(197, 162, 240, 0.4), rgba(197, 162, 240, 0.4)), url('assets/login_img/tpbg1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container" style={{ maxWidth: "849px" }}>
            <div className="card login-card">
              <div className="row no-gutters">
                <div className="col-md-7">
                  <div className="card-body">
                    <div className="brand-wrapper">
                      <img
                        src="assets/login_img/main_logo.png"
                        alt="logo"
                        className="logo"
                      />
                    </div>
                    <p className="login-card-description">
                      Sign Into Your Account
                    </p>
                    <form onSubmit={signInCheck}>
                      <div className="form-group">
                        <label htmlFor="email" className="sr-only">
                          Mail Id
                        </label>
                        <input
                          className="form-control input-line"
                          placeholder="Enter Mail Id"
                          type="email"
                          id="mail_id"
                          name="mail_id"
                          value={formData?.mail_id}
                          onChange={handleChange}
                        />
                        <span className="icon-right">
                          <i className="fa fa-phone"></i>
                        </span>
                      </div>
                      <div className="form-group mb-4">
                        <label htmlFor="password" className="sr-only">
                          Password
                        </label>
                        <input
                          className="form-control input-line"
                          placeholder="Enter Password"
                          type="password"
                          id="password"
                          name="password"
                          value={formData?.password}
                          onChange={handleChange}
                        />
                        <span className="icon-right">
                          <i className="fa fa-lock"></i>
                        </span>
                      </div>
                      <input
                        name="login"
                        id="login"
                        className="btn btn-block login-btn mb-4"
                        type="submit"
                        value="LOGIN"
                      />
                    </form>
                  </div>
                </div>
                <div
                  className="col-md-5"
                  style={{
                    background:
                      "linear-gradient(rgba(160, 6, 178, 0.7), rgba(160, 6, 178, 0.7)), url('assets/login_img/tpbgri.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <img
                    src={loginLogo}
                    alt="logo"
                    className="logo"
                    width="213"
                    height="202"
                    style={{ marginLeft: "57px", marginTop: "138px" }}
                  />
                  <h3
                    style={{
                      color: "aliceblue",
                      marginLeft: "94px",
                      marginTop: "-6px",
                      fontFamily: "Roboto serif",
                    }}
                  >
                    TITLE PRO
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
};

export default SignIn;
