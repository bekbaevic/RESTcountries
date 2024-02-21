import { Box } from '@chakra-ui/react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import Header from './Components/Header'
import Main from './Components/Main'

function App() {
  const country = useSelector(state => state.country)
  const dispatch = useDispatch()
  return (
    <Box width={"90%"} marginX={'auto'}>
      <Header />
      <Main />
    </Box>
  )
}

export default App
