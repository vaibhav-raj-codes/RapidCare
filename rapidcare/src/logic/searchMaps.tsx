export default function SearchGoogle(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
    return (
        <a
            {...props}
            className={`flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-green-400 transition-colors ${props.className || ''}`}
            href="https://www.google.com/maps/search/?api=1&query=hospitals+near+me"
            target="_blank"
            rel="noopener noreferrer"
        >
            <span className="material-symbols-outlined text-2xl fill-1">map</span>
            <span className="text-[10px] font-medium">Find Hospitals</span>
        </a>
    )
}