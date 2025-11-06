import React from "react";
import useSektoral from "../../../hooks/useSektoral.js";

export default function Sektoral() {
  const {
    opdList,
    selectedOPD,
    setSelectedOPD,
    dariTahun,
    setDariTahun,
    sampaiTahun,
    setSampaiTahun,
    dataSektoral,
    tahunList,
    loading,
    currentPage,
    totalPages,
    handleTampilkan,
    handlePrev,
    handleNext,
    perPage,
  } = useSektoral();

  return (
    <div className="container py-5">
      <h2 className="mb-4" style={{ color: "#F5A623", fontWeight: "600", fontSize: "32px" }}>
        Data Sektoral Berdasarkan OPD
      </h2>

      <div className="bg-white rounded shadow-sm p-4 mb-4">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Perangkat Daerah</label>
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
            <label className="form-label fw-semibold">Dari Tahun</label>
            <input
              type="text"
              className="form-control"
              value={dariTahun}
              onChange={(e) => setDariTahun(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label fw-semibold">Sampai Tahun</label>
            <input
              type="text"
              className="form-control"
              value={sampaiTahun}
              onChange={(e) => setSampaiTahun(e.target.value)}
            />
          </div>
        </div>

        <button
          className="btn mt-3 px-4"
          onClick={handleTampilkan}
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
              <th>.</th>
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
                    const found = item.input?.find((i) => i.tahun === th)?.jumlah ?? 0;
                    return <td key={th}>{found}</td>;
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-5 text-muted">
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
