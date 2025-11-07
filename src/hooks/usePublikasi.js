import { useState, useEffect } from "react";
import publikasiApi from "../api/publikasiApi.js";

export default function usePublikasi(slug = null) {
  const [publikasiData, setPublikasiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = slug
          ? await publikasiApi.getPublikasiDetail(slug)
          : await publikasiApi.getPublikasiList();

        if (slug && Array.isArray(data) && data.length === 1) {
          setPublikasiData(data[0]);
        } else {
          setPublikasiData(data);
        }
      } catch (error) {
        console.error("Gagal mengambil data publikasi:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  return { publikasiData, loading };
}
