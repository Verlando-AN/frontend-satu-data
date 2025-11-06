import { useState, useEffect } from "react";
import publikasiApi from "../api/publikasiApi.js";

export default function usePublikasi() {
  const [publikasiData, setPublikasiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPublikasi() {
      try {
        const data = await publikasiApi.getPublikasiList();
        setPublikasiData(data);
      } catch (error) {
        console.error("Gagal mengambil data publikasi:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPublikasi();
  }, []);

  return { publikasiData, loading };
}
