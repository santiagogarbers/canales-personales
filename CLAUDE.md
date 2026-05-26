# botmaker-copilot

Editor visual de flujos de agentes de IA con AI Copilot lateral.

## Dev
```
npm run dev  →  http://localhost:5173
```

## Stack
React 19 + Vite + Framer Motion + Lucide React. Estilos inline con variables CSS (`src/index.css`). Sin TypeScript ni Tailwind.

## Componentes clave
- **`src/components/ChatPanel.jsx`** — Panel AI Copilot. Contiene `ChangesSummary`, `NodeIcon`, `ThinkingBlock`, `AIMessage`.
- **`src/components/Canvas.jsx`** — Canvas con pan/zoom, nodos y conexiones SVG.
- **`src/components/WorkflowNode.jsx`** — Nodo individual (estados: normal, added, modified, generating).
- **`src/data/aiScripts.js`** — Respuestas simuladas de IA. `matchScript()` rutea prompts a scripts.
- **`src/data/initialNodes.js`** — Nodos y conexiones iniciales.

## Assets de iconos (en `/public/`)
| Archivo | Uso |
|---|---|
| `PDF.png` | Knowledge nodeType + fileType pdf |
| `DOC.png` | Knowledge nodeType + fileType doc |
| `web.png` | Knowledge nodeType + fileType url |
| `conditional-node.png` | NodeType condition |
| `instruction-node.png` | Resto de nodeTypes |

## ChangesSummary (ChatPanel.jsx)
- Título: `"N elementos creados"` (total de changes)
- Items agrupados: instrucción y condicional se agrupan en una fila con conteo; cada knowledge item va en fila individual
- Iconos: 24x24 via `<NodeIcon>`, texto 12px con ellipsis
- Colapsable, abierto por defecto

## GitHub
https://github.com/santiagogarbers/botmaker-copilot — branch `main`
