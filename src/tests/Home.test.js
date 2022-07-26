import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../Views/Home'

test('renders content', () => {
  const goToHome = () => {
    window.history.pushState({}, '', '/home')
  }
  goToHome()

  const component = render(
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )

  // component.debug()
  expect(component.getByText('HABITS+')).toBeInTheDocument()
})