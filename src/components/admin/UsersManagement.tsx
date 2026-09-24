import React, { useState, useEffect } from 'react';
import {
  Users, Search, Filter, Shield, UserCheck, UserX, Trash2, Edit3, Eye,
  AlertTriangle, Check, X, ShieldAlert, Award, BookOpen, Flame, Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserProfile, UserRole } from '../../types';
import { ConfirmModal } from './ConfirmModal';
import { db, collection, getDocs } from '../../lib/firebase';

export const UsersManagement: React.FC = () => {
  const { user: currentUser, isSuperAdmin, isAdmin, updateUserRole, toggleUserStatus, deleteUserAccount } = useAuth();
  const [usersList, setUsersList] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);

  // Confirmation Modal state
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    isDangerous?: boolean;
    requireDoubleConfirm?: boolean;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {}
  });

  const loadUsers = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'users'));
      const list: UserProfile[] = [];
      snap.forEach(docSnap => {
        list.push({ ...docSnap.data(), id: docSnap.id } as UserProfile);
      });

      // Include current user or super admin fallback if collection empty
      if (list.length === 0 && currentUser) {
        list.push(currentUser);
      }
      setUsersList(list);
    } catch (e) {
      console.warn('Error fetching users from Firestore:', e);
      // Fallback local users
      if (currentUser) {
        setUsersList([
          currentUser,
          {
            id: 'usr_2',
            name: 'Ana Silva',
            email: 'ana.silva@exemplo.com',
            role: 'USER',
            isActive: true,
            createdAt: new Date().toISOString(),
            receiveEmailNotifications: true,
            notificationPreferences: currentUser.notificationPreferences,
            progress: {
              hebrewLettersLearned: ['א', 'ב', 'ג'],
              hebrewWordsLearned: ['w1'],
              completedLessons: ['l1'],
              completedQuizzes: [],
              parashotStudied: ['p1'],
              studyStreakDays: 3,
              totalMinutesStudied: 90
            }
          },
          {
            id: 'usr_3',
            name: 'Carlos Oliveira (Editor)',
            email: 'carlos.editor@exemplo.com',
            role: 'EDITOR',
            isActive: true,
            createdAt: new Date().toISOString(),
            receiveEmailNotifications: true,
            notificationPreferences: currentUser.notificationPreferences,
            progress: currentUser.progress
          }
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRoleChange = async (targetUser: UserProfile, newRole: UserRole) => {
    if (targetUser.role === 'SUPER_ADMIN' && !isSuperAdmin) {
      alert('Apenas o SUPER_ADMIN pode alterar o cargo de outro SUPER_ADMIN.');
      return;
    }

    if (newRole === 'SUPER_ADMIN' && !isSuperAdmin) {
      alert('Apenas o SUPER_ADMIN pode atribuir a função de SUPER_ADMIN.');
      return;
    }

    setConfirmModal({
      isOpen: true,
      title: 'Alterar Cargo do Usuário',
      message: `Tem certeza que deseja alterar o cargo de "${targetUser.name}" de ${targetUser.role} para ${newRole}?`,
      isDangerous: newRole === 'ADMIN' || newRole === 'SUPER_ADMIN',
      requireDoubleConfirm: newRole === 'SUPER_ADMIN',
      onConfirm: async () => {
        const ok = await updateUserRole(targetUser.id, newRole);
        if (ok) {
          setUsersList(prev => prev.map(u => u.id === targetUser.id ? { ...u, role: newRole } : u));
        }
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleToggleStatus = async (targetUser: UserProfile) => {
    const newStatus = !targetUser.isActive;
    setConfirmModal({
      isOpen: true,
      title: `${newStatus ? 'Ativar' : 'Desativar'} Conta de Usuário`,
      message: `Deseja ${newStatus ? 'ativar' : 'desativar'} o acesso de "${targetUser.name}" à plataforma?`,
      isDangerous: !newStatus,
      onConfirm: async () => {
        const ok = await toggleUserStatus(targetUser.id, newStatus);
        if (ok) {
          setUsersList(prev => prev.map(u => u.id === targetUser.id ? { ...u, isActive: newStatus } : u));
        }
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleDeleteUser = async (targetUser: UserProfile) => {
    if (!isSuperAdmin) {
      alert('Apenas o SUPER_ADMIN pode excluir usuários permanentemente.');
      return;
    }

    if ((targetUser?.email?.toLowerCase() || '') === 'mateus.iaprojetos@gmail.com') {
      alert('Não é possível excluir o Administrador Principal do sistema.');
      return;
    }

    setConfirmModal({
      isOpen: true,
      title: 'Excluir Conta Permanentemente',
      message: `ATENÇÃO: A exclusão do usuário "${targetUser.name}" (${targetUser.email}) é irreversível. Todos os dados de progresso e estudos associados serão removidos.`,
      isDangerous: true,
      requireDoubleConfirm: true,
      onConfirm: async () => {
        const ok = await deleteUserAccount(targetUser.id);
        if (ok) {
          setUsersList(prev => prev.filter(u => u.id !== targetUser.id));
        }
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const filteredUsers = usersList.filter(u => {
    const matchesSearch = (u.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || (u.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-700/60 text-blue-400 text-xs font-semibold">
            <Shield className="w-3.5 h-3.5" />
            <span>Controle de Permissões RBAC</span>
          </div>
          <h2 className="text-xl font-bold text-white">Gerenciamento de Usuários</h2>
          <p className="text-xs text-slate-400">
            Administre perfis, cargos e status de acesso dos alunos da Talmidim Academy.
          </p>
        </div>

        {/* Roles Legend */}
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">USER</span>
          <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">EDITOR</span>
          <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">ADMIN</span>
          <span className="px-2.5 py-1 rounded-lg bg-blue-600/30 text-blue-300 border border-blue-500/40 font-bold">SUPER_ADMIN</span>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar por nome ou e-mail..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full md:w-auto bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">Todas as Roles</option>
            <option value="USER">Apenas Usuários (USER)</option>
            <option value="EDITOR">Editores (EDITOR)</option>
            <option value="ADMIN">Administradores (ADMIN)</option>
            <option value="SUPER_ADMIN">Super Administradores (SUPER_ADMIN)</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Usuário / E-mail</th>
                <th className="p-4">Role Atual</th>
                <th className="p-4">Status</th>
                <th className="p-4">Data de Cadastro</th>
                <th className="p-4 text-center">Progresso</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300 font-medium">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    Carregando usuários cadastrados...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    Nenhum usuário encontrado com os filtros aplicados.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const isMainAdmin = (u.email || '').toLowerCase() === 'mateus.iaprojetos@gmail.com';
                  return (
                    <tr key={u.id} className="hover:bg-slate-800/40 transition">
                      
                      {/* Name and Email */}
                      <td className="p-4">
                        <div className="font-bold text-white flex items-center gap-2">
                          <span>{u.name}</span>
                          {isMainAdmin && (
                            <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] border border-blue-500/40 font-black">
                              PROPRIETÁRIO
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">{u.email}</div>
                      </td>

                      {/* Role Selector */}
                      <td className="p-4">
                        <select
                          value={u.role || 'USER'}
                          onChange={(e) => handleRoleChange(u, e.target.value as UserRole)}
                          disabled={isMainAdmin || (!isSuperAdmin && u.role === 'SUPER_ADMIN')}
                          className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-blue-500 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          <option value="USER">USER</option>
                          <option value="EDITOR">EDITOR</option>
                          <option value="ADMIN">ADMIN</option>
                          <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                        </select>
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                          u.isActive !== false
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}>
                          {u.isActive !== false ? <UserCheck className="w-3 h-3" /> : <UserX className="w-3 h-3" />}
                          {u.isActive !== false ? 'Ativo' : 'Desativado'}
                        </span>
                      </td>

                      {/* Creation Date */}
                      <td className="p-4 text-slate-400 font-mono text-[11px]">
                        {new Date(u.createdAt).toLocaleDateString('pt-BR')}
                      </td>

                      {/* Progress summary */}
                      <td className="p-4 text-center">
                        <button
                          onClick={() => setSelectedUser(u)}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400 border border-slate-700 text-[11px] font-semibold transition"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Ver Progresso</span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleToggleStatus(u)}
                            disabled={isMainAdmin}
                            title={u.isActive !== false ? 'Desativar usuário' : 'Ativar usuário'}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition disabled:opacity-40"
                          >
                            {u.isActive !== false ? <UserX className="w-4 h-4 text-amber-400" /> : <UserCheck className="w-4 h-4 text-emerald-400" />}
                          </button>

                          {isSuperAdmin && (
                            <button
                              onClick={() => handleDeleteUser(u)}
                              disabled={isMainAdmin}
                              title="Excluir usuário permanentemente"
                              className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition disabled:opacity-40"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Progress Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-lg w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5 text-slate-100">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-lg border border-blue-500/30">
                {(selectedUser.name || selectedUser.email || 'U').charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{selectedUser.name}</h3>
                <p className="text-xs text-slate-400">{selectedUser.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-blue-400 font-semibold">
                  <Flame className="w-4 h-4" /> Sequência de Estudos
                </div>
                <div className="text-lg font-bold text-white">{selectedUser.progress?.studyStreakDays || 0} dias</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-blue-400 font-semibold">
                  <Clock className="w-4 h-4" /> Minutos Dedicados
                </div>
                <div className="text-lg font-bold text-white">{selectedUser.progress?.totalMinutesStudied || 0} min</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <Award className="w-4 h-4" /> Letras Hebraicas
                </div>
                <div className="text-lg font-bold text-white">{selectedUser.progress?.hebrewLettersLearned?.length || 0} aprendidas</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-purple-400 font-semibold">
                  <BookOpen className="w-4 h-4" /> Parashot Estudadas
                </div>
                <div className="text-lg font-bold text-white">{selectedUser.progress?.parashotStudied?.length || 0} concluídas</div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition"
              >
                Fechar Visualização
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal Component */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        isDangerous={confirmModal.isDangerous}
        requireDoubleConfirmation={confirmModal.requireDoubleConfirm}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};
