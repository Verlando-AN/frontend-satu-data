import React from "react";
import { useUrusan } from "../../../hooks/useUrusan.js";

export default function Urusan() {
  const {
    urusanList,
    selectedOPD,
    dariTahun,
    sampaiTahun,
    dataSektoral,
    tahunList,
    loading,
    pagination,
    setSelectedOPD,
    setDariTahun,
    setSampaiTahun,
    fetchData,
    handlePrev,
    handleNext,
  } = useUrusan();

  return (
    <div className="container py-5">
      <h2 className="mb-4" style={{ color: "#F5A623", fontWeight: 600, fontSize: 32 }}>
        Data Sektoral Berdasarkan Urusan
      </h2>

      <div className="bg-white rounded shadow-sm p-4 mb-4">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold" style={{ color: "#333" }}>
              Urusan Bidang
            </label>
            <select
              className="form-select"
              value={selectedOPD}
              onChange={(e) => setSelectedOPD(e.target.value)}
            >
              <option value="">Pilih Urusan</option>
              {urusanList.map((item) => (
                <option key={item.kode_urusan} value={item.kode_urusan}>
                  {item.nama_urusan}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label fw-semibold">Dari Tahun</label>
            <input
              type="text"
              className="form-control"
              value={dariTahun}
              onChange={(e) => setDariTahun(e.target.value)}
              placeholder="Dari Tahun"
            />
          </div>

          <div className="col-md-3">
            <label className="form-label fw-semibold">Sampai Tahun</label>
            <input
              type="text"
              className="form-control"
              value={sampaiTahun}
              onChange={(e) => setSampaiTahun(e.target.value)}
              placeholder="Sampai Tahun"
            />
          </div>
        </div>

        <button
          className="btn mt-3 px-4"
          onClick={() => fetchData(1)}
          disabled={loading}
          style={{
            backgroundColor: "#6C7FE3",
            color: "white",
            fontWeight: "500",
          }}
        >
          {loading ? "Memuat..." : "Tampilkan Sekarang"}
        </button>
      </div>

      <div className="bg-white rounded shadow-sm p-4">
        <table className="table table-bordered mb-0">
          <thead style={{ backgroundColor: "#f8f9fa" }}>
            <tr>
              <th></th>
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
                <tr key={item.id || index}>
                  <td>{(pagination.current - 1) * pagination.perPage + index + 1}</td>
                  <td>{item.kode_dssd}</td>
                  <td>{item.uraian_dssd}</td>
                  <td>{item.satuan}</td>
                  {tahunList.map((th) => {
                    const found = item.input?.find((i) => i.tahun === th)?.jumlah ?? 0;
                    return <td key={th}>{found}</td>;
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-5 text-secondary">
                  Tidak ada data yang ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {pagination.total > 1 && (
          <div className="d-flex justify-content-between align-items-center mt-4">
            <button
              className="btn px-4"
              onClick={handlePrev}
              disabled={pagination.current === 1}
              style={{
                backgroundColor: "#0033fdff",
                opacity: pagination.current === 1 ? 0.6 : 1,
                color: "white",
              }}
            >
              Previous
            </button>

            <span style={{ color: "#666", fontWeight: "500" }}>
              Page {pagination.current} of {pagination.total}
            </span>

            <button
              className="btn px-4"
              onClick={handleNext}
              disabled={pagination.current === pagination.total}
              style={{
                backgroundColor: "#0033fdff",
                opacity: pagination.current === pagination.total ? 0.6 : 1,
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
