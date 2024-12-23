import React from 'react'
import i18n from '../../i18';
import '../../styles/login/LoginPage.css'
import '../../styles/CustomerDashBoard/CustDashBoard.css';
import { useTranslation } from 'react-i18next';



export default function LangButtons() {

    const { t } = useTranslation('login')

    const handleLanguageChange = (newLanguage: string) => {
        
        i18n.changeLanguage(newLanguage);
        localStorage.setItem('language', newLanguage) // Change the language in i18next
    };
    return (

        <div className="language-selector">
      
            <button onClick={() => handleLanguageChange('en')}>ENGLISH</button>
            <button onClick={() => handleLanguageChange('kan')}>KANNADA</button>
            <button className='logout' >
                <a href='/' className='logout'>{t('label.logout')} </a> 
'
            </button>
        
        </div>
    )
}
