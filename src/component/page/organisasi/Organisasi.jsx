import React, { useState, useEffect } from "react";
import Gambarsektoral from "../../../assets/sektoral.png";

export default function Organisasi() {
  const [activeTab, setActiveTab] = useState("Semua");
  const [organisasiData, setOrganisasiData] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    "Semua",
    "Puskesmas",
    "Badan",
    "Bagian",
    "Dinas",
    "Sekretariat",
    "Inspektorat",
    "Satuan",
    "Rumah",
  ];

  useEffect(() => {
    fetch("https://api-satudata.lampungtimurkab.go.id/list-opd", {
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setOrganisasiData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Gagal mengambil data:", error);
        setLoading(false);
      });
  }, []);

  const filteredData =
    activeTab === "Semua"
      ? organisasiData
      : organisasiData.filter((org) =>
          org.nama_opd.toLowerCase().includes(activeTab.toLowerCase())
        );

  return (
    <div className="container py-5">
      <h2
        className="mb-4"
        style={{ color: "#F5A623", fontWeight: "600", fontSize: "42px" }}
      >
        Organisasi
      </h2>

      <div className="mb-4 d-flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="btn px-4 py-2"
            style={{
              backgroundColor: activeTab === tab ? "#5CB85C" : "#6c757d",
              color: "white",
              fontWeight: "500",
              border: "none",
              borderRadius: "6px",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Sedang memuat data...</p>
      ) : (
        <div className="row g-4">
          {filteredData.map((org) => (
            <div key={org.id_opd} className="col-md-6 col-lg-3">
              <div
                className="card h-100 shadow-sm border-0"
                style={{ borderRadius: "8px" }}
              >
                <div className="card-body text-center p-4">
                  <div className="mb-3" style={{ fontSize: "64px" }}>
                    <img 
                      src={Gambarsektoral}
                      alt="Ilustrasi Sektoral"
                      className="sektoral"
                      style={{ maxWidth: '80px' }}
                    />
                  </div>

                  <h3
                    className="mb-2"
                    style={{
                      color: "#F5A623",
                      fontWeight: "700",
                      fontSize: "36px",
                    }}
                  >
                    {org.total_ref_sektoral}
                  </h3>

                  <p
                    className="mb-3"
                    style={{
                      color: "#F5A623",
                      fontWeight: "600",
                      fontSize: "18px",
                    }}
                  >
                    Data Sektoral
                  </p>

                  <p
                    className="mb-0"
                    style={{
                      color: "#666",
                      fontSize: "14px",
                      lineHeight: "1.5",
                    }}
                  >
                    {org.nama_opd}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {filteredData.length === 0 && (
            <p className="text-center mt-4 text-muted">
              Tidak ada data untuk kategori <b>{activeTab}</b>.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
