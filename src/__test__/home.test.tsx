import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'
import { MockedProvider } from "@apollo/client/testing";

describe('Home', () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Home />
      </MockedProvider>
    )
  })

  it('renders a heading', () => {
    const heading = screen.getByText('The Rick and Morty')

    expect(heading).toBeInTheDocument()
  })
})
