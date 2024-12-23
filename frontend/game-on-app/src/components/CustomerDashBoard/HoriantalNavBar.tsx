import React from "react";
import { useTranslation } from "react-i18next";
import GameOnSlogan from './profilepic.jpg';  // Relative path from the current file
import '../../styles/CustomerDashBoard/CustDashBoard.css'
import LangButtons from '../languageButtons/LangButtons.tsx';
import ProfileDropdown  from "./ProfileDropdown.tsx";
import GameLogo from "../../assets/images/logo.jpeg";






const HorizontalNavBar = () => {
  const { t } = useTranslation('login')
  const [dropdownVisible, setDropdownVisible] = React.useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className='NavigationBar'>

      <img src={GameLogo} alt="LOGO" style={{ width: '150px', height: '100px' }} />
      <div className='profile-container' onClick={toggleDropdown}>
      <img src={GameOnSlogan} alt="PROFILE PIC" style={{ width: '50px', height: '50px' }} />
      {/* <span>{t('label.profile')}</span> */}

        {dropdownVisible && (
          <div className="dropdown-container">
          <ProfileDropdown />
        </div>
        )}
      </div>
    </div>

  );
};


export default HorizontalNavBar;
