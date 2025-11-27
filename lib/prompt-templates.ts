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

