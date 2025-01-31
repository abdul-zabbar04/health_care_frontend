import React from 'react';
import cardiology from '../../assets/Specialties_image/cardiology.png'


const Specialist = () => {
    return (
        <>
        <div className='w-full px-4 sm:px-10 md:px-20 lg:px-32 xl:px-40'>
            <div className="text-center my-10">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-650 leading-tight">
                Specialities
                </h1>
                <p className="text-md sm:text-lg md:text-xl text-gray-500 dark:text-gray-500 mt-2">
                Consult with top doctors across specialities
                </p>
            </div>
            <div className='flex gap-5'>
                {/* Card 1 */}
                <div className="card bg-base-100 w-72 shadow-lg border border-gray-200 dark:border-gray-700">
                    <figure className="px-4 pt-4">
                        <img
                            src={cardiology}
                            alt="cardiology"
                            className="w-20 h-20" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-lg">Cardiology</h2>
                        <div className="card-actions">
                            <button className="btn btn-primary btn-sm">Book</button>
                        </div>
                    </div>
                </div>                
                {/* Card 1 */}
                <div className="card bg-base-100 w-72 shadow-lg border border-gray-200 dark:border-gray-700">
                    <figure className="px-4 pt-4">
                        <img
                            src={cardiology}
                            alt="cardiology"
                            className="w-20 h-20" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-lg">Cardiology</h2>
                        <div className="card-actions">
                            <button className="btn btn-primary btn-sm">Book</button>
                        </div>
                    </div>
                </div>                
                {/* Card 1 */}
                <div className="card bg-base-100 w-72 shadow-lg border border-gray-200 dark:border-gray-700">
                    <figure className="px-4 pt-4">
                        <img
                            src={cardiology}
                            alt="cardiology"
                            className="w-20 h-20" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-lg">Cardiology</h2>
                        <div className="card-actions">
                            <button className="btn btn-primary btn-sm">Book</button>
                        </div>
                    </div>
                </div>                
                {/* Card 1 */}
                <div className="card bg-base-100 w-72 shadow-lg border border-gray-200 dark:border-gray-700">
                    <figure className="px-4 pt-4">
                        <img
                            src={cardiology}
                            alt="cardiology"
                            className="w-20 h-20" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-lg">Cardiology</h2>
                        <div className="card-actions">
                            <button className="btn btn-primary btn-sm">Book</button>
                        </div>
                    </div>
                </div>                
            </div>
        </div>
        <div className="flex justify-center mt-7">
            <div className="join">
                <button className="join-item btn btn">«</button>
                <button className="join-item btn btn">»</button>
            </div>
        </div>

        </>
    );
};

export default Specialist;