import React from 'react';
import depression from '../../assets/common_disease/depression.png'

const Common_disease = () => {
    return (
        <>
        <div className='w-full px-4 sm:px-10 md:px-20 lg:px-32 xl:px-40'>
            <div className="text-center my-10">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-650 leading-tight">
                Common Health Concerns
                </h1>
                <p className="text-md sm:text-lg md:text-xl text-gray-500 dark:text-gray-500 mt-2">
                Consult a doctor online for any health issue
                </p>
            </div>
            <div className='flex gap-5'>
                {/* Card 1 */}
                <div className="card bg-base-100 w-72 shadow-lg">
                    <figure className="px-4 pt-4">
                        <img
                            src={depression}
                            alt="depression"
                            className="rounded-full w-32 h-32 object-cover" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-lg">Depression Issue</h2>
                        <div className="card-actions">
                            <button className="btn btn-primary btn-sm">Book</button>
                        </div>
                    </div>
                </div>
                {/* Card 2 */}
                <div className="card bg-base-100 w-72 shadow-lg">
                    <figure className="px-4 pt-4">
                        <img
                            src={depression}
                            alt="depression"
                            className="rounded-full w-32 h-32 object-cover" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-lg">Depression Issue</h2>
                        <div className="card-actions">
                            <button className="btn btn-primary btn-sm">Book</button>
                        </div>
                    </div>
                </div>
                {/* Card 3 */}
                <div className="card bg-base-100 w-72 shadow-lg">
                    <figure className="px-4 pt-4">
                        <img
                            src={depression}
                            alt="depression"
                            className="rounded-full w-32 h-32 object-cover" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-lg">Depression Issue</h2>
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

export default Common_disease;