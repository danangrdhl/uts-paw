
import { useState } from 'react'
import useKoleksi from '../hooks/useKoleksi.js'
import KartuItem from '../components/KartuItem.jsx'
import KotakPencarian from '../components/KotakPencarian.jsx'

export default function Koleksi() {
  const { items, loading, error } = useKoleksi()

  const [cari, setCari] = useState('')
  const [kategori, setKategori] = useState('Semua')

  if (loading) {
    return <p>Memuat data...</p>
  }

  if (error) {
    return <p role="alert">Gagal memuat: {String(error)}</p>
  }

  const daftarKategori = [
    'Semua',
    ...new Set(items.map((item) => item.kategori)),
  ]

  const tampil = items.filter((item) => {
    const cocokJudul = item.judul
      .toLowerCase()
      .includes(cari.toLowerCase())

    const cocokKategori =
      kategori === 'Semua' || item.kategori === kategori

    return cocokJudul && cocokKategori
  })

  return (
    <section>
      <h1>Koleksi Wisata Lampung</h1>

      <div className="alat-koleksi">
        <KotakPencarian
          nilai={cari}
          onUbah={setCari}
        />

        <select
          aria-label="Kategori"
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
        >
          {daftarKategori.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
      </div>

      {tampil.length === 0 ? (
        <p>Tidak ada item yang cocok.</p>
      ) : (
        <div className="daftar-kartu">
          {tampil.map((item) => (
            <KartuItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  )
}
