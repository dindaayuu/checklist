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


  const [
    selectedArea,
    setSelectedArea,
  ] =
    useState<any>(null);


  const [
    areas,
    setAreas,
  ] =
    useState<any[]>([]);


  const [
    loading,
    setLoading,
  ] =
    useState(true);
  const userName =
    localStorage.getItem(
      "userName"
    ) || "";
  useEffect(() => {


    getTenants();


  }, []);




  const getTenants = async () => {


    try {


      const response =
        await api.get(
          "/checklist/tenants"
        );



      const tenants =
        response.data.data;



      const grouped =
        tenants.reduce(
          (
            result: any,
            tenant: any
          ) => {


            const areaName =
              tenant.area;



            if (
              !result[areaName]
            ) {


              result[areaName] = {


                id:
                  areaName,


                name:
                  `${areaName} Area`,


                icon:
                  getAreaIcon(
                    areaName
                  ),


                checked:
                  tenants.filter(
                    (item:any) =>
                      item.area ===
                      areaName &&
                      item.status ===
                      "done"
                  ).length,


                total: 0,


                progress: 0,


                tenants: [],


              };


            }




            result[
              areaName
            ].tenants.push({


              id:
                tenant.id,


              name:
                tenant.name,


              status:
                tenant.status ===
                "done"
                  ? "Selesai"
                  : tenant.status ===
                    "issue"
                  ? "Kendala"
                  : "Belum Dicek",


            });



            result[
              areaName
            ].total =
              result[
                areaName
              ].tenants.length;




            result[
              areaName
            ].progress =
              Math.round(
                (
                  result[
                    areaName
                  ].checked /
                  result[
                    areaName
                  ].total
                ) *
                  100
              );



            return result;


          },

          {}

        );




      setAreas(
        Object.values(
          grouped
        )
      );



    } catch (error) {


      console.log(
        "API ERROR",
        error
      );


    } finally {


      setLoading(false);


    }


  };





  const getAreaIcon = (
    area:string
  ) => {


    if (
      area === "Pesisir"
    )
      return "pesisir";


    if (
      area === "Balalantara"
    )
      return "balantara";


    return "downtown";


  };

  if (loading) {
    return null;
  }

  return (

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

                0

                <span>
                  /
                  {areas.reduce(
                    (
                      total,
                      area
                    ) =>
                      total +
                      area.total,
                    0
                  )}
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
                />


              </svg>


              <span>
                0%
              </span>


            </div>


          </div>


        </div>





        <h3 className="section-title">

          Route Hari Ini

        </h3>




        {areas.map(
          (area:any) => (


            <div

              key={
                area.id
              }

              className="
                route-card
                clickable
              "

              onClick={() =>
                setSelectedArea(
                  area
                )
              }

            >


              <div className="route-item">


                <div
                  className={
                    `route-icon ${area.icon}`
                  }
                >


                  {
                    area.icon ===
                    "downtown" &&
                    <Store size={20}/>
                  }


                  {
                    area.icon ===
                    "pesisir" &&
                    <Waves size={20}/>
                  }


                  {
                    area.icon ===
                    "balantara" &&
                    <Mountain size={20}/>
                  }


                </div>



                <div className="route-content">


                  <h4>
                    {area.name}
                  </h4>


                  <p>

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



                <span className="route-percent">


                  {area.progress}%


                </span>


              </div>


            </div>


          )
        )}




        <button

          className="route-btn"

          onClick={() =>
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

          onClick={() =>
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
                </h3>

                <p>

                  {selectedArea.total}
                  {" Tenant"}

                </p>

              </div>



              <button

                className="popup-close"

                onClick={() =>
                  setSelectedArea(
                    null
                  )
                }

              >

                ✕

              </button>


            </div>





            {selectedArea.tenants.map(
              (tenant:any)=>(


                <div

                  key={
                    tenant.id
                  }

                  className="tenant-row"

                  onClick={() =>
                    navigate(
                      `/tenant-detail/${tenant.id}`
                    )
                  }

                >


                  <div
                    className="
                      status-indicator
                      pending
                    "
                  />


                  <div className="tenant-row-info">


                    <h4>

                      {tenant.name}

                    </h4>


                    <p>

                      {tenant.status}

                    </p>


                  </div>


                </div>


              )
            )}


          </div>


        </div>


      )}



      <BottomNav/>


    </MobileLayout>

  );


}