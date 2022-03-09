import Header from './Header'
import { render, screen } from '@testing-library/react'

it('Should text dans le header', async () => {
    render(
        <Header />
    )
    expect(screen.getByText(/Delta - Blog/)).toBeTruthy();
})