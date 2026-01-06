import React from 'react'

const Footer = () => {
    return (

        <div>
            <footer className=" bg-black text-gray-400 px-5 py-5">
                <div className="max-w-6xl mx-auto font-bold ">

                    <h1 className='text-white'>Filmora<span className='text-yellow-500'>X</span></h1>


                    {/* Footer Links */}
                    <div className="grid grid-cols-2 pt-5 md:grid-cols-4 gap-4 text-sm">
                        <p className="hover:underline cursor-pointer">Audio Description</p>
                        <p className="hover:underline cursor-pointer">Help Center</p>
                        <p className="hover:underline cursor-pointer">Gift Cards</p>
                        <p className="hover:underline cursor-pointer">Media Center</p>

                        <p className="hover:underline cursor-pointer">Investor Relations</p>
                        <p className="hover:underline cursor-pointer">Jobs</p>
                        <p className="hover:underline cursor-pointer">Terms of Use</p>
                        <p className="hover:underline cursor-pointer">Privacy</p>

                        <p className="hover:underline cursor-pointer">Legal Notices</p>
                        <p className="hover:underline cursor-pointer">Cookie Preferences</p>
                        <p className="hover:underline cursor-pointer">Corporate Information</p>
                        <p className="hover:underline cursor-pointer">Contact Us</p>
                    </div>

                    <p className="mt-8 text-xs text-gray-500">
                        © 2026 Filmorax. All rights reserved.
                    </p>

                </div>
            </footer>
        </div>

    )
}

export default Footer