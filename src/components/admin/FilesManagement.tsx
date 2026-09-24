import React, { useState } from 'react';
import { FileText, Download, Trash2, Filter, Search, CheckCircle } from 'lucide-react';
import { AdminGeneratedFile } from '../../types';
import { ConfirmModal } from './ConfirmModal';

export const FilesManagement: React.FC = () => {
  const [files, setFiles] = useState<AdminGeneratedFile[]>([
    {
      id: 'f1',
      name: 'Estudo_Bereshit_Pardes_Completo.pdf',
      userId: 'usr_1',
      userEmail: 'talmid@estudos.com',
      fileType: 'PDF_WITH_SLIDES',
      createdAt: new Date().toISOString(),
      sizeBytes: 1420000,
      status: 'PRONTO'
    },
    {
      id: 'f2',
      name: 'Resumo_Parasha_Reeh.pdf',
      userId: 'usr_2',
      userEmail: 'ana.silva@exemplo.com',
      fileType: 'PDF_WITHOUT_SLIDES',
      createdAt: new Date().toISOString(),
      sizeBytes: 650000,
      status: 'PRONTO'
    },
    {
      id: 'f3',
      name: 'Vocabulario_Hebraico_Facil.txt',
      userId: 'usr_3',
      userEmail: 'mateus.iaprojetos@gmail.com',
      fileType: 'TXT',
      createdAt: new Date().toISOString(),
      sizeBytes: 12000,
      status: 'PRONTO'
    }
  ]);

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    fileId: string;
    fileName: string;
  }>({
    isOpen: false,
    fileId: '',
    fileName: ''
  });

  const handleDelete = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
    setConfirmModal({ isOpen: false, fileId: '', fileName: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            Gerenciador de Arquivos Gerados
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Visualização e exclusão de documentos PDF, Apresentações de Slides e Arquivos TXT exportados pelos usuários.
          </p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Nome do Arquivo</th>
                <th className="p-4">Usuário</th>
                <th className="p-4">Tipo</th>
                <th className="p-4">Tamanho</th>
                <th className="p-4">Data</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300 font-medium">
              {files.map(f => (
                <tr key={f.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-4 font-bold text-white">{f.name}</td>
                  <td className="p-4 font-mono text-[11px] text-slate-400">{f.userEmail}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-bold text-[10px]">
                      {f.fileType}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400 font-mono">{Math.round(f.sizeBytes / 1024)} KB</td>
                  <td className="p-4 text-slate-400 font-mono">{new Date(f.createdAt).toLocaleDateString('pt-BR')}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setConfirmModal({ isOpen: true, fileId: f.id, fileName: f.name })}
                      className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title="Excluir Arquivo do Servidor"
        message={`Deseja excluir permanentemente o arquivo "${confirmModal.fileName}"?`}
        isDangerous={true}
        onConfirm={() => handleDelete(confirmModal.fileId)}
        onCancel={() => setConfirmModal({ isOpen: false, fileId: '', fileName: '' })}
      />
    </div>
  );
};
