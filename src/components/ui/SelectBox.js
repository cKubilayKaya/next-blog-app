"use client";
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";

export default function SelectBox({ label, name, data, value = [], onChange, touched, errors }) {
  const handleSelect = (selectedItem) => {
    const newValue = value.includes(selectedItem) ? value.filter((id) => id !== selectedItem) : [...value, selectedItem];
    const flatValue = newValue.flat();
    const uniqueValues = Array.from(new Set(flatValue));
    onChange({ target: { name, value: uniqueValues } });
  };

  return (
    <div className="w-full">
      <Listbox value={value} onChange={handleSelect} multiple>
        <Label className="block text-sm/6 mb-2">{label}</Label>
        <div className="relative">
          <ListboxButton className="w-full cursor-default rounded-md bg-white py-1.5 pr-2 pl-3 text-left border border-gray-400 sm:text-sm">
            <div className="flex items-center justify-between">
              <span className="truncate">
                {value.length > 0 ? value.map((id) => data?.find((cat) => cat.id === id)?.name).join(", ") : "Select categories"}
              </span>
              <ChevronUpDownIcon aria-hidden="true" className="w-5 h-5 text-gray-500" />
            </div>
          </ListboxButton>

          <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-none sm:text-sm">
            {data?.map((item) => (
              <ListboxOption
                key={item.id}
                value={item.id}
                className="relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white"
              >
                <div className="flex items-center">
                  <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">{item.name}</span>
                </div>

                {value.includes(item.id) && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-focus:text-white">
                    <CheckIcon aria-hidden="true" className="w-5 h-5" />
                  </span>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>

      {touched && errors && <p className="text-sm text-red-500 mt-1">{errors}</p>}
    </div>
  );
}
