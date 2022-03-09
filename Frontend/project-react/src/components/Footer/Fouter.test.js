import Footer from './Footer'
import { render, screen } from '@testing-library/react'

it('Should text dans le fouter', async () => {
    render(
        <Footer />
    )
    expect(screen.getByText(/Projet Hilleriteau Costiou/)).toBeTruthy();
})