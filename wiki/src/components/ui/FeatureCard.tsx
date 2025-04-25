import React from "react";
import { Feature } from "@/types";

interface FeatureCardProps {
  feature: Feature;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  return (
    <div id={feature.id} className="border border-gray-700 rounded-md overflow-hidden mb-6">
      <div className="bg-[#202225] p-4">
        <div className="flex items-center gap-3">
          <div className="bg-[#7289DA] rounded-full w-2 h-2"></div>
          <h4 className="font-medium">{feature.title}</h4>
        </div>
        <p className="text-sm text-[#B9BBBE] mt-2">{feature.description}</p>
      </div>
      
      <div className="p-4 bg-[#2b2d31]">
        {feature.commands && (
          <div className="mb-4">
            <h5 className="font-medium mb-2 text-white">Available Commands</h5>
            <p className="text-[#B9BBBE] text-sm mb-4">Use these commands to configure {feature.title.toLowerCase()}:</p>
            
            <div className="space-y-2 mb-4">
              {feature.commands.map((command, index) => (
                <div key={index} className="bg-[#202225] rounded-md p-3 text-sm">
                  <code className="text-[#7289DA]">{command.name}</code>
                  <p className="text-[#B9BBBE] mt-1">{command.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {feature.subFeatures && (
          <div className="mb-4">
            <h5 className="font-medium mb-2 text-white">Included Sub-Features (Defaults)</h5>
            <div className="bg-[#202225] rounded-md p-3">
              <div className="space-y-3">
                {feature.subFeatures.map((subFeature, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`w-2 h-2 rounded-full ${subFeature.defaults_enabled ? 'bg-[#57F287]' : 'bg-gray-500'} mr-2`}></div>
                    <span className="text-sm">{subFeature.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {feature.preview && (
          <div>
            <h5 className="font-medium mb-2 text-white">Feature Details</h5>
            {feature.preview}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeatureCard;
