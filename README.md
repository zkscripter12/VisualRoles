# VisualRoles

Plugin em desenvolvimento para Revenge no Android. O objetivo é adicionar etiquetas de cargos **somente visuais** a membros de servidores Discord.

> **Status: desenvolvimento / não validado / não publicar como instalável.**

## Objetivo
- Reutilizar visualmente cargos existentes de um servidor.
- Permitir atribuições locais por servidor e membro.
- Exibir futuramente as etiquetas na lista lateral de membros e no perfil do membro.
- Não conceder, remover nem alterar cargos, permissões ou configurações reais do Discord.

## Estado atual
A tela de configurações permite ativar/desativar o plugin, cadastrar uma atribuição por IDs de servidor/membro/cargo, definir nome e cor, listar e remover atribuições. Os dados ficam no armazenamento local do plugin.

**A integração visual com a lista lateral e o perfil ainda não foi implementada.** Não foi aplicado patch especulativo aos componentes internos do Discord/Revenge porque o APK disponível contém código Hermes compilado sem contratos de componentes suficientes para uma integração segura.

Consulte [VISUALROLES-STATUS.md](VISUALROLES-STATUS.md) para detalhes.

## Estrutura
- `plugins/visualroles/manifest.json`: metadados do plugin.
- `plugins/visualroles/js/index.tsx`: interface e armazenamento local.
- `plugins/visualroles/tsconfig.json`: configuração TypeScript do plugin.

## Validação pendente
Antes de qualquer distribuição:
1. Instalar dependências com Bun.
2. Executar build e typecheck conforme os scripts do repositório.
3. Corrigir erros encontrados.
4. Testar carregamento e persistência no Revenge em Android.
5. Identificar e validar os pontos de integração da lista lateral e do perfil.
6. Só então preparar um pacote e índice de repositório.

A workflow de release automático foi removida temporariamente para impedir publicação acidental. Não use a branch de distribuição enquanto a validação não estiver concluída.

## Segurança
VisualRoles é estritamente local e visual. Não deve chamar endpoints de gerenciamento de cargos nem alterar permissões.
