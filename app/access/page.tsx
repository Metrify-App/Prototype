'use client';

import { Users, Plus, CircleUser, Globe, Trash2 } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';

import accessData from '@/data/access.json';

export default function AccessPage() {
    const { users, external } = accessData;

    return (
        <div className="mx-auto max-w-5xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--border-light)] bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm">
                    <Users size={24} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Access Management</h1>
                    <p className="text-sm text-[var(--text-muted)] mt-1">Manage team members and external access to your platform</p>
                </div>
            </div>

            {/* Add User Section */}
            <Card className="mb-8 shadow-none border-[var(--border-light)] bg-[var(--bg-card)]">
                <CardHeader className="pb-4">
                    <CardTitle className="text-base font-bold text-[var(--text-primary)]">Add a access</CardTitle>
                    <CardDescription className="text-xs">Invite someone to join your workspace</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <Input
                                placeholder="Email Address"
                                type="email"
                                className="border-[var(--border-light)] bg-[var(--bg-primary)]/50 focus:bg-white transition-colors"
                            />
                        </div>
                        <div className="w-full md:w-48">
                            <Select defaultValue="View">
                                <SelectTrigger className="w-full border-[var(--border-light)] bg-[var(--bg-primary)]/50 focus:bg-white transition-colors">
                                    <SelectValue placeholder="Role" />
                                </SelectTrigger>
                                <SelectContent className="bg-[var(--bg-card)] border-[var(--border-light)]">
                                    <SelectItem value="Admin">Admin</SelectItem>
                                    <SelectItem value="Editor">Editor</SelectItem>
                                    <SelectItem value="View">View</SelectItem>
                                    <SelectItem value="External">External</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button className="bg-[var(--text-primary)] text-[var(--bg-card)] hover:opacity-90 transition-opacity">
                            <Plus
                                size={16}
                                className="mr-2"
                            />
                            Invite
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-8">
                {/* Internal Users Table */}
                <div>
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-[var(--text-primary)]">
                        <CircleUser
                            size={18}
                            className="text-[var(--text-muted)]"
                        />
                        Team Members
                    </h2>
                    <Card className="shadow-none border-[var(--border-light)] overflow-hidden bg-[var(--bg-card)]">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-[var(--border-light)] bg-[var(--bg-primary)]/30">
                                    <TableHead className="font-semibold text-[var(--text-primary)] py-4 pl-6">Account</TableHead>
                                    <TableHead className="font-semibold text-[var(--text-primary)]">Role</TableHead>
                                    <TableHead className="text-right font-semibold text-[var(--text-primary)] pr-6">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map(user => (
                                    <TableRow
                                        key={user.id}
                                        className="border-[var(--border-light)] hover:bg-[var(--bg-primary)]/20 transition-colors"
                                    >
                                        <TableCell className="py-4 pl-6">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-[var(--text-primary)] text-sm">{user.name}</span>
                                                <span className="text-[var(--text-muted)] text-xs">{user.email}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="w-32">
                                                <Select defaultValue={user.role}>
                                                    <SelectTrigger className="h-8 text-xs border-[var(--border-light)] bg-[var(--bg-primary)]/30">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-[var(--bg-card)] border-[var(--border-light)]">
                                                        <SelectItem value="Admin">Admin</SelectItem>
                                                        <SelectItem value="Editor">Editor</SelectItem>
                                                        <SelectItem value="View">View</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right pr-6">
                                            <Button
                                                variant="ghost"
                                                className="h-8 px-3 text-xs text-[var(--text-muted)] hover:text-[var(--color-red)] hover:bg-[var(--color-red-light)] transition-all"
                                            >
                                                <Trash2 size={14} />
                                                Remove
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </div>

                {/* External Accounts Section */}
                <div>
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-[var(--text-primary)]">
                        <Globe
                            size={18}
                            className="text-[var(--text-muted)]"
                        />
                        External Accounts
                    </h2>
                    <Card className="shadow-none border-[var(--border-light)] overflow-hidden bg-[var(--bg-card)]">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-[var(--border-light)] bg-[var(--bg-primary)]/30">
                                    <TableHead className="font-semibold text-[var(--text-primary)] py-4 pl-6">Account</TableHead>
                                    <TableHead className="font-semibold text-[var(--text-primary)]">Page Access</TableHead>
                                    <TableHead className="text-right font-semibold text-[var(--text-primary)] pr-6">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {external.map(account => (
                                    <TableRow
                                        key={account.id}
                                        className="border-[var(--border-light)] hover:bg-[var(--bg-primary)]/20 transition-colors"
                                    >
                                        <TableCell className="py-4 pl-6">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-[var(--text-primary)] text-sm">{account.name}</span>
                                                <span className="text-[var(--text-muted)] text-xs">{account.email}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap items-center gap-1.5 py-2">
                                                {account.pages.map(page => (
                                                    <span
                                                        key={page}
                                                        className="bg-[var(--bg-primary)] text-[var(--text-primary)] px-2.5 py-1 rounded-sm text-[10px] font-bold border border-[var(--border-light)] shadow-sm"
                                                    >
                                                        {page}
                                                    </span>
                                                ))}
                                                <button className="flex h-6 w-6 items-center justify-center rounded-md border border-dashed border-[var(--border-light)] text-[var(--text-muted)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)] transition-colors">
                                                    <Plus size={12} />
                                                </button>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right pr-6">
                                            <Button
                                                variant="ghost"
                                                className="h-8 px-3 text-xs text-[var(--text-muted)] hover:text-[var(--color-red)] hover:bg-[var(--color-red-light)] transition-all"
                                            >
                                                <Trash2 size={14} />
                                                Remove
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </div>
            </div>
        </div>
    );
}
