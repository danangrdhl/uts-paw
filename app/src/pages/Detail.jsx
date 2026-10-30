
import { Link, useNavigate, useParams } from 'react-router-dom'
import useKoleksi from '../hooks/useKoleksi.js'

export default function Detail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { items, loading, error, hapus } = useKoleksi()

  const item = items.find((i) => String(i.id) === id)

  if (loading) {
    return <p>Memuat data...</p>
  }

  if (error) {
    return <p role="alert">Gagal memuat: {String(error)}</p>
  }

  if (!item) {
    return (
      <section>
        <h1>Item tidak ditemukan</h1>
        <Link to="/koleksi">Kembali ke koleksi</Link>
      </section>
    )
  }

  const konfirmasiHapus = () => {
    if (window.confirm(`Hapus "${item.judul}"?`)) {
      hapus(item.id)
      navigate('/koleksi')
    }
  }

  return (
    <section>
      <h1>{item.judul}</h1>

      <dl>
        <dt>ID</dt>
        <dd>{item.id}</dd>

        <dt>Judul</dt>
        <dd>{item.judul}</dd>

        <dt>Kategori</dt>
        <dd>{item.kategori}</dd>

        <dt>Kabupaten/Kota</dt>
        <dd>{item.kabupaten}</dd>

        <dt>Harga Tiket</dt>
        <dd>Rp {Number(item.hargaTiket).toLocaleString('id-ID')}</dd>

        <dt>Jam Buka</dt>
        <dd>{item.jamBuka}</dd>
      </dl>

      <div className="aksi">
        <button type="button" onClick={konfirmasiHapus}>
          Hapus
        </button>

        <Link to="/koleksi">Kembali</Link>
      </div>
    </section>
  )
}
