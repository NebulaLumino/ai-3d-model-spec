"use client";

import { useState } from "react";
import { generateText } from "ai";
import { deepseek } from "@ai-sdk/deepseek";

export default function ThreeDModelSpecPage() {
  const [formData, setFormData] = useState({
    modelType: "",
    subject: "",
    useCase: "",
    style: "",
    polygonBudget: "",
    rigging: "",
    animationType: "",
    textureRequirement: "",
    additionalNotes: "",
  });
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOutput("");

    try {
      const { text } = await generateText({
        model: deepseek("deepseek-chat"),
        prompt: `You are an expert 3D artist and technical artist. Create a comprehensive 3D model specification document based on the following specifications:

- Model Type: ${formData.modelType}
- Subject / Object: ${formData.subject}
- Use Case: ${formData.useCase}
- Art Style: ${formData.style}
- Polygon Budget: ${formData.polygonBudget}
- Rigging Requirements: ${formData.rigging}
- Animation Type: ${formData.animationType}
- Texture Requirements: ${formData.textureRequirement}
- Additional Notes: ${formData.additionalNotes}

Provide a detailed specification including:
1. Model Overview & Concept Art Description
2. Mesh Specifications (polygon count, topology requirements, LOD strategy)
3. UV Mapping Strategy
4. Texture & Material Specifications (diffuse, normal, roughness, metallic, etc.)
5. Rigging Specifications (bone structure, controls, constraints)
6. Animation Specifications (idle, locomotion, interaction cycles)
7. Collision & Physics Mesh
8. LOD Levels & Optimization Targets
9. Export Formats & Pipeline (FBX, glTF, USD, etc.)
10. Naming Conventions & Folder Structure
11. Reference Art / Concept Description
12. QA Checklist

Format with clear markdown headers, tables where appropriate, and bullet points.`,
      });
      setOutput(text);
    } catch {
      setOutput("Error generating 3D model specification. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 text-white p-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent mb-3">
            3D Model Specification Generator
          </h1>
          <p className="text-slate-400 text-lg">
            Generate detailed 3D model specifications and technical art docs with AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-5 text-rose-300">Model Parameters</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-300 mb-1">Model Type</label>
                <select name="modelType" value={formData.modelType} onChange={handleChange} required
                  className="w-full bg-slate-800/60 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-rose-400 focus:outline-none">
                  <option value="">Select type...</option>
                  <option value="Character (Biped)">Character (Biped / Humanoid)</option>
                  <option value="Character (Quadruped)">Character (Quadruped / Animal)</option>
                  <option value="Prop / Object">Prop / Static Object</option>
                  <option value="Vehicle">Vehicle (Land/Air/Sea)</option>
                  <option value="Architecture">Architecture / Environment</option>
                  <option value="Weapon / Tool">Weapon / Tool / Accessory</option>
                  <option value="Creature / Monster">Creature / Monster</option>
                  <option value="Flora">Flora / Plants / Trees</option>
                  <option value="UI Element">UI / HUD Element (3D)</option>
                  <option value="Abstract / Sci-Fi">Abstract / Sci-Fi Object</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-1">Subject / Object</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} required
                  placeholder="e.g., Sci-fi power suit, medieval tavern building"
                  className="w-full bg-slate-800/60 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:border-rose-400 focus:outline-none" />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-1">Use Case</label>
                <select name="useCase" value={formData.useCase} onChange={handleChange} required
                  className="w-full bg-slate-800/60 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-rose-400 focus:outline-none">
                  <option value="">Select use case...</option>
                  <option value="Real-time Game (Mobile)">Real-time Game (Mobile)</option>
                  <option value="Real-time Game (Console/PC)">Real-time Game (Console/PC)</option>
                  <option value="Film / VFX">Film / VFX</option>
                  <option value="Archviz / Architectural Viz">Archviz / Architectural Viz</option>
                  <option value="VR / AR / Metaverse">VR / AR / Metaverse</option>
                  <option value="3D Print">3D Print / Physical Fabrication</option>
                  <option value="Web / glTF Display">Web / glTF Display</option>
                  <option value="Simulation">Simulation / Digital Twin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-1">Art Style</label>
                <select name="style" value={formData.style} onChange={handleChange} required
                  className="w-full bg-slate-800/60 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-rose-400 focus:outline-none">
                  <option value="">Select style...</option>
                  <option value="Realistic / Photorealistic">Realistic / Photorealistic</option>
                  <option value="Stylized / Cartoon">Stylized / Cartoon</option>
                  <option value="Low-poly">Low-poly / Minimalist</option>
                  <option value="Voxel">Voxel</option>
                  <option value="Hand-painted / Toon">Hand-painted / Toon Shading</option>
                  <option value="Sci-Fi / Hard Surface">Sci-Fi / Hard Surface</option>
                  <option value="Medieval / Organic">Medieval / Organic</option>
                  <option value="Abstract / Experimental">Abstract / Experimental</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-1">Polygon Budget</label>
                <select name="polygonBudget" value={formData.polygonBudget} onChange={handleChange} required
                  className="w-full bg-slate-800/60 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-rose-400 focus:outline-none">
                  <option value="">Select budget...</option>
                  <option value="Under 500 tris">Under 500 tris (Mobile/UI)</option>
                  <option value="500-5,000 tris">500-5,000 tris (Mobile Game)</option>
                  <option value="5,000-20,000 tris">5,000-20,000 tris (Console/PC)</option>
                  <option value="20,000-100,000 tris">20,000-100,000 tris (High-end)</option>
                  <option value="100,000-500,000 tris">100,000-500,000 tris (Film/Detail)</option>
                  <option value="500,000+ tris">500,000+ tris (VFX / Sculpt Master)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-1">Rigging Requirements</label>
                <select name="rigging" value={formData.rigging} onChange={handleChange} required
                  className="w-full bg-slate-800/60 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-rose-400 focus:outline-none">
                  <option value="">Select rigging...</option>
                  <option value="No Rig (Static)">No Rig — Static / Prop Only</option>
                  <option value="Basic Rig (FK/IK)">Basic Rig (FK/IK bones)</option>
                  <option value="Full Character Rig">Full Character Rig (facial, fingers, etc.)</option>
                  <option value="Vehicle Rig">Vehicle Rig (wheels, doors, suspension)</option>
                  <option value="Procedural / Dynamic Bones">Procedural / Dynamic Bones</option>
                  <option value="Physics-based (cloth/hair)">Physics-based (cloth/hair simulation)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-1">Animation Type</label>
                <select name="animationType" value={formData.animationType} onChange={handleChange} required
                  className="w-full bg-slate-800/60 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-rose-400 focus:outline-none">
                  <option value="">Select animation...</option>
                  <option value="None / Static">None / Static Only</option>
                  <option value="Idle / Breathing">Idle / Breathing Loop</option>
                  <option value="Basic Locomotion">Basic Locomotion (walk, run)</option>
                  <option value="Full Animation Set">Full Animation Set (attack, emotes, etc.)</option>
                  <option value="Facial Animation">Facial Animation / Lip Sync Ready</option>
                  <option value="Prop Interaction">Prop Interaction (weapons, tools)</option>
                  <option value="VFX / Particle Attachment">VFX / Particle Attachment Points</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-1">Texture Requirements</label>
                <select name="textureRequirement" value={formData.textureRequirement} onChange={handleChange} required
                  className="w-full bg-slate-800/60 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-rose-400 focus:outline-none">
                  <option value="">Select texture level...</option>
                  <option value="No textures (solid color)">No textures (solid color / vertex color)</option>
                  <option value="Basic Diffuse Only">Basic Diffuse Only</option>
                  <option value="PBR (Albedo + Normal + Roughness + Metallic)">PBR (Albedo + Normal + Roughness + Metallic)</option>
                  <option value="Full PBR + Emissive + Opacity">Full PBR + Emissive + Opacity</option>
                  <option value="Hand-painted Atlas">Hand-painted Atlas</option>
                  <option value="4K+ UDIM Tiles">4K+ UDIM Tiles (VFX quality)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-1">Additional Notes</label>
                <textarea name="additionalNotes" value={formData.additionalNotes} onChange={handleChange} rows={3}
                  placeholder="Engine specifics, reference links, pipeline constraints..."
                  className="w-full bg-slate-800/60 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:border-rose-400 focus:outline-none resize-none" />
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-50">
                {loading ? "Generating..." : "Generate Specification"}
              </button>
            </form>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-5 text-pink-300">Generated Specification</h2>
            <div className="bg-slate-900/70 rounded-xl p-4 min-h-[500px] max-h-[600px] overflow-y-auto">
              {output ? (
                <div className="prose prose-invert prose-sm max-w-none whitespace-pre-wrap">
                  {output.split("\n").map((line, i) => {
                    if (line.startsWith("# ")) return <h1 key={i} className="text-xl font-bold text-rose-300 mt-4 mb-2">{line.slice(2)}</h1>;
                    if (line.startsWith("## ")) return <h2 key={i} className="text-lg font-semibold text-pink-300 mt-3 mb-2">{line.slice(3)}</h2>;
                    if (line.startsWith("### ")) return <h3 key={i} className="text-md font-semibold text-white mt-2 mb-1">{line.slice(4)}</h3>;
                    if (line.startsWith("- ")) return <li key={i} className="text-slate-300 ml-4">{line.slice(2)}</li>;
                    if (line.startsWith("|")) return <div key={i} className="text-slate-300 font-mono text-xs">{line}</div>;
                    if (line.trim() === "") return <br key={i} />;
                    return <p key={i} className="text-slate-300">{line}</p>;
                  })}
                </div>
              ) : (
                <p className="text-slate-500 italic">Your 3D model specification will appear here...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
