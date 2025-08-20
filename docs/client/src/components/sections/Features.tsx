import React, { useEffect } from "react";
import { useSidebar } from "@/hooks/use-sidebar";
import FeatureCard from "@/components/ui/FeatureCard";
import { Feature } from "@/types";
import { features } from "@server/data";

const Features: React.FC = () => {
    const { setActiveSection, toggleMenu } = useSidebar();

    useEffect(() => {
        setActiveSection("features");

        const hash = window.location.hash.substring(1);
        if (hash) {
            const element = document.getElementById(hash);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, []);

    return (
        <section id="features" className="mb-12">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-700">
                    Features
                </h2>

                <div className="bg-[#2F3136] rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold mb-4">
                        Discord Bot Features
                    </h3>
                    <p className="text-[#B9BBBE] mb-6">
                        DiscordBot comes with powerful features to enhance your
                        server experience. Here's what you can do with our bot:
                    </p>

                    <div className="space-y-6">
                        {features.map((feature) => (
                            <FeatureCard key={feature.id} feature={feature} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;