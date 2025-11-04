import React, { useEffect, useState } from "react";
import "../../css/publikasi.css";

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
    <div className="publikasi-container">
      <h2 className="publikasi-title">Data Publikasi</h2>

      {loading ? (
        <div className="loading-container">
          <p>Sedang memuat data...</p>
        </div>
      ) : (
        <div className="books-grid">
          {publikasiData.map((item, index) => {
            const tanggal = new Date(item.created_at * 1000).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            });

            const fileUrl = `https://api-satudata.lampungtimurkab.go.id/${item.file}`;

            return (
              <div key={index} className="book-card">
                
                <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="book-link">
                  <div className="book-spine"></div>
                  <div className="book-cover">
                    <div className="book-content">
                      <h3 className="book-title">{item.buku}</h3>
                      <div className="book-details">
                        <div className="detail-item">
                          <span className="detail-label">Perangkat Daerah</span>
                          <span className="detail-value">{item.nama_opd}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Dibuat</span>
                          <span className="detail-value">{tanggal}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}