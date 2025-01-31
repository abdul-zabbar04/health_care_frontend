import doctorIcon from '../../assets/StepsGuide_icons/doctor_icon.png';  // Replace with actual paths
import appointmentIcon from '../../assets/StepsGuide_icons/appointment.png';
import servicesIcon from '../../assets/StepsGuide_icons/service.png';

const StepsGuide = () => {
    return (
        <div className="text-center my-8">
            <div className="text-center my-10">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-650 leading-tight">
                    How it works
                </h1>
                <p className="text-md sm:text-lg md:text-xl text-gray-500 dark:text-gray-500 mt-2">
                    Guidelines for using the platforms
                </p>
            </div>
            <div className="flex justify-between items-center max-w-4xl mx-auto relative">
                <div className="absolute top-1/2 w-full border-t border-dashed border-gray-400"></div>
                <div className="relative bg-white z-10 flex flex-col items-center w-1/3">
                    <img src={doctorIcon} alt="Find Your Doctor" className="w-16 h-16" />
                    <div className="rounded-full bg-gray-200 w-12 h-12 flex items-center justify-center font-bold text-lg text-black mt-2 shadow-md">
                        1
                    </div>
                    <h4 className="text-lg font-bold text-indigo-900 mt-3">Find Your Doctor</h4>
                    <p className="text-gray-500 text-sm">Find your desired doctor and clinic based on location and specialty</p>
                </div>

                <div className="relative bg-white z-10 flex flex-col items-center w-1/3">
                    <img src={appointmentIcon} alt="Make an Appointment" className="w-16 h-16" />
                    <div className="rounded-full bg-gray-200 w-12 h-12 flex items-center justify-center font-bold text-lg text-black mt-2 shadow-md">
                        2
                    </div>
                    <h4 className="text-lg font-bold text-indigo-900 mt-3">Make an Appointment</h4>
                    <p className="text-gray-500 text-sm">Easily book your appointment on the desired date</p>
                </div>

                <div className="relative bg-white z-10 flex flex-col items-center w-1/3">
                    <img src={servicesIcon} alt="Get Services" className="w-16 h-16" />
                    <div className="rounded-full bg-gray-200 w-12 h-12 flex items-center justify-center font-bold text-lg text-black mt-2 shadow-md">
                        3
                    </div>
                    <h4 className="text-lg font-bold text-indigo-900 mt-3">Get Services</h4>
                    <p className="text-gray-500 text-sm">We will help to find and provide solutions for your health</p>
                </div>
            </div>
        </div>
    );
};

export default StepsGuide;
