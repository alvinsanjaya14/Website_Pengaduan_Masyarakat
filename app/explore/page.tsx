const API_URL = "https://www.emsifa.com/api-wilayah-indonesia/api/provinsi.json";

type Provinsi = {
  id: string;
  nama: string;
};

async function getProvinsiData() {
  try {
    const res = await fetch(API_URL, { next: { revalidate: 3600 } });

    if (!res.ok) {
      throw new Error('Gagal mengambil data provinsi');
    }
    
    const data = await res.json();
    return data as Provinsi[]; 
  
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function ExplorePage() {
  const dataProvinsi = await getProvinsiData();

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Explore Data Wilayah (Public API)</h1>
      <p>Data ini diambil dari API publik dan dapat digunakan untuk mengisi pilihan lokasi pada form pengaduan. Dan Masih Dalam Tahap Pengembangan</p>
      
      <div className="card">
        <div className="card-header">
          <h3>Daftar Provinsi di Indonesia</h3>
        </div>
        <ul className="list-group list-group-flush" style={{maxHeight: '400px', overflowY: 'auto'}}>
          {dataProvinsi.length > 0 ? (
            dataProvinsi.map((prov) => (
              <li className="list-group-item" key={prov.id}>
                {prov.nama} (ID: {prov.id})
              </li>
            ))
          ) : (
            <li className="list-group-item text-danger">Gagal memuat data.</li>
          )}
        </ul>
      </div>
    </div>
  );
}