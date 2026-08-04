"use client";

import { useState } from "react";
import { Project, ProjectCategory } from "@/data/projects";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createProject, deleteProject } from "@/actions/projects";

export default function ProjectsClient({ initialProjects }: { initialProjects: Project[] }) {
  const [loading, setLoading] = useState(false);

  // Form state for creating a new project
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<ProjectCategory>("Software");
  const [newShortDesc, setNewShortDesc] = useState("");
  const [newFullDesc, setNewFullDesc] = useState("");
  const [newTechs, setNewTechs] = useState("");
  const [newOutcomes, setNewOutcomes] = useState("");
  const [newStatus, setNewStatus] = useState("Completed");
  const [newUrl, setNewUrl] = useState("");

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    setLoading(true);
    try {
      await deleteProject(id);
    } catch (error) {
      alert("Failed to delete project");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const id = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const project = {
      id,
      title: newTitle,
      category: newCategory,
      shortDescription: newShortDesc,
      fullDescription: newFullDesc,
      imageUrl: "/images/placeholder.webp",
      technologies: newTechs.split(',').map(t => t.trim()).filter(Boolean),
      keyOutcomes: newOutcomes.split(',').map(o => o.trim()).filter(Boolean),
      status: newStatus,
      url: newUrl,
    };
    
    try {
      await createProject(project);
      setNewTitle("");
      setNewShortDesc("");
      setNewFullDesc("");
      setNewTechs("");
      setNewOutcomes("");
      setNewUrl("");
    } catch (error) {
      alert("Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-24">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-heading font-extrabold text-text-primary">Manage Projects</h1>
      </div>
      
      <div className="bg-base p-8 rounded-[2rem] shadow-neu mb-12 relative overflow-hidden">
        <h2 className="text-2xl font-heading font-bold text-text-primary mb-6 flex items-center gap-3">
          <div className="w-8 h-[2px] bg-accent/50"></div>
          Add New Project
        </h2>
        <form onSubmit={handleCreate} className="space-y-6 max-w-2xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Title</label>
              <Input 
                value={newTitle} 
                onChange={e => setNewTitle(e.target.value)} 
                required 
                className="bg-base shadow-neu-inset border-none focus:ring-2 focus:ring-accent transition-all text-text-primary placeholder:text-text-secondary/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Category</label>
              <select 
                value={newCategory} 
                onChange={e => setNewCategory(e.target.value as ProjectCategory)}
                className="w-full bg-base shadow-neu-inset border-none rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              >
                <option value="AI">AI</option>
                <option value="Automation">Automation</option>
                <option value="Software">Software</option>
                <option value="IoT">IoT</option>
                <option value="Final Year">Final Year</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Short Description</label>
            <Input 
              value={newShortDesc} 
              onChange={e => setNewShortDesc(e.target.value)} 
              required 
              className="bg-base shadow-neu-inset border-none focus:ring-2 focus:ring-accent transition-all text-text-primary placeholder:text-text-secondary/50"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Overview (Full Description)</label>
            <textarea 
              value={newFullDesc} 
              onChange={e => setNewFullDesc(e.target.value)} 
              required 
              rows={4}
              className="w-full bg-base shadow-neu-inset border-none rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Technologies (comma separated)</label>
              <Input 
                value={newTechs} 
                onChange={e => setNewTechs(e.target.value)} 
                required 
                placeholder="e.g. Next.js, TailwindCSS"
                className="bg-base shadow-neu-inset border-none focus:ring-2 focus:ring-accent transition-all text-text-primary placeholder:text-text-secondary/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Key Outcomes (comma separated)</label>
              <Input 
                value={newOutcomes} 
                onChange={e => setNewOutcomes(e.target.value)} 
                required 
                placeholder="e.g. Deployed to prod, Saved 20% time"
                className="bg-base shadow-neu-inset border-none focus:ring-2 focus:ring-accent transition-all text-text-primary placeholder:text-text-secondary/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Status</label>
              <select 
                value={newStatus} 
                onChange={e => setNewStatus(e.target.value)}
                className="w-full bg-base shadow-neu-inset border-none rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              >
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Planned">Planned</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Live URL (optional)</label>
              <Input 
                value={newUrl} 
                onChange={e => setNewUrl(e.target.value)} 
                placeholder="https://"
                className="bg-base shadow-neu-inset border-none focus:ring-2 focus:ring-accent transition-all text-text-primary placeholder:text-text-secondary/50"
              />
            </div>
          </div>

          <div className="pt-4">
            <Button type="submit" disabled={loading} className="shadow-neu hover:shadow-neu-inset w-full sm:w-auto px-8 py-3 text-accent font-bold bg-base transition-all">
              {loading ? "Saving..." : "Create Project"}
            </Button>
          </div>
        </form>
      </div>

      <div className="bg-base rounded-[2rem] shadow-neu overflow-hidden relative">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black/5 border-b border-black/5">
              <th className="p-6 text-sm font-bold uppercase tracking-wider text-text-secondary">Title</th>
              <th className="p-6 text-sm font-bold uppercase tracking-wider text-text-secondary">Category</th>
              <th className="p-6 text-sm font-bold uppercase tracking-wider text-text-secondary text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {initialProjects.length === 0 ? (
              <tr><td colSpan={3} className="p-12 text-center text-text-secondary">No projects found.</td></tr>
            ) : (
              initialProjects.map(p => (
                <tr key={p.id} className="hover:bg-black/5 transition-colors group">
                  <td className="p-6 text-text-primary font-medium">{p.title}</td>
                  <td className="p-6">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold text-accent bg-base shadow-neu-inset">
                      {p.category}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <button 
                      onClick={() => handleDelete(p.id)}
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
