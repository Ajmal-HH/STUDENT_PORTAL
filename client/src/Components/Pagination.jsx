// eslint-disable-next-line react/prop-types
const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center mt-5">
                {currentPage > 1 && (
                    <>
                        <li className="page-item">
                            <a
                                onClick={() => paginate(1)}
                                href="#!"
                                className="page-link"
                                aria-label="First"
                            >
                                <span aria-hidden="true">&laquo;&laquo;</span>
                            </a>
                        </li>
                        <li className="page-item">
                            <a
                                onClick={() => paginate(currentPage - 1)}
                                href="#!"
                                className="page-link"
                                aria-label="Previous"
                            >
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                    </>
                )}
                <li className="page-item active">
                    <a href="#!" className="page-link">
                        {currentPage}
                    </a>
                </li>
                {currentPage < totalPages && (
                    <>
                        <li className="page-item">
                            <a
                                onClick={() => paginate(currentPage + 1)}
                                href="#!"
                                className="page-link"
                                aria-label="Next"
                            >
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                        <li className="page-item">
                            <a
                                onClick={() => paginate(totalPages)}
                                href="#!"
                                className="page-link"
                                aria-label="Last"
                            >
                                <span aria-hidden="true">&raquo;&raquo;</span>
                            </a>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Pagination;
