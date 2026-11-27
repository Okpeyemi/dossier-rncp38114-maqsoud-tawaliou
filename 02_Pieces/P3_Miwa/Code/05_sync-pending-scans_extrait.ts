// Extrait de apps/terminal/src/lib/sync-pending-scans.ts
// Source : https://github.com/MiwaHQ/miwa-platform/blob/main/apps/terminal/src/lib/sync-pending-scans.ts · relu le 26/11/2026
// Auteur du code : @VynoDePal (dernier commit d93a9bf). Extrait : les parties non essentielles sont omises (...).

function chronological(left: PendingScan, right: PendingScan): number {
  return (
    left.occurredAt.localeCompare(right.occurredAt) || left.createdAt.localeCompare(right.createdAt)
  );
}

// Erreur définitive (4xx hors 401/403) : le pointage est marqué en échec, on passe au suivant.
function isPermanent(error: unknown): error is TerminalApiError {
  return (
    error instanceof TerminalApiError &&
    error.status !== 401 && error.status !== 403 &&
    error.status >= 400 && error.status < 500
  );
}

// Erreur temporaire (réseau coupé, 5xx) : on arrête et on réessaiera au retour du réseau.
function isTemporary(error: unknown): boolean {
  return (
    error instanceof TerminalNetworkError ||
    (error instanceof TerminalApiError && error.status >= 500 && error.status < 600)
  );
}

export async function syncPendingScans(terminalId, sessionGeneration, sessionClient, dependencies) {
  const pendingScans = await dependencies.listPendingScans(terminalId);
  for (const scan of [...pendingScans].sort(chronological)) {   // rejeu dans l'ordre des passages
    if (!sessionClient.isCurrent(sessionGeneration)) break;
    await dependencies.recordScanAttempt(scan.clientRequestId);
    try {
      await transmit(scan, terminalId, sessionGeneration, sessionClient, dependencies);
    } catch (error) {
      if (error instanceof TerminalSessionChangedError) break;
      if (isPermanent(error)) { await dependencies.markScanFailed(scan.clientRequestId, error.message); continue; }
      if (isTemporary(error)) break;
      throw error;
    }
    await dependencies.deleteScan(scan.clientRequestId);          // supprimé de la file une fois envoyé
  }
  return dependencies.getQueueCounts(terminalId);
}
