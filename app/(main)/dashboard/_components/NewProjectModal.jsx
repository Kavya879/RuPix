import { Alert, AlertDescription } from '@/components/ui/alert'
import { DialogHeader } from '@/components/ui/dialog'
import { api } from '@/convex/_generated/api'
import { useConvexMutation, useConvexQuery } from '@/hooks/useConvexQuery'
import { usePlanInfo } from '@/hooks/usePlanInfo'
import { Dialog, DialogContent, DialogTitle } from '@radix-ui/react-dialog'
import { Badge, Crown, X, Upload, Loader2, ImageIcon } from 'lucide-react'
import { useRouter } from "next/navigation";
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { DialogFooter } from '@/components/ui/dialog'
import { UpgradeModal } from '@/components/ui/upgrade-modal'

// Props (short for properties) are like function parameters for components.
const NewProjectModal = ({ isOpen, onClose }) => {

  const [isUploading, setIsUploading] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const { data: projects } = useConvexQuery(api.projects.getUserProjects);
  const { mutate: createProject } = useConvexMutation(api.projects.create);

  const { isFree, canCreateProject } = usePlanInfo();

  const currentProjectCount = projects?.length || 0;
  const canCreate = canCreateProject(currentProjectCount);

  // Lets you read URL info and navigate programmatically
  const router = useRouter();

  const handleCreateProject = async () => {
    if (!canCreate) {
      setShowUpgradeModal(true);
      return;
    }

    if (!selectedFile || !projectTitle.trim()) {
      toast.error("Please select Image and Enter a Project Title");
      return;
    }

    setIsUploading(true);
    try {
      // Upload to ImageKit via our API route
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("fileName", selectedFile.name);

      const uploadResponse = await fetch("/api/imagekit/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok || !uploadData.success) {
        throw new Error(
          uploadData.details || uploadData.error || "Failed to upload image"
        );
      }

      const projectId = await createProject({
        title: projectTitle.trim(),
        originalImageUrl: uploadData.url,
        currentImageUrl: uploadData.url,
        thumbnailUrl: uploadData.thumbnailUrl,
        width: uploadData.width || 800,
        height: uploadData.height || 600,
        canvasState: null,
      });

      toast.success("Project created successfully!");
      router.push(`/editor/${projectId}`);

    } catch (error) {
      console.error("Error creating project:", error);
      toast.error(error.message || "Failed to create project. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setIsUploading(false);
    setProjectTitle("");
    setSelectedFile(null);
    setPreviewURL(null);
    onClose();
  };

  const onDrop = (acceptedfile) => {
    const file = acceptedfile[0];
    if (file) {
      setSelectedFile(file);
      // generates a temporary local URL that points to the file in memory.
      setPreviewURL(URL.createObjectURL(file));

      const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
      setProjectTitle(nameWithoutExt || "Untitled Project");
    }
  };

  // react-dropzone configuration
  // https://react-dropzone.js.org/
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif"],
    },
    maxFiles: 1,
    maxSize: 20 * 1024 * 1024, // 20MB limit
  });

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent
          className="fixed max-w-2xl w-full bg-slate-900 border border-white/10 rounded-2xl p-6 space-y-6
                     shadow-2xl flex flex-col justify-center"
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        >
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <DialogTitle className="text-2xl font-bold text-white">
                  Create New Project
                </DialogTitle>
                {isFree && (
                  <Badge
                    variant="secondary"
                    className="bg-slate-700 text-white/70"
                  >
                    {currentProjectCount}/3 projects
                  </Badge>
                )}
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6">

            {isFree && currentProjectCount >= 2 && (
              <Alert className="bg-amber-500/10 border-amber-500/20">
                <Crown className="h-5 w-5 text-amber-400" />
                <AlertDescription className="text-amber-300/80">
                  <div className="font-semibold text-amber-400 mb-1">
                    {currentProjectCount === 2
                      ? "Last Free Project"
                      : "Project Limit Reached"}
                  </div>
                  {currentProjectCount === 2
                    ? "This will be your last free project. Upgrade to Pixxel Pro for unlimited projects."
                    : "Free plan is limited to 3 projects. Upgrade to Pixxel Pro to create more projects."}
                </AlertDescription>
              </Alert>
            )}

            {/* File Upload Area */}
            {!selectedFile ? (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
                  isDragActive
                    ? "border-cyan-400 bg-cyan-400/5"
                    : "border-white/20 hover:border-white/40"
                } ${!canCreate ? "opacity-50 pointer-events-none" : ""}`}
              >
                <input {...getInputProps()} />
                <Upload className="h-12 w-12 text-white/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  {isDragActive ? "Drop your image here" : "Upload an Image"}
                </h3>
                <p className="text-white/70 mb-4">
                  {canCreate
                    ? "Drag and drop your image, or click to browse"
                    : "Upgrade to Pro to create more projects"}
                </p>
                <p className="text-sm text-white/50">
                  Supports PNG, JPG, WEBP up to 20MB
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Image Preview */}
                <div className="relative">
                  <img
                    src={previewURL}
                    alt="Image Preview"
                    className="w-full h-64 object-cover rounded-xl border border-white/10"
                  />
                  {/* Remove selected file */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewURL(null);
                      setProjectTitle("");
                    }}
                    className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Project Title Input */}
                <div className="space-y-2">
                  <Label htmlFor="project-title" className="text-white">
                    Project Title
                  </Label>
                  <Input
                    id="project-title"
                    type="text"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    placeholder="Enter project name..."
                    className="bg-slate-700 border-white/20 text-white placeholder-white/50 focus:border-cyan-400 focus:ring-cyan-400"
                  />
                </div>

                {/* File Details */}
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <ImageIcon className="h-5 w-5 text-cyan-400" />
                    <div>
                      <p className="text-white font-medium">
                        {selectedFile.name}
                      </p>
                      <p className="text-white/70 text-sm">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Cancel And Create Buttons */}
          <DialogFooter className="gap-3">
            <Button
              variant="ghost"
              onClick={handleClose}
              disabled={isUploading}
              className="text-white/70 hover:text-white"
            >
              Cancel
            </Button>

            <Button
              onClick={handleCreateProject}
              disabled={!selectedFile || !projectTitle.trim() || isUploading}
              variant="primary"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Project"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <UpgradeModal
      isOpen={showUpgradeModal}
      onClose={()=>setShowUpgradeModal(false)}
      restrictedTool="projects"
      reason="Free plan limited to 3 projects , upgrade to pro for unlimited projects"
      />
    </>
  );
}
export default NewProjectModal;
