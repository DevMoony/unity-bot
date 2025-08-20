import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
            <Card className="w-full max-w-md mx-4">
                <CardContent className="pt-6">
                    <div className="flex mb-4 gap-2">
                        <AlertCircle className="h-8 w-8 text-red-500" />
                        <h1 className="text-2xl font-bold text-gray-900">
                            Sorry, but we can't seem to find the page you're
                            looking for.
                        </h1>
                        <br />
                        <h3 className="text-2xl font-bold text-gray-900">
                            Did you mean go to one of these?:
                        </h3>
                        <ul>
                            <li>
                                <a href="https://devmoony.github.io/unity-bot">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="https://devmoony.github.io/unity-bot/dashboard">
                                    Dashboard
                                </a>
                            </li>
                            <li>
                                <a href="https://devmoony.github.io/unity-bot/wiki">
                                    Wiki
                                </a>
                            </li>
                            <li>
                                <a href="https://devmoony.github.io/unity-bot/wiki/commands">
                                    Commands
                                </a>
                            </li>
                            <li>
                                <a href="https://devmoony.github.io/unity-bot/wiki/features">
                                    Features
                                </a>
                            </li>
                        </ul>
                    </div>

                    <p className="mt-4 text-sm text-gray-600">
                        Or maybe you forgot to add the page to the router?
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
