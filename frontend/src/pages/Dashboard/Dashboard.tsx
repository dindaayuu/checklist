import "./Dashboard.css";

import MobileLayout from "../../components/MobileLayout";
import BottomNav from "../../components/BottomNav";

import {
  Store,
  Waves,
  Mountain,
  ChevronRight,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import api from "../../api/axios";

export default function Dashboard() {
  const navigate = useNavigate();

  const [selectedArea,setSelectedArea] =
    useState<any>(null);

  const [dashboard,setDashboard] =
    useState<any>(null);

  const [loading,setLoading] =
    useState(true);


  const userName =
    localStorage.getItem("userName")
    || "";


  useEffect(()=>{
    loadDashboard();
  },[]);


  const loadDashboard = async()=>{
    try{

      const response =
        await api.get(
          "/checklist/dashboard"
        );

      setDashboard(
        response.data
      );

    }catch(error){

      console.log(
        "Dashboard error",
        error
      );

    }finally{

      setLoading(false);

    }
  };


  const getAreaIcon=(area:string)=>{

    if(
      area === "Pesisir"
    )
    return "pesisir";

    if(
      area === "Balalantara"
    )
    return "balantara";

    return "downtown";

  };


  const getStatusClass=(
    status:string
  )=>{

    if(status==="DONE")
      return "done";

    if(status==="PROBLEM")
      return "issue";

    return "pending";

  };


  if(loading){
    return null;
  }


  return(

    <MobileLayout>

      <div className="dashboard-page">


        <div className="dashboard-header">

          <div>

            <h1 className="welcome-title">
              Halo, {userName} 👋
            </h1>

            <p className="welcome-subtitle">
              PIC Checklist IT
            </p>

          </div>

        </div>


        <div className="progress-card">

          <div className="progress-content">


            <div className="progress-left">

              <p>
                Progress Hari Ini
              </p>


              <h2>

                {dashboard.checkedToday}

                <span>
                  /
                  {dashboard.totalTenant}
                </span>

              </h2>


              <small>
                Tenant sudah dicek
              </small>

            </div>


            <div className="circle-progress">

              <svg viewBox="0 0 120 120">

                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  className="circle-bg"
                />

                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  className="circle-fill"

                  style={{
                    strokeDashoffset:
                    314 -
                    (
                      314 *
                      dashboard.progress
                    ) / 100
                  }}
                />

              </svg>


              <span>
                {dashboard.progress}%
              </span>


            </div>

          </div>

        </div>


        <h3 className="section-title">
          Route Hari Ini
        </h3>


        {dashboard.areas.map(
          (area:any)=>(

            <div
              key={area.name}
              className="
              route-card
              clickable
              "

              onClick={()=>
                setSelectedArea(area)
              }
            >

              <div className="route-item">


                <div
                  className={
                    `route-icon ${getAreaIcon(area.name)}`
                  }
                >

                  {
                    getAreaIcon(area.name)
                    ==="downtown" &&
                    <Store size={20}/>
                  }


                  {
                    getAreaIcon(area.name)
                    ==="pesisir" &&
                    <Waves size={20}/>
                  }


                  {
                    getAreaIcon(area.name)
                    ==="balantara" &&
                    <Mountain size={20}/>
                  }


                </div>


                <div className="route-content">

                  <h4>
                    {area.name} Area
                  </h4>


                  <p>
                    {area.checked}
                    /
                    {area.total}
                    {" Tenant"}
                  </p>


                  <div className="progress-line">

                    <div
                      className="progress-fill"

                      style={{
                        width:
                        `${area.progress}%`
                      }}
                    />

                  </div>


                </div>


                <span className="route-percent positive">

                  {area.progress}%

                </span>


              </div>


            </div>

          )
        )}


        <button
          className="route-btn"

          onClick={()=>
            navigate(
              "/route-map"
            )
          }
        >

          Mulai Route

          <ChevronRight size={18}/>

        </button>


      </div>


      {selectedArea && (

        <div
          className="area-overlay"

          onClick={()=>
            setSelectedArea(null)
          }
        >

          <div
            className="area-popup"

            onClick={(e)=>
              e.stopPropagation()
            }
          >

            <div className="popup-header">

              <div>

                <h3>
                  {selectedArea.name}
                  {" Area"}
                </h3>

                <p>
                  {selectedArea.checked}
                  /
                  {selectedArea.total}
                  {" Tenant selesai"}
                </p>

              </div>


              <button
                className="popup-close"

                onClick={()=>
                  setSelectedArea(null)
                }
              >

                ✕

              </button>


            </div>


            {
              selectedArea.tenants.map(
              (tenant:any)=>(

                <div
                  key={tenant.id}

                  className="tenant-row"

                  onClick={()=>
                    navigate(
                      `/tenant-detail/${tenant.id}`
                    )
                  }
                >

                  <div
                    className={
                    `
                    status-indicator
                    ${getStatusClass(
                      tenant.status
                    )}
                    `
                    }
                  />


                  <div className="tenant-row-info">

                    <h4>
                      {tenant.name}
                    </h4>


                    <p>

                      {
                      tenant.status==="PENDING"
                      ?"Belum Dicek"
                      :tenant.status==="PROBLEM"
                      ?"Kendala"
                      :"Selesai"
                      }

                    </p>

                  </div>


                </div>

              ))
            }


          </div>

        </div>

      )}


      <BottomNav/>


    </MobileLayout>

  );

}