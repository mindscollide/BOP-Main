import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Modal from "@/components/common/globalModal/Modal";
import "./companiesListModal.css";
import { Col, Row } from "react-bootstrap";
import SelectDropdown from "@/components/common/selectDropdown/SelectDropdown";
import { useTableScrollBottom } from "@/utils/useTableScrollBottom";
import GlobalTable from "@/components/common/table/GlobalTable";
import { formatPkAmount } from "@/utils/formatters";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { GetCorporateDailyVolumeAPI } from "@/components/features/SpotBranch/WatchlistAction";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { clearCorporateDailyVolume } from "@/store/watchListSlicer/WatchListSlicer";
import InputFIeld from "@/components/common/inputField/InputField";
import { debounce } from "lodash";
import IconElement from "@/components/common/IconElement/IconElement";

const CompaniesListModal = ({ isCompanyListModal, setIsCompanyListModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sRow, setSRow] = useState(0);
  const tableWrapperRef = useRef(null);
  const [crossButton, setCrossButton] = useState(false);
  const [recordsLength, setRecordLength] = useState(0);
  const [dropdownvalue, setDropdownvalue] = useState(10);
  const [tableData, setTableData] = useState([]);
  const [searchName, setSearchName] = useState("");
  const GetCorporateDailyVolume = useSelector(
    (state) => state.WatchListReducer.GetCorporateDailyVolume
  );

  const loading = useSelector(
    (state) => state.WatchListReducer.GetCorporateDailyVolumeLoading
  );

  const [selectPageSize, setSelectPageSize] = useState({
    value: 10,
    label: "10",
  });

  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const Data = {
      sRow: 0,
      Length: dropdownvalue,
      searchName: searchName,
    };
    dispatch(GetCorporateDailyVolumeAPI({ Data }));

    return () => {
      dispatch(clearCorporateDailyVolume());
    };
  }, []);

  const { hasReachedBottom, setHasReachedBottom } = useTableScrollBottom(() => {
    console.log("🚀 Table reached bottom");
    // Load more data here if needed
    // setHasReachedBottom(true);
    if (recordsLength !== tableData.length) {
      const Data = {
        Length: dropdownvalue,
        sRow: sRow,
        searchName: searchName,
      };
      dispatch(GetCorporateDailyVolumeAPI({ Data }));
    }
  });

  const handlePageSizeChange = (newSize) => {
    console.log(newSize, "newSizenewSize");
    setSelectPageSize(newSize);
    setDropdownvalue(newSize.value);
    setSRow(0);
    setHasReachedBottom(false);
    setTableData([]);
    setRecordLength(0);
    try {
      const Data = {
        Length: newSize.value,
        sRow: 0,
        searchName: searchName,
      };
      dispatch(GetCorporateDailyVolumeAPI({ Data }));
    } catch (error) {
      console.log(error);
    }
  };
  const companyListColumns = [
    {
      title: (
        <>
          <div className="d-flex justify-content-start gap-2">
            <span>Company Name</span>
            {sortOrder === "desc" ? (
              <ArrowUpOutlined onClick={() => setSortOrder("asc")} />
            ) : (
              <ArrowDownOutlined onClick={() => setSortOrder("desc")} />
            )}
          </div>
        </>
      ),
      dataIndex: "corporateName",
      key: "corporateName",
      width: "350px",
      align: "left",
      ellipsis: true,
    },

    {
      title: "Volume",
      dataIndex: "totalVolume",
      key: "totalVolume",
      width: "100px",
      align: "start",
      ellipsis: true,
      render: (amount) => formatPkAmount(amount, { decimals: 2 }),
    },
  ];

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSRow(0);
      setTableData([]);
      setRecordLength(0);
      setHasReachedBottom(false);

      const Data = {
        sRow: 0,
        Length: dropdownvalue,
        searchName: value,
      };

      dispatch(GetCorporateDailyVolumeAPI({ Data }));
    }, 500), // ⏱ 500ms delay
    [dispatch, dropdownvalue]
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  useEffect(() => {
    if (GetCorporateDailyVolume !== null) {
      try {
        const { corporateDailyVolumes, totalCount } = GetCorporateDailyVolume;
        console.log({ tableData, hasReachedBottom }, "hasReachedBottom");

        if (hasReachedBottom) {
          console.log("in hasReachedBottom");
          setHasReachedBottom(false);
          setRecordLength(totalCount);
          setTableData([...tableData, ...corporateDailyVolumes]);
          setSRow(tableData.length + corporateDailyVolumes.length);
        } else {
          console.log("else");

          if (tableWrapperRef.current) {
            const tableBody =
              tableWrapperRef.current.querySelector(".ant-table-body");

            if (tableBody) {
              tableBody.scrollTop = 0;
            }
          }

          setHasReachedBottom(false);
          setTableData(corporateDailyVolumes);

          setRecordLength(totalCount);
          setSRow(corporateDailyVolumes.length);
        }
      } catch (error) {
        console.log(error, "Error");
      }
    } else if (GetCorporateDailyVolume === null) {
      if (!hasReachedBottom) {
        console.log("in !hasReachedBottom");

        setHasReachedBottom(false);
        setTableData([]);
        setRecordLength(0);
        setSRow(0);
      }
    }
  }, [GetCorporateDailyVolume]);

  console.log(tableData, "tableData");
  // 'asc' | 'desc'
  const sortedTableData = useMemo(() => {
    if (!Array.isArray(tableData) || tableData.length === 0) return [];

    return [...tableData].sort((a, b) => {
      const volA = Number(a?.totalVolume || 0);
      const volB = Number(b?.totalVolume || 0);

      // Sort by volume (dynamic order)
      if (volA !== volB) {
        return sortOrder === "asc" ? volA - volB : volB - volA;
      }

      // If volume equal, sort by name (always ASC)
      return (a?.corporateName || "").localeCompare(b?.corporateName || "");
    });
  }, [tableData, sortOrder]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchName(value);
    debouncedSearch(value);
  };
  const handleClickClear = () => {
    if (searchName.trim() !== "") {
      setSearchName("");
      debouncedSearch("");
    }
  };

  return (
    <>
      <Modal
        show={isCompanyListModal}
        onHide={() => setIsCompanyListModal(false)}
        bodyClassName="CompanyListModalBox"
        headerClassName={"border-0"}
        centered
        // size="sm"
        closeButton={true}
        modalHeader={
          <>
            <Row>
              <Col
                sm={12}
                md={12}
                lg={12}
                className="modal-title text-uppercase flex-fill"
              >
                <h5>Companies List</h5>
              </Col>
            </Row>
          </>
        }
        modalBody={
          <>
            <Row>
              <Col lg={4} md={4} sm={12} className="d-flex align-items-center">
                <SelectDropdown
                  value={selectPageSize}
                  onChange={handlePageSizeChange}
                  options={[
                    { label: "10", value: 10 },
                    { label: "25", value: 25 },
                    { label: "50", value: 50 },
                    { label: "100", value: 100 },
                  ]}
                  classNamePrefix={"companyListPageSizeDropdown"}
                ></SelectDropdown>
              </Col>
              <Col
                lg={8}
                md={8}
                sm={12}
                className=" d-flex align-items-center justify-content-end"
              >
                <span className="position-relative">
                  <InputFIeld
                    type="text"
                    placeholder="Search"
                    value={searchName}
                    onChange={handleSearchChange}
                    applyClass="companyListSearchInput"
                  />
                  <span className="position-absolute top-50 me-1 end-0 translate-middle-y">
                    <IconElement
                      onClick={handleClickClear}
                      iconClass={"icon-close"}
                    ></IconElement>
                  </span>
                </span>
              </Col>
            </Row>

            <Row className="mt-1">
              <Col lg={12} md={12} sm={12}>
                <GlobalTable
                  columns={companyListColumns}
                  pagination={false}
                  dataSource={sortedTableData}
                  scroll={{ y: "40vh" }}
                  className={"CompanyList-table"}
                  loading={loading}
                  ref={tableWrapperRef}
                />
              </Col>
            </Row>
          </>
        }
      />
    </>
  );
};

export default CompaniesListModal;
