import { Link } from "react-router-dom";
import icon from "../../../assets/dataseticon.png";
import useDataset from "../../../hooks/useDataset.js";

export default function Dataset() {
  const {
    produsenSearch,
    setProdusenSearch,
    datasetSearch,
    setDatasetSearch,
    filteredProdusen,
    filteredDatasets,
    selectedProdusen,
    setSelectedProdusen,
    fetchDatasets,
    handlePrev,
    handleNext,
    currentPage,
    totalPages,
    totalDatasets,
  } = useDataset();

  const categories = [
    { name: "Sarana & Infrastruktur", count: 0 },
    { name: "Ekonomi & Pembangunan", count: 0 },
    { name: "Sosial & Kesejahteraan Masyarakat", count: 0 },
    { name: "Kebijakan & Legislasi", count: 0 },
  ];

  return (
    <div className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container">
        <div className="mb-4">
          <h5 style={{ color: "#F5A623", fontWeight: "600", fontSize: "20px", marginBottom: "12px" }}>
            Dataset
          </h5>
          <p style={{ fontSize: "14px", color: "#666", lineHeight: "1.6" }}>
            Temukan kumpulan data-data mentah berupa tabel yang bisa diolah lebih lanjut di sini. Open Data menyediakan akses ke beragam koleksi dataset dari seluruh Organisasi Perangkat Daerah di Lampung Timur.
          </p>
        </div>

        <div className="row">
          <div className="col-lg-4 col-md-4">
            <div className="bg-white rounded p-3 mb-3 shadow-sm">
              <h6 style={{ fontSize: "15px", fontWeight: "700", color: "#333", marginBottom: "16px" }}>
                Produsen Dataset
              </h6>

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Cari Produsen"
                value={produsenSearch}
                onChange={(e) => setProdusenSearch(e.target.value)}
                style={{ fontSize: "14px" }}
              />

              <div className="d-flex flex-column gap-2" style={{ maxHeight: "400px", overflowY: "auto" }}>
                {filteredProdusen.length > 0 ? (
                  filteredProdusen.map((opd) => (
                    <button
                      key={opd.id_opd}
                      className={`btn text-start ${
                        selectedProdusen === opd.id_opd ? "btn-primary text-white" : "btn-light"
                      }`}
                      style={{
                        fontSize: "13px",
                        padding: "10px 12px",
                        border: "1px solid #e0e0e0",
                      }}
                      onClick={() => {
                        setSelectedProdusen(opd.id_opd);
                        fetchDatasets(1, opd.id_opd);
                      }}
                    >
                      {opd.nama_opd}
                    </button>
                  ))
                ) : (
                  <p className="text-center text-muted" style={{ fontSize: "13px" }}>
                    Tidak ditemukan
                  </p>
                )}
              </div>
            </div>

            <div className="bg-white rounded p-3 shadow-sm">
              <h6 style={{ fontSize: "15px", fontWeight: "700", color: "#333", marginBottom: "16px" }}>
                Kategori Data Sektoral
              </h6>
              <div className="d-flex flex-column gap-2">
                {categories.map((category, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-decoration-none d-flex justify-content-between align-items-center p-2"
                    style={{
                      fontSize: "13px",
                      color: "#007BFF",
                      borderRadius: "4px",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                  >
                    <span>{category.name}</span>
                    <span
                      style={{
                        backgroundColor: "#007BFF",
                        color: "white",
                        padding: "2px 8px",
                        borderRadius: "10px",
                        fontSize: "11px",
                        fontWeight: "600",
                      }}
                    >
                      {category.count}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-8 col-md-8">
            <div className="bg-white rounded shadow-sm p-3 mb-3">
              <div className="row g-3 align-items-end">
                <div className="col-md-8">
                  <label className="form-label fw-semibold mb-2" style={{ fontSize: "15px", color: "#333" }}>
                    List Dataset
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Cari Dataset"
                    value={datasetSearch}
                    onChange={(e) => setDatasetSearch(e.target.value)}
                    style={{ fontSize: "14px" }}
                  />
                </div>
                <div className="col-md-4 text-end">
                  <span style={{ fontSize: "14px", color: "#666" }}>
                    <strong>{totalDatasets}</strong> Dataset
                  </span>
                </div>
              </div>
            </div>

            <div className="d-flex flex-column gap-3">
              {filteredDatasets.length > 0 ? (
                filteredDatasets.map((dataset) => (
                  <div key={dataset.id} className="bg-white rounded shadow-sm p-4 border">
                    <div className="d-flex gap-3">
                      <img
                        src={icon}
                        alt="Data Portal Illustration"
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "8px",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <h6 className="mb-2">
                          <Link
                            to={`/dataset/detail/${dataset.id}`}
                            className="text-decoration-none"
                            style={{ color: "#333", fontWeight: "700", fontSize: "16px" }}
                          >
                            {dataset.title}
                          </Link>
                        </h6>
                        {dataset.description && (
                          <p style={{ fontSize: "14px", color: "#666", marginBottom: "12px" }}>
                            {dataset.description}
                          </p>
                        )}
                        <div
                          className="d-flex align-items-center flex-wrap gap-3"
                          style={{ fontSize: "13px", color: "#888" }}
                        >
                          <span>🏢 {dataset.producer}</span>
                          <span>📅 {dataset.date}</span>
                          <span>🕐 {dataset.daysAgo} hari lalu</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted py-5">Tidak ada dataset ditemukan.</p>
              )}
            </div>

            {totalPages > 1 && (
              <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
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
                    fontWeight: "500",
                  }}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
