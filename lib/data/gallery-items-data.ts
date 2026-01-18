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
    ]
  }
};