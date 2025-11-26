// dashboard/admin/projects/create/page.tsx
export default function AdminCreateProjectPage() {
  return (
    <div>
      <h1>Create New Project</h1>
      <form>
        <label>
          Project Name:
          <input type="text" name="projectName" />
        </label>
        <br />
        <label>
          Description:
          <textarea name="description"></textarea>
        </label>
        <br />
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
}