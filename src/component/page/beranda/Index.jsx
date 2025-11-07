import React from "react";
import "../../css/style.css";
import Bupati from "../../../assets/bupati.png";
import Beranda2 from "../../../assets/logolamptim.jpeg";
import Card1 from "../../../assets/card1.png";
import Berkas from "../../../assets/berkas.png";
import useBerandaData from "../../../hooks/useBerandaData.js";

export default function BerandaIndex() {
  const { opdList, loading, dataTotal, isVisible, counterRef, featureRef, categoryRef } = useBerandaData();

  return (
    <div className="beranda-container"> 
      <section id="home" className="hero-section">
        <div className="hero-background">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
        </div>

        <div className="hero-content">
          <div className="hero-grid">
            <div className="hero-text">
              <p className="hero-subtitle">PORTAL SATU DATA LAMPUNG TIMUR</p>
              
              <h1 className="hero-title">
                <span className="title-line">Akses Data</span>
                <span className="title-line">Dalam Satu</span>
                <span className="title-line highlight">Portal</span>
              </h1>
              
              <p className="hero-description">
                Dalam satu sentuhan, dunia data terbuka lebar.
                Mari temukan apa yang akan anda cari.
              </p>
              
              <div className="search-container">
                <input 
                  type="search" 
                  placeholder="Cari data atau informasi..." 
                  className="search-input"
                />
                <button className="search-button">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </button>
              </div>

              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-number">{dataTotal.dataset}</div>
                  <div className="stat-label">Dataset</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{dataTotal.data_sektoral}</div>
                  <div className="stat-label">Sektoral</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{dataTotal.urusan}</div>
                  <div className="stat-label">Urusan</div>
                </div>
              </div>
            </div>

            <div className="hero-illustration">
              <div className="illustration-wrapper">
                <img 
                  src={Bupati}
                  alt="Data Portal Illustration"
                  className="illustration-img"
                />
                <div className="illustration-blob"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="categories-section" id="categories" ref={categoryRef}>
        <div className="section-header">
          <h2 className="section-title">Data Sektoral Berdasarkan OPD</h2>
          <p className="section-subtitle">Akses data dari berbagai Organisasi Perangkat Daerah</p>
        </div>

        <div className="category-grid">
          {loading ? (
            <div className="loading-state">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="skeleton-card"></div>
              ))}
            </div>
          ) : opdList.length > 0 ? (
            opdList.slice(0, 8).map((item, index) => (
              <div key={index} className={`category-card ${isVisible.categories ? 'visible' : ''}`} style={{animationDelay: `${index * 0.1}s`}}>
                <div className="category-icon">
                  <img src={Berkas} alt="Icon" style={{width: '150px', borderRadius: '100px',}} />
                </div>
                <h6 className="category-name">{item.nama_opd}</h6>
                <p className="category-projects">{item.total_ref_sektoral ?? "0"} Data Tersedia</p>
                <div className="category-arrow">.</div>
              </div>
            ))
          ) : (
            <p className="no-data">Tidak ada data ditemukan.</p>
          )}
        </div>
      </section>

      <section className="counter-section" id="counterSection" ref={counterRef}>
        <div className="counter-container">
          <div className="counter-grid">
            {[
              {
                title: "Dataset",
                description: "Kumpulan data yang diatur dalam format terstruktur dan tersedia di Portal Satu Data Indonesia.",
                count: dataTotal.dataset,
                link: "/dataset",
                gradient: "linear-gradient(135deg,  #3a7a60 0%, #3a7a60 100%)"
              },
              {
                title: "Statistik Sektoral",
                description: "Data statistik yang digunakan untuk memenuhi kebutuhan instansi pemerintah tertentu.",
                count: dataTotal.data_sektoral,
                link: "/sektoral",
                gradient: "linear-gradient(135deg,  #3a7a60 0%, #3a7a60 100%)"
              },
              {
                title: "Urusan",
                description: "Kebijakan tata kelola data pemerintah untuk menghasilkan data berkualitas dan mudah diakses.",
                count: dataTotal.urusan,
                link: "/urusan",
                gradient: "linear-gradient(135deg,  #3a7a60 0%, #3a7a60 100%)"
              }
            ].map((item, index) => (
              <div key={index} className={`counter-card ${isVisible.counterSection ? 'visible' : ''}`} style={{animationDelay: `${index * 0.2}s`}}>
                <div className="counter-icon-wrapper" style={{background: item.gradient}}>
                  <img src={Card1} alt="Icon" style={{width: '200px', borderRadius: '100px'}} />
                </div>
                <div className="counter-content">
                  <h5 className="counter-title">{item.title}</h5>
                  <p className="counter-description">{item.description}</p>
                  <div className="counter-footer">
                    <h3 className="counter-number">{item.count.toLocaleString("id-ID")}</h3>
                    <a href={item.link} className="counter-button">
                      Lihat Data
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="feature-section" ref={featureRef}>
        <div className="feature-container">
          <div className="feature-grid">
            {[
              {
                icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg>,
                title: "Menemukan Data Dengan Mudah",
              },
              {
                icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>,
                title: "Mendapatkan Data Dengan Cepat",
              },
              {
                icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>,
                title: "Data Akurat dan Mutakhir",
              },
              {
                icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
                title: "Terhubung Dengan OPD",
              }
            ].map((feature, index) => (
              <div key={index} className={`feature-card ${isVisible.featureSection ? 'visible' : ''}`} style={{animationDelay: `${index * 0.15}s`}}>
                <div className="feature-icon-wrapper">
                  {feature.icon}
                </div>
                <h5 className="feature-title">{feature.title}</h5>
                <p className="feature-text">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="why-section">
        <div className="why-container">
          <div className="why-grid">
            <div className="why-content">
              <h1 className="why-title">
                Mengapa Menggunakan
                <span className="why-highlight"> Satu Data Lamtim?</span>
              </h1>
              <p className="why-description">
                Satu Data adalah sebuah inisiatif pemerintah Indonesia untuk 
                mendorong pengambilan kebijakan berdasarkan data. Untuk 
                mewujudkan hal tersebut, maka diperlukan pemenuhan atas data 
                pemerintah yang akurat, terbuka, dan interoperable.
              </p>
              <div className="why-features">
                <div className="why-feature-item">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4facfe" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Data Akurat & Terpercaya</span>
                </div>
                <div className="why-feature-item">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4facfe" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Akses Mudah & Cepat</span>
                </div>
                <div className="why-feature-item">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4facfe" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Terintegrasi dengan Sistem Nasional</span>
                </div>
              </div>
            </div>
            <div className="why-illustration">
              <img 
                src={Beranda2}
                alt="Ilustrasi Satu Data"
                className="why-img"
              />
            </div>
          </div>
        </div>
      </section>
    

    </div>
  );
}