import { describe, it, expect } from 'vitest'
import { sanitizeQuery } from '../utils/sanitize.js'

describe('sanitizeQuery', () => {
  it('trims and lowercases', () => {
    expect(sanitizeQuery('  Pikachu  ')).toBe('pikachu')
  })
  it('removes invalid chars', () => {
    expect(sanitizeQuery('pi!ka@chu')).toBe('pikachu')
  })
  it('allows numbers and hyphen', () => {
    expect(sanitizeQuery('mr-mime-122')).toBe('mr-mime-122')
  })
  it('limits length', () => {
    expect(sanitizeQuery('a'.repeat(100))).toBe('a'.repeat(30))
  })
})
