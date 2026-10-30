export default function FilterKategori({ value, options, onChange }) {
  return (
    <select
      aria-label="Kategori"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  )
}