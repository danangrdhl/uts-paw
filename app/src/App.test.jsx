
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, test, beforeEach, afterEach, vi } from 'vitest'
import App from './App.jsx'

const dataWisata = JSON.parse(
  readFileSync(resolve(process.cwd(), 'public/data/koleksi.json'), 'utf-8'),
)

beforeEach(() => {
  localStorage.clear()

  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok: true,
    json: async () => dataWisata,
  }))
})

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

test('rute tidak dikenal menampilkan 404', () => {
  render(
    <MemoryRouter initialEntries={['/tidak-ada']}>
      <App />
    </MemoryRouter>,
  )

  expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument()
})

test('halaman koleksi menampilkan semua wisata', async () => {
  render(
    <MemoryRouter initialEntries={['/koleksi']}>
      <App />
    </MemoryRouter>,
  )

  expect(await screen.findByText('Pantai Kunyit')).toBeInTheDocument()
  expect(screen.getByText('Pantai Mutun')).toBeInTheDocument()
  expect(screen.getByText('Wira Garden')).toBeInTheDocument()
})

test('pencarian wisata berdasarkan judul berhasil', async () => {
  render(
    <MemoryRouter initialEntries={['/koleksi']}>
      <App />
    </MemoryRouter>,
  )

  const input = await screen.findByRole('searchbox')

  fireEvent.change(input, {
    target: { value: 'Pantai Mutun' },
  })

  expect(screen.getByText('Pantai Mutun')).toBeInTheDocument()
  expect(screen.queryByText('Pantai Kunyit')).not.toBeInTheDocument()
})

test('filter kategori menampilkan wisata yang sesuai', async () => {
  render(
    <MemoryRouter initialEntries={['/koleksi']}>
      <App />
    </MemoryRouter>,
  )

  const kategori = await screen.findByRole('combobox', {
    name: 'Kategori',
  })

  fireEvent.change(kategori, {
    target: { value: 'Taman' },
  })

  expect(screen.getByText('Wira Garden')).toBeInTheDocument()
  expect(screen.queryByText('Pantai Kunyit')).not.toBeInTheDocument()
})

test('halaman detail menampilkan informasi wisata', async () => {
  render(
    <MemoryRouter initialEntries={['/koleksi/1']}>
      <App />
    </MemoryRouter>,
  )

  expect(
    await screen.findByRole('heading', { name: 'Pantai Kunyit' }),
  ).toBeInTheDocument()

  expect(screen.getByText('Kabupaten/Kota')).toBeInTheDocument()
  expect(screen.getByText('Bandar Lampung')).toBeInTheDocument()
  expect(screen.getByText('Harga Tiket')).toBeInTheDocument()
  expect(screen.getByText('Jam Buka')).toBeInTheDocument()
})

test('form tambah memvalidasi dan menyimpan wisata baru', async () => {
  localStorage.setItem('uts-paw-koleksi', JSON.stringify(dataWisata))

  render(
    <MemoryRouter initialEntries={['/tambah']}>
      <App />
    </MemoryRouter>,
  )

  fireEvent.click(screen.getByRole('button', { name: 'Simpan' }))

  expect(screen.getByRole('alert')).toBeInTheDocument()

  fireEvent.change(screen.getByLabelText('Judul'), {
    target: { value: 'Air Terjun Way Lalaan' },
  })

  fireEvent.change(screen.getByLabelText('Kabupaten/Kota'), {
    target: { value: 'Tanggamus' },
  })

  fireEvent.change(screen.getByLabelText('Harga Tiket'), {
    target: { value: '10000' },
  })

  fireEvent.change(screen.getByLabelText('Jam Buka'), {
    target: { value: '08.00 - 17.00' },
  })

  fireEvent.click(screen.getByRole('button', { name: 'Simpan' }))

  expect(await screen.findByText('Air Terjun Way Lalaan')).toBeInTheDocument()

  await waitFor(() => {
    const data = JSON.parse(localStorage.getItem('uts-paw-koleksi'))

    expect(
      data.some((item) => item.judul === 'Air Terjun Way Lalaan'),
    ).toBe(true)
  })
})
