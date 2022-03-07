import Footer from './Footer'
import { render, screen } from '@testing-library/react'
describe('Footer', () => {
    it('Should render without crashing', async () => {
        render(
            <Footer />
        )
        expect(screen.getByText(/Projet Hilleriteau Costiou/)).toBeTruthy();
    })
})