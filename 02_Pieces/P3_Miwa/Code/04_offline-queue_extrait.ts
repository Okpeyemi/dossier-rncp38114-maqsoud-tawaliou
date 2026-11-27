// Extrait de apps/terminal/src/lib/offline-queue.ts
// Source : https://github.com/MiwaHQ/miwa-platform/blob/main/apps/terminal/src/lib/offline-queue.ts · relu le 26/11/2026
// Auteur du code : @VynoDePal (commit 1e56f72, PR #171 « conserve et rejoue les pointages hors ligne », 20/08/2026)
// Décision de conception prise avec le candidat. Extrait : les parties non essentielles sont omises (...).

export interface PendingScan {
  clientRequestId: string;   // identifiant unique : évite un double pointage au rejeu
  terminalId: string;
  kind: 'credential' | 'matricule';
  value: string;
  occurredAt: string;        // heure réelle du passage, conservée hors ligne
  createdAt: string;
  attempts: number;
  lastAttemptAt: string | null;
  status: 'pending' | 'failed';
  lastError: string | null;
}

export async function enqueueScan(input: EnqueueScanInput): Promise<PendingScan> {
  if ((input as { kind?: unknown }).kind !== 'credential') {
    throw new Error('Les saisies matricule restent volatiles et ne peuvent pas être mises en file');
  }
  const scan: PendingScan = {
    ...input,
    createdAt: new Date().toISOString(),
    attempts: 0,
    lastAttemptAt: null,
    status: 'pending',
    lastError: null,
  };
  await withDatabase((database) => database.add(STORE_NAME, scan));
  return scan;
}

export async function markScanFailed(clientRequestId: string, lastError: string): Promise<void> {
  // ... marque le pointage en échec (status: 'failed') et conserve le message d'erreur
}
