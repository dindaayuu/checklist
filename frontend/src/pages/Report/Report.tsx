import "./Report.css";

import { useEffect, useState } from "react";

import MobileLayout from "../../components/MobileLayout";
import BottomNav from "../../components/BottomNav";
import api from "../../services/api";

import {
  Search,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Check,
  ChevronRight,
  ChevronDown,
  Clock,
  X,
  Tablet,
  LogOut,
} from "lucide-react";

export default function Report() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [reports, setReports] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [expandedDeviceId, setExpandedDeviceId] = useState<any>(null);

  const handleLogout=()=>{
    localStorage.removeItem("picName");
    localStorage.removeItem("userName");
    window.location.href="/";
  };

  const getReports = async () => {
    try {
      const response = await api.get("/checklist/report");

      const data=response.data.data.map((item:any)=>{

        const hasReplacement=item.details.some(
        (d:any)=>!!d.replacement
        );
        
        const hasProblem=
        item.status==="PROBLEM"||
        item.details.some(
        (d:any)=>d.condition==="PROBLEM"
        )||
        hasReplacement;
        
        return{
          id:item.id,
          tenant:item.tenant,
          area:item.area,
          pic:item.pic,
          time:item.finish_time,
          overall_note:item.overall_note,
          status:hasProblem?"issue":"done",
          detail:hasProblem
            ?"Ada kendala / pergantian perangkat"
            :"Semua perangkat normal",
          devices:item.details.map((device:any)=>({
            device:device.device,
            barcode:device.barcode,
            condition:device.condition,
            problem:device.problem,
            note:device.note,
            replacement:device.replacement
          }))
        };
        
        });

      setReports(data);

    } catch(error) {
      console.log("REPORT ERROR", error);
    }
  };


  useEffect(() => {
    getReports();

    const interval = setInterval(() => {
      getReports();
    },5000);

    return () => clearInterval(interval);
  },[]);


  const filteredReports = reports.filter((item:any)=>{

    const keyword = search.toLowerCase();

    const matchSearch =

        item.tenant.toLowerCase().includes(keyword) ||

        item.area.toLowerCase().includes(keyword) ||

        item.pic.toLowerCase().includes(keyword) ||

        item.status.toLowerCase().includes(keyword);

    const matchFilter =

        activeFilter==="all" ||

        (activeFilter==="issue" && item.status==="issue") ||

        (activeFilter==="done" && item.status==="done");

    return matchSearch && matchFilter;

});

  useEffect(() => {
    if(!selectedReport){
      setExpandedDeviceId(null);
      return;
    }
  
    const issueDevice = selectedReport.devices.find(
      (device:any)=>
        device.condition === "PROBLEM" ||
        !!device.replacement
    );
  
    setExpandedDeviceId(
      issueDevice
        ? issueDevice.barcode
        : null
    );
  
  },[selectedReport]);


  const toggleDevice = (id:any) => {

    setExpandedDeviceId((prev:any) =>
      prev === id
        ? null
        : id
    );

  };

  return (
    <MobileLayout>
      <div className="report-page">

      <div className="report-header">

        <div>
          <h2 className="report-title">
            Laporan Checklist
          </h2>

          <p className="report-subtitle">
            Riwayat hasil pengecekan tenant
          </p>
        </div>


        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          <LogOut size={18}/>
        </button>

        </div>


        <div className="search-box">
          <Search size={18}/>

          <input
              type="text"
              placeholder="Cari tenant, area, PIC..."
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
          />
        </div>


        <div className="filter-group">

          <button
            className={
              activeFilter === "all"
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() => setActiveFilter("all")}
          >
            Semua
          </button>


          <button
            className={
              activeFilter === "issue"
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() => setActiveFilter("issue")}
          >
            Kendala
          </button>


          <button
            className={
              activeFilter === "done"
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() => setActiveFilter("done")}
          >
            Selesai
          </button>

        </div>


        {filteredReports.map((item:any) => (

          <div
            className="report-card"
            key={item.id}
          >

            <div className="report-top">

              <div
                className={
                  `report-icon ${
                    item.status === "issue"
                    ? "issue"
                    : "done"
                  }`
                }
              >

                {item.status === "issue"
                  ? <AlertTriangle size={22}/>
                  : <CheckCircle2 size={22}/>
                }

              </div>


              <div className="report-info">

                <h3>
                  {item.tenant}
                </h3>

                <p>

                {item.area}

                <br/>

    PIC : {item.pic}

</p>

              </div>

            </div>


            <div className="report-detail">

              <span className="time">
                {item.time}
              </span>

              <p>
                {item.detail}
              </p>

            </div>


            <div
              className="detail-link"
              onClick={() =>
                setSelectedReport(item)
              }
            >

              <span>
                Lihat Detail
              </span>

              <ChevronRight size={16}/>

            </div>

          </div>

        ))}

      </div>


      {selectedReport && (

        <div
          className="detail-overlay"
          onClick={() =>
            setSelectedReport(null)
          }
        >

          <div
            className="detail-sheet modern"
            onClick={(e)=>
              e.stopPropagation()
            }
          >

            <div className="sheet-handle"/>


            <button
              className="detail-close"
              onClick={() =>
                setSelectedReport(null)
              }
            >
              <X size={20}/>
            </button>


            <div className="sheet-header">

              <div
                className={
                  `header-icon ${
                    selectedReport.status === "issue"
                    ? "issue"
                    : "done"
                  }`
                }
              >

                {selectedReport.status === "issue"
                  ? <AlertTriangle size={26}/>
                  : <CheckCircle2 size={26}/>
                }

              </div>


              <div className="header-info">

                <h2>
                  {selectedReport.tenant}
                </h2>

                <span>
                  {selectedReport.area}
                </span>


                <div
                  className={
                    `sheet-status ${
                      selectedReport.status === "issue"
                      ? "issue"
                      : "done"
                    }`
                  }
                >

                  <span className="status-dot"/>

                  {selectedReport.status === "issue"
                    ? "Selesai Dengan Kendala"
                    : "Selesai Tanpa Kendala"
                  }

                </div>


                <p className="sheet-time">
                  <Clock size={13}/>
                  {selectedReport.time}
                </p>

              </div>

            </div>


            <div className="sheet-section">

              <h4>
                Checklist Perangkat
              </h4>


              {selectedReport.devices.map((device:any) => {

              const isIssue =
                device.condition === "PROBLEM" ||
                !!device.replacement;
                const isOpen =
                  expandedDeviceId === device.barcode;


                return (

                  <div
                    key={device.barcode}
                    className={
                      `device-card ${
                        isIssue
                        ? "issue"
                        : ""
                      }`
                    }
                  >

                    <div
                      className="device-row"
                      onClick={() =>
                        isIssue &&
                        toggleDevice(device.barcode)
                      }
                    >

                      <div className="device-left">

                        <div
                          className={
                            `device-icon ${
                              isIssue
                              ? "issue"
                              : ""
                            }`
                          }
                        >
                          <Tablet size={20}/>
                        </div>


                        <div>

                          <h5>
                            {device.device}
                          </h5>

                          <span>
                            {device.barcode}
                          </span>

                        </div>

                      </div>


                      <div className="device-right">

                        <span
                          className={
                            isIssue
                            ? "badge-problem"
                            : "badge-normal"
                          }
                        >

                              {device.replacement
                              ?"Diganti"
                              :device.condition==="PROBLEM"
                              ?"Bermasalah"
                              :"Normal"}

                        </span>


                        <div
                          className={
                            `status-circle ${
                              isIssue
                              ? "issue"
                              : "done"
                            }`
                          }
                        >

                          {isIssue
                            ? <AlertCircle size={14}/>
                            : <Check size={14}/>
                          }

                        </div>


                        <ChevronDown
                          size={18}
                          className={
                            isOpen
                            ? "device-chevron rotated"
                            : "device-chevron"
                          }
                        />

                      </div>

                    </div>


                    {isIssue && isOpen && (
                        <div className="problem-detail">

                          <div className="problem-row">
                            <small>Kendala</small>
                            <strong>
                              {device.problem ?? "-"}
                            </strong>
                          </div>


                          <div className="problem-row">
                            <small>Catatan</small>
                            <strong>
                              {device.note ?? "-"}
                            </strong>
                          </div>


                          {device.replacement && (

                            <div className="replacement-box">

                              <h4>
                                🔄 Pergantian Device
                              </h4>


                              <div className="problem-row">
                                <small>Device Lama</small>

                                <strong>
                                  {device.replacement.old_device}
                                  <br/>
                                  {device.replacement.old_code}
                                </strong>
                              </div>


                              <div className="problem-row">
                                <small>Device Baru</small>

                                <strong>
                                  {device.replacement.new_device}
                                  <br/>
                                  {device.replacement.new_code}
                                </strong>
                              </div>


                              <div className="problem-row">
                                <small>Diganti Oleh</small>

                                <strong>
                                  {device.replacement.replaced_by}
                                </strong>
                              </div>

                            </div>

                          )}


                        </div>
                      )}

                  </div>

                );

              })}

            </div>

            {selectedReport.overall_note&&(
              <div className="note-card">
                <h4>
                  Catatan Kondisi Tenant
                </h4>

                <p>
                  {selectedReport.overall_note}
                </p>
              </div>
            )}

            <button
              className="close-button"
              onClick={() =>
                setSelectedReport(null)
              }
            >
              Tutup
            </button>

          </div>

        </div>

      )}


      <BottomNav/>

    </MobileLayout>
  );

}