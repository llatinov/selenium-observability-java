import { render, screen } from '@testing-library/react'
import PersonPage from './'

test('Renders page', () => {
  render(<PersonPage />)
  const headerElement = screen.getByText(/Sample Patient Service Frontend/i)
  expect(headerElement).toBeInTheDocument()
})
