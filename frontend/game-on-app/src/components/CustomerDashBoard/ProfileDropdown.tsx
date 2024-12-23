import React from "react";
import { useTranslation } from "react-i18next";

import LangButtons from '../languageButtons/LangButtons.tsx';



const ProfileDropdown = () => {
    const { t } = useTranslation('login')


  return (
    <div className="profile-dropdown">
        
          <LangButtons />
    </div>
  );
};

export default ProfileDropdown;