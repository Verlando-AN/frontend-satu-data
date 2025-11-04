import { useState } from 'react';
import Logo from "../../../assets/IMG_Logo.png"

export default function Kontak() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    pesan: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="mb-3" style={{ color: '#F5A623', fontWeight: '600', fontSize: '36px' }}>
            Kontak
          </h2>
          <p style={{ color: '#666', fontSize: '14px' }}>
            Informasi lebih lanjut dapat menghubungi melalui informasi kontak di bawah ini.
          </p>
        </div>

        <div className="row g-4">
          <div className="col-md-6">
            <div className="bg-white rounded shadow-sm p-4 h-100">
              <h4 className="mb-4" style={{ fontWeight: '600', color: '#333' }}>
                Informasi Kontak
              </h4>

              <div className="mb-4">
                <div className="d-flex align-items-center">
                   <img 
                        src={Logo}
                        alt="logo"
                        style={{ height: '70px' }}
                        />
                </div>
              </div>

              <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
                Satu Data adalah sebuah inisiatif pemerintah Indonesia untuk mendorong 
                penggunaan kebijakan berdasarkan data. Untuk mewujudkan hal tersebut, 
                diperlukan pemahaman atas satu pemerintah yang akurat, terbuka, dan 
                interoperable.
              </p>

              <div style={{ fontSize: '14px', color: '#333' }}>
                <p className="mb-2">
                  <strong>Alamat:</strong> Jl. Budi Anak Tuha No. 1 Sukadana, Lampung Timur
                </p>
                <p className="mb-2">
                  <strong>No Telepon:</strong> +1 234 567 890
                </p>
                <p className="mb-0">
                  <strong>Email:</strong> info@example.com
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="bg-white rounded shadow-sm p-4 h-100">
              <h4 className="mb-4" style={{ fontWeight: '600', color: '#333' }}>
                Kirim Pesan Kepada Kami
              </h4>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label" style={{ fontWeight: '500', color: '#333', fontSize: '14px' }}>
                    Nama
                  </label>
                  <input
                    type="text"
                    name="nama"
                    className="form-control"
                    placeholder="Masukkan nama Anda"
                    value={formData.nama}
                    onChange={handleChange}
                    style={{ fontSize: '14px' }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" style={{ fontWeight: '500', color: '#333', fontSize: '14px' }}>
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Masukkan email Anda"
                    value={formData.email}
                    onChange={handleChange}
                    style={{ fontSize: '14px' }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" style={{ fontWeight: '500', color: '#333', fontSize: '14px' }}>
                    Pesan
                  </label>
                  <textarea
                    name="pesan"
                    className="form-control"
                    rows="5"
                    placeholder="Tuliskan pesan Anda"
                    value={formData.pesan}
                    onChange={handleChange}
                    style={{ fontSize: '14px' }}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn w-100"
                  style={{
                    backgroundColor: '#007BFF',
                    color: 'white',
                    fontWeight: '500',
                    padding: '12px',
                    fontSize: '15px'
                  }}
                >
                  Kirim Pesan Sekarang
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="bg-white rounded shadow-sm p-4">
            <h4 className="mb-3" style={{ fontWeight: '600', color: '#333' }}>
              Lokasi Kami
            </h4>
            <div style={{ 
              width: '100%', 
              height: '400px', 
              backgroundColor: '#e9ecef',
              borderRadius: '8px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1017317.2832691391!2d105.743749!3d-5.120516!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40edbc6c11ef3d%3A0x3039d80b220cfe0!2sKabupaten%20Lampung%20Timur%2C%20Lampung!5e0!3m2!1sid!2sid!4v1761677801877!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}