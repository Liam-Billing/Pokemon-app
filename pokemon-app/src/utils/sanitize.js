export function sanitizeQuery(input) {
  if (!input) return ''
  const trimmed = String(input).trim().toLowerCase()
  // tillåter bokstäver, siffror och bindestreck. Bindrestreck för att visa pokemon har det i sitt namn
  const cleaned = trimmed.replace(/[^a-z0-9-]/g, '')
  // så att längden inte blir för lång för säkerhets skull
  return cleaned.slice(0, 30)
}