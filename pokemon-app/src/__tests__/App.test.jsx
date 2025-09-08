import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App.jsx'

describe('App integration', () => {
  it('searches and shows a Pokemon card', async () => {
    // Mocka fetch
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 25,
        name: 'pikachu',
        height: 4,
        weight: 60,
        sprites: { front_default: 'https://img.example/pikachu.png' },
        types: [{ type: { name: 'electric' } }]
      })
    })

    render(<App />)
    const input = screen.getByLabelText(/sök pokémon/i)
    await userEvent.type(input, 'Pikachu')
    await userEvent.click(screen.getByRole('button', { name: /sök/i }))

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /pikachu/i })).toBeInTheDocument()
    })
  })

  it('shows error when not found', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({ ok: false, status: 404 })
    render(<App />)
    await userEvent.type(screen.getByLabelText(/sök pokémon/i), 'nope')
    await userEvent.click(screen.getByRole('button', { name: /sök/i }))
    await screen.findByRole('alert')
    expect(screen.getByRole('alert').textContent).toMatch(/hittades inte/i)
  })
})
