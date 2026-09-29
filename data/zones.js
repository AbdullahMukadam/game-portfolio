

export const ZONES = [
  {
    id: 'guild',
    modal: 'modalGuild',
    icon: 'scroll',
    iconLabel: 'Scroll',
    name: 'Experience Guild',
    label: 'Experience Journal',
    anchor: { col: 30, row: 15 },
    trigger: { col: 29, row: 15, w: 3, h: 3 }
  },
  {
    id: 'skills',
    modal: 'modalSkills',
    icon: 'lightning',
    iconLabel: 'Lightning',
    name: 'Tech Skill Tree',
    label: 'Tech Skill Tree',
    anchor: { col: 18, row: 21 },
    trigger: { col: 17, row: 21, w: 3, h: 3 }
  },
  {
    id: 'projects',
    modal: 'modalProjects',
    icon: 'anvil',
    iconLabel: 'Anvil',
    name: 'Project Forge',
    label: 'Project Forge',
    anchor: { col: 52, row: 19 },
    trigger: { col: 51, row: 20, w: 3, h: 3 }
  },
  {
    id: 'vault',
    modal: 'modalVault',
    icon: 'chest',
    iconLabel: 'Chest',
    name: 'Equipment & Vault',
    label: 'Equipment & Vault',
    anchor: { col: 50, row: 32 },
    trigger: { col: 49, row: 32, w: 3, h: 3 }
  }
]

export const ZONE_BY_ID = Object.fromEntries(ZONES.map((zone) => [zone.id, zone]))
