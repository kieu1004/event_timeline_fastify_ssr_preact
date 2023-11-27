import { h } from  'preact'
import App from '../components/App'
import dataJob from '../utils/data'

const Home = () => {
    return <App dataJob={dataJob}/>
}
  
export default Home
