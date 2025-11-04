import React, { useEffect, useState } from "react";

export default function Publikasi() {
  const [publikasiData, setPublikasiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api-satudata.lampungtimurkab.go.id/buku-digital", {
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPublikasiData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Gagal mengambil data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container py-5">
      <h2
        className="mb-4"
        style={{ color: "#F5A623", fontWeight: "600", fontSize: "36px" }}
      >
        Data Publikasi
      </h2>

      <div className="bg-white rounded shadow-sm p-4">
        {loading ? (
          <p>Sedang memuat data...</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr style={{ borderBottom: "2px solid #dee2e6" }}>
                  <th style={{ fontWeight: "700", color: "#333", padding: "16px" }}>No</th>
                  <th style={{ fontWeight: "700", color: "#333", padding: "16px" }}>Judul Publikasi</th>
                  <th style={{ fontWeight: "700", color: "#333", padding: "16px" }}>Perangkat Daerah</th>
                  <th style={{ fontWeight: "700", color: "#333", padding: "16px" }}>Tahun</th>
                  <th style={{ fontWeight: "700", color: "#333", padding: "16px" }}>Dibuat Pada</th>
                </tr>
              </thead>
              <tbody>
                {publikasiData.map((item, index) => {
                  const tanggal = new Date(item.created_at * 1000).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  });

                  const fileUrl = `https://api-satudata.lampungtimurkab.go.id/${item.file}`;

                  return (
                    <tr key={index} style={{ borderBottom: "1px solid #dee2e6" }}>
                      <td style={{ padding: "16px", color: "#333" }}>{index + 1}</td>
                      <td style={{ padding: "16px" }}>
                        <a
                          href={fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "#5B7FE8",
                            textDecoration: "none",
                            fontWeight: "500",
                          }}
                        >
                          {item.buku}
                        </a>
                      </td>
                      <td style={{ padding: "16px", color: "#333" }}>{item.nama_opd}</td>
                      <td style={{ padding: "16px", color: "#333" }}>{item.tahun}</td>
                      <td style={{ padding: "16px", color: "#333" }}>{tanggal}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
