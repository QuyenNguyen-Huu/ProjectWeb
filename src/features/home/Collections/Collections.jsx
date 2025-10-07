import React from 'react'
import CollectionBanner from './Components/CollectionBanner'
import CollectionSection from './Components/CollectionSection'
import "./collections.css";
const Collections = () => {
    return (
        <section className='collections'>
            <div className="collection_container">
                <h2 className="text-center text-[22px] tracking-wide font-semibold mb-10 pt-5 uppercase text-[#777]">
                    NEW COLLECTION
                </h2>
                <CollectionBanner />
            </div>
            <CollectionSection />
        </section>
    )
}

export default Collections