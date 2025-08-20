import React from "react";
import { Command } from "@/types";

interface CommandCardProps {
  command: Command;
}

const CommandCard: React.FC<CommandCardProps> = ({ command }) => {
  return (
    <div className="border border-gray-700 rounded-md overflow-hidden mb-4">
      <div className="bg-[#202225] p-3 flex justify-between items-center">
        <h4 className="font-medium">{command.name}</h4>
        <span className={`text-xs px-2 py-1 rounded ${
          command.permissionColor === 'discord-red' ? 'bg-[#ED4245]' : 
          command.permissionColor === 'discord-yellow' ? 'bg-[#FEE75C] text-black' : 
          command.permissionColor === 'discord-green' ? 'bg-[#57F287] text-black' : 
          'bg-[#7289DA]'
        }`}>{command.permission}</span>
      </div>
      <div className="p-4 bg-[#2b2d31]">
        <p className="text-[#B9BBBE] mb-3">{command.description}</p>
        <div className="bg-[#202225] rounded-md p-3 mb-3">
          <code className="text-sm">{command.usage}</code>
        </div>
        
        {(command.arguments || command.examples) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {command.arguments && (
              <div>
                <p className="text-[#B9BBBE]">Arguments:</p>
                <ul className="list-disc list-inside text-[#B9BBBE] ml-2">
                  {command.arguments.map((arg, index) => (
                    <li key={index}>{arg.name}: {arg.description}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {command.examples && (
              <div>
                <p className="text-[#B9BBBE]">Examples:</p>
                <ul className="list-disc list-inside text-[#B9BBBE] ml-2">
                  {command.examples.map((example, index) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommandCard;
