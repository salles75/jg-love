# JJ - Site Romântico

## Estrutura
```
JJ/
├── index.html
├── assets/
│   ├── css/styles.css
│   └── js/{script.js,love.js,quiz.js,nós.js}
├── pages/
│   ├── love.html
│   ├── quiz.html
│   └── nós.html
└── images/{1.jpeg..5.jpeg,casal.jpeg}
```

## Publicação no GitHub Pages (projeto)
1. Crie um repositório no GitHub (ex.: `jj-romantico`).
2. No terminal, dentro da pasta `JJ/`:
```bash
git init
git add .
git commit -m "Site romântico: estrutura + páginas"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/jj-romantico.git
git push -u origin main
```
3. Ative o GitHub Pages:
   - Settings → Pages → Build and deployment
   - Source: Deploy from a branch
   - Branch: `main` e folder `/ (root)` → Save
4. Acesse após o build:
   - `https://SEU_USUARIO.github.io/jj-romantico/`
   - Internas: `.../pages/love.html`, `.../pages/quiz.html`, `.../pages/nós.html`

## Observações
- Caminhos relativos prontos para subpasta do Pages.
- `.nojekyll` evita processamento do Jekyll.
- Imagens em `images/` conforme nomes.

## Atualizações futuras
```bash
git add .
git commit -m "Sua mensagem"
git push
```
