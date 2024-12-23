import '../../styles/MainDashBoard/DashBoard.css'
import HorizantalNavBar from '../MainDashboard/HoriantalNavBar';
import Aside from '../MainDashboard/Aside';
import CustomersTable from './CustomersTableProvider.tsx';

export default function CustomersView() {
    return (
        <div className="Dashboard">
            <HorizantalNavBar />
            <div className='content'>
                <Aside />
                <div className='MainContent'>
                    <CustomersTable />
                </div>
            </div>
        </div>
    )
}
