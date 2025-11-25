import React from "react";
import { FaTruck, FaUndo, FaHeadphones } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

export default function PolicySection() {
  const { t } = useLanguage();

  const policies = [
    {
      icon: <FaTruck className="text-3xl" />,
      title: t("home.policies.freeShip"),
      subtitle: t("home.policies.billCondition"),
    },
    {
      icon: <FaUndo className="text-3xl" />,
      title: t("home.policies.return7Days"),
      subtitle: "",
    },
    {
      icon: <FaHeadphones className="text-3xl" />,
      title: t("home.policies.experience"),
      subtitle: t("home.policies.storeAvailable"),
    },
  ];

  return (
    <div className="bg-white py-6">
      <div className="w-full mx-auto flex flex-row items-center text-center md:text-left lg:px-25 px-0">
        {policies.map((policy, index) => (
          <div
            key={index}
            className="w-1/3 justify-center flex flex-col md:flex-row items-center md:items-center px-4"
          >
            {/* icon */}
            <div className="mb-2 md:mb-0 md:mr-3">{policy.icon}</div>
            {/* text */}
            <div>
              <div className="font-semibold text-gray-800 text-sm md:text-base">
                {policy.title}
              </div>
              {policy.subtitle && (
                <div className="text-gray-600 text-xs md:text-sm">
                  {policy.subtitle}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}