# Portfolio Windows 7 - Guidelines

## Sistema Bilingue (i18n)

Este projeto possui sistema de tradução EN/PT implementado. **Todas as funcionalidades novas DEVEM seguir estas regras:**

### Regras Obrigatórias

1. **Todo texto visível deve usar a função `t()` do LanguageContext**
   - Não use textos hardcoded nos componentes
   - Sempre use: `const { t } = useLanguage();` e depois `t('chave')`

2. **Adicionar novas chaves de tradução**
   - Edite `src/i18n/translations.js`
   - Adicione a chave em ambos os idiomas: `en` e `pt`

3. **Títulos de janelas**
   - Não use prop `title` - use `titleContent` com a chave de tradução
   - O componente Window já traduz automaticamente usando `t(titleContent)`

4. **Conteúdo das janelas**
   - Sempre use `<WindowContent />` ou traduzas com `t()`
   - Não hardcode textos dentro dos componentes

### Exemplo de como adicionar novo texto

```jsx
// Errado
<p>Hello World</p>

// Correto
const { t } = useLanguage();
<p>{t('helloWorld')}</p>
```

```js
// translations.js
en: { helloWorld: 'Hello World' },
pt: { helloWorld: 'Olá Mundo' }
```

### Como testar
- Clique no botão EN/PT na taskbar para verificar se tudo traduz
- Teste em ambos os idiomas antes de commitar

---

## Responsividade

Este projeto DEVE ser responsivo para diferentes tamanhos de tela.

### Regras Obrigatórias

1. **Todo componente novo deve ter CSS responsivo**
   - Use media queries para breakpoints: 1024px e 768px
   - Teste em diferentes tamanhos de tela

2. **Breakpoints**
   - Desktop/Tablet grande: > 1024px
   - Tablet: 768px - 1024px
   - Mobile: < 768px

3. **Práticas recomendadas**
   - Use unidades relativas (%, vw, vh, rem)
   - Evite valores fixos quando possível
   - Teste redimensionando a janela

### Estrutura de Media Query

```css
/* Desktop/Tablet */
@media (max-width: 1024px) {
  /* ajustes para telas médias */
}

/* Mobile */
@media (max-width: 768px) {
  /* ajustes para telas pequenas */
}
```

---

## Comportamento de Janelas

Todas as janelas DEVEM ficar dentro dos limites da área de trabalho.

### Regras Obrigatórias

1. **Sempre use o componente `Window`** - não crie divs separadas para janelas
2. **O componente já trata:**
   - Limites da tela (não deixar janela fora)
   - Barra de título sempre visível
   - Não sobrepor a taskbar

### O que já está implementado
- O componente `Window` já tem a função `clampPosition()` que:
  - Impede janela de ir para fora da tela (esquerda/direita)
  - Mantém barra de título visível
  - Não deixa a janela entrar na taskbar (40px do fundo)

---

## Atomic Design

Este projeto segue a metodologia Atomic Design. Use a estrutura correta ao criar novos componentes.

### Estrutura de Pastas

```
src/components/
├── atoms/          # Menor unidade (Icon, Button, Clock)
├── molecules/      # Grupo de átomos (MenuItem, DesktopIcon)
├── organisms/      # Seções completas (Window, Taskbar, StartMenu)
└── layouts/       # Layouts de página (DesktopLayout)
```

### Átomos
Componentes indivisíveis (não dependem de outros componentes):
- `Icon` - Emoji ou ícone
- `WindowButton` - Botões de janela (minimizar, maximizar, fechar)
- `Clock` - Relógio da taskbar
- `LanguageToggle` - Botão de mudança de idioma

### Moléculas
Grupos de átomos que funcionam juntos:
- `DesktopIcon` - Ícone + label na desktop
- `MenuItem` - Ícone + label no menu
- `TaskbarWindow` - Ícone + título na taskbar
- `WindowTitleBar` - Título + botões da janela

### Organismos
Componentes completos e funcionais:
- `Window` - Janela completa (título + conteúdo)
- `Taskbar` - Barra de tarefas completa
- `StartMenu` - Menu iniciar completo
- `Desktop` - Área de trabalho completa

### Layouts
Estruturas de página:
- `DesktopLayout` - Layout principal do desktop

### Como criar um novo componente

1. Escolha o nível correto (átomo, molécula, organismo)
2. Crie o arquivo JSX e CSS na pasta correspondente
3. Exporte no index.js da pasta
4. Importe nos organismos que precisam

```jsx
// Exemplo: criar um novo átomo
// src/components/atoms/MeuAtomo.jsx
import './MeuAtomo.css';

function MeuAtomo({ prop }) {
  return <div className="meu-atomo">{prop}</div>;
}

export default MeuAtomo;

// src/components/atoms/index.js
export { default as MeuAtomo } from './MeuAtomo';
```

---

## Design Tokens

O projeto usa **Design Tokens** para manter consistência e facilitar alterações futuras de estilo.

### Estrutura de Arquivos

```
src/components/atoms/
├── tokens.css      # CSS variables (:root)
├── colors.js       # Cores em JS
├── typography.js   # Fontes e tamanhos
├── spacing.js      # Espaçamentos e tamanhos
├── effects.js      # Sombras, bordas, transições
└── index.js        # Exporta todos os tokens
```

### Como Usar nos Componentes

**No CSS (recomendado):**
```css
.my-component {
  background: var(--gradient-taskbar);
  color: var(--color-text-white);
  font-size: var(--font-size-md);
  padding: var(--spacing-base);
  box-shadow: var(--shadow-window);
  border-radius: var(--radius-sm);
}
```

**No JavaScript (para objetos):**
```jsx
import { colors, typography } from './components/atoms';

const style = {
  color: colors.text.white,
  fontSize: typography.fontSize.md,
};
```

### Tokens Disponíveis

**Cores (`colors.js` + `tokens.css`):**
- `--color-primary-*` (900 a 50)
- `--color-accent`, `--color-accent-light`
- `--color-window-*` (bg, border, titlebar)
- `--color-taskbar-*`
- `--color-startmenu-*`
- `--color-close-*`
- `--color-text-*` (white, black, dark, gray)
- `--color-bg-*` (dark, light)

**Tipografia (`typography.js` + `tokens.css`):**
- `--font-family`
- `--font-size-xs` até `--font-size-hero`
- `--font-weight-normal`, `--medium`, `--bold`

**Espaçamento (`spacing.js` + `tokens.css`):**
- `--spacing-xs` até `--spacing-2xl`
- `--taskbar-height`, `--titlebar-height`
- `--icon-size-*`, `--button-width/height`
- `--desktop-icon-width`, `--startmenu-width`

**Efeitos (`effects.js` + `tokens.css`):**
- `--shadow-*` (window, taskbar, startmenu)
- `--text-shadow-*`
- `--border-*`
- `--radius-*` (sm, md, lg, xl)
- `--transition-*`
- `--z-*` (z-index)
- `--opacity-*`

### Alterando o Tema

Para mudar cores, fontes ou outros estilos no futuro:
1. Edite `tokens.css` para alterar CSS variables
2. Edite os arquivos `.js` correspondentes para alterar valores JS
3. Todos os componentes serão atualizados automaticamente

Exemplo - Mudar cor da taskbar:
```css
/* tokens.css */
--color-taskbar-start: #novo-azul;
--color-taskbar-end: #nova-cor;
```
