import "./TenantDetail.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MobileLayout from "../../components/MobileLayout";
import api from "../../api/axios";

import {
  ArrowLeft,
  Smartphone,
  AlertTriangle,
} from "lucide-react";

export default function TenantDetail(){
  const navigate = useNavigate();
  const { id } = useParams();

  const [tenant,setTenant] = useState<any>(null);
  const [devices,setDevices] = useState<any[]>([]);
  const [problems,setProblems] = useState<any[]>([]);

  const [status,setStatus] = useState<Record<string,string>>({});
  const [issueType,setIssueType] = useState<Record<string,number>>({});
  const [notes,setNotes] = useState<Record<string,string>>({});
  const [tenantNote,setTenantNote] = useState("");

  const [replaceDevice,setReplaceDevice] = useState<any>(null);

  const [replacement,setReplacement] = useState({
    assetCode:"",
    deviceName:"",
  });


  useEffect(()=>{
    loadData();
  },[id]);


  const loadData = async()=>{

    try{

      const tenantResponse =
      await api.get(
        `/checklist/tenants/${id}`
      );

      const result =
      tenantResponse.data.data;

      setTenant({
        ...result.tenant,
        bag:result.bag,
      });

      setDevices(
        result.bag?.details ?? []
      );


      const problemResponse =
      await api.get(
        "/checklist/problem-types"
      );

      setProblems(
        problemResponse.data.data
      );

    }catch(error){

      console.log(
        "DETAIL ERROR",
        error
      );

    }

  };

  const replaceAsset =()=>{

    if(!replaceDevice){
      return;
    }
  
    const currentId = replaceDevice.id;
  
    const updatedDevices = devices.map((device:any)=>{
  
      if(device.id === currentId){
  
        return{
          ...device,
          display_asset:replacement.deviceName,
          display_barcode:replacement.assetCode,
          replaced:true,
        };
  
      }
  
      return device;
  
    });
  
    setDevices(updatedDevices);
  
    setStatus((prev)=>({
      ...prev,
      [currentId]:"normal",
    }));
  
    setIssueType((prev)=>({
      ...prev,
      [currentId]:null,
    }));
  
    setNotes((prev)=>({
      ...prev,
      [currentId]:"",
    }));
  
    setReplaceDevice(null);
  
    setReplacement({
      assetCode:"",
      deviceName:"",
    });
  
  };

  const submitChecklist = async()=>{

    try{
  
      await api.post("/checklist/submit", {
        tenant_id: tenant.id,
        bag_id: tenant.bag?.id,
        pic_name: localStorage.getItem("userName"),
        start_time: "08:00:00",
      
        overall_note: tenantNote,
      
        devices: devices.map((device: any) => {
          const problem = status[device.id] === "issue";
      
          return {
            bag_detail_id: device.id,
      
            asset:
              device.display_asset ??
              device.asset ??
              "Device",
      
            barcode:
              device.display_barcode ??
              device.barcode ??
              "NO-CODE",
      
            condition: problem ? "PROBLEM" : "GOOD",
      
            problem_type_id: problem
              ? issueType[device.id]
              : null,
      
            note: problem
              ? notes[device.id]
              : null,
          };
        }),
      });
  
  
      navigate(
        "/route-map",
        {replace:true}
      );
  
  
    }catch(error:any){
  
      alert(
        error.response?.data?.message
        ??
        "Gagal menyimpan checklist"
      );
  
      console.log(error);
  
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


        {
          devices.map(
            (device:any)=>(

              <div
                id={`device-${device.id}`}
                className="device-card"
                key={device.id}
              >

                <div className="device-info">

                  <div className="device-icon">
                    <Smartphone size={18}/>
                  </div>

                  <div>
                    <h4>
                      {device.display_asset ?? device.asset ?? "Device"}
                    </h4>

                    <p>
                      {device.display_barcode ?? device.barcode ?? "-"}
                    </p>
                  </div>

                </div>


                <div className="device-actions">

                  <button
                    className={
                      `status-btn normal ${
                        status[device.id]
                        === "normal"
                        ? "active-normal"
                        : ""
                      }`
                    }
                    onClick={()=>
                      setStatus({
                        ...status,
                        [device.id]:
                        "normal",
                      })
                    }
                  >
                    Normal
                  </button>


                  <button
                    className={
                      `status-btn issue ${
                        status[device.id]
                        === "issue"
                        ? "active-issue"
                        : ""
                      }`
                    }
                    onClick={()=>
                      setStatus({
                        ...status,
                        [device.id]:
                        "issue",
                      })
                    }
                  >
                    Kendala
                  </button>

                </div>


                {
                  status[device.id]
                  === "issue" && (

                    <div className="issue-section">

                      <div className="issue-grid">

                        {
                          problems.map(
                            (problem:any)=>(

                              <button
                                key={problem.id}
                                className={
                                  issueType[device.id]
                                  === problem.id
                                  ? "issue-option active"
                                  : "issue-option"
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

                            )
                          )
                        }

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
                          setReplaceDevice(
                            device
                          )
                        }
                      >
                        Ganti Device
                      </button>

                    </div>

                  )
                }

              </div>

            )
          )
        }

        <div className="notes-card">
          <label>
            Catatan Kondisi Tenant
          </label>

          <textarea
            placeholder="Contoh: kondisi tenant aman, jaringan stabil..."
            value={tenantNote}
            onChange={(e)=>
              setTenantNote(e.target.value)
            }
          />
        </div>

        <button
          className="save-btn"
          onClick={submitChecklist}
        >
          Simpan Hasil
        </button>

      </div>


      {
        replaceDevice && (

          <div className="replace-modal">

            <div className="replace-sheet">

              <h3>
                Ganti Device
              </h3>


              <p className="replace-old-device">
                Device Lama
                <br/>

                <b>
                  {replaceDevice.asset}
                </b>

                <br/>

                {replaceDevice.barcode}
              </p>


              <div className="replace-section">

                <label>
                  Scan Barcode / QR Device Pengganti
                </label>


                <input
                  autoFocus
                  placeholder="Scan barcode device"
                  value={replacement.assetCode}
                  onChange={(e)=>
                    setReplacement({
                      ...replacement,
                      assetCode:
                      e.target.value,
                    })
                  }
                />

              </div>


              <div className="replace-divider">
                atau isi manual
              </div>


              <div className="replace-section">

                <label>
                  Kode Asset Baru
                </label>

                <input
                  placeholder="Masukkan kode asset"
                  value={replacement.assetCode}
                  onChange={(e)=>
                    setReplacement({
                      ...replacement,
                      assetCode:
                      e.target.value,
                    })
                  }
                />

              </div>


              <div className="replace-section">

                <label>
                  Nama Device Baru
                </label>


                <input
                  placeholder="Masukkan nama device"
                  value={replacement.deviceName}
                  onChange={(e)=>
                    setReplacement({
                      ...replacement,
                      deviceName:
                      e.target.value,
                    })
                  }
                />

              </div>


              <button
                className="sheet-btn"
                onClick={replaceAsset}
              >
                Simpan Pergantian
              </button>


              <button
                className="sheet-close"
                onClick={()=>{
                  setReplaceDevice(null);

                  setReplacement({
                    assetCode:"",
                    deviceName:"",
                  });
                }}
              >
                Batal
              </button>

            </div>

          </div>

        )
      }

    </MobileLayout>
  );
}