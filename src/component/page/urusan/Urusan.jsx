import React, { useState, useEffect } from "react";

export default function Urusan() {
  const [urusanList, setUrusanList] = useState([]);
  const [selectedOPD, setSelectedOPD] = useState("");
  const [dariTahun, setDariTahun] = useState("");
  const [sampaiTahun, setSampaiTahun] = useState("");
  const [dataSektoral, setDataSektoral] = useState([]);
  const [tahunList, setTahunList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetch("https://api-satudata.lampungtimurkab.go.id/list-opd/urusan")
      .then((res) => res.json())
      .then((data) => setUrusanList(data))
      .catch((err) => console.error("Gagal memuat data urusan:", err));
  }, []);

  const handleSelectChange = (e) => {
    setSelectedOPD(e.target.value);
  };

  const fetchData = async (page = 1) => {
    if (!selectedOPD || !dariTahun || !sampaiTahun) {
      alert("Isi semua field (urusan, dari tahun, sampai tahun)!");
      return;
    }

    setLoading(true);
    try {
      const url = `https://api-satudata.lampungtimurkab.go.id/data-sektoral/list-by-urusan?kode_urusan=${selectedOPD}&dari_tahun=${dariTahun}&sampai_tahun=${sampaiTahun}&page=${page}&per_page=${pageSize}`;
      const res = await fetch(url);

      const current = res.headers.get("x-pagination-current-page");
      const total = res.headers.get("x-pagination-page-count");
      const perPage = res.headers.get("x-pagination-page-size");
      const totalData = res.headers.get("x-pagination-total-count");

      setCurrentPage(current ? parseInt(current) : 1);
      setTotalPages(total ? parseInt(total) : 1);
      setPageSize(perPage ? parseInt(perPage) : 20);
      setTotalCount(totalData ? parseInt(totalData) : 0);

      const data = await res.json();
      const dataArr = Array.isArray(data.data) ? data.data : data;

      const tahunSet = new Set();
      dataArr.forEach((item) => {
        if (item.input && Array.isArray(item.input)) {
          item.input.forEach((i) => {
            if (i.tahun) tahunSet.add(i.tahun);
          });
        }
      });

      const tahunSorted = Array.from(tahunSet).sort((a, b) => a - b);
      setTahunList(tahunSorted);
      setDataSektoral(dataArr);
    } catch (err) {
      console.error("Gagal mengambil data sektoral:", err);
      setDataSektoral([]);
      setTahunList([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) fetchData(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) fetchData(currentPage + 1);
  };

  return (
    <div className="container py-5">
      <h2
        className="mb-4"
        style={{ color: "#F5A623", fontWeight: "600", fontSize: "32px" }}
      >
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
              onChange={handleSelectChange}
              style={{ color: "#333" }}
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
          onClick={() => fetchData(1)}
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
                <tr key={item.id || index}>
                  <td>{(currentPage - 1) * pageSize + index + 1}</td>
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
                <td colSpan="10" className="text-center py-5 text-secondary">
                  Tidak ada data yang ditemukan. Silahkan lakukan pencarian di atas!
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
                fontWeight: "500",
              }}
            >
              Previous
            </button>

            <span style={{ color: "#666", fontWeight: "500" }}>
              Page {currentPage} of {totalPages} {" "}
              
            </span>

            <button
              className="btn px-4"
              onClick={handleNext}
              disabled={currentPage === totalPages}
              style={{
                backgroundColor: "#0033fdff",
                opacity: currentPage === totalPages ? 0.6 : 1,
                color: "white",
                fontWeight: "500",
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
