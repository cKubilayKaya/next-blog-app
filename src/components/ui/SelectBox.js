"use client";

import { Listbox, ListboxButton, ListboxOptions } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { useEffect, useState } from "react";

export default function SelectBox({ label, name, data = [], value = [], onChange, onFocus, touched, errors }) {
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    if (value && Array.isArray(value)) {
      setSelectedIds(value);
    }
  }, [value]);

  const getItemById = (id) => {
    return data.find((item) => item.id === id);
  };

  const getSelectedItems = () => {
    return selectedIds.map((id) => getItemById(id)).filter(Boolean);
  };

  const handleItemSelect = (item) => {
    const newSelectedIds = [...selectedIds];

    const index = newSelectedIds.indexOf(item.id);
    if (index === -1) {
      newSelectedIds.push(item.id);
    } else {
      newSelectedIds.splice(index, 1);
    }

    setSelectedIds(newSelectedIds);

    if (onChange) {
      onChange({
        target: {
          name,
          value: newSelectedIds,
          type: "select-multiple",
        },
      });
    }
  };

  const removeItem = (itemId, e) => {
    e.preventDefault();
    e.stopPropagation();
    const newSelectedIds = selectedIds.filter((id) => id !== itemId);
    setSelectedIds(newSelectedIds);

    if (onChange) {
      onChange({
        target: {
          name,
          value: newSelectedIds,
          type: "select-multiple",
        },
      });
    }
  };

  const handleFocusEvent = () => {
    if (onFocus) {
      onFocus({
        target: {
          name,
        },
      });
    }
  };

  const selectedItems = getSelectedItems();

  return (
    <div className="mb-4">
      <label className={classNames({ "block text-sm/6 font-medium text-gray-900 mb-2": true, "text-red-500": errors })}>{label}</label>
      <div className="relative" onFocus={handleFocusEvent}>
        <div className="relative mt-2">
          <Listbox as="div" multiple>
            <ListboxButton
              className={`grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 border outline-0 min-h-10 ${
                touched && errors ? "border-red-500" : "border-gray-400"
              }`}
            >
              <p className={classNames({ "col-start-1 row-start-1 flex items-center gap-2 pr-6 flex-wrap": true, "text-red-500": errors })}>
                {selectedItems.length > 0
                  ? selectedItems.map((item) => (
                      <p key={item.id} className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700">
                        {item.name}
                        <button onClick={(e) => removeItem(item.id, e)} className="text-indigo-500 hover:text-indigo-700" type="button">
                          <XMarkIcon className="size-4" />
                        </button>
                      </p>
                    ))
                  : "Select a category"}
              </p>
              <ChevronUpDownIcon aria-hidden="true" className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4" />
            </ListboxButton>
            <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden sm:text-sm">
              {data.map((item) => {
                const isSelected = selectedIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className={`relative cursor-pointer py-2 pr-9 pl-3 text-gray-900 select-none hover:bg-indigo-600 hover:text-white group ${
                      isSelected ? "bg-indigo-50" : ""
                    }`}
                    onClick={() => handleItemSelect(item)}
                  >
                    <div className="flex items-center">
                      <span className={`ml-3 block truncate ${isSelected ? "font-semibold" : "font-normal"}`}>{item.name}</span>
                    </div>
                    {isSelected && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-hover:text-white">
                        <CheckIcon aria-hidden="true" className="size-5" />
                      </span>
                    )}
                  </div>
                );
              })}
            </ListboxOptions>
          </Listbox>
        </div>
      </div>
      {touched && errors && <p className="mt-1 text-sm text-red-500">{errors}</p>}
    </div>
  );
}
