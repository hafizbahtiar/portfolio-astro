import React, { useEffect, useState } from 'react';
import ProjectCard from '../project/ProjectCard';
import { getProjects } from '../../lib/projects';
import type { Project } from '../../types/project';

const FeaturedProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        // Since getProjects returns [] on error, we might want to check if the fetch actually failed.
        // But for now, we'll assume [] means empty.
        // If we want to distinguish, we'd need to update getProjects to throw or return a status.
        setProjects(data);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card h-full flex flex-col rounded-xl overflow-hidden border border-gray-800 bg-gray-900/50">
            <div className="h-48 bg-gray-800/50 animate-pulse" />
            <div className="p-6 flex flex-col flex-grow space-y-4">
              <div className="h-7 bg-gray-800/50 rounded w-3/4 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-800/50 rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-800/50 rounded w-5/6 animate-pulse" />
              </div>
              <div className="flex gap-2 mt-4">
                <div className="h-6 w-16 bg-gray-800/50 rounded-full animate-pulse" />
                <div className="h-6 w-16 bg-gray-800/50 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-red-900/10 rounded-xl border border-red-900/20">
        <p className="text-red-400 mb-2 font-medium">Failed to load projects</p>
        <p className="text-sm text-gray-400 mb-4">Something went wrong while fetching the projects.</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-900/30 rounded-3xl border border-gray-800 border-dashed">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800/50 mb-4 text-gray-500">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No Projects Found</h3>
        <p className="text-gray-400 max-w-md mx-auto">
          We couldn't find any projects to display right now. Please check back later or view my GitHub profile.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.slice(0, 6).map((project) => (
        <ProjectCard
          key={project.id}
          {...project}
          link={`/projects/${project.slug}`}
        />
      ))}
    </div>
  );
};

export default FeaturedProjects;
