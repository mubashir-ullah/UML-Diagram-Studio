export interface PromptTemplate {
  id: string;
  title: string;
  category: string;
  prompt: string;
}

export const promptTemplates: PromptTemplate[] = [
  {
    id: "sequence-diagram",
    title: "Sequence Diagram",
    category: "sequence",
    prompt: "Create a sequence diagram showing the interaction between multiple components or actors. Include messages, activations, and lifelines.",
  },
  {
    id: "usecase-diagram",
    title: "Use Case Diagram",
    category: "usecase",
    prompt: "Create a use case diagram showing actors and their interactions with the system. Include use cases, relationships, and system boundaries.",
  },
  {
    id: "class-diagram",
    title: "Class Diagram",
    category: "class",
    prompt: "Create a class diagram showing classes, their attributes, methods, and relationships (inheritance, associations, dependencies).",
  },
  {
    id: "activity-diagram",
    title: "Activity Diagram",
    category: "activity",
    prompt: "Create an activity diagram showing a workflow or process flow with activities, decisions, forks, and joins.",
  },
  {
    id: "state-diagram",
    title: "State Diagram",
    category: "state",
    prompt: "Create a state diagram showing the different states of an object and the transitions between them with triggers and guards.",
  },
  {
    id: "component-diagram",
    title: "Component Diagram",
    category: "component",
    prompt: "Create a component diagram showing the physical components of a system, their interfaces, and dependencies.",
  },
  {
    id: "er-diagram",
    title: "Entity Relationship Diagram",
    category: "class",
    prompt: "Create an entity-relationship diagram showing database entities, their attributes, and relationships with cardinality.",
  },
  {
    id: "timing-diagram",
    title: "Timing Diagram",
    category: "sequence",
    prompt: "Create a timing diagram showing the state of objects over time and the interactions between them.",
  },
];

// PlantUML syntax guide for AI
export const PLANTUML_SYNTAX_GUIDE = `
PLANTUML SYNTAX RULES - CRITICAL:

1. ALWAYS start with @startuml and end with @enduml
2. NEVER use curly braces {} for component contents - components are standalone declarations
3. NEVER use +-- or -- inside component/class declarations
4. Use proper PlantUML syntax for each diagram type:

CLASS DIAGRAM:
@startuml
class ClassName {
  -attribute: type
  +method()
}
ClassName1 --|> ClassName2 : extends
@enduml

COMPONENT DIAGRAM:
@startuml
component ComponentName
component Component2
ComponentName --> Component2 : uses
@enduml

SEQUENCE DIAGRAM:
@startuml
actor User
participant System
User -> System: message
activate System
System --> User: response
deactivate System
@enduml

ACTIVITY DIAGRAM:
@startuml
start
:activity;
if (condition?) then (yes)
  :action;
else (no)
  :other action;
endif
stop
@enduml

STATE DIAGRAM:
@startuml
[*] --> State1
State1 --> State2 : event
State2 --> [*]
@enduml

USE CASE DIAGRAM:
@startuml
actor User
usecase UC1
usecase UC2
User --> UC1
User --> UC2
@enduml

COMMON ERRORS TO AVOID:
- DON'T: component Frontend { +--GUI-- }
- DO: component Frontend
- DON'T: class MyClass { +--method-- }
- DO: class MyClass { +method() }
- DON'T: Use invalid syntax like +--, --+, etc. inside declarations
- DO: Use proper PlantUML syntax for relationships and declarations
`;
