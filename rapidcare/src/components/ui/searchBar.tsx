interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
    return (
        <div className="mb-8">
            <label className="relative flex w-full items-center">
                <span className="absolute left-4 text-gray-500 dark:text-gray-400">
                    <span className="material-symbols-outlined">search</span>
                </span>
                <input
                    className="h-14 w-full rounded-xl border-none bg-white dark:bg-rapid-surface-dark pl-12 pr-4 text-base font-medium text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-rapid-primary/50 shadow-sm border border-transparent dark:border-white/10 dark:border-solid"
                    placeholder="Search for guidance..."
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </label>
        </div>
    )
}