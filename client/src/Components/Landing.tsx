import React from 'react'
import {Link} from 'react-router-dom';

export const Landing: React.FC = () => {
    return (
        <section className = "landing">
           <div className='landing-inner'>
               
               <div><h1 className='x-large anim-text-op'>Welcome To NeuraStyle</h1></div>
               <Link to='get-images'><button className='btn btn-landing'>GET STARTED</button></Link>
               
           </div>
        </section>
    )
}
