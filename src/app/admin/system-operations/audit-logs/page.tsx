'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { Loader2, History, User, Tag, Clock } from 'lucide-react';

interface AuditLog {
  id: string;
  action: string;
  targetUid?: string;
  changedBy: string;
  reason?: string;
  oldPoints?: number;
  newPoints?: number;
  oldTier?: string;
  newTier?: string;
  timestamp: string;
}

export default function AdminAuditLogsPage() {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAuditLogs() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/admin/audit-logs');
        if (!response.ok) {
            throw new Error('Failed to fetch audit logs');
        }
        const logs = await response.json();
        setAuditLogs(logs);
      } catch (err: any) {
        console.error('Error fetching audit logs:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAuditLogs();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-black text-brand-dark mb-6 uppercase tracking-tighter italic">Admin Audit Logs</h1>

      <Card className="bg-white rounded-lg shadow-md mb-6">
        <CardHeader>
          <CardTitle className="text-2xl font-black text-brand-dark uppercase tracking-tight">Recent Actions</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center p-6">
              <Loader2 className="h-8 w-8 animate-spin text-brand-red" />
              <span className="ml-3 text-gray-400 font-black uppercase tracking-widest text-xs">Loading audit logs...</span>
            </div>
          ) : error ? (
            <div className="p-6 text-red-600">
              <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Error: {error}</p>
            </div>
          ) : auditLogs.length === 0 ? (
            <p className="text-gray-400 font-black uppercase tracking-widest text-xs">No audit logs found.</p>
          ) : (
            <div className="space-y-4">
              {auditLogs.map((log) => (
                <div key={log.id} className="border p-4 rounded-lg bg-gray-50">
                  <p className="font-black text-brand-dark flex items-center gap-2"><History className="w-4 h-4 text-gray-500" />{log.action} <span className="text-xs text-gray-500 uppercase tracking-widest">(By: {log.changedBy})</span></p>
                  {log.targetUid && <p className="text-xs text-gray-700 flex items-center gap-2"><User className="w-4 h-4 text-gray-500" />Target User ID: <span className="font-bold text-brand-red">{log.targetUid}</span></p>}
                  {log.reason && <p className="text-xs text-gray-700 flex items-center gap-2"><Tag className="w-4 h-4 text-gray-500" />Reason: {log.reason}</p>}
                  {(log.oldPoints !== undefined || log.newPoints !== undefined) && 
                    <p className="text-xs text-gray-700">Points: <span className="font-black text-brand-red">{log.oldPoints}</span> -&gt; <span className="font-black text-brand-red">{log.newPoints}</span></p>}
                  {(log.oldTier || log.newTier) && 
                    <p className="text-xs text-gray-700">Tier: <span className="font-black uppercase tracking-widest text-brand-red">{log.oldTier || 'N/A'}</span> -&gt; <span className="font-black uppercase tracking-widest text-brand-red">{log.newTier || 'N/A'}</span></p>}
                  <p className="text-xs text-gray-500 flex items-center gap-2"><Clock className="w-4 h-4 text-gray-500" />Timestamp: {log.timestamp}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
