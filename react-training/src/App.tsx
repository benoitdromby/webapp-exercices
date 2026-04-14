import { useIsFetching } from '@tanstack/react-query'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Portfolios from './pages/Portfolios'
import Orders from './pages/Orders'
import Tasks from './pages/Tasks'
import Metrics from './pages/Metrics'
import Header from './components/Header'
import Error from './components/Error'
import GlobalLoader from './components/Loaders/GlobalLoader'

function App() {
    const isFetchingPrices = useIsFetching({ queryKey: ['prices'] })

    return (
        <div className='max-w-6xl flex flex-col min-h-screen justify-start items-center my-8'>
            <GlobalLoader isLoading={isFetchingPrices > 0} />
            <Router>
            <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/portfolios" element={<Portfolios />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/tasks" element={<Tasks />} />
                    <Route path="/metrics" element={<Metrics />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </Router>
        </div>
    )
}
export default App