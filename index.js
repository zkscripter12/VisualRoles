
(function (exports, plugin, toasts, metro, common, components) {
  "use strict";

  const React = components.React;
  const { View, Text } = components.ReactNative;

  const Forms =
    components.Forms ||
    metro.findByProps("FormSection", "FormRow", "FormSwitchRow") ||
    {};

  const { FormSection, FormSwitchRow } = Forms;

  function Settings() {
    const [enabled, setEnabled] = React.useState(
      plugin.storage.enabled ?? true
    );

    const updateEnabled = (value) => {
      setEnabled(value);
      plugin.storage.enabled = value;
    };

    if (!FormSection || !FormSwitchRow) {
      return React.createElement(
        View,
        { style: { flex: 1, padding: 16 } },
        React.createElement(
          Text,
          { style: { fontSize: 20, fontWeight: "bold" } },
          "VisualRoles"
        ),
        React.createElement(
          Text,
          { style: { marginTop: 8 } },
          "Componentes de configuração indisponíveis."
        ),
        React.createElement(
          Text,
          { style: { marginTop: 8 } },
          "A personalização dos cargos será adicionada em breve."
        )
      );
    }

    return React.createElement(
      components.ReactNative.ScrollView,
      { style: { flex: 1 } },
      React.createElement(
        FormSection,
        { title: "VisualRoles" },
        React.createElement(FormSwitchRow, {
          label: "Ativar VisualRoles",
          subLabel: "Ativa ou desativa as configurações visuais locais.",
          value: enabled,
          onValueChange: updateEnabled
        }),
        React.createElement(
          Text,
          { style: { paddingHorizontal: 16, paddingVertical: 12 } },
          "A seleção e personalização dos cargos serão adicionadas nas próximas versões."
        )
      )
    );
  }

  exports.default = {
    onLoad() {
      if (plugin.storage.enabled === undefined) {
        plugin.storage.enabled = true;
      }

      toasts.showToast("VisualRoles carregado!");
    },
    settings: Settings
  };

  Object.defineProperty(exports, "__esModule", { value: true });
})(
  {},
  vendetta.plugin,
  vendetta.ui.toasts,
  vendetta.metro,
  vendetta.metro.common,
  vendetta.ui.components
);
