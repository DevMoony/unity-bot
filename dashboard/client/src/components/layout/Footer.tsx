import { siGithub, siX } from "simple-icons/icons";

const Footer = () => {
    return (
        <footer className="bg-white">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="md:flex md:items-center md:justify-between">
                    <div className="flex justify-center md:justify-start space-x-6">
                        <a
                            href="https://github.com/DevMoony"
                            className="text-gray-400 hover:text-gray-500"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className="sr-only">GitHub</span>
                            <img src={siGithub.svg} width="6" height="6" />
                        </a>
                        <a
                            href="https://x.com"
                            className="text-gray-400 hover:text-gray-500"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className="sr-only">X</span>
                            <img src={siX.svg} alt="X" width="6" height="6" />
                        </a>
                    </div>
                    <p className="mt-4 text-center text-base text-gray-500 md:mt-0 md:text-right">
                        &copy; {new Date().getFullYear()} ReactApp, Inc. All
                        rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;