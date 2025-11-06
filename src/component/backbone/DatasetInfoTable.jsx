export default function DatasetInfoTable({ dataset }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-bordered">
        <tbody>
          <tr><th>Nama OPD</th><td>{dataset.nama_opd}</td></tr>
          <tr><th>Judul Dataset</th><td>{dataset.title}</td></tr>
          <tr><th>Deskripsi</th><td>{dataset.description || "-"}</td></tr>
          <tr><th>Jenis Data</th><td>{dataset.jenis_string}</td></tr>
          <tr><th>Kategori Data</th><td>{dataset.kategori_string}</td></tr>
          <tr><th>Kode DSSD</th><td>{dataset.kode_dssd}</td></tr>
          <tr><th>Uraian DSSD</th><td>{dataset.uraian_dssd}</td></tr>
          <tr><th>Satuan</th><td>{dataset.satuan}</td></tr>
        </tbody>
      </table>
    </div>
  );
}
