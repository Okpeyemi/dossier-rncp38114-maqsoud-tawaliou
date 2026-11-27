// Extrait de apps/api/src/audit/audit.service.ts (zone backend de @VynoDePal, cf. OWNERSHIP)
// Source : https://github.com/MiwaHQ/miwa-platform/blob/main/apps/api/src/audit/audit.service.ts · relu le 26/11/2026

/**
 * Écrit une entrée d'audit. À appeler DANS la transaction de la mutation
 * (atomicité : pas de mutation sans trace). L'acteur (userId/organizationId)
 * est repris du contexte de requête s'il n'est pas fourni explicitement.
 */
async record(client: DbClient, entry: AuditEntry): Promise<void> {
  const ctx = this.context.get();
  await client.auditLog.create({
    data: {
      action: entry.action, entityType: entry.entityType, entityId: entry.entityId ?? null,
      organizationId: entry.organizationId ?? ctx.organizationId ?? null,
      userId: entry.userId ?? ctx.userId ?? null, metadata: entry.metadata,
    },
  });
}
