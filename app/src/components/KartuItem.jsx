
import { Link } from 'react-router-dom'

export default function KartuItem({ item }) {
  const {
    id,
    judul,
    kategori,
    kabupaten,
    hargaTiket,
    jamBuka,
  } = item

  return (
    <article className="kartu">
      <h3>
        <Link to={`/koleksi/${id}`}>
          {judul}
        </Link>
      </h3>

      <p>Kategori: {kategori}</p>
      <p>Lokasi: {kabupaten}</p>
      <p>
        Harga Tiket: Rp {hargaTiket.toLocaleString('id-ID')}
      </p>
      <p>Jam Buka: {jamBuka}</p>
    </article>
  )
}
