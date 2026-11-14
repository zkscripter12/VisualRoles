# VisualRoles — estado atual

## Implementado no código-fonte
- Interface mobile de configurações para ativar/desativar o plugin.
- Cadastro local por servidor, membro e ID de cargo existente.
- Nome e cor HEX da etiqueta visual.
- Lista e remoção de atribuições salvas.
- Persistência pelo armazenamento JSON do Revenge.
- Nenhuma chamada para modificar cargos, permissões ou configurações reais do Discord.

## Ainda não implementado
A renderização das etiquetas na lista lateral de membros e no perfil não está integrada. O APK de referência contém um bundle Hermes compilado, mas não expõe os módulos-fonte e contratos React necessários para identificar com segurança os componentes e suas props. Não foi adicionado patch especulativo.

## Validação e distribuição
O bundler oficial e a instalação em dispositivo ainda precisam ser executados. Este repositório contém código-fonte em desenvolvimento; não deve ser tratado como plugin instalável ou publicação validada. A publicação automática permanece desativada até validação explícita.
