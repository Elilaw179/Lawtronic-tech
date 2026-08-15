import { useEffect, useState, type FormEvent } from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff, Search, Image as ImageIcon } from 'lucide-react';
import Modal from '../../components/ui/Modal';
import { COLLECTIONS, listDocs, createDoc, updateDocById, deleteDocById } from '../../firebase/firestore';
import type { Post } from '../../types';
import { mockPosts } from '../../data/mockData';
import FileUploader from '../../components/ui/FileUploader';

const emptyForm = {
  title: '',
  type: 'blog' as Post['type'],
  excerpt: '',
  content: '',
  coverImage: '',
  tagsInput: '',
  published: true,
};

export default function ManagePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Post | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');

  async function load() {
    setLoading(true);
    try {
      const docs = await listDocs<Post>(COLLECTIONS.posts);
      setPosts(docs.length ? docs : (mockPosts as Post[]));
    } catch {
      setPosts(mockPosts as Post[]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(post: Post) {
    setEditing(post);
    setForm({
      title: post.title,
      type: post.type,
      excerpt: post.excerpt,
      content: post.content || '',
      coverImage: post.coverImage ?? '',
      tagsInput: (post.tags || []).join(', '),
      published: post.published,
    });
    setModalOpen(true);
  }

  function formatContentToHtml(rawText: string): string {
    if (rawText.trim().startsWith('<') && rawText.trim().endsWith('>')) {
      return rawText;
    }
    return rawText
      .split(/\n\s*\n/)
      .map((para) => `<p class="mb-4 leading-relaxed">${para.trim().replace(/\n/g, '<br />')}</p>`)
      .join('');
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    const slug = form.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');

    const tags = form.tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const formattedContent = formatContentToHtml(form.content);

    const payload = {
      title: form.title,
      type: form.type,
      excerpt: form.excerpt,
      content: formattedContent,
      coverImage: form.coverImage,
      published: form.published,
      slug,
      tags,
    };

    try {
      if (editing) {
        await updateDocById(COLLECTIONS.posts, editing.id, payload);
        setPosts((prev) =>
          prev.map((p) => (p.id === editing.id ? { ...p, ...payload } : p))
        );
      } else {
        const publishedAt = new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });
        const result = await createDoc(COLLECTIONS.posts, {
          ...payload,
          authorId: 'admin',
          publishedAt,
        });
        const newId = (result as { id: string })?.id ?? `local-${Date.now()}`;
        setPosts((prev) => [
          {
            ...payload,
            id: newId,
            authorId: 'admin',
            publishedAt,
          } as Post,
          ...prev,
        ]);
      }
      setModalOpen(false);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Save failed. Check connection.');
    } finally {
      setSaving(false);
    }
  }

  async function togglePublish(post: Post) {
    const updatedPublished = !post.published;
    try {
      await updateDocById(COLLECTIONS.posts, post.id, { published: updatedPublished });
      setPosts((prev) =>
        prev.map((p) => (p.id === post.id ? { ...p, published: updatedPublished } : p))
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Status update failed.');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      await deleteDocById(COLLECTIONS.posts, id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Delete failed.');
    }
  }

  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.type.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="eyebrow mb-2">Content management</p>
          <h1 className="font-display text-3xl font-semibold text-ink">Blog & News</h1>
        </div>
        <button onClick={openCreate} className="btn-primary text-sm self-start md:self-auto">
          <Plus size={16} /> Quick blog upload
        </button>
      </div>

      <div className="mb-6 flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-dim" />
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="admin-input pl-10 text-xs"
          />
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line text-ink-dim bg-panel2/50">
              <tr>
                <th className="px-5 py-3 font-normal">Cover</th>
                <th className="px-5 py-3 font-normal">Title</th>
                <th className="px-5 py-3 font-normal">Type</th>
                <th className="px-5 py-3 font-normal">Published</th>
                <th className="px-5 py-3 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="px-5 py-6 text-ink-dim text-center" colSpan={5}>
                    Loading posts...
                  </td>
                </tr>
              ) : filteredPosts.length === 0 ? (
                <tr>
                  <td className="px-5 py-6 text-ink-dim text-center" colSpan={5}>
                    No posts found.
                  </td>
                </tr>
              ) : (
                filteredPosts.map((p) => (
                  <tr key={p.id} className="border-b border-line last:border-none hover:bg-panel2/40 transition-colors">
                    <td className="px-5 py-3">
                      {p.coverImage ? (
                        <img
                          src={p.coverImage}
                          alt=""
                          className="h-10 w-14 rounded object-cover border border-line bg-void"
                        />
                      ) : (
                        <div className="flex h-10 w-14 items-center justify-center rounded border border-line bg-panel2 text-ink-muted">
                          <ImageIcon size={16} />
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-4 font-medium text-ink max-w-xs truncate">{p.title}</td>
                    <td className="px-5 py-4 text-ink-dim capitalize">
                      <span className="rounded bg-circuit/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-circuit">
                        {p.type}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => togglePublish(p)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-colors ${
                          p.published
                            ? 'bg-success/15 text-success hover:bg-success/25'
                            : 'bg-alert/15 text-alert hover:bg-alert/25'
                        }`}
                        title="Click to toggle publish status"
                      >
                        {p.published ? <Eye size={12} /> : <EyeOff size={12} />}
                        {p.published ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => openEdit(p)}
                          className="text-ink-dim hover:text-circuit transition-colors"
                          title="Edit post"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="text-ink-dim hover:text-alert transition-colors"
                          title="Delete post"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit post' : 'Quick blog upload'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-ink-dim">Post Title</label>
            <input
              required
              placeholder="e.g. Advancing AI Integration in Commercial Arbitration"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="admin-input"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-ink-dim">Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as Post['type'] }))}
                className="admin-input capitalize"
              >
                <option value="blog">Blog</option>
                <option value="news">News</option>
                <option value="announcement">Announcement</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-ink-dim">Tags (comma-separated)</label>
              <input
                placeholder="e.g. AI, Law, Tech, Innovation"
                value={form.tagsInput}
                onChange={(e) => setForm((f) => ({ ...f, tagsInput: e.target.value }))}
                className="admin-input"
              />
            </div>
          </div>

          <FileUploader
            label="Cover Image (Upload, Paste Ctrl+V, or Enter URL)"
            accept="image/*"
            storagePath="posts"
            value={form.coverImage}
            onChange={(url) => setForm((f) => ({ ...f, coverImage: url }))}
            isImage={true}
          />

          <div>
            <label className="mb-1 block text-xs font-medium text-ink-dim">Short Excerpt</label>
            <textarea
              required
              rows={2}
              placeholder="A brief summary for post cards and search engines..."
              value={form.excerpt}
              onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
              className="admin-input"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-ink-dim">Full Content</label>
            <textarea
              required
              rows={7}
              placeholder="Write or paste your blog article content here... (Paragraph breaks are formatted automatically)"
              value={form.content}
              onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
              className="admin-input font-sans leading-relaxed"
            />
          </div>

          <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-ink-dim">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
              className="rounded border-line bg-panel2 text-circuit focus:ring-circuit"
            />
            Publish immediately (visible to public)
          </label>

          <button type="submit" disabled={saving} className="btn-primary w-full justify-center text-sm py-2.5">
            {saving ? 'Saving post…' : editing ? 'Save changes' : 'Upload & Publish Post'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
