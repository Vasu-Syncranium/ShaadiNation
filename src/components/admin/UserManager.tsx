'use client';

import { useState, useEffect } from 'react';
import { listUsers, createUser, deleteUser, isSuperAdmin, AdminUserInfo, UserRole } from '@/lib/auth';

interface UserManagerProps {
    onUserChange?: () => void;
}

export default function UserManager({ onUserChange }: UserManagerProps) {
    const [users, setUsers] = useState<AdminUserInfo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // New user form
    const [showForm, setShowForm] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newRole, setNewRole] = useState<UserRole>('editor');
    const [creating, setCreating] = useState(false);
    const [formError, setFormError] = useState('');

    const canManageUsers = isSuperAdmin();

    const loadUsers = async () => {
        setLoading(true);
        const result = await listUsers();
        if ('users' in result) {
            setUsers(result.users);
            setError('');
        } else {
            setError(result.error);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError('');
        setCreating(true);

        if (!newUsername.trim() || !newPassword.trim()) {
            setFormError('Username and password are required');
            setCreating(false);
            return;
        }

        if (newPassword.length < 6) {
            setFormError('Password must be at least 6 characters');
            setCreating(false);
            return;
        }

        const result = await createUser(newUsername, newPassword, newRole);

        if (result.success) {
            setNewUsername('');
            setNewPassword('');
            setNewRole('editor');
            setShowForm(false);
            loadUsers();
            onUserChange?.();
        } else {
            setFormError(result.error || 'Failed to create user');
        }
        setCreating(false);
    };

    const handleDeleteUser = async (username: string) => {
        if (!confirm(`Are you sure you want to delete user "${username}"?`)) {
            return;
        }

        const result = await deleteUser(username);
        if (result.success) {
            loadUsers();
            onUserChange?.();
        } else {
            alert(result.error || 'Failed to delete user');
        }
    };

    const getRoleBadgeStyle = (role: UserRole) => {
        const baseStyle = {
            padding: '0.25rem 0.5rem',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: 600,
        };

        switch (role) {
            case 'super-admin':
                return { ...baseStyle, background: 'var(--color-burgundy)', color: 'white' };
            case 'admin':
                return { ...baseStyle, background: 'var(--color-gold)', color: 'var(--color-charcoal)' };
            default:
                return { ...baseStyle, background: 'rgba(255,255,255,0.2)', color: 'var(--color-ivory)' };
        }
    };

    if (loading) {
        return <div className="loading-spinner"></div>;
    }

    if (error) {
        return (
            <div style={{ color: '#ff6b6b', textAlign: 'center', padding: 'var(--space-lg)' }}>
                {error}
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--space-lg)'
            }}>
                <p style={{ color: 'var(--color-ivory)', opacity: 0.7, margin: 0 }}>
                    {users.length} user{users.length !== 1 ? 's' : ''}
                </p>
                {canManageUsers && (
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="btn btn-gold"
                        style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                    >
                        {showForm ? 'Cancel' : '+ Add User'}
                    </button>
                )}
            </div>

            {/* Add User Form */}
            {showForm && canManageUsers && (
                <div style={{
                    background: 'rgba(255,255,255,0.05)',
                    padding: 'var(--space-lg)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: 'var(--space-lg)'
                }}>
                    <h4 style={{ color: 'var(--color-gold)', marginBottom: 'var(--space-md)' }}>
                        Create New User
                    </h4>
                    <form onSubmit={handleCreateUser}>
                        <div style={{ display: 'grid', gap: 'var(--space-md)' }}>
                            <div>
                                <label className="form-label" style={{ color: 'var(--color-ivory)' }}>
                                    Username
                                </label>
                                <input
                                    type="text"
                                    value={newUsername}
                                    onChange={(e) => setNewUsername(e.target.value)}
                                    placeholder="Enter username"
                                    className="form-input form-input-dark"
                                />
                            </div>
                            <div>
                                <label className="form-label" style={{ color: 'var(--color-ivory)' }}>
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter password (min 6 chars)"
                                    className="form-input form-input-dark"
                                />
                            </div>
                            <div>
                                <label className="form-label" style={{ color: 'var(--color-ivory)' }}>
                                    Role
                                </label>
                                <select
                                    value={newRole}
                                    onChange={(e) => setNewRole(e.target.value as UserRole)}
                                    className="form-input form-input-dark"
                                    style={{ cursor: 'pointer' }}
                                >
                                    <option value="editor">Editor - Can upload/delete images</option>
                                    <option value="admin">Admin - Can manage gallery</option>
                                    <option value="super-admin">Super Admin - Full access</option>
                                </select>
                            </div>
                        </div>

                        {formError && (
                            <p style={{ color: '#ff6b6b', fontSize: '0.875rem', marginTop: 'var(--space-sm)' }}>
                                {formError}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="btn btn-gold"
                            disabled={creating}
                            style={{ marginTop: 'var(--space-md)' }}
                        >
                            {creating ? 'Creating...' : 'Create User'}
                        </button>
                    </form>
                </div>
            )}

            {/* Users List */}
            <div style={{ display: 'grid', gap: 'var(--space-sm)' }}>
                {users.map((user) => (
                    <div
                        key={user.username}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: 'var(--space-md)',
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: 'var(--radius-md)'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: 'var(--color-gold)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--color-charcoal)',
                                fontWeight: 600
                            }}>
                                {user.username.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p style={{
                                    color: 'var(--color-ivory)',
                                    fontWeight: 500,
                                    margin: 0
                                }}>
                                    {user.username}
                                </p>
                                <p style={{
                                    color: 'var(--color-ivory)',
                                    opacity: 0.5,
                                    fontSize: '0.75rem',
                                    margin: 0
                                }}>
                                    Added {new Date(user.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                            <span style={getRoleBadgeStyle(user.role)}>
                                {user.role}
                            </span>
                            {canManageUsers && user.role !== 'super-admin' && (
                                <button
                                    onClick={() => handleDeleteUser(user.username)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: '#ff6b6b',
                                        cursor: 'pointer',
                                        padding: '0.25rem 0.5rem',
                                        fontSize: '0.875rem'
                                    }}
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {users.length === 0 && (
                <p style={{
                    textAlign: 'center',
                    color: 'var(--color-ivory)',
                    opacity: 0.5,
                    padding: 'var(--space-xl)'
                }}>
                    No users found. Create one to get started.
                </p>
            )}
        </div>
    );
}
