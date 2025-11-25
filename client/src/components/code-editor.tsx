import { useRef } from "react";
import Editor from "@monaco-editor/react";
import { FileCode } from "lucide-react";
import { useTheme } from "./theme-provider";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  diagramType: "plantuml" | "mermaid";
}

export function CodeEditor({ value, onChange, diagramType }: CodeEditorProps) {
  const { theme } = useTheme();
  const editorRef = useRef(null);

  const handleEditorChange = (value: string | undefined) => {
    onChange(value || "");
  };

  const lineCount = value.split("\n").length;
  const charCount = value.length;

  return (
    <div className="flex flex-col h-full bg-muted/30">
      <div className="flex items-center justify-between px-4 py-2 border-b bg-card">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">Code Editor</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span data-testid="text-line-count">{lineCount} lines</span>
          <span data-testid="text-char-count">{charCount} characters</span>
        </div>
      </div>

      <div className="flex-1 overflow-hidden" data-testid="input-code-editor">
        <Editor
          height="100%"
          defaultLanguage="plaintext"
          value={value}
          onChange={handleEditorChange}
          theme={theme === "dark" ? "vs-dark" : "vs"}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            fontFamily: "JetBrains Mono, Fira Code, monospace",
            lineHeight: 1.6,
            padding: { top: 16, bottom: 16 },
            scrollBeyondLastLine: false,
            wordWrap: "on",
            wrappingStrategy: "advanced",
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            renderWhitespace: "selection",
            lineNumbers: "on",
            lineNumbersMinChars: 3,
            glyphMargin: false,
            folding: true,
            lineDecorationsWidth: 0,
            renderLineHighlight: "line",
            scrollbar: {
              vertical: "auto",
              horizontal: "auto",
              verticalScrollbarSize: 10,
              horizontalScrollbarSize: 10,
            },
          }}
          onMount={(editor) => {
            editorRef.current = editor;
            
            // Register PlantUML syntax highlighting
            const monaco = (window as any).monaco;
            if (monaco && !monaco.languages.getLanguages().some((lang: any) => lang.id === 'plantuml')) {
              monaco.languages.register({ id: 'plantuml' });
              
              monaco.languages.setMonarchTokensProvider('plantuml', {
                defaultToken: '',
                tokenPostfix: '.plantuml',
                
                keywords: [
                  'startuml', 'enduml', 'class', 'interface', 'abstract', 'enum',
                  'extends', 'implements', 'package', 'namespace', 'end',
                  'actor', 'participant', 'database', 'entity', 'boundary', 'control',
                  'activate', 'deactivate', 'destroy', 'create',
                  'start', 'stop', 'if', 'then', 'else', 'elseif', 'endif', 'while', 'endwhile',
                  'fork', 'again', 'repeat', 'partition', 'note', 'end note',
                  'left', 'right', 'top', 'bottom', 'of', 'on', 'link', 'over',
                  'title', 'header', 'footer', 'legend', 'endlegend', 'caption',
                  'skinparam', 'hide', 'show', 'scale', 'rotate'
                ],
                
                operators: [
                  '->', '<-', '-->', '<--', '..>', '<..', '-|>', '<|-',
                  '--', '..', '||', '|', '*', 'o', '#', '+', '-', '~'
                ],
                
                tokenizer: {
                  root: [
                    [/\@\w+/, 'keyword'],
                    [/!\w+/, 'keyword'],
                    [/"[^"]*"/, 'string'],
                    [/'[^']*'/, 'string'],
                    [/\b(class|interface|abstract|enum|actor|participant|database|entity)\b/, 'type'],
                    [/\b(extends|implements|package|namespace)\b/, 'keyword'],
                    [/\b(if|then|else|elseif|endif|while|endwhile|fork|again|repeat)\b/, 'keyword'],
                    [/\b(start|stop|activate|deactivate|destroy|create)\b/, 'keyword'],
                    [/\b(note|end|left|right|top|bottom|of|on|over)\b/, 'keyword'],
                    [/\b(title|header|footer|legend|caption|skinparam|hide|show|scale)\b/, 'keyword'],
                    [/-->|<--|->|<-|\.\.>|<\.\.|\-\|>|<\|\-/, 'operator'],
                    [/--|\.\.|::/, 'operator'],
                    [/[{}()\[\]]/, 'delimiter.bracket'],
                    [/[+\-#~]/, 'operator'],
                    [/\d+/, 'number'],
                    [/'.*$/, 'comment'],
                    [/\s+/, 'white'],
                    [/[a-zA-Z_]\w*/, 'identifier'],
                  ],
                },
              });
            }

            // Set the language based on diagram type
            const model = editor.getModel();
            if (model && monaco) {
              monaco.editor.setModelLanguage(model, diagramType === 'plantuml' ? 'plantuml' : 'plaintext');
            }
          }}
        />
      </div>

      {!value && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center text-muted-foreground mt-16">
            <FileCode className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p className="text-sm">Start typing your {diagramType} code</p>
            <p className="text-xs mt-1">Or select a template to get started</p>
          </div>
        </div>
      )}
    </div>
  );
}
