export function capitalize(word) {
  if (!word) return ''
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export function toKg(hectograms) {
  return (hectograms / 10).toFixed(1)
}

export function toMeters(decimeters) {
  return (decimeters / 10).toFixed(1)
}
