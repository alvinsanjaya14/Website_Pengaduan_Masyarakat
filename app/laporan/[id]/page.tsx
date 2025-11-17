// app/laporan/[id]/page.tsx
import Link from 'next/link';
import { prisma } from '@/lib/prisma'; // (Akan dibuat di langkah #7)
import { notFound } from 'next/navigation';

type PageProps = {
  params: { id: string };
};

// Fungsi untuk fetch data satu laporan
async function getDetailLaporan(id: string) {
  const laporan = await prisma.laporan.findUnique({
    where: { id: parseInt(id) },
  });
  return laporan;
}

export default async function LaporanDetailPage({ params }: PageProps) {
  const laporan = await getDetailLaporan(params.id);

  if (!laporan) {
    notFound(); // Ini akan otomatis memanggil not-found.tsx (langkah #8)
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="card-title mb-0">{laporan.judul}</h2>
          <span className={`badge bg-${laporan.status === 'Selesai' ? 'success' : 'warning'} text-dark fs-6`}>
            {laporan.status}
          </span>
        </div>
        <div className="card-body">
          <p className="card-text" style={{ whiteSpace: 'pre-wrap' }}>
            {laporan.isiLaporan}
          </p>
        </div>
        <div className="card-footer d-flex justify-content-between">
          <small className="text-muted">
            Dilaporkan pada: {new Date(laporan.createdAt).toLocaleString('id-ID')}
          </small>
          {/* b. Tombol Back */}
          <Link href="/laporan" className="btn btn-secondary">
            &larr; Kembali ke Daftar
          </Link>
        </div>
      </div>
    </div>
  );
}