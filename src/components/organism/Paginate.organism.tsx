type PaginateProps = {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
};

export const Paginate = ({ totalItems, itemsPerPage, currentPage, onPageChange }: PaginateProps) => {
    return (
        <div className="flex justify-center mt-4">
            <button
                className="px-3 py-1 mx-1 bg-gray-300 rounded disabled:opacity-50"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            <span className="px-3 py-1 mx-1">{currentPage}</span>
            <button
                className="px-3 py-1 mx-1 bg-gray-300 rounded disabled:opacity-50"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
            >

                Next
            </button>
        </div>
    )
}