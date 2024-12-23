const baseUrl = 'http://localhost:3002';
export const ledgerApi = {
    create: baseUrl + '/ledgers',
    fetch: baseUrl + '/ledgers',
    fetchByOwnerId: baseUrl + '/ledgers/owner',
    fetchByCustomer: baseUrl + "/ledgers/customers"
}

export const eventsApi = {
    create: baseUrl + '/events',
    fetch: baseUrl + '/events'
}

export const ownersApi = {
    fetchById: baseUrl + '/owners/one',
    fetchCustomersByOwnerId: baseUrl + '/owners/customers',
}

export const customersApi = {
    fetchAllCustomers: baseUrl + '/customers',
}


