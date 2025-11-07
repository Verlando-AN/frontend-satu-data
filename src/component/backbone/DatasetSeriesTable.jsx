export default function DatasetSeriesTable({ dataset }) {
  const input = dataset?.input || [];

  return (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead className="bg-primary text-white">
          <tr>
            <th rowSpan="2"></th>
            <th rowSpan="2">Kode</th>
            <th rowSpan="2">Wilayah</th>
            <th rowSpan="2">Komponen</th>
            <th colSpan={input.length || 1}>Tahun</th>
          </tr>
          <tr>
            {input.length > 0
              ? input.map((item, i) => <th key={i}>{item.tahun}</th>)
              : <th>Tidak ada data tahun</th>}
          </tr>
        </thead>
        <tbody>
          {input.length > 0 ? (
            <tr>
              <td>{dataset.kode_dssd}</td>
              <td>Lampung Timur</td>
              <td>{dataset.kategori_string}</td>
              {input.map((item, i) => <td key={i}>{item.jumlah}</td>)}
            </tr>
          ) : (
            <tr><td colSpan="9" className="text-center text-muted">Tidak ada data input.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
