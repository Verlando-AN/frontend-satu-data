import Logo from "../../assets/IMG_Logo.png";
import "../css/header.css"
export default function Footer() {

return (
    <footer className="bg-white mt-auto" style={{ 
      borderTop: '2px solid #e5e7eb',
      boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.05)'
    }}>
      <div className="container py-5">
        <div className="row g-5 mb-4">

          <div className="col-lg-4 col-md-6">
            <div className="mb-4">
              <img
                src={Logo}
                alt="Lamtim Open Data Logo"
                style={{ height: '55px', objectFit: 'contain' }}
              />
            </div>
            <h5 className="fw-bold mb-3" style={{ 
              color: '#1f2937',
              fontSize: '18px'
            }}>
              Tentang Kami
            </h5>
            <p className="text-muted mb-0" style={{ 
              fontSize: '14px', 
              lineHeight: '1.7',
              color: '#6b7280'
            }}>
              Portal data terbuka Kabupaten Lampung Timur yang menyediakan akses informasi publik
              untuk transparansi dan pembangunan daerah yang lebih baik.
            </p>
            
          </div>

          <div className="col-lg-4 col-md-12">
            <h5 className="fw-bold mb-3" style={{ 
              color: '#1f2937',
              fontSize: '18px'
            }}>
              Hubungi Kami
            </h5>
            <div style={{ fontSize: '14px', lineHeight: '2' }}>
              <div className="mb-3">
                <p className="mb-1 fw-semibold" style={{ color: '#374151' }}>
                  Dinas Kominfo dan Statistik
                </p>
                <p className="mb-0 text-muted" style={{ color: '#6b7280' }}>
                  Kabupaten Lampung Timur
                </p>
              </div>
              
              <div className="d-flex align-items-start mb-2">
                <span className="me-2" style={{ color: '#3b82f6', minWidth: '20px' }}>✉</span>
                <a 
                  href="" 
                  className="text-decoration-none"
                  style={{ color: '#3b82f6' }}
                >
                  email
                </a>
              </div>
              
              <div className="d-flex align-items-start">
                <span className="me-2" style={{ color: '#3b82f6', minWidth: '20px' }}>☎</span>
                <a 
                  href="" 
                  className="text-decoration-none"
                  style={{ color: '#3b82f6' }}
                >
                  081369774001
                </a>
                
              </div>
              
            </div>
            
          </div>
          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold mb-3" style={{ 
              color: '#1f2937',
              fontSize: '18px'
            }}>
              Lokasi Kami
            </h5>
            <div
              style={{
                width: '100%',
                height: '180px',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb'
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1017317.2832691391!2d105.743749!3d-5.120516!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40edbc6c11ef3d%3A0x3039d80b220cfe0!2sKabupaten%20Lampung%20Timur%2C%20Lampung!5e0!3m2!1sid!2sid!4v1761677801877!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                title="Lokasi Kabupaten Lampung Timur"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        <div 
          className="pt-4 mt-4" 
          style={{ borderTop: '1px solid #e5e7eb' }}
        >
          <div className="row align-items-center g-3">
            <div className="col-md-6 text-center text-md-start">
              <p className="mb-0" style={{ 
                fontSize: '14px',
                color: '#6b7280'
              }}>
                © 2025 <span className="fw-semibold" style={{ color: '#1f2937' }}>Lamtim Open Data</span>. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <p className="mb-0" style={{ 
                fontSize: '13px',
                color: '#9ca3af'
              }}>
                Dinas Komunikasi, Informatika dan Statistik<br className="d-md-none" />
                <span className="d-none d-md-inline"> - </span>Kabupaten Lampung Timur
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
