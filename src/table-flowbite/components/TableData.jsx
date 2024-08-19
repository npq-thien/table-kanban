import {
  Button,
  Checkbox,
  Modal,
  Pagination,
  Table,
  TableBody,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaSearch, FaPlus, FaArrowDown, FaArrowUp } from "react-icons/fa";
import { columns, rowData as initialRowData } from "../constants/data";
import DeleteRowPopup from "./DeleteRowPopup";
import EditRowPopup from "./EditRowPopup";
import {
  customPaginationTheme,
  customTableTheme,
} from "../constants/customTheme";
import AutoHideToast from "./AutoHideToast";
import EditableTableRow from "./EditableTableRow";



const TableData = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDeleteMultiple, setOpenDeleteMultiple] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [listDeletedName, setListDeletedName] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentRowData, setCurrentRowData] = useState(null);
  const [rowData, setRowData] = useState(initialRowData); // for sort
  const [filteredRows, setFilteredRows] = useState(rowData); // this state for search, filter
  const [paginationRows, setPaginationRows] = useState(filteredRows); // for pagination, depends on filtered row
  const [sortProps, setSortProps] = useState({
    direction: null,
    column: null,
  });

  const handleCloseToast = () => {
    setShowToast(false);
  };

  // Pagination
  const onPageChange = (page) => setCurrentPage(page);

  useEffect(() => {
    // Search function
    const newFilterRows = rowData.filter((row) =>
      Object.entries(row).some(([key, field]) =>
        field.toString().toLowerCase().includes(searchValue)
      )
    );
    setFilteredRows(newFilterRows);

    // Pagination
    const paginatedRow = newFilterRows.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    setPaginationRows(paginatedRow);

    // console.log("newFiltered", newFilterRows);
    // console.log("paginatedRow", paginatedRow);
  }, [rowData, currentPage, itemsPerPage, searchValue]);

  const handleSelectAllRows = (e) => {
    if (e.target.checked) {
      const allRowIds = rowData.map((row) => row.id);
      setSelectedRows(allRowIds);
    } else {
      setSelectedRows([]);
    }
  };

  // Delete row
  const handleDeleteRow = (id) => {
    const row = rowData.find((r) => r.id === id);
    setCurrentRowData(row);
    setOpenDelete(true);
  };

  const handleConfirmDelete = (id) => {
    const updatedRow = rowData.filter((r) => r.id !== id);
    setRowData(updatedRow);
    setFilteredRows(updatedRow);
    setOpenDelete(false);

    setToastMessage("Deleted single row successfully.");
    setShowToast(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  // Delete multiple rows
  const handleSelectRow = (id) => {
    setSelectedRows((prevSelectedRow) =>
      prevSelectedRow.includes(id)
        ? prevSelectedRow.filter((rowId) => rowId !== id)
        : [...prevSelectedRow, id]
    );
  };

  const handleDeleteMultipleRows = () => {
    setListDeletedName(
      rowData
        .filter((row) => selectedRows.includes(row.id)) // Filter rows where the ID is in selectedRows
        .map((row) => row.name)
    );
    setOpenDeleteMultiple(true);
  };

  const handleCloseDeleteMultiple = () => {
    setOpenDeleteMultiple(false);
  };

  const handleConfirmDeleteMultipleRows = () => {
    const updatedRow = rowData.filter((row) => !selectedRows.includes(row.id));
    setRowData(updatedRow);
    setFilteredRows(updatedRow);
    setSelectedRows([]);
    setOpenDeleteMultiple(false);

    setToastMessage("Deleted multiple rows succesfully.");
    setShowToast(true);
    // console.log('delete multi', rowData.length, filteredRows.length)
  };

  // Edit row
  const handleEditRow = (row) => {
    // console.log("select", row);
    setCurrentRowData(row);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleSaveEditRow = (updatedRow) => {
    const updatedData = rowData.map((row) =>
      row.id === updatedRow.id ? updatedRow : row
    );
    setRowData(updatedData);
    setFilteredRows(updatedData);

    setToastMessage("Save the edited row successfully.");
    setShowToast(true);
  };

  // Add row
  const handleAddRow = () => {
    const newId = Number(rowData.length) + 1;
    const newRow = {
      id: String(newId),
      name: "",
      age: "",
      gender: "",
      email: "",
      status: "",
    };
    // console.log(newId, rowData.length);
    setRowData([newRow, ...rowData]);
    setFilteredRows([newRow, ...rowData]);
  };

  // Search
  const handleSearchValue = (e) => {
    setSearchValue(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  // Sort
  const handleSortData = (key) => {
    let direction = "asc";

    if (sortProps.column === key && sortProps.direction === "asc")
      direction = "desc";
    else if (sortProps.column === key && sortProps.direction === "desc")
      direction = null;

    setSortProps({ column: key, direction: direction });
    if (direction) {
      const sortedData = [...rowData].sort((a, b) => {
        if (a[key] <= b[key]) return direction === "asc" ? -1 : 1;
        else return direction === "asc" ? 1 : -1;
      });
      setRowData(sortedData);
      // console.log("sorted", sortProps.column, direction, sortedData);
    }
  };

  return (
    <div>
      <div className="p-4 overflow-x-auto">
        <AutoHideToast
          show={showToast}
          message={toastMessage}
          onClose={handleCloseToast}
        />
        <div className="flex justify-between items-center my-4">
          <TextInput
            type="text"
            placeholder="Search"
            icon={FaSearch}
            onChange={handleSearchValue}
          />
          <div className="flex items-center gap-2">
            <Button
              className="bg-green-400"
              color="success"
              onClick={handleAddRow}
            >
              <div className="flex-center gap-2">
                <FaPlus className="w-6 h-6" />
                Add row
              </div>
            </Button>
            <Button
              className="bg-red-500"
              color="failure"
              onClick={handleDeleteMultipleRows}
              disabled={selectedRows.length === 0}
            >
              <div className="flex-center gap-2">
                <MdDelete className="w-6 h-6" />
                Delete rows
              </div>
            </Button>
          </div>
        </div>

        <Table
          theme={customTableTheme}
          striped={true}
          hoverable={true}
          className="shadow-md w-full"
          color="#365486"
        >
          <TableHead>
            <Table.HeadCell>
              <Checkbox
                className="cursor-pointer"
                onChange={handleSelectAllRows}
                checked={selectedRows.length === rowData.length}
              />
            </Table.HeadCell>
            {columns.map((item) => {
              // console.log("asda", sortProps);
              return (
                <TableHeadCell key={item.key}>
                  <div
                    className="flex items-center gap-4 cursor-pointer"
                    onClick={() => handleSortData(item.key)}
                  >
                    {item.label}
                    {sortProps.column === item.key &&
                      sortProps.direction === "desc" && <FaArrowDown />}
                    {sortProps.column === item.key &&
                      sortProps.direction === "asc" && <FaArrowUp />}
                  </div>
                </TableHeadCell>
              );
            })}
            <TableHeadCell>Actions</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {paginationRows.map((row) => (
              <TableRow
                key={row.id}
                className="bg-white"
                // onDoubleClick={() => handleEditRow(row)}
              >
                {/* <TableCell>
                  <Checkbox
                    className="cursor-pointer"
                    onChange={() => handleSelectRow(row.id)}
                    checked={selectedRows.includes(row.id)}
                  />
                </TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.gender}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.status}</TableCell>

                <TableCell className="flex gap-2">
                  <Button
                    className="bg-blue-500"
                    onClick={() => handleEditRow(row)}
                  >
                    <FaEdit className="w-4 h-4" />
                  </Button>
                  <Button
                    className="bg-red-400"
                    onClick={() => handleDeleteRow(row.id)}
                  >
                    <MdDelete className="w-4 h-4" />
                  </Button>
                </TableCell> */}

                <EditableTableRow
                  row={row}
                  onSave={handleSaveEditRow}
                  handleDeleteRow={handleDeleteRow}
                  handleEditRow={handleEditRow}
                  selectedRows={selectedRows}
                  handleSelectRow={handleSelectRow}
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex flex-col gap-2 items-end mt-4">
          <p>{filteredRows.length} items</p>
          <Pagination
            theme={customPaginationTheme}
            showIcons
            currentPage={currentPage}
            totalPages={Math.ceil(filteredRows.length / itemsPerPage)}
            onPageChange={onPageChange}
          />
        </div>

        {/* Popup confirm delete multiple rows */}
        <Modal show={openDeleteMultiple} onClose={handleCloseDeleteMultiple}>
          <Modal.Header>Confirm deletion</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Do you want to delete
                <span className="text-red-500">
                  {" "}
                  {listDeletedName ? listDeletedName.join(", ") : "these data"}?
                </span>
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleConfirmDeleteMultipleRows}>Accept</Button>
            <Button color="gray" onClick={handleCloseDeleteMultiple}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Delete confirm popup */}
        <DeleteRowPopup
          open={openDelete}
          handleClose={handleCloseDelete}
          data={currentRowData}
          handleDelete={handleConfirmDelete}
        />

        <EditRowPopup
          open={openEdit}
          handleClose={handleCloseEdit}
          data={currentRowData}
          handleSave={handleSaveEditRow}
        />
      </div>
    </div>
  );
};

export default TableData;
