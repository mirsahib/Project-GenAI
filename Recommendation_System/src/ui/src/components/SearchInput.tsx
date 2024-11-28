import { Search } from "lucide-react";

export default function SearchInput({
    searchText,
    setSearchText,
}: {
    searchText: string;
    setSearchText: React.Dispatch<React.SetStateAction<string>>;
}) {
    return (
        <div className="flex justify-center border border-1 items-center pr-2">
            <label className="font-bold p-2 bg-slate-200 mr-1">Search</label>
            <input
                type="text"
                className="w-full px-3 outline-none"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <Search className="ml-2" />
        </div>
    );
}
