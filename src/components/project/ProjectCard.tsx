import React from 'react';
import type { Project } from '../../types/project';

interface ProjectCardProps extends Project {
  link?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageUrl,
  imageVariant = "banner",
  tags = [],
  link = "#"
}) => {
  return (
    <div className="card flex flex-col h-full group">
      <div className="h-48 bg-gray-800 relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-cyan-900/10 to-blue-900/10">
        {imageUrl ? (
          imageVariant === "logo" ? (
            <img
              src={imageUrl}
              alt={title}
              width={80}
              height={80}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className="w-20 h-20 object-contain transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1 drop-shadow-sm"
            />
          ) : (
            <img
              src={imageUrl}
              alt={title}
              width={640}
              height={192}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1 drop-shadow-sm max-h-full max-w-full p-2"
            />
          )
        ) : (
          <>
            {/* Placeholder for project image */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-700 card-hover opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center text-gray-600">
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 mb-4 flex-grow text-sm leading-relaxed">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, index) => (
            <span key={index} className="badge badge-indigo">
              {tag}
            </span>
          ))}
        </div>

        <a
          href={link}
          className="btn-text text-sm flex items-center"
        >
          View Project
          <svg
            className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
