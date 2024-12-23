# Domain Model for GameOn

```mermaid

---

title: GameOn

---


classDiagram

class Owner {
    +String accountNumber
    +String bankCode
    +String zelleId
    +User user
    +Date createdDate
    +Date modifiedDate
    +String createdBy
    +String modifiedBy
}

class User {
    +String firstName
    +String lastName
    +String emailId
    +String mobileNumber
    +String password
    +Role role
    +Date createdDate
    +Date modifiedDate
    +String createdBy
    +String modifiedBy
}

class Location {
    +Integer zipCode
    +String country
    +String city
    +String state
    +String AddressLineOne
    +String AddressLineTwo
    +Date createdDate
    +Date modifiedDate
    +String createdBy
    +String modifiedBy
}

class Event {
    +String eventType
    +Time eventStartTime
    +Time eventEndTime
    +Double amountPerHour
    +Owner owner
    +Location location
    +Date createdDate
    +Date modifiedDate
    +String createdBy
    +String modifiedBy
}

class Role {
    <<enumeration>>
    ADMIN
    Owner
    CUSTOMER
}

class Ledger {
    +Event event
    +User customer
    +Date startTime
    +Date endTime
    +Integer noOfHours
    +Double amount
    +Boolean paymentStatus
    +Boolean debit
    +Boolean public
    +Integer noOfPlayers
    +Date createdDate
    +Date modifiedDate
    +String createdBy
    +String modifiedBy
}

%% Relationships
Owner "One" -- "One" User 
Event "One" -- "One" Location
Event "Many" -- "One" Owner

Ledger "One" -- "One" Event 
Ledger "One" -- "One" User 
Role "One" -- "One" User 

  ```