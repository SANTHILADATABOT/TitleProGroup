import { useEffect } from "react";


const Dashboard = () => {

  useEffect(() => {
    const counter = document.querySelectorAll('.counter');
    // covert to array
    const array = Array.from(counter);
    // select array element
    array.map((item) => {
        // data layer
        let counterInnerText = item.dataset.number_value;
  
        let count = 1;
        let speed = item.dataset.speed / counterInnerText
        function counterUp() {
            item.textContent = count++
            if (counterInnerText < count) {
                clearInterval(stop);
            }
        }
        const stop = setInterval(() => {
            counterUp();
        }, speed);
    })
  }, []);

    return (
      <>
        <div className="container-fluid">
          <div className="page-header">
            <div className="row">
              <div className="col-lg-6 main-header">
                <h2>
                  Admin<span>Dashboard </span>
                </h2>
                {/* <h6 className="mb-0">admin panel</h6> */}
              </div>
              <div className="col-lg-6 breadcrumb-right">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="index.html">
                      <i className="pe-7s-home"></i>
                    </a>
                  </li>
                  <li className="breadcrumb-item">Dashboard</li>
                  <li className="breadcrumb-item active">Admin </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
       
      <div className="col-xl-4 xl-50 box-col-6" >
              <div className="card gradient-primary o-hidden monthly-overview">
                <div className="card-body pb-0" id="customers-ratio">
                  <div className="d-flex customers">
                    <div className="flex-grow-1">
                      <h5>Total Working Order Status</h5>
                    </div>
                    <div class="arrow-container">
                     <div class="arrow-down"></div>
                     </div>
                    <span className="overview-dots full-lg-dots">
                      <span className="dots-group">
                        <span className="dots dots1"></span>
                        <span className="dots dots2 dot-small"></span>
                        <span className="dots dots3 dot-small"></span>
                        <span className="dots dots4 dot-medium"></span>
                        <span className="dots dots5 dot-small"></span>
                        <span className="dots dots6 dot-small"></span>
                        <span className="dots dots7 dot-small-semi"></span>
                        <span className="dots dots8 dot-small-semi"></span>
                        <span className="dots dots9 dot-small"> </span>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>


        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 xl-100">
              <div className="row ecommerce-chart-card">
                <div className="col-xl-3 xl-50 col-md-6 box-col-6">
                  <div className="card gradient-primary o-hidden">
                    <div className="card-body tag-card">
                      <div className="ecommerce-chart">
                        <div className="d-flex ecommerce-small-chart">
                          <div className="small-bar">
                            <div className="small-chart1 flot-chart-container"><img style={{borderRadius:'10px',width:'100px',height:'100px',marginLeft:'-10px',paddingLeft:""}} src={`${window.location.protocol + "//" + window.location.host}/assets/img/dashboard/order.png?v=${Math.random()}`} alt={'Order'} />
                            </div>
                          </div>
                          <div className="sale-chart">
                            <div className="flex-grow-1 m-l-10">
                              
                              <h4 className="mb-0 f-w-700 m-l-10">
                                 Order
                              </h4>
                              </div>
                             
                          </div>
                        </div>
                      </div>
                      <div class="main">
                      <div class="counter" data-number_value={"100"} data-speed="1000">0</div>
                      </div>
                      <span className="tag-hover-effect">
                        <span className="dots-group">
                          <span className="dots dots1"></span>
                          <span className="dots dots2 dot-small"></span>
                          <span className="dots dots3 dot-small"></span>
                          <span className="dots dots4 dot-medium"></span>
                          <span className="dots dots5 dot-small"></span>
                          <span className="dots dots6 dot-small"></span>
                          <span className="dots dots7 dot-small-semi"></span>
                          <span className="dots dots8 dot-small-semi"></span>
                          <span className="dots dots9 dot-small"> </span>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 xl-50 col-md-6 box-col-6">
                  <div className="card gradient-secondary o-hidden">
                    <div className="card-body tag-card">
                      <div className="ecommerce-chart">
                        <div className="d-flex ecommerce-small-chart">
                          <div className="small-bar">
                            <div className="small-chart2 flot-chart-container"><img style={{borderRadius:'10px',width:'100px',height:'100px',marginLeft:'-10px'}} src={`${window.location.protocol + "//" + window.location.host}/assets/img/dashboard/workflow.png?v=${Math.random()}`} alt={'workFlow'} />
                            </div>
                          </div>
                          <div className="sale-chart">
                            <div className="flex-grow-1 m-l-10">
                              
                              <h4 className="mb-0 f-w-700 m-l-10">
                                 WorkFlow
                              </h4>
                            </div>
                           
                          </div>
                        </div>
                      </div>
                      <div class="main">
                      <div class="counter" data-number_value={"100"} data-speed="1000">0</div>
                      </div>
                      <span className="tag-hover-effect">
                        <span className="dots-group">
                          <span className="dots dots1"></span>
                          <span className="dots dots2 dot-small"></span>
                          <span className="dots dots3 dot-small"></span>
                          <span className="dots dots4 dot-medium"></span>
                          <span className="dots dots5 dot-small"></span>
                          <span className="dots dots6 dot-small"></span>
                          <span className="dots dots7 dot-small-semi"></span>
                          <span className="dots dots8 dot-small-semi"></span>
                          <span className="dots dots9 dot-small"> </span>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 xl-50 col-md-6 box-col-6">
                  <div className="card gradient-warning o-hidden">
                    <div className="card-body tag-card">
                      <div className="ecommerce-chart">
                        <div className="d-flex ecommerce-small-chart">
                          <div className="small-bar">
                            <div className="small-chart3 flot-chart-container"><img style={{borderRadius:'10px',width:'100px',height:'100px',marginLeft:'-10px'}} src={`${window.location.protocol + "//" + window.location.host}/assets/img/dashboard/pending.png?v=${Math.random()}`} alt={'Pending'} />
                          </div>
                          </div>
                          <div className="sale-chart">
                            <div className="flex-grow-1 m-l-10">
                              
                              <h4 className="mb-0 f-w-700 m-l-10">
                                Pending
                              </h4>
                            </div>
                           
                          </div>
                        </div>
                      </div>
                      <div class="main">
                      <div class="counter" data-number_value={"100"} data-speed="1000">0</div>
                      </div>
                      <span className="tag-hover-effect">
                        <span className="dots-group">
                          <span className="dots dots1"></span>
                          <span className="dots dots2 dot-small"></span>
                          <span className="dots dots3 dot-small"></span>
                          <span className="dots dots4 dot-medium"></span>
                          <span className="dots dots5 dot-small"></span>
                          <span className="dots dots6 dot-small"></span>
                          <span className="dots dots7 dot-small-semi"></span>
                          <span className="dots dots8 dot-small-semi"></span>
                          <span className="dots dots9 dot-small"> </span>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 xl-50 col-md-6 box-col-6">
                  <div className="card gradient-info o-hidden">
                    <div className="card-body tag-card">
                      <div className="ecommerce-chart">
                        <div className="d-flex ecommerce-small-chart">
                          <div className="small-bar">
                            <div className="small-chart4 flot-chart-container"><img style={{borderRadius:'10px',width:'100px',height:'100px',marginLeft:'-10px'}} src={`${window.location.protocol + "//" + window.location.host}/assets/img/dashboard/completed.png?v=${Math.random()}`} alt={'complete'} /></div>
                          </div>
                          <div className="sale-chart">
                            <div className="flex-grow-1 m-l-10">
                              
                              <h4 className="mb-0 f-w-700 m-l-10">
                                Completed
                              </h4>
                            </div>
                            
                          </div>
                        </div>
                      </div>
                      <div class="main">
                      <div class="counter" data-number_value={"100"} data-speed="1000">0</div>
                      </div>
                      <span className="tag-hover-effect">
                        <span className="dots-group">
                          <span className="dots dots1"></span>
                          <span className="dots dots2 dot-small"></span>
                          <span className="dots dots3 dot-small"></span>
                          <span className="dots dots4 dot-medium"></span>
                          <span className="dots dots5 dot-small"></span>
                          <span className="dots dots6 dot-small"></span>
                          <span className="dots dots7 dot-small-semi"></span>
                          <span className="dots dots8 dot-small-semi"></span>
                          <span className="dots dots9 dot-small"> </span>
                          
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-12 xl-100 box-col-12">
              <div className="card crypto-revenue">
                <div className="card-header pb-0 d-flex">
                  <h5>
                    Revenue Statistics
                    <span className="badge rounded-pill pill-badge-secondary f-14 f-w-600">
                      2024
                    </span>
                  </h5>
                  <ul className="creative-dots">
                    <li className="bg-primary big-dot"></li>
                    <li className="bg-secondary semi-big-dot"></li>
                    <li className="bg-warning medium-dot"></li>
                    <li className="bg-info semi-medium-dot"></li>
                    <li className="bg-secondary semi-small-dot"></li>
                    <li className="bg-primary small-dot"></li>
                  </ul>
                  <div className="header-right pull-right text-end">
                    <h5 className="mb-2">80 / 100</h5>
                    <h6 className="f-w-700 mb-0">Total 81,67,536 $</h6>
                  </div>
                </div>
                <div className="card-body pt-0">
                  <div id="area-spaline"></div>
                </div>
              </div>
            </div>
            <div className="col-xl-8 xl-100 box-col-12">
              <div className="card">
                <div className="card-header no-border">
                  <h5>WorkFlow Completion</h5>
                  <ul className="creative-dots">
                    <li className="bg-primary big-dot"></li>
                    <li className="bg-secondary semi-big-dot"></li>
                    <li className="bg-warning medium-dot"></li>
                    <li className="bg-info semi-medium-dot"></li>
                    <li className="bg-secondary semi-small-dot"></li>
                    <li className="bg-primary small-dot"></li>
                  </ul>
                  <div className="card-header-right">
                    <ul className="list-unstyled card-option">
                      <li>
                        <i className="icofont icofont-gear fa fa-spin font-primary"></i>
                      </li>
                      <li>
                        <i className="view-html fa fa-code font-primary"></i>
                      </li>
                      <li>
                        <i className="icofont icofont-maximize full-card font-primary"></i>
                      </li>
                      <li>
                        <i className="icofont icofont-minus minimize-card font-primary"></i>
                      </li>
                      <li>
                        <i className="icofont icofont-refresh reload-card font-primary"></i>
                      </li>
                      <li>
                        <i className="icofont icofont-error close-card font-primary"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card-body pt-0">
                  <div className="activity-table table-responsive recent-table selling-product custom-scrollbar">
                    <table className="table table-bordernone">
                      <tbody>
                        <tr>
                          <td>
                            <div className="recent-images-warning">
                              <img
                                className="img-fluid"
                                src={`${window.location.protocol + "//" + window.location.host}/assets/images/dashboard-ecommerce/4.png?v=${Math.random()}`}
                                alt=""
                              />
                            </div>
                          </td>
                          <td>
                            <h5 className="default-text mb-0 f-w-700 f-18">
                              Fee Approval Request - Pricing Adjustment
                            </h5>
                          </td>
                          <td>
                            <span className="badge rounded-pill recent-badge f-12">
                              Australia
                            </span>
                          </td>
                          <td className="f-w-700">$45.00</td>
                          <td>
                            <h6 className="mb-0">Completed</h6>
                          </td>
                          <td>
                            <span className="badge rounded-pill recent-badge">
                              <i data-feather="more-horizontal"></i>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="recent-images-warning">
                              <img
                                className="img-fluid"
                                src={`${window.location.protocol + "//" + window.location.host}/assets/images/dashboard-ecommerce/4.png?v=${Math.random()}`}
                                alt=""
                              />
                            </div>
                          </td>
                          <td>
                            <h5 className="font-primary mb-0 f-w-700 f-18">
                              Client File status Update
                            </h5>
                          </td>
                          <td>
                            <span className="badge rounded-pill recent-badge f-12">
                              Brazil
                            </span>
                          </td>
                          <td className="f-w-700">$78.00</td>
                          <td>
                            <h6 className="mb-0">Completed</h6>
                          </td>
                          <td>
                            <span className="badge rounded-pill recent-badge">
                              <i data-feather="more-horizontal"></i>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="recent-images-warning">
                              <img
                                className="img-fluid"
                                src={`${window.location.protocol + "//" + window.location.host}/assets/images/dashboard-ecommerce/4.png?v=${Math.random()}`}
                                alt=""
                              />
                            </div>
                          </td>
                          <td>
                            <h5 className="font-secondary mb-0 f-w-700 f-18">
                              Punctual Need Image
                            </h5>
                          </td>
                          <td>
                            <span className="badge rounded-pill recent-badge f-12">
                              London
                            </span>
                          </td>
                          <td className="f-w-700">$50.00</td>
                          <td>
                            <h6 className="mb-0">Completed</h6>
                          </td>
                          <td>
                            <span className="badge rounded-pill recent-badge">
                              <i data-feather="more-horizontal"></i>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="recent-images-warning">
                              <img
                                className="img-fluid"
                                src={`${window.location.protocol + "//" + window.location.host}/assets/images/dashboard-ecommerce/4.png?v=${Math.random()}`}
                                alt=""
                              />
                            </div>
                          </td>
                          <td>
                            <h5 className="font-warning mb-0 f-w-700 f-18">
                              Standard Quota and ETA Request
                            </h5>
                          </td>
                          <td>
                            <span className="badge rounded-pill recent-badge f-12">
                              U.S.A
                            </span>
                          </td>
                          <td className="f-w-700">$38.00</td>
                          <td>
                            <h6 className="mb-0">Completed</h6>
                          </td>
                          <td>
                            <span className="badge rounded-pill recent-badge">
                              <i data-feather="more-horizontal"> </i>
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="code-box-copy">
                    <button
                      className="code-box-copy__btn btn-clipboard"
                      data-clipboard-target="#example-head5"
                      title="Copy"
                    >
                      <i className="icofont icofont-copy-alt"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 xl-50 box-col-6">
              <div className="card gradient-primary o-hidden monthly-overview">
                <div className="card-body pb-0" id="customers-ratio">
                  <div className="d-flex customers">
                    <div className="flex-grow-1">
                      <h5>New Customers</h5>
                    </div>
                    <div className="setting-dot">
                      <div className="setting-bg-primary date-picker-setting position-set pull-right">
                        <i className="fa fa-spin fa-cog"></i>
                      </div>
                    </div>
                    <span className="overview-dots full-lg-dots">
                      <span className="dots-group">
                        <span className="dots dots1"></span>
                        <span className="dots dots2 dot-small"></span>
                        <span className="dots dots3 dot-small"></span>
                        <span className="dots dots4 dot-medium"></span>
                        <span className="dots dots5 dot-small"></span>
                        <span className="dots dots6 dot-small"></span>
                        <span className="dots dots7 dot-small-semi"></span>
                        <span className="dots dots8 dot-small-semi"></span>
                        <span className="dots dots9 dot-small"> </span>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-8 xl-100 box-col-12">
              <div className="card month-overview">
                <div className="card-header pb-3">
                  <h5>This Month Revenue</h5>
                  <h2 className="m-t-20 f-w-800">$57k</h2>
                  <span className="badge rounded-pill pill-badge-secondary f-14 f-w-600">
                    14%
                  </span>
                  <ul className="creative-dots">
                    <li className="bg-primary big-dot"></li>
                    <li className="bg-secondary semi-big-dot"></li>
                    <li className="bg-warning medium-dot"></li>
                    <li className="bg-info semi-medium-dot"></li>
                    <li className="bg-secondary semi-small-dot"></li>
                    <li className="bg-primary small-dot"></li>
                  </ul>
                  <div className="card-header-right">
                    <ul className="list-unstyled card-option">
                      <li>
                        <i className="icofont icofont-gear fa fa-spin font-primary"></i>
                      </li>
                      <li>
                        <i className="view-html fa fa-code font-primary"></i>
                      </li>
                      <li>
                        <i className="icofont icofont-maximize full-card font-primary"></i>
                      </li>
                      <li>
                        <i className="icofont icofont-minus minimize-card font-primary"></i>
                      </li>
                      <li>
                        <i className="icofont icofont-refresh reload-card font-primary"></i>
                      </li>
                      <li>
                        <i className="icofont icofont-error close-card font-primary"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card-body p-b-20 row">
                  <div className="col-6 p-b-20 ct-10 pe-0 default-chartist-container"></div>
                  <div className="col-6 p-b-20 ct-11 ps-0 default-chartist-container">
                    {" "}
                  </div>
                  <div className="code-box-copy">
                    <button
                      className="code-box-copy__btn btn-clipboard"
                      data-clipboard-target="#example-head6"
                      title="Copy"
                    >
                      <i className="icofont icofont-copy-alt"></i>
                    </button>
                    <pre>
                      {/* <code className="language-html" id="example-head6">&lt;!-- Cod Box Copy begin --&gt;
&lt;div className="card-body p-b-20 row"&gt;
&lt;div className="col-6 p-b-20 ct-10 pe-0 default-chartist-container"&gt;&lt;/div&gt;
&lt;div className="col-6 p-b-20 ct-11 ps-0 default-chartist-container"&gt; &lt;/div&gt;
&lt;/div&gt;
&lt;!-- Cod Box Copy end --&gt;          </code> */}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default Dashboard;
