export const extraBlogPosts = {
  "7": {
    id: "7",
    slug: "use-case-diagrams-guide",
    title: "UML Use Case Diagrams: Actors, Goals, and System Boundary",
    description:
      "Learn how to draw UML use case diagrams: actors, use cases, include and extend, and a PlantUML example you can open in a free online UML tool.",
    content:
      "A use case diagram shows who uses a system and which goals they pursue. This guide covers actors, the system boundary, associations, include, extend, and common mistakes.",
    fullContent:
      "A use case diagram shows who uses a system and which goals they pursue. This guide covers actors, the system boundary, associations, include, extend, and common mistakes. You can practice in the free UML diagram tool on this site.",
    author: "Mubashir",
    date: "2026-08-14",
    readTime: "16 min read",
    category: "Tutorial",
    tags: ["Use Case Diagram", "UML", "Actors", "Requirements", "PlantUML"],
    sections: [
      {
        title: "What a use case diagram is for",
        content:
          "A use case diagram is a UML behavioral diagram that answers two questions: who interacts with the product, and what goals those people (or systems) have. It is not a flowchart and it is not a screen map. Each oval is a goal written as a verb phrase, such as Place order or Reset password. Each stick figure is an actor: a role outside the software.\n\nTeams use use case diagrams at the start of a project because they are cheap to draw and easy to challenge in a workshop. Product managers can see missing actors. Engineers can see a goal that has no owner. Testers can later turn each use case into scenarios. If you need the steps inside a use case, switch to an [activity diagram](/blog/activity-diagrams-for-workflow-modeling). If you need message timing, use a [sequence diagram](/blog/mastering-sequence-diagrams).\n\nThe diagram lives next to a short written description for each oval: trigger, preconditions, main success scenario, and a few failures. The picture is the index. The text is the contract. Do not try to put every sentence on the picture.\n\nYou can copy the PlantUML at the end of this article into the [free UML diagram tool](/) and adjust names to match your product. A [gallery example](/gallery/use-case-diagram) shows a shop-sized starter."
      },
      {
        title: "Actors and the system boundary",
        content:
          "An actor is a role, not a job title on an org chart. Customer, Admin, Payment gateway, and Inventory service can all be actors if they sit outside the system you are drawing. Primary actors start a use case. Secondary actors are invoked by the system (a payment provider is a common secondary actor).\n\nThe system boundary is a rectangle around the use cases that belong to this product. Anything outside the rectangle is not your code. That single box prevents a common error: mixing two products on one diagram. If you are drawing a mobile app and a warehouse system, you probably need two diagrams, or you need to treat the warehouse as an actor of the app.\n\nName the rectangle with the product name, not a vague word like System. Readers should know whether they are looking at Checkout, Admin console, or the whole shop.\n\nKeep actor names stable across documents. If the written spec says Member and the diagram says User, reviewers will argue about identity instead of behavior. Align the words with your [class diagram](/gallery/class-diagram) later, but do not draw classes on the use case view."
      },
      {
        title: "Writing useful use case names",
        content:
          "Write goals from the actor's point of view: Place order, not ProcessOrderForm. Avoid UI widgets (Click submit). Avoid internal jobs (Write to Kafka). Those belong in sequence or activity diagrams.\n\nA good test: a stakeholder who has never seen UML should still understand the oval. If they ask which screen it is, the name is too technical. If they ask which department owns it, the name may be too broad.\n\nGranularity matters. Login is often too small unless security is the subject of the review. Run the company is too large. Aim for a goal that can have a main success path of a few minutes of user time, or a single system-to-system transaction.\n\nGroup related ovals visually. PlantUML will place them; you can still use packages or comments to keep Browse catalog near Place order. Do not create twenty ovals that are all CRUD of the same noun. Merge them into Manage catalog if the workshop is about scope, and split later when you design APIs."
      },
      {
        title: "Associations, include, and extend",
        content:
          "A solid line from actor to use case means that actor participates. You do not need arrows for simple associations. Multiplicity is rarely worth drawing on a use case diagram.\n\nInclude means one use case always uses another. Authenticate is a typical included case if every checkout path requires a session. Draw include as a dashed arrow with the stereotype include, from the base use case to the included one. Use include when the shared steps are a real goal that several ovals need, not when you are just factoring a function for programmers.\n\nExtend means optional or exceptional behavior. Apply coupon might extend Place order. The dashed arrow goes from the extension to the base, with extend. Extensions need an extension point in the written spec (when the user has a code). If every order must apply a coupon, it is not an extension.\n\nGeneralization of actors (Admin as a kind of User) is legal UML and often noisy. Prefer two actors and shared use cases unless the hierarchy is central to access control.\n\nIf the diagram looks like a spider web of include and extend, stop. You are designing procedures, not scoping the product. Move the procedures to an activity diagram."
      },
      {
        title: "PlantUML example you can edit online",
        content:
          "PlantUML keeps use case diagrams in version control. Start with left to right direction so actors sit beside the boundary. Declare actors, then a rectangle for the system, then usecase aliases, then associations.\n\nOpen the [PlantUML online](/blog/plantuml-online) guide if you want a broader text-to-UML workflow. For this diagram type, the important keywords are actor, rectangle, usecase, and the include or extend arrows.\n\nAfter you paste the example into the homepage editor, rename the product and add one actor you actually have (Support, Partner, Batch job). Export PNG or SVG for the slide deck. Keep the .puml (or the editor localStorage) as the source of truth."
      },
      {
        title: "Example: online shop",
        content: "A compact shop diagram:",
        codeExample: `@startuml
left to right direction
actor Customer
actor Admin
actor "Payment gateway" as Pay

rectangle "Online Shop" {
  usecase "Browse catalog" as UC1
  usecase "Place order" as UC2
  usecase "Authenticate" as UC3
  usecase "Manage products" as UC4
  usecase "Apply coupon" as UC5
}

Customer --> UC1
Customer --> UC2
Admin --> UC4
Pay --> UC2
UC2 ..> UC3 : <<include>>
UC5 ..> UC2 : <<extend>>
@enduml`
      },
      {
        title: "When not to use a use case diagram",
        content:
          "Skip this diagram when the audience already agrees on actors and goals, and you need algorithms, states, or class structure. Skip it when the product is a library with no human actors unless you treat calling applications as actors.\n\nDo not use use case diagrams to show sequence of screens. Do not use them as a project plan (no dates). Do not invent actors for every persona variant if they share the same goals.\n\nIf the workshop turns into a debate about include versus extend for twenty minutes, you have enough UML. Write the scenarios in a table and move on. The diagram's job is alignment, not completeness."
      },
      {
        title: "Mistakes that confuse readers",
        content:
          "Putting system internals (database, cache) as use cases. Those are components.\n\nDrawing every REST endpoint as an oval. Endpoints are how you implement a goal, not the goal.\n\nActors inside the boundary. If they are inside, they are not actors.\n\nUnnamed associations that cross the whole page. If an actor relates to eight ovals, split the diagram by subsystem.\n\nMixing tense and grammar (Order placement vs Place order). Pick verb phrases and stick to them.\n\nForgetting secondary actors that the system must call. Payment and email often belong on the picture because they constrain scope and SLAs."
      },
      {
        title: "From diagram to tests and code",
        content:
          "Each use case should map to at least one happy-path test and a few negative tests. Name the tests after the use case so coverage reports stay readable. Sequence diagrams for Place order will show the services; activity diagrams will show branches like out of stock.\n\nIn code, a use case often becomes an application service or a command handler. That mapping is a design choice, not a UML rule. The [class diagram best practices](/blog/best-practices-for-class-diagrams) post covers how to keep the domain model from mirroring the UI.\n\nKeep the use case diagram in the same repo as the product, next to the README or an architecture folder. When a new actor appears (for example a marketplace seller), update the diagram in the same pull request as the feature flag."
      },
      {
        title: "Next steps",
        content:
          "Draw your product's actors and five to nine use cases in the [free UML diagram tool](/). Compare with the [use case gallery example](/gallery/use-case-diagram). Then pick one oval and expand it as an [activity diagram](/gallery/activity-diagram) or a [sequence diagram](/gallery/sequence-diagram). If you are new to UML overall, start with the [getting started guide](/blog/getting-started-with-uml-diagrams).\n\nThe picture is done when a new teammate can point to who is outside the system and what they are trying to achieve. That is the whole job of this diagram type."
      }
    ]
  },
  "8": {
    id: "8",
    slug: "plantuml-online",
    title: "PlantUML Online: Text-to-UML in the Browser",
    description:
      "Use PlantUML online without installing Graphviz. Write text, preview UML live, and export PNG or SVG in a free browser UML diagram tool.",
    content:
      "PlantUML lets you describe UML in text. This guide explains how to use PlantUML online in the browser, what to put in a file, and how that compares with drag-and-drop tools.",
    fullContent:
      "PlantUML lets you describe UML in text. This guide explains how to use PlantUML online in the browser, what to put in a file, and how that compares with drag-and-drop tools.",
    author: "Mubashir",
    date: "2026-08-14",
    readTime: "15 min read",
    category: "Tutorial",
    tags: ["PlantUML", "PlantUML Online", "UML Diagram Tool", "Text to UML"],
    sections: [
      {
        title: "Why text-to-UML",
        content:
          "PlantUML is a language: you type @startuml, declarations, relationships, and @enduml, and a renderer draws the picture. Diffs in git are readable. Reviews can happen in pull requests. The same source can generate PNG for Confluence and SVG for a wiki.\n\nDrag-and-drop tools are faster for a one-off slide. They are weaker when a team must keep diagrams next to code for years. If two people edit a binary file, merges fail. If the layout is the document, a small class rename becomes a drawing chore.\n\nUsing PlantUML online means you skip a local Graphviz install for everyday work. UML Diagram Studio compiles in the browser (and via its compile API) so you can learn syntax without setting up Java. For CI, you can still run PlantUML in a pipeline later. The online editor is for drafting, teaching, and exporting.\n\nThis site is a [free UML diagram tool](/) with live preview, templates, and an AI assistant that emits PlantUML from a sentence. That is useful when you remember the shape of a sequence but not the keyword for alt fragments."
      },
      {
        title: "A minimal file",
        content:
          "Every diagram starts and ends with the startuml markers. Optional skinparam and theme lines change fonts and background. Titles help when you export several PNGs into a folder.\n\nClass diagrams use class blocks and relationship arrows. Sequence diagrams use actor, participant, and arrows. Activity diagrams in the modern syntax use start, :action;, if, and stop. Use case diagrams use actor, rectangle, and usecase. You do not need all of that on day one. Copy a [class diagram example](/gallery/class-diagram) and change names.\n\nComments in PlantUML start with a single quote. Use them to leave a note for the next editor, not to hide secret data. Treat diagram text like source code: no passwords, no customer dumps."
      },
      {
        title: "Working in the browser editor",
        content:
          "On umldiagram.app the left pane is the editor and the right pane is the preview. Typing updates the picture after compile. If the syntax is invalid, you will see an error instead of a drawing. Fix the line, do not start over.\n\nLocal storage keeps the last buffer on that browser. It is not a cloud account. Copy important diagrams into git. Export PNG or SVG when you need a snapshot for a ticket.\n\nTemplates in the studio cover common types so you are not staring at a blank page. The gallery pages include full exampleCode you can send to the editor with Open in the free UML diagram tool.\n\nMermaid is also accepted for some diagrams if your team already uses it in Markdown. PlantUML remains the richer UML dialect for class relationships and sequence fragments. Pick one per repo so the style stays consistent."
      },
      {
        title: "Layout, themes, and readability",
        content:
          "PlantUML chooses layout. You influence it with direction (left to right), hidden links, and splitting large models into several diagrams. Fighting the layout engine for pixel-perfect boxes is usually wasted time. If a diagram is unreadable, you have too many nodes, not a theme problem.\n\nUse a plain theme for documentation. High-contrast skins help projectors. Transparent backgrounds sit better on dark sites.\n\nName things the way the code is named. A diagram that says CustomerService while the repo says BillingClient will not help onboarding. The [getting started](/blog/getting-started-with-uml-diagrams) post covers class compartments and visibility marks.\n\nNotes (note left of Class) explain a constraint that the arrows cannot show. Keep notes short. Long essays belong in the Markdown around the diagram, not inside it."
      },
      {
        title: "Sequence and activity in text",
        content:
          "Sequence diagrams in PlantUML map well to logs: who called whom. Activation bars make nested calls obvious. Combined fragments (alt, opt, loop, par) document branches that a linear log hides. See [mastering sequence diagrams](/blog/mastering-sequence-diagrams) for message types.\n\nActivity diagrams are better for business process owners. Swimlanes assign steps to roles. Guards on decisions should match real policies (if paid, if in stock). The [activity tutorial](/blog/activity-diagrams-for-workflow-modeling) and [gallery activity example](/gallery/activity-diagram) give copy-paste starters.\n\nState diagrams use [*] for initial and final states. They are the right tool for order status, not for a 40-step onboarding checklist. That checklist is an activity."
      },
      {
        title: "AI as a first draft, not the source of truth",
        content:
          "Describing a system in a sentence and getting PlantUML back is a speed boost. It is also a hallucination risk. Generated diagrams invent classes and services that do not exist. Always read the text before you commit it.\n\nA practical loop: write three sentences of real architecture, generate, delete anything you cannot point to in the repo, then tighten names. The [AI diagram generation](/blog/ai-powered-diagram-generation) article covers that workflow in more depth.\n\nDo not paste proprietary schemas into a public model if your policy forbids it. The [privacy policy](/privacy) explains that prompts go to an API when you use chat."
      },
      {
        title: "Version control and reviews",
        content:
          "Store .puml files next to the feature they describe, or in /docs/uml. In the pull request, reviewers can read the text even if they do not render it. Optionally attach an exported PNG for people who will not run the editor.\n\nCI can fail a build if PlantUML does not compile. That catches broken arrows after a rename. It will not catch a diagram that compiles but is wrong. Humans still review meaning.\n\nWhen a class is renamed in code, grep the .puml files. Text search is the hidden benefit of PlantUML online and offline. You cannot grep a Figma frame as easily."
      },
      {
        title: "PlantUML versus drawing tools",
        content:
          "Choose PlantUML when diagrams must live with code, when several people edit them, and when UML (not a freeform whiteboard) is the language you want. Choose a whiteboard when you are still discovering whether a concept exists. Many teams sketch on a board, then freeze the agreement as PlantUML.\n\nOnline PlantUML is enough for class, sequence, activity, state, and use case work in this studio. Heavy C4 or custom sprites may need the full PlantUML desktop or a dedicated server. Start here, graduate if you hit a syntax wall.\n\nLicensing: PlantUML itself is open source. Your diagrams are yours, as described in the [terms](/terms). Do not assume a generated PNG is a trademark-safe copy of someone else's architecture."
      },
      {
        title: "A starter you can paste",
        content: "A tiny class diagram to confirm the editor works:",
        codeExample: `@startuml
!theme plain
title PlantUML online starter

class User {
  -id: string
  +login()
}

class Order {
  -id: string
  +submit()
}

User "1" -- "*" Order : places
@enduml`
      },
      {
        title: "Next steps",
        content:
          "Open the [homepage editor](/) and paste the starter. Then load a [sequence example](/gallery/sequence-diagram) or a [use case example](/gallery/use-case-diagram). Read [class diagram best practices](/blog/best-practices-for-class-diagrams) before you model a large domain.\n\nPlantUML online is a habit: small text files, frequent exports, diagrams that match the repo. The syntax is the easy part. The hard part is drawing only what the next reader needs."
      }
    ]
  }
};
