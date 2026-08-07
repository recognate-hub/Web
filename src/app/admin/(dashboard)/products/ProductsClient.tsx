"use client";

import { useState } from "react";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createProduct, deleteProduct, updateProduct } from "@/actions/products";
import { createClient } from "@/utils/supabase/client";

export default function ProductsClient({ initialProducts }: { initialProducts: Product[] }) {
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const supabase = createClient();

  // Form state
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newLogoFile, setNewLogoFile] = useState<File | null>(null);
  const [newDownloadUrl, setNewDownloadUrl] = useState("");

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setNewName(product.name);
    setNewDesc(product.description);
    setNewDownloadUrl(product.downloadUrl || "");
    setNewLogoFile(null); // Keep existing unless user uploads new
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewName("");
    setNewDesc("");
    setNewDownloadUrl("");
    setNewLogoFile(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setLoading(true);
    try {
      await deleteProduct(id);
      if (editingId === id) handleCancelEdit();
    } catch (error) {
      alert("Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let uploadedLogoUrl = editingId ? initialProducts.find(p => p.id === editingId)?.logoUrl || null : null;
      
      if (newLogoFile) {
        const fileExt = newLogoFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `logos/${fileName}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from('assets')
          .upload(filePath, newLogoFile);
          
        if (uploadError) {
          throw uploadError;
        }
        
        const { data: publicUrlData } = supabase.storage
          .from('assets')
          .getPublicUrl(filePath);
          
        uploadedLogoUrl = publicUrlData.publicUrl;
      }
      
      const productData = {
        name: newName,
        description: newDesc,
        priceTag: "",
        imageUrl: "/images/placeholder.webp",
        features: [],
        logoUrl: uploadedLogoUrl || null,
        downloadUrl: newDownloadUrl || null,
      };
      
      if (editingId) {
        await updateProduct(editingId, productData);
      } else {
        const id = newName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        await createProduct({ id, ...productData });
      }
      
      handleCancelEdit();
    } catch (error: any) {
      alert("Failed to save product: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-24">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-heading font-extrabold text-text-primary">Manage Products</h1>
      </div>
      
      <div className="bg-base p-8 rounded-[2rem] shadow-neu mb-12 relative overflow-hidden">
        <h2 className="text-2xl font-heading font-bold text-text-primary mb-6 flex items-center gap-3">
          <div className="w-8 h-[2px] bg-accent/50"></div>
          {editingId ? "Edit Product" : "Add New Product"}
        </h2>
        <form onSubmit={handleCreateOrUpdate} className="space-y-6 max-w-2xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Name</label>
              <Input 
                value={newName} 
                onChange={e => setNewName(e.target.value)} 
                required 
                className="bg-base shadow-neu-inset border-none focus:ring-2 focus:ring-accent transition-all text-text-primary placeholder:text-text-secondary/50"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Description</label>
            <Input 
              value={newDesc} 
              onChange={e => setNewDesc(e.target.value)} 
              required 
              className="bg-base shadow-neu-inset border-none focus:ring-2 focus:ring-accent transition-all text-text-primary placeholder:text-text-secondary/50"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Logo Image (Optional)</label>
              <Input 
                type="file"
                accept="image/*"
                onChange={e => setNewLogoFile(e.target.files?.[0] || null)} 
                className="bg-base shadow-neu-inset border-none focus:ring-2 focus:ring-accent transition-all text-text-primary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent/10 file:text-accent hover:file:bg-accent/20"
              />
              <p className="text-xs text-text-secondary/60 font-medium">Recommended size: 256x256px (Max: 2MB)</p>
              {editingId && !newLogoFile && (
                <p className="text-xs text-text-secondary">Leave blank to keep existing logo</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-secondary uppercase tracking-wider">View Product Link (Optional)</label>
              <Input 
                value={newDownloadUrl} 
                onChange={e => setNewDownloadUrl(e.target.value)} 
                placeholder="https://"
                className="bg-base shadow-neu-inset border-none focus:ring-2 focus:ring-accent transition-all text-text-primary placeholder:text-text-secondary/50"
              />
            </div>
          </div>
          <div className="pt-4 flex gap-4">
            <Button type="submit" disabled={loading} className="shadow-neu hover:shadow-neu-inset w-full sm:w-auto px-8 py-3 text-accent font-bold bg-base transition-all">
              {loading ? "Saving..." : editingId ? "Update Product" : "Create Product"}
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
              <th className="p-6 text-sm font-bold uppercase tracking-wider text-text-secondary text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {initialProducts.length === 0 ? (
              <tr><td colSpan={2} className="p-12 text-center text-text-secondary">No products found.</td></tr>
            ) : (
              initialProducts.map(p => (
                <tr key={p.id} className="hover:bg-black/5 transition-colors group">
                  <td className="p-6 text-text-primary font-medium">{p.name}</td>
                  <td className="p-6 text-right space-x-2">
                    <button 
                      onClick={() => handleEdit(p)}
                      disabled={loading}
                      className="text-accent hover:text-accent-cyan font-bold px-4 py-2 rounded-xl bg-base shadow-neu hover:shadow-neu-inset transition-all disabled:opacity-50"
                    >
                      Edit
                    </button>
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
