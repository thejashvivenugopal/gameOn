import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";


const language = localStorage.getItem('language') || 'en';

i18n.use(HttpApi)
    .use(initReactI18next)
    .init({
        lng: language,
        debug: true,
        fallbackbackLng: 'en',
        ns: ['customerAside', 'login', 'ownerAside'],
        backend: {
            loadPath: '/i18n/{{lng}}/{{ns}}.json'
        },
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;