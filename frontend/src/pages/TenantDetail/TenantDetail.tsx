import "./TenantDetail.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Html5Qrcode } from "html5-qrcode";

import MobileLayout from "../../components/MobileLayout";
import api from "../../api/axios";

import {
  ArrowLeft,
  Smartphone,
  AlertTriangle,
  ScanLine,
  X,
} from "lucide-react";

export default function TenantDetail(){

  const navigate = useNavigate();
  const { id } = useParams();

  const [tenant,setTenant] = useState<any>(null);
  const [devices,setDevices] = useState<any[]>([]);
  const [problems,setProblems] = useState<any[]>([]);

  const [status,setStatus] =
    useState<Record<number,string>>({});

  const [issueType,setIssueType] =
    useState<Record<number,number|null>>({});

  const [notes,setNotes] =
    useState<Record<number,string>>({});

  const [tenantNote,setTenantNote] =
    useState("");

  const [replaceDevice,setReplaceDevice] =
    useState<any>(null);

  const [scanner,setScanner] =
    useState<any>(null);

  const [cameraOpen,setCameraOpen] =
    useState(false);

  const [replacement,setReplacement] =
    useState({
      assetCode:"",
      deviceName:"",
    });


  useEffect(()=>{

    loadData();

  },[id]);


  const loadData = async()=>{

    try{

      const tenantRes =
        await api.get(
          `/checklist/tenants/${id}`
        );

      const result =
        tenantRes.data.data;


      setTenant({
        ...result.tenant,
        bag:result.bag,
      });


      setDevices(
        result.devices ?? []
      );


      const problemRes =
        await api.get(
          "/checklist/problem-types"
        );


      setProblems(
        problemRes.data.data
      );


    }catch(error){

      console.log(
        "LOAD ERROR",
        error
      );

    }

  };


  const findAsset = async(code:string)=>{

    if(!code){
      return;
    }
  
    try{
  
      const response =
        await api.get(
          `/test-asset/${code}`
        );
  
      setReplacement({
  
        assetCode:
          code,
  
        deviceName:
          response.data.asset_name
          ??
          response.data.name
          ??
          response.data.asset
          ??
          "Unknown Device",
  
      });
  
    }catch(error){
  
      setReplacement({
  
        assetCode:
          code,
  
        deviceName:
          replaceDevice.asset
          ??
          replaceDevice.display_asset
          ??
          "Unknown Device",
  
      });
  
    }
  
  };


  const startScanner = async()=>{

    setCameraOpen(true);


    setTimeout(async()=>{


      const qr =
        new Html5Qrcode(
          "reader"
        );


      setScanner(qr);


      await qr.start(

        {
          facingMode:
          "environment"
        },

        {
          fps:10,
          qrbox:250,
        },

        async(result)=>{


          await qr.stop();


          setCameraOpen(false);


          findAsset(
            result
          );

        },

        ()=>{}

      );


    },300);

  };


  const closeScanner = async()=>{

    if(scanner){

      await scanner.stop()
      .catch(()=>{});

    }


    setCameraOpen(false);

  };


  const replaceAsset =()=>{

    if(
      !replacement.assetCode ||
      !replacement.deviceName
    ){
    
      alert(
        "Asset code dan nama device wajib diisi"
      );
    
      return;
    
    }
  
    setDevices(
  
      devices.map((device)=>{
  
        if(device.id === replaceDevice.id){
  
          return{
  
            ...device,
  
            condition:
            "GOOD",
  
            display_asset:
            replacement.deviceName,
  
            display_barcode:
            replacement.assetCode,
  
            replacement:{
              asset_code:
                replacement.assetCode,
            
              device_name:
                replacement.deviceName,
            },
          };
  
        }
  
        return device;
  
      })
  
    );
  
  
    setStatus({
      ...status,
      [replaceDevice.id]:
      "normal",
    });
  
  
    setIssueType({
      ...issueType,
      [replaceDevice.id]:
      null,
    });
  
  
    setNotes({
      ...notes,
      [replaceDevice.id]:
      "",
    });
  
  
    setReplaceDevice(null);
  
  
    setReplacement({
      assetCode:"",
      deviceName:"",
    });
  
  };


  const submitChecklist = async()=>{

    try{


      await api.post(
        "/checklist/submit",
        {

          tenant_id:
            tenant.id,


          bag_id:
            tenant.bag?.id
            ?? null,


          pic_name:
            localStorage.getItem(
              "userName"
            ),


          start_time:
            "08:00:00",


          overall_note:
            tenantNote,


          devices:

          devices.map((device)=>{


            const isProblem =
              status[device.id]
              === "issue";


            return{


              bag_detail_id:

                device.source_type
                === "BAG"

                ? device.id

                : null,


              tenant_detail_id:

                device.source_type
                === "TENANT"

                ? device.id

                : null,


              source_type:
                device.source_type,


              asset:
                device.asset,


              barcode:
                device.barcode,


              condition:

                isProblem
                ? "PROBLEM"
                : "GOOD",


              problem_type_id:

                isProblem
                ? issueType[device.id]
                : null,


              note:

                isProblem
                ? notes[device.id]
                : null,


              replacement:

                device.replacement
                ?? null,

            };

          }),

        }

      );


      navigate(
        "/route-map",
        {
          replace:true
        }
      );


    }catch(error:any){

      alert(
        error.response?.data?.message
        ??
        "Gagal menyimpan checklist"
      );

    }

  };


  if(!tenant){

    return(
      <MobileLayout>
        <div className="tenant-page"/>
      </MobileLayout>
    );

  }

  return(
    <MobileLayout>

      <div className="tenant-page">

        <div className="tenant-header">

          <button
            className="back-btn"
            onClick={()=>navigate(-1)}
          >
            <ArrowLeft size={20}/>
          </button>

          <h2>
            Checklist Tenant
          </h2>

        </div>


        <div className="tenant-card">

          <div className="tenant-icon">
            🏪
          </div>

          <div>
            <h3>{tenant.name}</h3>
            <p>{tenant.area}</p>
          </div>

        </div>


        {devices.map((device)=>(

          <div
            className="device-card"
            key={device.id}
          >

            <div className="device-info">

              <div className="device-icon">
                <Smartphone size={18}/>
              </div>

              <div>

                <h4>
                  {
                    device.display_asset
                    ??
                    device.asset
                  }
                </h4>

                <p>
                  {
                    device.display_barcode
                    ??
                    device.barcode
                  }
                </p>

              </div>

            </div>


            <div className="device-actions">

              <button
                className={
                  status[device.id]==="normal"
                  ?"status-btn normal active-normal"
                  :"status-btn normal"
                }
                onClick={()=>
                  setStatus({
                    ...status,
                    [device.id]:
                    "normal"
                  })
                }
              >
                Normal
              </button>


              <button
                className={
                  status[device.id]==="issue"
                  ?"status-btn issue active-issue"
                  :"status-btn issue"
                }
                onClick={()=>
                  setStatus({
                    ...status,
                    [device.id]:
                    "issue"
                  })
                }
              >
                Kendala
              </button>

            </div>


            {status[device.id]==="issue" && (

              <div className="issue-section">

                <div className="issue-grid">

                  {problems.map((problem)=>(

                    <button
                      key={problem.id}
                      className={
                        issueType[device.id]
                        === problem.id
                        ?"issue-option active"
                        :"issue-option"
                      }
                      onClick={()=>
                        setIssueType({
                          ...issueType,
                          [device.id]:
                          problem.id,
                        })
                      }
                    >

                      {problem.name}

                    </button>

                  ))}

                </div>


                <textarea
                  placeholder="Catatan kendala..."
                  onChange={(e)=>
                    setNotes({
                      ...notes,
                      [device.id]:
                      e.target.value,
                    })
                  }
                />


                <div className="warning-box">

                  <AlertTriangle size={18}/>

                  <span>
                    Device bermasalah.
                    Silahkan lakukan pergantian.
                  </span>

                </div>


                <button
                  className="replace-btn"
                  onClick={()=>
                    setReplaceDevice(device)
                  }
                >
                  Ganti Device
                </button>


              </div>

            )}

          </div>

        ))}


        <div className="notes-card">

          <label>
            Catatan Kondisi Tenant
          </label>

          <textarea
            value={tenantNote}
            onChange={(e)=>
              setTenantNote(
                e.target.value
              )
            }
          />

        </div>


        <button
          className="save-btn"
          onClick={submitChecklist}
        >
          Simpan Hasil
        </button>



        {/* POPUP REPLACEMENT */}


        {replaceDevice && (

          <div
            className="replace-modal"
            onClick={()=>
              setReplaceDevice(null)
            }
          >

            <div
              className="replace-sheet"
              onClick={(e)=>
                e.stopPropagation()
              }
            >

              <button
                className="popup-close"
                onClick={()=>
                  setReplaceDevice(null)
                }
              >
                <X size={20}/>
              </button>


              <h3>
                Pergantian Device
              </h3>


              <div className="replace-old-device">

                Device Lama

                <b>
                  {replaceDevice.asset}
                </b>

                {replaceDevice.barcode}

              </div>


              <div className="replace-section">

                <label>
                  Scan / Input Asset Code Baru
                </label>


                <div className="scan-input">

                  <input
                    autoFocus
                    placeholder="Masukkan asset code"

                    value={
                      replacement.assetCode
                    }

                    onChange={(e)=>
                      setReplacement({
                        ...replacement,
                        assetCode:
                        e.target.value
                      })
                    }

                    onKeyDown={(e)=>{

                      if(e.key==="Enter"){

                        findAsset(
                          replacement.assetCode
                        );

                      }

                    }}
                  />


                  <button
                    onClick={startScanner}
                  >
                    <ScanLine size={20}/>
                  </button>


                </div>

              </div>

              <div className="replace-section">

                <label>
                  Nama Device Baru
                </label>

                <input
                  className="manual-input"
                  placeholder="Contoh: Tablet / Printer / Scanner"

                  value={
                    replacement.deviceName
                  }

                  onChange={(e)=>
                    setReplacement({
                      ...replacement,
                      deviceName:e.target.value
                    })
                  }
                />

              </div>

              {replacement.deviceName && (

                <div className="replace-new-device">

                  Device Baru

                  <b>
                    {
                      replacement.deviceName
                    }
                  </b>

                  {
                    replacement.assetCode
                  }

                </div>

              )}



              <button
                className="sheet-btn"
                onClick={replaceAsset}
              >
                Simpan Pergantian
              </button>


            </div>

          </div>

        )}




        {/* CAMERA SCANNER */}


        {cameraOpen && (

          <div className="scanner-modal">

            <div className="scanner-box">

              <button
                className="popup-close"
                onClick={closeScanner}
              >
                <X size={20}/>
              </button>

              <h3>
                Scan Barcode Asset
              </h3>

              <div id="reader"/>

            </div>

          </div>

        )}


      </div>

    </MobileLayout>

  );

}