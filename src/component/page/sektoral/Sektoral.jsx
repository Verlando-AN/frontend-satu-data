import React, { useState, useEffect } from "react";

export default function Sektoral() {
  const [opdList, setOpdList] = useState([]);
  const [selectedOPD, setSelectedOPD] = useState("");
  const [dariTahun, setDariTahun] = useState("");
  const [sampaiTahun, setSampaiTahun] = useState("");
  const [dataSektoral, setDataSektoral] = useState([]);
  const [tahunList, setTahunList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const perPage = 20; 

  useEffect(() => {
    fetch("https://api-satudata.lampungtimurkab.go.id/list-opd")
      .then((res) => res.json())
      .then((data) => setOpdList(data))
      .catch((err) => console.error("Gagal memuat data OPD:", err));
  }, []);

  const fetchDataSektoral = async (page = 1) => {
    try {
      setLoading(true);
      const url = `https://api-satudata.lampungtimurkab.go.id/data-sektoral/list-by-opd?id_user_opd=${selectedOPD}&dari_tahun=${dariTahun}&sampai_tahun=${sampaiTahun}&page=${page}&per_page=${perPage}`;
      const res = await fetch(url);
      const data = await res.json();

      const current = parseInt(res.headers.get("x-pagination-current-page")) || 1;
      const total = parseInt(res.headers.get("x-pagination-page-count")) || 1;
      const totalCount = parseInt(res.headers.get("x-pagination-total-count")) || 0;

      const dataArr = Array.isArray(data.data) ? data.data : data;

      const tahunSet = new Set();
      dataArr.forEach((item) => {
        if (item.input && Array.isArray(item.input)) {
          item.input.forEach((i) => {
            if (i.tahun) tahunSet.add(i.tahun);
          });
        }
      });

      setTahunList(Array.from(tahunSet).sort((a, b) => a - b));
      setDataSektoral(dataArr);
      setCurrentPage(current);
      setTotalPages(total);
      setTotalCount(totalCount);
    } catch (err) {
      console.error("Gagal mengambil data sektoral:", err);
      setDataSektoral([]);
      setTahunList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTampilkan = () => {
    if (!selectedOPD || !dariTahun || !sampaiTahun) {
      alert("Isi semua field (OPD, dari tahun, sampai tahun)!");
      return;
    }
    fetchDataSektoral(1);
  };

  const handlePrev = () => {
    if (currentPage > 1) fetchDataSektoral(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) fetchDataSektoral(currentPage + 1);
  };

  return (
    <div className="container py-5">
      <h2
        className="mb-4"
        style={{ color: "#F5A623", fontWeight: "600", fontSize: "32px" }}
      >
        Data Sektoral Berdasarkan OPD
      </h2>

      <div className="bg-white rounded shadow-sm p-4 mb-4">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold" style={{ color: "#333" }}>
              Perangkat Daerah
            </label>
            <select
              className="form-select"
              value={selectedOPD}
              onChange={(e) => setSelectedOPD(e.target.value)}
            >
              <option value="">Pilih OPD</option>
              {opdList.map((opd) => (
                <option key={opd.id_opd} value={opd.id_opd}>
                  {opd.nama_opd}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label fw-semibold" style={{ color: "#333" }}>
              Dari Tahun
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Dari Tahun"
              value={dariTahun}
              onChange={(e) => setDariTahun(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label fw-semibold" style={{ color: "#333" }}>
              Sampai Tahun
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Sampai Tahun"
              value={sampaiTahun}
              onChange={(e) => setSampaiTahun(e.target.value)}
            />
          </div>
        </div>

        <button
          className="btn mt-3 px-4"
          onClick={handleTampilkan}
          style={{
            backgroundColor: "#6C7FE3",
            color: "white",
            fontWeight: "500",
          }}
          disabled={loading}
        >
          {loading ? "Memuat..." : "Tampilkan Sekarang"}
        </button>
      </div>

      <div className="bg-white rounded shadow-sm p-4">
        <table className="table table-bordered mb-0">
          <thead style={{ backgroundColor: "#f8f9fa" }}>
            <tr>
              <th>No</th>
              <th>Kode DSSD</th>
              <th>Uraian DSSD</th>
              <th>Satuan</th>
              {tahunList.map((th) => (
                <th key={th}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="10" className="text-center py-4">
                  Sedang memuat data...
                </td>
              </tr>
            ) : dataSektoral.length > 0 ? (
              dataSektoral.map((item, index) => (
                <tr key={item.id}>
                  <td>{(currentPage - 1) * perPage + index + 1}</td>
                  <td>{item.kode_dssd}</td>
                  <td>{item.uraian_dssd}</td>
                  <td>{item.satuan}</td>
                  {tahunList.map((th) => {
                    const found =
                      item.input?.find((i) => i.tahun === th)?.jumlah ?? 0;
                    return <td key={th}>{found}</td>;
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-5" style={{ color: "#666" }}>
                  Tidak ada data yang ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="d-flex justify-content-between align-items-center mt-4">
            <button
              className="btn px-4"
              onClick={handlePrev}
              disabled={currentPage === 1}
              style={{
                backgroundColor: "#0033fdff",
                opacity: currentPage === 1 ? 0.6 : 1,
                color: "white",
              }}
            >
              Previous
            </button>

            <span style={{ color: "#666", fontWeight: "500" }}>
              Page {currentPage} of {totalPages} 
            </span>

            <button
              className="btn px-4"
              onClick={handleNext}
              disabled={currentPage === totalPages}
              style={{
                backgroundColor: "#0033fdff",
                opacity: currentPage === totalPages ? 0.6 : 1,
                color: "white",
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
