import client from "./client";

const publikasiApi = {
  async getPublikasiList() {
    const res = await client.get("/buku-digital");
    return res.data;
  },
};

export default publikasiApi;
