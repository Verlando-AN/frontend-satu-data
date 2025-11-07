import React from "react";
import { useParams, Link } from "react-router-dom";
import usePublikasi from "../../../hooks/usePublikasi.js";
import img_logo from "../../../assets/logolamptim.jpeg";

export default function Buku() {
  const { slug } = useParams();
  const { publikasiData, loading } = usePublikasi(slug);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <p style={styles.loadingText}>Sedang memuat detail publikasi...</p>
      </div>
    );
  }

  if (!publikasiData || !publikasiData.buku) {
    return <p style={styles.notFound}>Data tidak ditemukan.</p>;
  }

  const tanggal = new Date(publikasiData.created_at * 1000).toLocaleDateString("id-ID");
  const gambar = publikasiData.cover
    ? `https://api-satudata.lampungtimurkab.go.id/${publikasiData.cover}`
    : img_logo;

  const abstrak =
    publikasiData.deskripsi ||
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pretium, sem in porta faucibus, enim massa mattis justo, non eleifend velit mi et urna. Cras tincidunt, lectus at convallis sagittis, nulla ipsum viverra odio, nec rhoncus magna orci at nisi.";

  const kategori = [
    "Pendidikan",
    "Assessment",
    "Evaluasi",
    "Bahasa Indonesia",
    "Ilmu Pendidikan",
  ];

  return (
    <div style={styles.container}>
      <Link to="/publikasi" style={styles.backButton}>
        Kembali ke Daftar Publikasi
      </Link>

      <div style={styles.articleContainer}>
        <div style={styles.leftSection}>
          <img src={gambar} alt="Sampul Publikasi" style={styles.coverImage} />
          <p style={styles.published}>Diterbitkan: {tanggal}</p>
          <a
            href={`https://api-satudata.lampungtimurkab.go.id/${publikasiData.file}`}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.downloadBtn}
          >
            📄 Buka / Unduh File
          </a>
        </div>

        <div style={styles.rightSection}>
          <h2 style={styles.title}>{publikasiData.buku}</h2>
          <p style={styles.opd}>{publikasiData.nama_opd}</p>
          <p style={styles.year}>Tahun: {publikasiData.tahun}</p>

          <div style={styles.tagContainer}>
            {kategori.map((tag, index) => (
              <span key={index} style={styles.tag}>
                {tag}
              </span>
            ))}
          </div>

          <h3 style={styles.abstractTitle}>Abstract</h3>
          <p style={styles.abstractText}>{abstrak}</p>
          <p style={styles.abstractText}>{abstrak} {abstrak} {abstrak}</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1100px",
    margin: "auto",
    padding: "20px",
    fontFamily: "'Poppins', sans-serif",
  },
  backButton: {
    display: "inline-block",
    marginBottom: "25px",
    textDecoration: "none",
    color: "#2563eb",
    fontWeight: 500,
  },
  articleContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "30px",
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
    padding: "25px",
  },
  leftSection: {
    flex: "1 1 35%",
    textAlign: "center",
  },
  coverImage: {
    width: "100%",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
  },
  published: {
    marginTop: "15px",
    color: "#555",
    fontSize: "15px",
  },
  downloadBtn: {
    display: "inline-block",
    marginTop: "15px",
    padding: "10px 20px",
    background: "#ff1616ff",
    color: "#ffffffff",
    borderRadius: "50px",
    fontWeight: 600,
    textDecoration: "none",
    transition: "0.3s ease",
  },
  rightSection: {
    flex: "1 1 60%",
  },
  title: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#222",
    marginBottom: "10px",
  },
  opd: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "5px",
  },
  year: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "15px",
  },
  tagContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "20px",
  },
  tag: {
    background: "#ff1616ff",
    color: "#ffffffff",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "13px",
  },
  abstractTitle: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#111",
  },
  abstractText: {
    fontSize: "15px",
    color: "#333",
    lineHeight: 1.7,
  },
  loadingContainer: {
    textAlign: "center",
    padding: "60px 0",
  },
  loadingText: {
    fontSize: "18px",
    color: "#000000ff",
  },
  notFound: {
    textAlign: "center",
    color: "#000000ff",
    fontSize: "18px",
    marginTop: "50px",
  },
};
