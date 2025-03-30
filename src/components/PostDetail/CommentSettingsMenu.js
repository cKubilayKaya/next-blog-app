import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { SettingsIcon } from "../Icons/Icons";
import { deleteCommentService } from "@/services/commentServices";
import toast from "react-hot-toast";

export default function CommentSettingsMenu({ commentId, setUpdatePosts }) {
  const removeComment = async (commentId) => {
    const { success, message } = await deleteCommentService(commentId);
    if (success) {
      setUpdatePosts(Date.now());
      toast.success(message);
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="cursor-pointer">
          <SettingsIcon color="#000" size="size-5" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-auto origin-top-right divide-y divide-gray-100 rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <button
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
              onClick={() => removeComment(commentId)}
            >
              Remove
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
