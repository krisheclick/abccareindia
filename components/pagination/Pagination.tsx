import { Pagination } from "react-bootstrap";
import "./style.css";

interface PaginationData {
    totalPages: number;
    currentPage: number;
}

interface PaginationBarProps {
    pagination?: PaginationData | null;
    currentPage: number;
    onPageChange: (page: number) => void;
    className?: string;
}

const PaginationBar = ({ pagination, currentPage, onPageChange, className = ''}: PaginationBarProps) => {
    if (!pagination || pagination.totalPages <= 1) return null;

    return (
        <Pagination className={`mr-5 ${[className]}`}>
            <Pagination.Prev
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            />

            {[...Array(pagination.totalPages)].map((_, index) => {
                const pageNumber = index + 1;

                return (
                    <Pagination.Item
                        key={pageNumber}
                        active={pageNumber === currentPage}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </Pagination.Item>
                );
            })}

            <Pagination.Next
                disabled={currentPage === pagination.totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            />
        </Pagination>
    );
};

export default PaginationBar;