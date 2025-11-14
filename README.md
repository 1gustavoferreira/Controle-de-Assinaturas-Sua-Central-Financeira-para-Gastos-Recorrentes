# Controle de Assinaturas

Uma aplicação web moderna e responsiva para gerenciar e controlar suas assinaturas mensais e anuais, ajudando a visualizar seus gastos recorrentes de forma clara e organizada.

![Pré-visualização do App](https://i.imgur.com/your-image-url.png) <!-- Sugestão: adicione uma screenshot do app aqui -->

## ✨ Funcionalidades

- **Dashboard Financeiro:** Visualize rapidamente o custo total mensal e anual de todas as suas assinaturas.
- **Gráfico Interativo:** Um gráfico de rosca (donut chart) mostra a distribuição de gastos por categoria, permitindo identificar para onde seu dinheiro está indo.
- **CRUD de Assinaturas:** Adicione, edite e exclua assinaturas de forma fácil através de um modal intuitivo.
- **Categorização:** Classifique suas assinaturas em categorias (Streaming, Software, Música, etc.) para melhor organização.
- **Ordenação Flexível:** Ordene a lista de assinaturas por nome, maior custo ou data do próximo vencimento.
- **Persistência de Dados:** Suas informações são salvas localmente no seu navegador usando `localStorage`, para que você não perca seus dados ao recarregar a página.
- **Design Responsivo:** A interface se adapta perfeitamente a desktops, tablets e dispositivos móveis.
- **UX Aprimorada:** Inclui confirmação antes de excluir um item para evitar a perda acidental de dados.

## 🚀 Tecnologias Utilizadas

- **[React](https://react.dev/)**: Biblioteca JavaScript para construir interfaces de usuário.
- **[TypeScript](https://www.typescriptlang.org/)**: Superset do JavaScript que adiciona tipagem estática.
- **[Tailwind CSS](https://tailwindcss.com/)**: Framework CSS utility-first para um design rápido e customizável.
- **Sem Build Step**: O projeto utiliza `import maps` e scripts via CDN, não necessitando de um processo de build complexo (Webpack, Vite, etc.) para ser executado.

## 🏁 Como Executar Localmente

Como este projeto não requer um passo de compilação, executá-lo é muito simples.

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/controle-de-assinaturas.git
    cd controle-de-assinaturas
    ```

2.  **Abra o `index.html`:**
    A maneira mais fácil é usar uma extensão de servidor web para o seu editor de código, como o **Live Server** para o VS Code.
    - Clique com o botão direito no arquivo `index.html` e selecione "Open with Live Server".
    - Isso iniciará um servidor local e abrirá o aplicativo no seu navegador.

    Alternativamente, você pode abrir o arquivo `index.html` diretamente no seu navegador, mas o uso de um servidor local é recomendado para garantir que os módulos ES6 (`import`/`export`) funcionem corretamente.

## 📜 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
