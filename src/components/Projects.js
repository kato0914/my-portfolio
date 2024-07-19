import React from 'react';
import './Projects.css';

function Projects() {
  const projects = [
    { id: 1, title: 'プロジェクト1', description: '説明1' },
    { id: 2, title: 'プロジェクト2', description: '説明2' },
    // さらにプロジェクトを追加
  ];

  return (
    <section className="projects">
      <h2>プロジェクト</h2>
      <div className="project-grid">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;