import React from 'react'
import CollectionGrid from './CollectionGrid'
import mockCollections from '../data/mockCollections'


const CollectionSection = () => {

    return (
        <div className='product_category_box'>
            <div className='pt-5 pb-5 md:pt-10 md:pb-10 lg:pt-12 lg:pb-12'>
                <div className="collection_container">
                    {mockCollections.map((collection, index) => (
                        <div className="collections_item" key={index}>
                            <div className="title text-center mb-2.5">
                                <h2 className="inline-block mb-2.5 uppercase text-[28px] font-semibold">
                                    <a href="javascript:">{collection.title}</a>
                                </h2>
                            </div>
                            <div className="mt-10">
                                <div className="flex flex-wrap -mx-2">
                                    <div className="baner-item w-full lg:w-1/2 px-2 mb-4">
                                        <a href={collection.href}>
                                            <img
                                                loading="lazy"
                                                src={collection.banner}
                                                alt={collection.title}
                                                className="w-full h-auto object-cover"
                                            />
                                        </a>
                                    </div>
                                    <div className="w-full lg:w-1/2 px-2 mb-4">
                                        <CollectionGrid products={collection.products} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="collections_item" >
                        <div className="title text-center mb-2.5">
                            <h2 className="inline-block mb-2.5 uppercase text-[28px] font-semibold">
                                <a href="javascript:">Album hoạt động team</a>
                            </h2>
                        </div>
                        <div className="mt-10 flex flex-col md:flex-row ">
                            <div className="w-full md:w-1/3 px-2 mb-4 item">
                                <a href="/imsports-team-a13407.html">
                                    <img
                                        loading="lazy"
                                        src="https://pos.nvncdn.com/be3294-43017/album/20240620_St1MNckY.png?v=1718876200"
                                        alt="IMSPORTS TEAM"
                                        className="w-full h-auto object-cover"
                                    />
                                </a>
                            </div>
                            <div className="w-full md:w-1/3 px-2 mb-4 item">
                                <a href="/imsports-team-a13407.html">
                                    <img
                                        loading="lazy"
                                        src="https://pos.nvncdn.com/be3294-43017/album/20240620_St1MNckY.png?v=1718876200"
                                        alt="IMSPORTS TEAM"
                                        className="w-full h-auto object-cover"
                                    />
                                </a>
                            </div>
                            <div className="w-full md:w-1/3 px-2 mb-4 item">
                                <a href="/imsports-team-a13407.html">
                                    <img
                                        loading="lazy"
                                        src="https://pos.nvncdn.com/be3294-43017/album/20240620_St1MNckY.png?v=1718876200"
                                        alt="IMSPORTS TEAM"
                                        className="w-full h-auto object-cover"
                                    />
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CollectionSection