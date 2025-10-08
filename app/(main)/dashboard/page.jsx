"use client";
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api'
import { useConvexQuery } from '@/hooks/useConvexQuery';
import { Plus, Sparkles } from 'lucide-react';
import React, { useState } from 'react'
import NewProjectModal from './_components/NewProjectModal';
import ProjectGrid from './_components/ProjectGrid';

const Dashboard = () => {
  const [ShowNewProjectModal , setShowNewProjectModal] = useState(false);
  const { data: projects, isLoading } = useConvexQuery(api.projects.getUserProjects);

  return (
    <div className="min-h-screen pt-32 pb-16 relative">
      {/* Background particles already handled by ShadCN */}

      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-2 tracking-tight">
              Your Projects
            </h1>
            <p className="text-white/70 text-lg md:text-xl max-w-lg">
              Create and manage your AI-powered image designs
            </p>
          </div>

          <Button
            onClick={() => setShowNewProjectModal(true)}
            variant="primary"
            size="lg"
            className="flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
          >
            <Plus className="h-5 w-5" />
            New Project
          </Button>
        </div>  

        {/* Loading State */}
      {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
          </div>
        ) : projects && projects.length > 0 ? (
          <ProjectGrid projects={projects} />
        ) : (
          <EmptyState onCreateProject={() => setShowNewProjectModal(true)} />
        )}

        {/* New Project Modal */}
        <NewProjectModal
          isOpen={ShowNewProjectModal}
          onClose={() => setShowNewProjectModal(false)}
        />
      </div>
      
      {/* // A modal = a temporary window that appears in front of your app content.
      // It’s used for things like:
      // Confirmations → “Are you sure you want to delete this?”
      // Forms → login, signup, feedback
      // Displaying details → profile, enlarged image, etc.  */}
      <NewProjectModal 
        isOpen={ShowNewProjectModal} 
        onClose={() => setShowNewProjectModal(false)}
      />
    </div>
  )
}
// Empty state when user has no projects
import { Image as ImageIcon } from 'lucide-react';

function EmptyState({ onCreateProject }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 flex items-center justify-center mb-6">
          <ImageIcon className="h-12 w-12 text-cyan-400" />

      </div>

      <h3 className="text-2xl font-semibold text-white mb-3">
        Create Your First Project
      </h3>

      <p className="text-white/70 mb-8 max-w-md">
        Upload an image to start editing with our powerful AI tools, or create a
        blank canvas to design from scratch.
      </p>

      <Button
        onClick={onCreateProject}
        variant="primary"
        size="xl"
        className="gap-2"
      >
        <Sparkles className="h-5 w-5" />
        Start Creating
      </Button>
    </div>
  );
}
export default Dashboard;
