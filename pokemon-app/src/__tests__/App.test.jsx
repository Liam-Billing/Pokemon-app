/* @vitest-environment jsdom */

import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App.jsx'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('App integration', () => {
  it('searches and shows a Pokemon card', async () => {
   
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 25,
        name: 'pikachu',
        height: 4,
        weight: 60,
        sprites: { front_default: 'https://img.example/pikachu.png' },
        types: [{ type: { name: 'electric' } }],
      }),
    })

    render(<App />)
    const user = userEvent.setup()

    const input = screen.getByLabelText(/sök pokémon/i)
    const form = input.closest('form')
    await user.type(input, 'Pikachu')
    await user.click(within(form).getByRole('button', { name: /sök/i }))

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /pikachu/i })).toBeInTheDocument()
    })
  })

  it('shows error when not found', async () => {
    
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 404,
      text: async () => '',
    })

    render(<App />)
    const user = userEvent.setup()

    const input = screen.getByLabelText(/sök pokémon/i)
    const form = input.closest('form')
    await user.type(input, 'nope')
    await user.click(within(form).getByRole('button', { name: /sök/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(/hittades inte/i)
  })
})
