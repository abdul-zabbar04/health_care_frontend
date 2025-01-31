import { Link } from "react-router";
const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white text-center py-8">
            <div className="flex justify-center space-x-4 mb-4">
                <Link target="_blank" to="https://www.facebook.com/abdul.zabbar.04/" className="btn btn-outline text-white btn-sm btn-square">
                    <i className="fab fa-facebook-f"></i>
                </Link>
                <Link to="#" className="btn btn-outline text-white btn-sm btn-square">
                    <i className="fab fa-linkedin-in"></i>
                </Link>
                <Link to="#" className="btn btn-outline text-white btn-sm btn-square">
                    <i className="fab fa-github"></i>
                </Link>
                <Link to="#" className="btn btn-outline text-white btn-sm btn-square">
                    <i className="fas fa-times"></i>
                </Link>
                <Link to="#" className="btn btn-outline text-white btn-sm btn-square">
                    <i className="fab fa-google"></i>
                </Link>
                <Link to="#" className="btn btn-outline text-white btn-sm btn-square">
                    <i className="fab fa-instagram"></i>
                </Link>
            </div>
            <div className="border-t border-gray-700 pt-4">
                <p className="text-gray-400">
                    &copy; 2025 Copyright: <span className="text-white font-semibold">Smart Health Care</span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
