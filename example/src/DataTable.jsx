import React, { useState } from 'react';
import './style.css';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

function DataTable({ data, columns, theme, deleteButton }) {
    const [tableData, setTableData] = useState(data);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [currentRow, setCurrentRow] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(null);

    const handleDeleteRow = (index) => {
        setTableData((prevData) => prevData.filter((_, i) => i !== index));
    };

    const handleOpenModal = (row, index) => {
        setCurrentRow(row);
        setCurrentIndex(index);
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        setCurrentRow(null);
        setCurrentIndex(null);
    };

    const handleChange = (e, key) => {
        const { type, value, checked } = e.target;
        setCurrentRow((prevRow) => ({
            ...prevRow,
            [key]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value),
        }));
    };

    const handleSave = () => {
        setTableData((prevData) =>
            prevData.map((row, index) => (index === currentIndex ? currentRow : row))
        );
        handleCloseModal();
    };

    const columnHeaders = columns || (data.length > 0 ? Object.keys(data[0]) : []);
    const headers = (data.length > 0 ? Object.keys(data[0]) : []);

    const getKeyFromHeader = (header) => {
        const lowerHeader = header.toLowerCase().replace(/ /g, "");
        const key = Object.keys(data[0]).find((k) => k.toLowerCase() === lowerHeader);
        return key || header;
    };

    const determineInputType = (value) => {
        if (typeof value === 'boolean') return 'checkbox';
        if (typeof value === 'number') return 'number';
        return 'text';
    };

    return (
        <>
            <table className={theme} border="1">
                <thead>
                    <tr>
                        {columnHeaders.map((header) => (
                            <th key={header}>{header}</th>
                        ))}
                        {deleteButton && <th>Delete</th>}
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {headers.map((header, cellIndex) => {
                                const key = getKeyFromHeader(header);
                                return (
                                    <td key={cellIndex}>
                                        {typeof row[key] === 'boolean' ? (
                                            <input
                                                type="checkbox"
                                                checked={row[key]}
                                                readOnly
                                            />
                                        ) : (
                                            row[key]
                                        )}
                                    </td>
                                );
                            })}
                            {deleteButton && (
                                <td>
                                    <button onClick={() => handleDeleteRow(rowIndex)}>Delete</button>
                                </td>
                            )}
                            <td>
                                <button onClick={() => handleOpenModal(row, rowIndex)}>Open Modal</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {currentRow && (
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={handleCloseModal}
                    style={customStyles}
                    contentLabel="Edit Row"
                >
                    <h2>Edit Row</h2>
                    {headers.map((header) => {
                        const key = getKeyFromHeader(header);
                        const inputType = determineInputType(currentRow[key]);
                        return (
                            <div key={header}>
                                <label>{header}:</label>
                                {inputType === 'checkbox' ? (
                                    <input
                                        type="checkbox"
                                        checked={currentRow[key]}
                                        onChange={(e) => handleChange(e, key)}
                                    />
                                ) : (
                                    <input
                                        type={inputType}
                                        value={currentRow[key]}
                                        onChange={(e) => handleChange(e, key)}
                                    />
                                )}
                            </div>
                        );
                    })}
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCloseModal}>Close</button>
                </Modal>
            )}
        </>
    );
}

export default DataTable;
