"use client";

import { useState } from "react";
import { TeamMember } from "@/data/team";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createTeamMember, deleteTeamMember, updateTeamMember, updateTeamOrder } from "@/actions/team";
import { ChevronUp, ChevronDown } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function TeamClient({ initialTeam }: { initialTeam: TeamMember[] }) {
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const supabase = createClient();

  // Form state
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newPhotoFile, setNewPhotoFile] = useState<File | null>(null);
  const [newSpeciality, setNewSpeciality] = useState("");

  const handleEdit = (member: TeamMember) => {
    setEditingId(member.id);
    setNewName(member.name);
    setNewRole(member.role);
    setNewSpeciality(member.speciality);
    setNewPhotoFile(null); // Keep existing unless user uploads new
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewName("");
    setNewRole("");
    setNewSpeciality("");
    setNewPhotoFile(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;
    setLoading(true);
    try {
      await deleteTeamMember(id);
      if (editingId === id) handleCancelEdit();
    } catch (error) {
      alert("Failed to delete team member");
    } finally {
      setLoading(false);
    }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === initialTeam.length - 1) return;

    const newTeam = [...initialTeam];
    const item = newTeam[index];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    const swapItem = newTeam[swapIndex];

    setLoading(true);
    try {
      await updateTeamOrder([
        { id: item.id, display_order: swapItem.display_order ?? swapIndex },
        { id: swapItem.id, display_order: item.display_order ?? index }
      ]);
    } catch (error) {
      alert("Failed to update order");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let uploadedPhotoUrl = editingId ? initialTeam.find(m => m.id === editingId)?.imageUrl || null : null;
      
      if (newPhotoFile) {
        const fileExt = newPhotoFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `team/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('assets')
          .upload(filePath, newPhotoFile);
          
        if (uploadError) throw uploadError;
        
        const { data: publicUrlData } = supabase.storage
          .from('assets')
          .getPublicUrl(filePath);
          
        uploadedPhotoUrl = publicUrlData.publicUrl;
      }

      const member = {
        name: newName,
        role: newRole,
        speciality: newSpeciality,
        display_order: initialTeam.length, // Put at the end by default
        imageUrl: uploadedPhotoUrl
      };
      
      if (editingId) {
        await updateTeamMember(editingId, member);
      } else {
        await createTeamMember(member);
      }
      
      handleCancelEdit();
    } catch (error: any) {
      alert("Failed to save team member: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-24">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-heading font-extrabold text-text-primary">Manage Team</h1>
      </div>
      
      <div className="bg-base p-8 rounded-[2rem] shadow-neu mb-12 relative overflow-hidden">
        <h2 className="text-2xl font-heading font-bold text-text-primary mb-6 flex items-center gap-3">
          <div className="w-8 h-[2px] bg-accent/50"></div>
          {editingId ? "Edit Team Member" : "Add Team Member"}
        </h2>
        <form onSubmit={handleCreateOrUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl relative z-10">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Name</label>
            <Input 
              value={newName} 
              onChange={e => setNewName(e.target.value)} 
              required 
              className="bg-base shadow-neu-inset border-none focus:ring-2 focus:ring-accent transition-all text-text-primary placeholder:text-text-secondary/50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Role</label>
            <Input 
              value={newRole} 
              onChange={e => setNewRole(e.target.value)} 
              required 
              className="bg-base shadow-neu-inset border-none focus:ring-2 focus:ring-accent transition-all text-text-primary placeholder:text-text-secondary/50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Speciality</label>
            <Input 
              value={newSpeciality} 
              onChange={e => setNewSpeciality(e.target.value)} 
              required 
              className="bg-base shadow-neu-inset border-none focus:ring-2 focus:ring-accent transition-all text-text-primary placeholder:text-text-secondary/50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Photo (Optional)</label>
            <Input 
              type="file"
              accept="image/*"
              onChange={e => setNewPhotoFile(e.target.files?.[0] || null)} 
              className="bg-base shadow-neu-inset border-none focus:ring-2 focus:ring-accent transition-all text-text-primary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent/10 file:text-accent hover:file:bg-accent/20"
            />
            {editingId && !newPhotoFile && (
              <p className="text-xs text-text-secondary">Leave blank to keep existing photo</p>
            )}
          </div>
          <div className="md:col-span-2 pt-4 flex gap-4">
            <Button type="submit" disabled={loading} className="shadow-neu hover:shadow-neu-inset w-full sm:w-auto px-8 py-3 text-accent font-bold bg-base transition-all">
              {loading ? "Saving..." : editingId ? "Update Member" : "Add Member"}
            </Button>
            {editingId && (
              <Button type="button" onClick={handleCancelEdit} variant="outline" className="shadow-neu hover:shadow-neu-inset w-full sm:w-auto px-8 py-3">
                Cancel
              </Button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-base rounded-[2rem] shadow-neu overflow-hidden relative">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black/5 border-b border-black/5">
              <th className="p-6 text-sm font-bold uppercase tracking-wider text-text-secondary">Name</th>
              <th className="p-6 text-sm font-bold uppercase tracking-wider text-text-secondary">Role</th>
              <th className="p-6 text-sm font-bold uppercase tracking-wider text-text-secondary">Speciality</th>
              <th className="p-6 text-sm font-bold uppercase tracking-wider text-text-secondary">Order</th>
              <th className="p-6 text-sm font-bold uppercase tracking-wider text-text-secondary text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {initialTeam.length === 0 ? (
              <tr><td colSpan={5} className="p-12 text-center text-text-secondary">No team members found.</td></tr>
            ) : (
              initialTeam.map((m, idx) => (
                <tr key={m.id} className="hover:bg-black/5 transition-colors group">
                  <td className="p-6 text-text-primary font-medium flex items-center gap-4">
                    {m.imageUrl ? (
                      <img src={m.imageUrl} alt={m.name} className="w-10 h-10 rounded-full shadow-neu-inset object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full shadow-neu-inset bg-base text-accent flex items-center justify-center text-sm font-bold">
                        ?
                      </div>
                    )}
                    {m.name}
                  </td>
                  <td className="p-6 text-text-secondary">{m.role}</td>
                  <td className="p-6">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold text-accent bg-base shadow-neu-inset">
                      {m.speciality}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-col items-center justify-center gap-1">
                      <button 
                        onClick={() => handleMove(idx, 'up')}
                        disabled={loading || idx === 0}
                        className="p-1 rounded-md hover:bg-black/5 text-text-secondary disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move Up"
                      >
                        <ChevronUp size={16} />
                      </button>
                      <button 
                        onClick={() => handleMove(idx, 'down')}
                        disabled={loading || idx === initialTeam.length - 1}
                        className="p-1 rounded-md hover:bg-black/5 text-text-secondary disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move Down"
                      >
                        <ChevronDown size={16} />
                      </button>
                    </div>
                  </td>
                  <td className="p-6 text-right space-x-2">
                    <button 
                      onClick={() => handleEdit(m)}
                      disabled={loading}
                      className="text-accent hover:text-accent-cyan font-bold px-4 py-2 rounded-xl bg-base shadow-neu hover:shadow-neu-inset transition-all disabled:opacity-50"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(m.id)}
                      disabled={loading}
                      className="text-red-500 hover:text-red-600 font-bold px-4 py-2 rounded-xl bg-base shadow-neu hover:shadow-neu-inset transition-all disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
