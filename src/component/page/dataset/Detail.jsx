import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Detail() {
  const { id } = useParams();
  const [dataset, setDataset] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(`https://api-satudata.lampungtimurkab.go.id/dataset/detail/${id}`);
        const data = await res.json();
        setDataset(data);
      } catch (error) {
        console.error("Gagal memuat data detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <section className="py-6" style={{ marginTop: "150px" }}>
        <div className="container text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-3">Memuat detail dataset...</p>
        </div>
      </section>
    );
  }

  if (!dataset) {
    return (
      <section className="py-6" style={{ marginTop: "150px" }}>
        <div className="container text-center py-5">
          <p>Data tidak ditemukan.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6" style={{ marginTop: "150px" }}>
      <div className="container">
        <h1 className="fs-0 fw-bold text-warning">Detail Dataset</h1>
        <h6 className="lh-sm mt-3 mb-3">
          Temukan kumpulan data-data mentah berupa tabel yang bisa diolah lebih lanjut di sini.
          Open Data menyediakan akses ke beragam koleksi dataset dari seluruh Organisasi Perangkat Daerah di Lampung Timur.
        </h6>

        <div className="row g-2" style={{ marginTop: "10px" }}>
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover table-bordered">
                    <tbody>
                      <tr>
                        <th width="15%">Nama OPD</th>
                        <td>{dataset.nama_opd}</td>
                      </tr>
                      <tr>
                        <th>Judul Dataset</th>
                        <td>{dataset.title}</td>
                      </tr>
                      <tr>
                        <th>Deskripsi</th>
                        <td>{dataset.description || "-"}</td>
                      </tr>
                      <tr>
                        <th>Jenis Data</th>
                        <td>{dataset.jenis_string}</td>
                      </tr>
                      <tr>
                        <th>Kategori Data</th>
                        <td>{dataset.kategori_string}</td>
                      </tr>
                      <tr>
                        <th>Kode DSSD</th>
                        <td>{dataset.kode_dssd}</td>
                      </tr>
                      <tr>
                        <th>Uraian DSSD</th>
                        <td>{dataset.uraian_dssd}</td>
                      </tr>
                      <tr>
                        <th>Satuan</th>
                        <td>{dataset.satuan}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="card mt-3">
              <div className="card-body">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Jumlah Data Sektoral &amp; API Interoperabilitas</h4>
                  {dataset.download_url && (
                    <a
                      href={`https://${dataset.download_url}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-sm btn-primary font-weight-bold"
                    >
                      Download Data
                    </a>
                  )}
                </div>

                <div className="row mt-3">
                  <div className="col-6">
                    <div className="table-responsive">
                      <table className="table table-centered table-bordered table-nowrap mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Tahun</th>
                            <th>Jumlah</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dataset.input && dataset.input.length > 0 ? (
                            dataset.input.map((item, index) => (
                              <tr key={index}>
                                <td>{item.tahun}</td>
                                <td>{item.jumlah}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="2" className="text-center text-muted">
                                Tidak ada data input.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="table-responsive">
                      <table className="table table-centered table-bordered table-nowrap mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Method</th>
                            <th>API</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>GET</td>
                            <td>
                              <a
                                target="_blank"
                                href={`https://api-satudata.lampungtimurkab.go.id/dataset/detail/${dataset.id}`}
                                rel="noreferrer"
                                className="btn btn-sm btn-info"
                              >
                                Open API
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card custom-card mt-3">
              <div className="card-body">
                <h5 className="text-center mb-3">Jumlah Data</h5>
                {dataset.input && dataset.input.length > 0 ? (
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={dataset.input} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="tahun" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`Jumlah Data: ${value}`, "Jumlah"]} />
                      <Legend />
                      <Bar dataKey="jumlah" fill="#ff4d4d"  />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-muted text-center">Tidak ada data untuk ditampilkan pada grafik.</p>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
