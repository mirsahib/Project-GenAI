export default function CategoryPill({name}:{name:string}) {
    return (
        <li className="px-2 rounded-full border border-1 hover:bg-slate-200 border-black">
            {name}
        </li>
    );
}
