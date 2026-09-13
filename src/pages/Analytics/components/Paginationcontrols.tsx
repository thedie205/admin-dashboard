interface PaginationControlsProps {
    page: number;
    totalPages: number;
    onChange: (page: number) => void;
}

export default function PaginationControls({
    page,
    totalPages,
    onChange,
}: PaginationControlsProps) {
    if (totalPages <= 1) return null;

    return (
        <div className="mt-3 flex items-center justify-end gap-2 text-xs text-gray-500">
            <button
                type="button"
                disabled={page <= 1}
                onClick={() => onChange(page - 1)}
                className="rounded-md px-2 py-1 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-violet-400 disabled:opacity-30 hover:bg-gray-50"
            >
                Prev
            </button>
            <span>
                {page} / {totalPages}
            </span>
            <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => onChange(page + 1)}
                className="rounded-md px-2 py-1 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-violet-400 disabled:opacity-30 hover:bg-gray-50"
            >
                Next
            </button>
        </div>
    );
}