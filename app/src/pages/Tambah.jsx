
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useKoleksi from '../hooks/useKoleksi.js'
import './Tambah.css'

const AWAL = {
  judul: '',
  kategori: 'Pantai',
  kabupaten: '',
  hargaTiket: '',
  jamBuka: '',
}

export default function Tambah() {
  const { tambah } = useKoleksi()
  const navigate = useNavigate()

  const [form, setForm] = useState(AWAL)
  const [galat, setGalat] = useState('')

  const ubah = (e) => {
    const { name, value } = e.target

    setForm((lama) => ({
      ...lama,
      [name]: value,
    }))
  }

  const simpan = (e) => {
    e.preventDefault()

    if (!form.judul.trim()) {
      setGalat('Judul wajib diisi.')
      return
    }

    setGalat('')

    tambah({
      judul: form.judul.trim(),
      kategori: form.kategori,
      kabupaten: form.kabupaten.trim(),
      hargaTiket: Number(form.hargaTiket) || 0,
      jamBuka: form.jamBuka.trim(),
    })

    navigate('/koleksi')
  }

  return (
    <section>
      <form
        className="formulir"
        onSubmit={simpan}
        noValidate
      >
        <h1>Tambah Wisata</h1>

        <label htmlFor="judul">Judul</label>
        <input
          id="judul"
          name="judul"
          type="text"
          value={form.judul}
          onChange={ubah}
          placeholder="Nama tempat wisata"
        />

        <label htmlFor="kategori">Kategori</label>
        <select
          id="kategori"
          name="kategori"
          value={form.kategori}
          onChange={ubah}
        >
          <option value="Pantai">Pantai</option>
          <option value="Taman">Taman</option>
          <option value="Bukit">Bukit</option>
          <option value="Gunung">Gunung</option>
          <option value="Danau">Danau</option>
          <option value="Kebun">Kebun</option>
        </select>

        <label htmlFor="kabupaten">Kabupaten/Kota</label>
        <input
          id="kabupaten"
          name="kabupaten"
          type="text"
          value={form.kabupaten}
          onChange={ubah}
          placeholder="Contoh: Bandar Lampung"
        />

        <label htmlFor="hargaTiket">Harga Tiket</label>
        <input
          id="hargaTiket"
          name="hargaTiket"
          type="number"
          min="0"
          value={form.hargaTiket}
          onChange={ubah}
          placeholder="Contoh: 20000"
        />

        <label htmlFor="jamBuka">Jam Buka</label>
        <input
          id="jamBuka"
          name="jamBuka"
          type="text"
          value={form.jamBuka}
          onChange={ubah}
          placeholder="Contoh: 08.00 - 22.00"
        />

        {galat && (
          <p role="alert">{galat}</p>
        )}

        <button type="submit">
          Simpan
        </button>
      </form>
    </section>
  )
}
