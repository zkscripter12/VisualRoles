
(function (exports, plugin, toasts, metro, common, components) {
  "use strict";

  const React = components.React;
  const {
    View,
    Text,
    TextInput,
    Pressable,
    ScrollView
  } = components.ReactNative;

  function initializeStorage() {
    if (!Array.isArray(plugin.storage.roles)) {
      plugin.storage.roles = [];
    }

    if (
      !plugin.storage.assignments ||
      typeof plugin.storage.assignments !== "object"
    ) {
      plugin.storage.assignments = {};
    }

    if (plugin.storage.enabled === undefined) {
      plugin.storage.enabled = true;
    }
  }

  function createRole(name, color) {
    const cleanName = name.trim();

    if (!cleanName) return false;

    const roles = plugin.storage.roles;

    if (
      roles.some(
        role => role.name.toLowerCase() === cleanName.toLowerCase()
      )
    ) {
      return false;
    }

    roles.push({
      id: Date.now().toString(36),
      name: cleanName,
      color: color || "#5865F2"
    });

    plugin.storage.roles = roles;
    return true;
  }

  function deleteRole(roleId) {
    plugin.storage.roles =
      plugin.storage.roles.filter(role => role.id !== roleId);

    const assignments = plugin.storage.assignments;

    Object.keys(assignments).forEach(userId => {
      assignments[userId] =
        assignments[userId].filter(id => id !== roleId);
    });

    plugin.storage.assignments = assignments;
  }

  function assignRole(userId, roleId) {
    if (!userId || !roleId) return;

    const assignments = plugin.storage.assignments;
    const current = assignments[userId] || [];

    if (!current.includes(roleId)) {
      assignments[userId] = [...current, roleId];
      plugin.storage.assignments = assignments;
    }
  }

  function removeRole(userId, roleId) {
    const assignments = plugin.storage.assignments;

    if (!assignments[userId]) return;

    assignments[userId] =
      assignments[userId].filter(id => id !== roleId);

    plugin.storage.assignments = assignments;
  }

  function Settings() {
    const [name, setName] = React.useState("");
    const [color, setColor] = React.useState("#5865F2");
    const [version, setVersion] = React.useState(0);
    const [enabled, setEnabled] = React.useState(
      plugin.storage.enabled
    );

    const refresh = () => setVersion(v => v + 1);

    const addRole = () => {
      if (createRole(name, color)) {
        setName("");
        refresh();
        toasts.showToast("Cargo visual criado!");
      } else {
        toasts.showToast("Nome vazio ou cargo já existente.");
      }
    };

    const styles = {
      container: {
        flex: 1,
        padding: 16
      },
      title: {
        fontSize: 23,
        fontWeight: "bold",
        marginBottom: 8
      },
      description: {
        fontSize: 14,
        opacity: 0.7,
        marginBottom: 18
      },
      input: {
        padding: 12,
        borderRadius: 9,
        backgroundColor: "#25262B",
        color: "#FFFFFF",
        marginBottom: 10
      },
      button: {
        backgroundColor: "#5865F2",
        padding: 13,
        borderRadius: 9,
        alignItems: "center",
        marginBottom: 18
      },
      buttonText: {
        color: "#FFFFFF",
        fontWeight: "bold"
      },
      role: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 13,
        backgroundColor: "#25262B",
        borderRadius: 9,
        marginBottom: 8
      }
    };

    const roles = plugin.storage.roles;

    return React.createElement(
      ScrollView,
      { style: { flex: 1 } },
      React.createElement(
        View,
        { style: styles.container },

        React.createElement(
          Text,
          { style: styles.title },
          "VisualRoles"
        ),

        React.createElement(
          Text,
          { style: styles.description },
          "Gerencie seus cargos exclusivamente visuais."
        ),

        React.createElement(
          Pressable,
          {
            onPress: () => {
              const next = !enabled;
              setEnabled(next);
              plugin.storage.enabled = next;
            },
            style: styles.role
          },
          React.createElement(
            Text,
            { style: { color: "#FFFFFF" } },
            "VisualRoles ativado"
          ),
          React.createElement(
            Text,
            { style: { color: enabled ? "#57D99B" : "#ED6464" } },
            enabled ? "SIM" : "NÃO"
          )
        ),

        React.createElement(
          Text,
          {
            style: {
              fontSize: 18,
              fontWeight: "bold",
              marginTop: 12,
              marginBottom: 12
            }
          },
          "Criar cargo visual"
        ),

        React.createElement(TextInput, {
          value: name,
          onChangeText: setName,
          placeholder: "Nome do cargo",
          placeholderTextColor: "#999999",
          style: styles.input
        }),

        React.createElement(TextInput, {
          value: color,
          onChangeText: setColor,
          placeholder: "#5865F2",
          placeholderTextColor: "#999999",
          style: styles.input,
          autoCapitalize: "none"
        }),

        React.createElement(
          Pressable,
          {
            onPress: addRole,
            style: styles.button
          },
          React.createElement(
            Text,
            { style: styles.buttonText },
            "Criar cargo"
          )
        ),

        React.createElement(
          Text,
          {
            style: {
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 12
            }
          },
          "Cargos criados (" + roles.length + ")"
        ),

        ...roles.map(role =>
          React.createElement(
            View,
            {
              key: role.id,
              style: styles.role
            },
            React.createElement(
              View,
              {
                style: {
                  flexDirection: "row",
                  alignItems: "center",
                  flex: 1
                }
              },
              React.createElement(View, {
                style: {
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: role.color,
                  marginRight: 10
                }
              }),
              React.createElement(
                Text,
                {
                  style: {
                    color: "#FFFFFF",
                    fontWeight: "600"
                  }
                },
                role.name
              )
            ),
            React.createElement(
              Pressable,
              {
                onPress: () => {
                  deleteRole(role.id);
                  refresh();
                  toasts.showToast("Cargo removido!");
                }
              },
              React.createElement(
                Text,
                { style: { color: "#ED6464" } },
                "Excluir"
              )
            )
          )
        )
      )
    );
  }

  exports.default = {
    onLoad() {
      initializeStorage();
      toasts.showToast("VisualRoles carregado!");
    },
    settings: Settings
  };

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

})(
  {},
  vendetta.plugin,
  vendetta.ui.toasts,
  vendetta.metro,
  vendetta.metro.common,
  vendetta.ui.components
);
