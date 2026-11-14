import React, { useMemo, useState } from 'react'
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native'

/** Local visual decoration only. No Discord role mutation APIs are used. */
export interface VisualRoleAssignment {
    guildId: string
    userId: string
    roleId: string
    roleName: string
    color: string
}

interface VisualRolesSettings {
    enabled: boolean
    assignments: VisualRoleAssignment[]
}

const DEFAULT_COLOR = '#5865F2'
const styles = {
    page: { padding: 16, gap: 12 } as const,
    heading: { color: '#fff', fontSize: 18, fontWeight: '700' as const },
    help: { color: '#aaa', fontSize: 12, lineHeight: 18 } as const,
    label: { color: '#ddd', fontSize: 13, marginBottom: 5 } as const,
    input: { color: '#fff', backgroundColor: '#25262b', borderRadius: 9, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14 } as const,
    button: { backgroundColor: '#5865F2', borderRadius: 9, padding: 12, alignItems: 'center' as const } as const,
    buttonText: { color: '#fff', fontWeight: '700' as const } as const,
    item: { backgroundColor: '#25262b', borderRadius: 9, padding: 12, gap: 5 } as const,
    itemTitle: { color: '#fff', fontWeight: '700' as const } as const,
    muted: { color: '#aaa', fontSize: 11 } as const,
    remove: { color: '#ff7777', fontWeight: '600' as const, paddingTop: 5 } as const,
    divider: { height: 1, backgroundColor: '#3a3b40', marginVertical: 4 } as const,
}

export default plugin<{ jsonStorage: VisualRolesSettings }>({
    jsonStorage: {
        load: true,
        default: { enabled: true, assignments: [] },
    },

    start({ logger }) {
        logger.log('VisualRoles carregado. As atribuições são locais e não alteram cargos reais.')
    },

    SettingsComponent({ api }) {
        const stored = api.jsonStorage.use()
        const settings = stored ?? { enabled: true, assignments: [] }
        const [guildId, setGuildId] = useState('')
        const [userId, setUserId] = useState('')
        const [roleId, setRoleId] = useState('')
        const [roleName, setRoleName] = useState('')
        const [color, setColor] = useState(DEFAULT_COLOR)
        const [error, setError] = useState('')

        const assignments = useMemo(() => settings.assignments ?? [], [settings.assignments])
        const persist = (next: VisualRolesSettings) => api.jsonStorage.set(next)

        const addAssignment = () => {
            const cleanGuild = guildId.trim()
            const cleanUser = userId.trim()
            const cleanRole = roleId.trim()
            const cleanName = roleName.trim()
            if (!cleanGuild || !cleanUser || !cleanRole || !cleanName) {
                setError('Preencha servidor, ID do membro, ID do cargo e nome do cargo.')
                return
            }
            if (!/^#[0-9a-fA-F]{6}$/.test(color.trim())) {
                setError('A cor deve estar no formato #RRGGBB, por exemplo #5865F2.')
                return
            }
            const nextAssignment = { guildId: cleanGuild, userId: cleanUser, roleId: cleanRole, roleName: cleanName, color: color.trim().toUpperCase() }
            const next = assignments.filter(item => !(item.guildId === cleanGuild && item.userId === cleanUser && item.roleId === cleanRole))
            persist({ enabled: settings.enabled ?? true, assignments: [...next, nextAssignment] })
            setRoleId('')
            setRoleName('')
            setError('')
        }

        const removeAssignment = (target: VisualRoleAssignment) => {
            persist({ enabled: settings.enabled ?? true, assignments: assignments.filter(item => !(item.guildId === target.guildId && item.userId === target.userId && item.roleId === target.roleId)) })
        }

        const field = (label: string, value: string, change: (value: string) => void, placeholder: string) => (
            <View>
                <Text style={styles.label}>{label}</Text>
                <TextInput value={value} onChangeText={change} placeholder={placeholder} placeholderTextColor="#777" autoCapitalize="none" autoCorrect={false} style={styles.input} />
            </View>
        )

        return (
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.page}>
                <Text style={styles.heading}>VisualRoles</Text>
                <Text style={styles.help}>Crie etiquetas de cargos personalizadas que ficam salvas somente neste aparelho. Isso não concede, remove nem modifica cargos ou permissões no Discord.</Text>
                <Pressable onPress={() => persist({ ...settings, enabled: !(settings.enabled ?? true), assignments })} style={[styles.button, { backgroundColor: settings.enabled === false ? '#555' : '#248046' }]}>
                    <Text style={styles.buttonText}>{settings.enabled === false ? 'Ativar VisualRoles' : 'VisualRoles ativado'}</Text>
                </Pressable>
                <View style={styles.divider} />
                <Text style={styles.heading}>Adicionar cargo visual</Text>
                {field('ID do servidor', guildId, setGuildId, 'ID do servidor (guild)')}
                {field('ID do membro', userId, setUserId, 'ID do usuário')}
                {field('ID do cargo existente', roleId, setRoleId, 'ID do cargo no servidor')}
                {field('Nome exibido', roleName, setRoleName, 'Ex.: Moderador')}
                {field('Cor (HEX)', color, setColor, '#5865F2')}
                {!!error && <Text style={{ color: '#ff7777', fontSize: 12 }}>{error}</Text>}
                <Pressable onPress={addAssignment} style={styles.button}><Text style={styles.buttonText}>Salvar atribuição visual</Text></Pressable>
                <View style={styles.divider} />
                <Text style={styles.heading}>Cargos visuais salvos ({assignments.length})</Text>
                {assignments.length === 0 ? <Text style={styles.help}>Nenhuma atribuição criada ainda.</Text> : assignments.map(item => (
                    <View key={`${item.guildId}:${item.userId}:${item.roleId}`} style={styles.item}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: item.color }} />
                            <Text style={styles.itemTitle}>{item.roleName}</Text>
                        </View>
                        <Text style={styles.muted}>Servidor: {item.guildId}</Text>
                        <Text style={styles.muted}>Membro: {item.userId}</Text>
                        <Text style={styles.muted}>Cargo: {item.roleId}</Text>
                        <Pressable onPress={() => removeAssignment(item)}><Text style={styles.remove}>Remover atribuição local</Text></Pressable>
                    </View>
                ))}
                <Text style={styles.help}>Nota: esta versão já permite cadastrar e gerenciar as atribuições locais. A exibição automática na lista lateral e no perfil ainda precisa dos pontos de integração React específicos do build do Discord/Revenge; não foi ativada nesta versão para evitar quebrar a interface.</Text>
            </ScrollView>
        )
    },
})
