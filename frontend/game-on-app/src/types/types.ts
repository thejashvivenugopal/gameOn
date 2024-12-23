export interface LedgersModel {
    event: {
        eventType: string,
        eventStartTime: Date,
        eventEndTime: Date,
        amountPerHour: number,
        owner: object,
        location: {
            zipCode: string
            country: string
            city: string
            state: string
            addressLineOne: string
            addressLineTwo: string
            locationLink: string
        },
    }
    customer: {
        firstName: string,
        lastName: string,
        emailId: string,
        mobileNumber: string,
        password: string,
        role: string,
        login: boolean,
        loginCounts: number
    }
    noOfHours: number,
    amount: number,
    paymentStatus: boolean,
    startTime: number,
    eventBookedDate: Date,
    debit: boolean,
    public: boolean,
    noOfPlayers: number,
    createdDate: Date,
    modifiedDate: Date,
    modifiedBy: string,
    createdBy: string
}

export interface EventModel {
    eventType: string,
    eventStartTime: Date,
    eventEndTime: Date,
    amountPerHour: number,
    owner: {
        accountNumber: string,
        bankCode: string,
        zelleId: string,
        user: object
    },
    location: {
        zipCode: string,
        country: string,
        city: string,
        state: string,
        addressLineOne: string,
        addressLineTwo: string,
    },
    createdDate: Date,
    modifiedDate: Date,
    modifiedBy: string,
    createdBy: string
}


export type CustomersModel = {
    firstName: string,
    lastName: string,
    emailId: string,
    mobileNumber: string,
    role: string,
    login: boolean,
    loginCounts: number,
    createdDate: Date,
    modifiedDate: Date
} 