import React, { useEffect, useState } from "react";
import { useSidebar } from "@/hooks/use-sidebar";

const Support: React.FC = () => {
    const { setActiveSection } = useSidebar();
    const [bugDescription, setBugDescription] = useState("");
    const [bugSteps, setBugSteps] = useState("");

    useEffect(() => {
        // Only run this effect once when the component mounts
        setActiveSection("support");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmitBugReport = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Bug report submitted:", { bugDescription, bugSteps });
        // In a real app, this would make an API call to submit the bug report
        alert("Thank you for your bug report! Our team will look into it.");
        setBugDescription("");
        setBugSteps("");
    };

    return (
        <section id="support" className="mb-12">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-700">
                    Support
                </h2>

                <div className="bg-[#2F3136] rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
                    <p className="text-[#B9BBBE] mb-6">
                        If you're experiencing issues or have questions about
                        Unity, here's how to get help:
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-[#202225] rounded-lg p-5">
                            <div className="flex items-center mb-4">
                                <i className="fas fa-question-circle text-[#7289DA] text-xl mr-3"></i>
                                <h4 className="font-medium text-lg">
                                    Frequently Asked Questions
                                </h4>
                            </div>

                            <div className="space-y-3 mb-4">
                                <div>
                                    <h5 className="font-medium mb-1">
                                        Why isn't the bot responding?
                                    </h5>
                                    <p className="text-sm text-[#B9BBBE]">
                                        Check if the bot has the necessary
                                        permissions and is online.
                                    </p>
                                </div>

                                <div>
                                    <h5 className="font-medium mb-1">
                                        How do I set up auto moderation?
                                    </h5>
                                    <p className="text-sm text-[#B9BBBE]">
                                        Run the{" "}
                                        <code className="bg-[#202225] px-2 py-1 rounded">
                                            /automod
                                        </code>{" "}
                                        command to enable or disable
                                        certain Auto Moderation features.
                                    </p>
                                </div>
                            </div>

                            <a
                                href="#"
                                className="text-[#7289DA] hover:underline text-sm"
                            >
                                View all FAQs
                            </a>
                        </div>

                        <div className="bg-[#202225] rounded-lg p-5">
                            <div className="flex items-center mb-4">
                                <i className="fas fa-headset text-[#7289DA] text-xl mr-3"></i>
                                <h4 className="font-medium text-lg">
                                    Support Server
                                </h4>
                            </div>

                            <p className="text-sm text-[#B9BBBE] mb-4">
                                Join our official Discord server to get help
                                from the community and the developers.
                            </p>

                            <a
                                href="#"
                                className="inline-block bg-[#7289DA] hover:bg-opacity-80 transition duration-150 px-4 py-2 rounded font-medium text-white"
                            >
                                <i className="fab fa-discord mr-2"></i> Join
                                Support Server
                            </a>

                            <div className="mt-4 text-sm text-[#B9BBBE]">
                                <p className="font-medium mb-1">
                                    Server Hours:
                                </p>
                                <p>
                                    Support staff is available 9 AM - 9 PM CET
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 bg-[#202225] rounded-lg p-5">
                        <div className="flex items-center mb-4">
                            <i className="fas fa-bug text-[#ED4245] text-xl mr-3"></i>
                            <h4 className="font-medium text-lg">
                                Report a Bug
                            </h4>
                        </div>

                        <p className="text-sm text-[#B9BBBE] mb-4">
                            Found a bug? Help us improve by reporting it.
                        </p>

                        <form
                            onSubmit={handleSubmitBugReport}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Bug Description
                                </label>
                                <textarea
                                    className="w-full bg-[#36393F] border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7289DA] text-white"
                                    rows={3}
                                    placeholder="Describe the bug in detail..."
                                    value={bugDescription}
                                    onChange={(e) =>
                                        setBugDescription(e.target.value)
                                    }
                                    required
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Steps to Reproduce
                                </label>
                                <textarea
                                    className="w-full bg-[#36393F] border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7289DA] text-white"
                                    rows={2}
                                    placeholder="How can we reproduce this issue?"
                                    value={bugSteps}
                                    onChange={(e) =>
                                        setBugSteps(e.target.value)
                                    }
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="bg-[#7289DA] hover:bg-opacity-80 transition duration-150 px-4 py-2 rounded font-medium"
                            >
                                Submit Report
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Support;
