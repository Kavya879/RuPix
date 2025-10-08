"use client";
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api'
import { useConvexQuery } from '@/hooks/useConvexQuery';
import { Plus, Sparkles } from 'lucide-react';
import React, { useState } from 'react'
import NewProjectModal from './_components/NewProjectModal';


const Dashboard = () => {
  const [ShowNewProjectModal , setShowNewProjectModal] = useState(false);
  const { data: projects, isLoading } = useConvexQuery(api.projects.getUserProjects);
  return (
    <div className="min-h-screen pt-32 pb-16">
    <div className="container mx-auto px-6">
      <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Your Projects
            </h1>
            <p className="text-white/70">
              Create and manage your AI-powered image designs
            </p>
          </div>
          <Button
            onClick={() => setShowNewProjectModal(true)}
            variant="primary"
            size="lg"
            className="gap-2"
          >
            <Plus className="h-5 w-5" />
            New Project
          </Button>
      </div>  

      {
        isLoading ? 
          ( <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
          </div>):
          projects && projects.length > 0 ?
          (<></>):
          (<div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                Create Your First Project
              </h3>

              <p className="text-white/70 mb-8 max-w-md">
                Upload an image to start editing with our powerful AI tools, or create a
                blank canvas to design from scratch.
              </p>

             <Button onClick={() => setShowNewProjectModal(true)}>
              <Sparkles className="h-5 w-5" />
              Start Creating
            </Button>

          </div>)
      }
    </div>
    {/* // A modal = a temporary window that appears in front of your app content.
// It’s used for things like:
// Confirmations → “Are you sure you want to delete this?”
// Forms → login, signup, feedback
// Displaying details → profile, enlarged image, etc. */}
    <NewProjectModal 
      isOpen={ShowNewProjectModal} 
      onClose={() => setShowNewProjectModal(false)}
    />

  </div>
  )
}

export default Dashboard