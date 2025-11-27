import type { Template } from "@shared/schema";

export const templates: Template[] = [
  {
    id: "class-basic",
    title: "Basic Class Diagram",
    category: "class",
    description: "Simple class diagram with relationships",
    code: `@startuml
!theme plain
skinparam backgroundColor transparent
skinparam defaultFontName JetBrains Mono

title Basic Class Diagram

class User {
  -id: string
  -username: string
  -email: string
  +login()
  +logout()
}

class Post {
  -id: string
  -title: string
  -content: string
  -createdAt: Date
  +publish()
  +delete()
}

User "1" -- "*" Post : creates
@enduml`,
  },
  {
    id: "class-inheritance",
    title: "Inheritance Example",
    category: "class",
    description: "Class diagram showing inheritance",
    code: `@startuml
!theme plain
skinparam backgroundColor transparent
skinparam defaultFontName JetBrains Mono

title Inheritance Example

abstract class Animal {
  -name: string
  -age: number
  +eat()
  +sleep()
  {abstract} makeSound()
}

class Dog extends Animal {
  -breed: string
  +makeSound()
  +fetch()
}

class Cat extends Animal {
  -color: string
  +makeSound()
  +climb()
}

Animal <|-- Dog
Animal <|-- Cat
@enduml`,
  },
  {
    id: "sequence-basic",
    title: "Basic Sequence Diagram",
    category: "sequence",
    description: "Simple interaction sequence",
    code: `@startuml
!theme plain
skinparam backgroundColor transparent
skinparam defaultFontName JetBrains Mono

title User Authentication Flow

actor User
participant "Web App" as App
participant "Auth Service" as Auth
database "Database" as DB

User -> App: Enter credentials
activate App

App -> Auth: Validate credentials
activate Auth

Auth -> DB: Query user
activate DB
DB --> Auth: User data
deactivate DB

Auth --> App: Auth token
deactivate Auth

App --> User: Login success
deactivate App
@enduml`,
  },
  {
    id: "sequence-error",
    title: "Error Handling Sequence",
    category: "sequence",
    description: "Sequence with error flows",
    code: `@startuml
!theme plain
skinparam backgroundColor transparent
skinparam defaultFontName JetBrains Mono

title Payment Processing

actor Customer
participant "Payment Gateway" as Gateway
participant "Bank API" as Bank

Customer -> Gateway: Submit payment
activate Gateway

Gateway -> Bank: Process transaction
activate Bank

alt Successful payment
  Bank --> Gateway: Transaction approved
  Gateway --> Customer: Payment confirmed
else Insufficient funds
  Bank --> Gateway: Transaction declined
  Gateway --> Customer: Payment failed
else Timeout
  Bank -x Gateway: Connection timeout
  Gateway --> Customer: Try again later
end

deactivate Bank
deactivate Gateway
@enduml`,
  },
  {
    id: "activity-basic",
    title: "Basic Activity Diagram",
    category: "activity",
    description: "Simple workflow diagram",
    code: `@startuml
!theme plain
skinparam backgroundColor transparent
skinparam defaultFontName JetBrains Mono

title Order Processing Workflow

start

:Receive order;
:Validate inventory;

if (Items available?) then (yes)
  :Process payment;
  if (Payment successful?) then (yes)
    :Ship order;
    :Send confirmation;
  else (no)
    :Cancel order;
    :Refund customer;
  endif
else (no)
  :Notify customer;
  :Suggest alternatives;
endif

stop
@enduml`,
  },
  {
    id: "state-basic",
    title: "Basic State Diagram",
    category: "state",
    description: "Simple state machine",
    code: `@startuml
!theme plain
skinparam backgroundColor transparent
skinparam defaultFontName JetBrains Mono

title Document Lifecycle

[*] --> Draft

Draft --> Review : Submit
Review --> Approved : Approve
Review --> Draft : Request changes
Approved --> Published : Publish
Published --> Archived : Archive

Archived --> [*]
@enduml`,
  },
  {
    id: "usecase-basic",
    title: "Basic Use Case Diagram",
    category: "usecase",
    description: "System use cases",
    code: `@startuml
!theme plain
skinparam backgroundColor transparent
skinparam defaultFontName JetBrains Mono

title E-commerce System

left to right direction

actor Customer
actor Admin

rectangle "E-commerce System" {
  usecase "Browse Products" as UC1
  usecase "Add to Cart" as UC2
  usecase "Checkout" as UC3
  usecase "Manage Inventory" as UC4
  usecase "Process Orders" as UC5
}

Customer --> UC1
Customer --> UC2
Customer --> UC3

Admin --> UC4
Admin --> UC5

UC2 .> UC1 : includes
UC3 .> UC2 : includes
@enduml`,
  },
  {
    id: "component-basic",
    title: "Component Diagram",
    category: "component",
    description: "System architecture components",
    code: `@startuml
!theme plain
skinparam backgroundColor transparent
skinparam defaultFontName JetBrains Mono

title Microservices Architecture

package "Frontend" {
  [Web App]
  [Mobile App]
}

package "API Gateway" {
  [Gateway Service]
}

package "Backend Services" {
  [User Service]
  [Product Service]
  [Order Service]
}

database "PostgreSQL" {
  [User DB]
  [Product DB]
  [Order DB]
}

[Web App] --> [Gateway Service]
[Mobile App] --> [Gateway Service]
[Gateway Service] --> [User Service]
[Gateway Service] --> [Product Service]
[Gateway Service] --> [Order Service]

[User Service] --> [User DB]
[Product Service] --> [Product DB]
    [Order Service] --> [Order DB]
@enduml`,
  },
  {
    id: "er-diagram",
    title: "Entity Relationship Diagram",
    category: "class",
    description: "Database ER diagram with entities and relationships",
    code: `@startuml
!theme plain
skinparam backgroundColor transparent
skinparam defaultFontName JetBrains Mono

title Entity Relationship Diagram

entity "User" {
  * id : INT <<PK>>
  --
  * username : VARCHAR(50)
  * email : VARCHAR(100)
  * password_hash : VARCHAR(255)
  created_at : TIMESTAMP
  updated_at : TIMESTAMP
}

entity "Post" {
  * id : INT <<PK>>
  --
  * title : VARCHAR(200)
  * content : TEXT
  * user_id : INT <<FK>>
  status : VARCHAR(20)
  created_at : TIMESTAMP
  updated_at : TIMESTAMP
}

entity "Category" {
  * id : INT <<PK>>
  --
  * name : VARCHAR(100)
  * slug : VARCHAR(100)
  description : TEXT
}

entity "Comment" {
  * id : INT <<PK>>
  --
  * content : TEXT
  * post_id : INT <<FK>>
  * user_id : INT <<FK>>
  created_at : TIMESTAMP
}

User ||--o{ Post : "creates"
Post }o--|| Category : "belongs to"
Post ||--o{ Comment : "has"
User ||--o{ Comment : "writes"

@enduml`,
  },
];

