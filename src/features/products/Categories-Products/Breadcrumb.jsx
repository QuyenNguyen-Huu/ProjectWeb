import React from 'react'
import { Link } from 'react-router-dom'

const Breadcrumb = ({ breadcrumbItems = [] }) => {
    return (
        <div className="mx-auto w-full md:max-w-[750px] lg:max-w-[970px] xl:max-w-[1170px] 2xl:max-w-[1200px] px-4">
            <div className="flex flex-wrap -mx-[15px] row">
                <div className="w-full md:w-1/2 px-[15px]">
                    <ul className="m-0 p-0 text-[1em] bg-transparent rounded-none">
                        {breadcrumbItems.map((item, index) => (
                            // Dùng React.Fragment để nhóm các phần tử mà không thêm thẻ div thừa
                            <React.Fragment key={item.link}>
                                <li className="inline">
                                    {/* 2. Kiểm tra xem có phải là item cuối cùng không */}
                                    {index < breadcrumbItems.length - 1 ? (
                                        // Nếu KHÔNG phải cuối -> hiển thị Link
                                        <Link to={item.link} className="hover:underline">
                                            {item.name}
                                        </Link>
                                    ) : (
                                        // Nếu LÀ cuối -> chỉ hiển thị text, không có link
                                        <span>{item.name}</span>
                                    )}
                                </li>

                                {/* 3. Hiển thị dấu '/' nếu không phải item cuối cùng */}
                                {index < breadcrumbItems.length - 1 && (
                                    <span className="px-[5px] text-[#ccc]">/</span>
                                )}
                            </React.Fragment>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Breadcrumb