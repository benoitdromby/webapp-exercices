import { Link } from 'react-router-dom'
 
function Header() {
    return (
        <nav className="flex-initial justify-items-center space-x-4 mb-8">
            <Link to="/">Home</Link>
            <Link to="/portfolios">Portfolios</Link>
            <Link to="/orders">Order Book</Link>
            <Link to="/tasks">Tasks</Link>
            <Link to="/metrics">Metrics</Link>
        </nav>
    )
}

export default Header