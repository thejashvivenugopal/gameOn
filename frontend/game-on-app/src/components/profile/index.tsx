import '../../styles/MainDashBoard/DashBoard.css'
import HorizantalNavBar from '../MainDashboard/HoriantalNavBar';
import Aside from '../MainDashboard/Aside';
import Profile from './Profile';
import LangButtons from '../languageButtons/LangButtons';

export default function index() {
    return (
        <>
            <div className="Dashboard">
                <HorizantalNavBar />
                <div className='content'>
                    <Aside />
                    <div className='MainContent'>
                        <Profile />
                    </div>
                </div>
            </div>
        </>
    )
}
