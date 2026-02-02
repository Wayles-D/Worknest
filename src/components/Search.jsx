import { useSearchParams, useNavigate } from "react-router";
import { useRef } from "react";
import useSearch from "@/hooks/useSearch";
import { useDebouncedCallback } from "use-debounce";
import { SearchIcon, X } from "lucide-react";

export default function Search({ id, children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const query = searchParams.get("query") || "";
  useSearch({
    inputRef,
    searchParams,
    setSearchParams,
    navigate,
    query,
  });

  const debouncedSubmit = useDebouncedCallback((e) => {
    e.preventDefault();
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);
    if (value.length > 3) {
      params.set("query", value);
    } else {
      params.delete("query");
    }
    setSearchParams(params);
  }, 500);

  return (
    <>
      <div className="flex justify-between items-center md:gap-2 w-full md:w-auto">
        <form role="search" id={id} className="relative flex-1">
          <label className="relative input w-full max-w-[220px]">
            <SearchIcon className="text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
            <input
              onChange={debouncedSubmit}
              type="search"
              className="w-full grow border rounded-xl py-2 pl-9 pr-8"
              placeholder="Search Candidates...."
              name="query"
              aria-label="Search"
              defaultValue={query}
              ref={inputRef}
            />
          </label>
          {query && (
            <X
              className="absolute top-[20%] right-2"
              onClick={() => {
                const params = new URLSearchParams(searchParams);
                params.delete("query");
                setSearchParams(params);
                if (inputRef.current) {
                  inputRef.current.value = "";
                }
              }}
            />
          )}
        </form>
        {children}
      </div>
    </>
  );
}