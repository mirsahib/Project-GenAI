export default function CategoryPill({
    name,
    category,
    setCatagory,
}: {
    name: string;
    category: string;
    setCatagory: React.Dispatch<React.SetStateAction<string>>;
}) {
    return (
        <li onClick={() => setCatagory(name)} className={`flex items-center justify-center px-2 text-sm rounded border border-1 hover:bg-slate-200 hover:text-black hover:cursor-pointer ${category === name && "bg-black text-white hover:bg-black hover:text-white"}  border-black`}>
            {name}
        </li>
    );
}
