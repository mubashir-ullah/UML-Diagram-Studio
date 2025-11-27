'use client';

import { useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { FileCode, RefreshCw } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  onRefresh?: () => void;
}

export function CodeEditor({ value, onChange, onRefresh }: CodeEditorProps) {
  const { theme } = useTheme();
  const editorRef = useRef(null);

  const handleEditorChange = (value: string | undefined) => {
    onChange(value || "");
  };

  const lineCount = value.split("\n").length;
  const charCount = value.length;

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    }
  };

  return (
    <div className="flex flex-col h-full bg-muted/30">
      <div className="flex items-center justify-between px-4 h-10 border-b bg-card">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">Code Editor</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span data-testid="text-line-count">{lineCount} lines</span>
          <span data-testid="text-char-count">{charCount} characters</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            className="h-6 px-2 text-muted-foreground hover:text-foreground"
            title="Clear code"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden" data-testid="input-code-editor">
        <Editor
          height="100%"
          language="plantuml"
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
            readOnly: false,
            contextmenu: true,
            quickSuggestions: true,
            acceptSuggestionOnEnter: "on",
            multiCursorModifier: "ctrlCmd",
            formatOnPaste: false,
            formatOnType: false,
          }}
          onMount={(editor) => {
            editorRef.current = editor;
            
            // Ensure the language is set to PlantUML
            const monaco = (window as any).monaco;
            const model = editor.getModel();
            if (model && monaco) {
              monaco.editor.setModelLanguage(model, 'plantuml');
            }
          }}
          beforeMount={(monaco) => {
            // Register PlantUML language before editor mounts
            if (!monaco.languages.getLanguages().some((lang: any) => lang.id === 'plantuml')) {
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
          }}
        />
      </div>

    </div>
  );
}
