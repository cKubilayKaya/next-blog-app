import classNames from "classnames";
import React from "react";

export default function ProfilePostsTabMenu({ tabMenu, setTabMenu }) {
  const handleActive = (id) => {
    const updatedMenu = tabMenu.map((item) => ({
      ...item,
      active: item.id === id,
    }));
    setTabMenu(updatedMenu);
  };
  return (
    <div className=" mb-8">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
        {tabMenu?.map((item) => (
          <li className="me-2" key={item?.id}>
            <button
              onClick={() => handleActive(item?.id)}
              className={classNames({
                "inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg transition-all duration-200": true,
                "text-blue-600 hover:text-blue-600 border-b-2 border-blue-600 bg-blue-50": item?.active,
                "hover:text-gray-600 hover:border-gray-300 hover:bg-gray-50  border-b-[#c9c9c9]": !item?.active,
              })}
            >
              <div className="me-2">{item.icon(item.active)}</div>
              <p>{item?.name}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
