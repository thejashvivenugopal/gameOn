import React from "react";




const Aside = () => {
    return (
        <aside className="sidebar">
            <a href="/admin">Dashboard</a>
            <a href="/admin/profile">Profile</a>
            <a href="/admin/customers">Customers</a>
            {/* <a href="/dashboard/userstats">User Stats</a> */}
            {/* <a href="/dashboard/transactions">Transactions</a> */}
            {/* <a href="/dashboard/cart">Cart</a> */}
        </aside>

    );
};


export default Aside;