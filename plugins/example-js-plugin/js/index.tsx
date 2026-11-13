
import { Design } from '@revenge-mod/discord/design'

interface VisualRolesSettings {
    enabled: boolean
}

export default plugin<{ jsonStorage: VisualRolesSettings }>({
    jsonStorage: {
        load: true,
        default: {
            enabled: true,
        },
    },

    start({ logger }) {
        logger.log('VisualRoles iniciado!')
    },

    SettingsComponent({ api }) {
        const { TableRowGroup, TableSwitchRow } = Design
        const settings = api.jsonStorage.use()

        return (
            <TableRowGroup>
                <TableSwitchRow
                    label="Ativar VisualRoles"
                    value={settings?.enabled ?? true}
                    onValueChange={(enabled: boolean) =>
                        api.jsonStorage.set({ enabled })
                    }
                />
            </TableRowGroup>
        )
    },
})
