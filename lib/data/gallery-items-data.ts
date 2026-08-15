export const galleryItemsData: Record<string, any> = {
  "class-diagram": {
    id: "1",
    slug: "class-diagram",
    name: "Class Diagram",
    description: "A structural diagram that shows the classes, attributes, operations, and relationships in a system.",
    fullDescription: "Class diagrams are one of the most fundamental UML diagrams used in object-oriented design. They provide a static view of a system by showing classes, their attributes (properties), methods (operations), and the relationships between classes. Class diagrams are essential for understanding the structure of a software system and are widely used in software engineering, system design, and documentation.",
    image: "/class-diagram.png",
    keywords: ["Classes", "Objects", "Relationships", "Inheritance", "Encapsulation", "Abstraction", "Polymorphism", "Association"],
    useCases: [
      "System Design and Architecture",
      "Object-Oriented Design",
      "Database Schema Design",
      "API Documentation",
      "Code Generation",
      "System Documentation",
      "Reverse Engineering"
    ],
    industries: [
      "Software Development",
      "Enterprise Applications",
      "Web Development",
      "Mobile Application Development",
      "Game Development",
      "Financial Systems",
      "Healthcare Systems",
      "E-commerce Platforms"
    ],
    category: "Structural",
    components: [
      {
        name: "Class",
        description: "A blueprint for creating objects. Represented as a rectangle with three compartments: class name, attributes, and methods."
      },
      {
        name: "Attributes",
        description: "Properties or data members of a class. Can be public (+), private (-), or protected (#)."
      },
      {
        name: "Methods/Operations",
        description: "Functions or behaviors of a class. Represent what the class can do."
      },
      {
        name: "Relationships",
        description: "Connections between classes including Association, Inheritance, Aggregation, Composition, and Dependency."
      },
      {
        name: "Multiplicity",
        description: "Indicates how many instances of one class relate to instances of another class (e.g., 1, *, 0..1, 1..*)."
      }
    ],
    whereUsed: [
      "Software Requirements Analysis - Understanding system structure before implementation",
      "System Design Phase - Planning the architecture and class structure",
      "Code Documentation - Visual representation of code structure for developers",
      "Database Design - Mapping object models to database schemas",
      "API Design - Documenting request/response structures and data models",
      "Educational Purposes - Teaching object-oriented programming concepts",
      "System Maintenance - Understanding existing codebases and refactoring",
      "Team Communication - Sharing design ideas and system architecture"
    ],
    howToCreate: [
      {
        step: 1,
        title: "Open UML Diagram Studio",
        description: "Navigate to the Studio page and open the code editor. You can start with a blank canvas or use a template.",
        code: undefined
      },
      {
        step: 2,
        title: "Start with @startuml",
        description: "Begin your PlantUML code with @startuml and set the theme. Add a title for your diagram.",
        code: `@startuml
!theme plain
skinparam backgroundColor transparent

title Class Diagram Example`
      },
      {
        step: 3,
        title: "Define Classes",
        description: "Create classes using the 'class' keyword. Add attributes and methods inside curly braces.",
        code: `class User {
  -id: string
  -username: string
  -email: string
  +login()
  +logout()
  +getProfile()
}`
      },
      {
        step: 4,
        title: "Add Relationships",
        description: "Define relationships between classes using arrows and relationship types (--, <|--, *--, etc.).",
        code: `class User {
  -id: string
  -username: string
}

class Post {
  -id: string
  -title: string
  -content: string
}

User "1" -- "*" Post : creates
User <|-- Admin : extends`
      },
      {
        step: 5,
        title: "Add Multiplicity and Labels",
        description: "Specify how many instances relate to each other and add descriptive labels to relationships.",
        code: `User "1" -- "*" Post : creates
User "*" -- "1" Category : belongs to`
      },
      {
        step: 6,
        title: "Preview and Refine",
        description: "Use the real-time preview to see your diagram. Refine the layout, add more classes, or adjust relationships as needed.",
        code: undefined
      },
      {
        step: 7,
        title: "Export Your Diagram",
        description: "Once satisfied, export your diagram as PNG or SVG for use in documentation, presentations, or reports.",
        code: undefined
      }
    ],
    exampleCode: `@startuml
!theme plain
skinparam backgroundColor transparent

title E-Commerce System Class Diagram

class User {
  -id: string
  -username: string
  -email: string
  -password: string
  +login()
  +logout()
  +register()
  +updateProfile()
}

class Product {
  -id: string
  -name: string
  -price: number
  -description: string
  -stock: number
  +getDetails()
  +updateStock()
}

class Order {
  -id: string
  -orderDate: date
  -totalAmount: number
  -status: string
  +calculateTotal()
  +updateStatus()
}

class OrderItem {
  -quantity: number
  -price: number
  +calculateSubtotal()
}

class Category {
  -id: string
  -name: string
  -description: string
}

' Relationships
User "1" -- "*" Order : places
Order "1" -- "*" OrderItem : contains
OrderItem "*" -- "1" Product : references
Product "*" -- "1" Category : belongs to

@enduml`,
    bestPractices: [
      "Keep classes focused on a single responsibility (Single Responsibility Principle)",
      "Use meaningful names for classes, attributes, and methods",
      "Show only essential attributes and methods to avoid clutter",
      "Use appropriate relationship types (inheritance, composition, aggregation)",
      "Include multiplicity indicators for clarity",
      "Group related classes together visually",
      "Use packages or namespaces for large systems",
      "Document complex relationships with notes",
      "Keep the diagram at an appropriate level of abstraction",
      "Update the diagram as the system evolves"
    ],
    relatedDiagrams: [
      "Object Diagram - Shows instances of classes at a specific point in time",
      "Package Diagram - Organizes classes into logical groups",
      "Component Diagram - Shows physical components and their relationships",
      "Sequence Diagram - Shows interactions between objects over time"
    ],
    relatedLinks: [
      { href: "/", label: "Free UML diagram tool" },
      { href: "/blog/best-practices-for-class-diagrams", label: "Class diagram best practices" }
    ]
  },
  "sequence-diagram": {
    id: "2",
    slug: "sequence-diagram",
    name: "Sequence Diagram",
    description: "A behavioral UML diagram that shows how objects exchange messages over time.",
    fullDescription: "Sequence diagrams show object interactions in a scenario. Lifelines run top to bottom. Arrows are messages. Use them for APIs, checkout flows, and service calls. This gallery page is an example plus a short how-to in UML Diagram Studio. For a long tutorial, read the sequence diagram blog post.",
    image: "/og-image.png",
    keywords: ["Lifelines", "Messages", "Activation", "Actors", "Return", "Async"],
    useCases: [
      "API request and response flows",
      "Microservice collaboration",
      "Authentication sequences",
      "Checkout and payment flows"
    ],
    industries: [
      "Software Development",
      "Web Development",
      "Enterprise Applications",
      "E-commerce Platforms"
    ],
    category: "Behavioral",
    components: [
      { name: "Actor", description: "A user or external system that starts the interaction." },
      { name: "Lifeline", description: "A vertical line showing an object or participant over time." },
      { name: "Message", description: "A call, signal, or return between lifelines." },
      { name: "Activation", description: "A bar on a lifeline showing when that object is busy." },
      { name: "Alt / Loop", description: "Combined fragments for conditions and repetition." }
    ],
    whereUsed: [
      "API design reviews",
      "Onboarding new engineers to a flow",
      "Debugging multi-service bugs",
      "Documenting auth and payment"
    ],
    howToCreate: [
      {
        step: 1,
        title: "Open the free UML diagram tool",
        description: "Go to the homepage editor. No install is required.",
        code: undefined
      },
      {
        step: 2,
        title: "Declare participants",
        description: "Use actor and participant aliases so names stay short.",
        code: `@startuml
actor Customer
participant "Order Service" as Order
participant "Payment" as Pay
@enduml`
      },
      {
        step: 3,
        title: "Add messages",
        description: "Solid arrows are calls. Dashed arrows are returns.",
        code: `Customer -> Order: Place order
Order -> Pay: Charge card
Pay --> Order: OK
Order --> Customer: Confirmation`
      },
      {
        step: 4,
        title: "Preview and export",
        description: "Watch the live preview, then export PNG or SVG.",
        code: undefined
      }
    ],
    exampleCode: `@startuml
actor Customer
participant "Order Service" as Order
participant "Payment Service" as Pay
participant "Inventory" as Stock

Customer -> Order: Create order
activate Order
Order -> Stock: Check stock
Stock --> Order: Available
Order -> Pay: Charge
Pay --> Order: Success
Order --> Customer: Confirmed
deactivate Order
@enduml`,
    bestPractices: [
      "One scenario per diagram",
      "Name participants as real services",
      "Show failures when they matter",
      "Avoid drawing the entire system in one sequence"
    ],
    relatedDiagrams: [
      "Class Diagram - static structure of the same objects",
      "Activity Diagram - overall process without message timing",
      "Use Case Diagram - which actors trigger the scenario"
    ],
    relatedLinks: [
      { href: "/", label: "Free UML diagram tool" },
      { href: "/blog/mastering-sequence-diagrams", label: "Mastering sequence diagrams" }
    ]
  },
  "activity-diagram": {
    id: "3",
    slug: "activity-diagram",
    name: "Activity Diagram",
    description: "A UML workflow diagram for business processes, decisions, and parallel work.",
    fullDescription: "Activity diagrams model control flow: start, actions, decisions, forks, and end. Use them for onboarding, order processing, and approvals. This page is a studio-ready example. The activity diagram tutorial goes deeper on swimlanes and notation.",
    image: "/og-image.png",
    keywords: ["Workflow", "Decision", "Fork", "Join", "Action", "Swimlane"],
    useCases: [
      "Business process modeling",
      "Onboarding flows",
      "Order fulfillment",
      "Document approval"
    ],
    industries: [
      "Software Development",
      "Operations",
      "E-commerce Platforms",
      "Enterprise Applications"
    ],
    category: "Behavioral",
    components: [
      { name: "Start / End", description: "Initial and final nodes of the flow." },
      { name: "Action", description: "A rounded rectangle for a step." },
      { name: "Decision", description: "A diamond with guarded outgoing paths." },
      { name: "Fork and join", description: "Split and merge parallel branches." }
    ],
    whereUsed: [
      "Requirements workshops",
      "SOP documentation",
      "QA test planning",
      "Automation design"
    ],
    howToCreate: [
      {
        step: 1,
        title: "Open UML Diagram Studio",
        description: "Use the homepage editor with PlantUML activity syntax.",
        code: undefined
      },
      {
        step: 2,
        title: "Start the flow",
        description: "Use start, :actions;, if, and stop.",
        code: `@startuml
start
:Receive order;
if (Paid?) then (yes)
  :Ship;
else (no)
  :Remind customer;
endif
stop
@enduml`
      },
      {
        step: 3,
        title: "Preview and export",
        description: "Confirm branches in the live preview, then export.",
        code: undefined
      }
    ],
    exampleCode: `@startuml
start
:Customer submits order;
if (In stock?) then (yes)
  :Reserve items;
  :Charge payment;
  :Ship;
else (no)
  :Notify backorder;
endif
stop
@enduml`,
    bestPractices: [
      "Name actions as verbs",
      "Label every decision branch",
      "Split huge processes into several diagrams",
      "Use swimlanes when roles matter"
    ],
    relatedDiagrams: [
      "Sequence Diagram - messages between objects",
      "State Diagram - object lifecycle instead of process steps",
      "Use Case Diagram - who starts the process"
    ],
    relatedLinks: [
      { href: "/", label: "Free UML diagram tool" },
      { href: "/blog/activity-diagrams-for-workflow-modeling", label: "Activity diagrams for workflow modeling" }
    ]
  },
  "use-case-diagram": {
    id: "4",
    slug: "use-case-diagram",
    name: "Use Case Diagram",
    description: "A UML diagram of actors and the system functions they use.",
    fullDescription: "Use case diagrams show who interacts with a system and which goals they pursue. Ovals are use cases. Stick figures are actors. The system boundary boxes the product. Use this page to copy a starter diagram into the studio. The long-form use case guide covers include, extend, and scope.",
    image: "/og-image.png",
    keywords: ["Actor", "Use Case", "System Boundary", "Include", "Extend"],
    useCases: [
      "Product scoping",
      "Requirements kickoff",
      "Stakeholder workshops",
      "Feature inventory"
    ],
    industries: [
      "Software Development",
      "Product Management",
      "Enterprise Applications",
      "Education"
    ],
    category: "Behavioral",
    components: [
      { name: "Actor", description: "A role outside the system, such as Customer or Admin." },
      { name: "Use case", description: "A goal written as a verb phrase, such as Place order." },
      { name: "System boundary", description: "A box that groups use cases that belong to the product." },
      { name: "Association", description: "A line from an actor to a use case they initiate or participate in." }
    ],
    whereUsed: [
      "Inception and discovery",
      "SRS and product briefs",
      "Teaching UML to beginners",
      "Aligning QA with user goals"
    ],
    howToCreate: [
      {
        step: 1,
        title: "Open the editor",
        description: "Start from the free UML diagram tool on the homepage.",
        code: undefined
      },
      {
        step: 2,
        title: "Declare actors and use cases",
        description: "Use left/right actors and usecase aliases.",
        code: `@startuml
left to right direction
actor Customer
actor Admin
rectangle "Shop" {
  usecase "Browse catalog" as UC1
  usecase "Place order" as UC2
}
Customer --> UC1
Customer --> UC2
@enduml`
      },
      {
        step: 3,
        title: "Preview and export",
        description: "Check that the boundary matches the product, then export.",
        code: undefined
      }
    ],
    exampleCode: `@startuml
left to right direction
actor Customer
actor Admin
rectangle "Online Shop" {
  usecase "Browse catalog" as UC1
  usecase "Place order" as UC2
  usecase "Manage products" as UC3
}
Customer --> UC1
Customer --> UC2
Admin --> UC3
@enduml`,
    bestPractices: [
      "Write use cases as user goals, not UI screens",
      "Keep one system boundary per product",
      "Do not dump every feature on one diagram",
      "Link each use case to a sequence or activity later"
    ],
    relatedDiagrams: [
      "Activity Diagram - steps inside a use case",
      "Sequence Diagram - messages for a scenario",
      "Class Diagram - domain structure behind the features"
    ],
    relatedLinks: [
      { href: "/", label: "Free UML diagram tool" },
      { href: "/blog/use-case-diagrams-guide", label: "Use case diagrams guide" }
    ]
  }
};