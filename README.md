# Mariolas • Cestas Nordestinas

Projeto React + Vite exportado do Figma Make e ajustado para publicação no GitHub Pages.

## Rodar localmente

```bash
npm install
npm run dev
```

## Gerar build de produção

```bash
npm run build
npm run preview
```

O build final é gerado na pasta `dist`.

## Publicar pelo GitHub Pages

1. Crie um repositório no GitHub.
2. Suba todos os arquivos deste projeto na branch `main`.
3. No repositório, acesse **Settings → Pages**.
4. Em **Build and deployment**, selecione **Source: GitHub Actions**.
5. Faça um push na branch `main`. O workflow `.github/workflows/deploy.yml` irá instalar as dependências, gerar o build e publicar o conteúdo da pasta `dist`.

## Ajustes aplicados

- React e React DOM adicionados como dependências reais do projeto.
- `base: './'` configurado no Vite para compatibilidade com GitHub Pages.
- Roteamento alterado para hash routing, evitando erro 404 ao atualizar ou abrir páginas internas no GitHub Pages.
- Meta robots alterado para permitir indexação.
- Workflow de deploy para GitHub Pages criado.
