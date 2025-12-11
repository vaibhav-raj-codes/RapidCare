export default function SearchGoogle(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
    return (
        <a
            {...props}
            className={`flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-green-400 transition-colors ${props.className || ''}`}
            href="https://www.google.com/search?q=hospitals+near+me&oq=hospi&gs_lcrp=EgZjaHJvbWUqDggAEEUYJxg7GIAEGIoFMg4IABBFGCcYOxiABBiKBTIGCAEQRRg5MgcIAhAAGIAEMg0IAxAAGJIDGIAEGIoFMg0IBBAAGJIDGIAEGIoFMgoIBRAAGLEDGIAEMgYIBhBFGDwyBggHEEUYPNIBCDIxNjRqMGo0qAIAsAIA&sourceid=chrome&ie=UTF-8&safe=strict"
            target="_blank"
            rel="noopener noreferrer"
        >
            <span className="material-symbols-outlined text-2xl fill-1">search</span>
            <span className="text-[10px] font-medium">Search Hospitals</span>
        </a>
    )
}