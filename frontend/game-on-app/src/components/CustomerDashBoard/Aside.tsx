import React from "react";
import { useTranslation } from "react-i18next";



const Aside = () => {
    const { t } = useTranslation('ownerAside');
    const role: any = localStorage.getItem('userRole');

    if (role === 'OWNER') {

        return (
            <aside className="sidebar">
                <a href="/dashboard">{t('owner.aside.events')}</a>
                <a href="/dashboard/profile">{t('owner.aside.profile')}</a>
                {/* <a href="/dashboard/customers">{t('owner.aside.customers')}</a> */}
                <a href="/dashboard/userstats">{t('owner.aside.stats')}</a>
                <a href="/dashboard/transactions">{t('owner.aside.transactions')}</a>
            </aside>)
    }
    else {

        return (
            <aside className="sidebar">
                <a href="/customer/dashboard">{t('owner.aside.events')}</a>
                {/* <a href="/dashboard/profile">{t('owner.aside.profile')}</a> */}
                {/* <a href="/dashboard/customers">{t('owner.aside.customers')}</a> */}
                {/* <a href="/dashboard/userstats">{t('owner.aside.stats')}</a> */}
                <a href="/dashboard/customers/bookings">{t('customer.aside.transactions')}</a>
                <a href="/dashboard/cart">{t('owner.aside.cart')}</a>
            </aside>)
    }
};


export default Aside;