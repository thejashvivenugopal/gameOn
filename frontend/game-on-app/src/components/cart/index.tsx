import '../../styles/MainDashBoard/DashBoard.css'
import HorizantalNavBar from '../MainDashboard/HoriantalNavBar';
import Aside from '../MainDashboard/Aside.tsx';
import Cart from './cart';

export default function LedgerView() {
    return (
        <div className="Dashboard">
            <HorizantalNavBar />
            <div className='content'>
                <Aside />
                <div className='MainContent'>
                    <Cart />
                </div>
            </div>
        </div>
    )
}
