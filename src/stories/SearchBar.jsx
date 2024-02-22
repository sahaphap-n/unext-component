import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import PropTypes from "prop-types";
import "./searchBar.css";

// version 1.0.0
export const SearchBar = ({
  initialValue = {},
  title = "ค้นหา",
  inputShowGroup = [
    {
      style: {},
      inputType: "input" || "select",
      key: "",
      placeholder: "",

      //select tag only
      option: [],
      optionValueKey: "",
      optionNameKey: "",
    },
  ],

  //number of input or select box per row
  maxInputCollapsePerRow = 3 || "",

  //data the same as inputShowGroup
  inputCollapseGroup = [],

  onClickSearch = () => null,
  textSearchButton = "",
  onClickReset = () => null,
  isShowReset = true,
}) => {
  const culumnLengthInputMainGroup = 12 / inputShowGroup.length || 12 / 1;
  const culumnLengthInputCollapseGroup =
    12 / Number(maxInputCollapsePerRow) || 12 / 3;

  const [data, setData] = useState(initialValue || {});
  const [isShowMore, setIsShowMore] = useState(false);

  //set data onChang each field
  const handleChangValue = (key, value) => {
    setData({ ...data, [key]: value });
  };

  //reset button
  const handleClickReset = () => {
    setData({ ...initialValue });
    onClickReset({ ...initialValue });
  };

  // show collaps input box
  const handleClickShowMore = () => {
    setIsShowMore((prev) => !prev);
  };

  // render follow input type
  const showInputBoxByInputType = (dataItem) => {
    if (dataItem.inputType == "input") {
      return (
        <input
          type="text"
          className="form-control searchBar_container_input"
          style={dataItem.style}
          placeholder={dataItem.placeholder || "กรุณาระบุ"}
          value={data[dataItem.key] || ""}
          onChange={(e) => handleChangValue(dataItem.key, e.target.value)}
        />
      );
    } else if (dataItem.inputType == "select") {
      return (
        <select
          style={dataItem.style}
          className="form-select searchBar_container_input"
          value={data[dataItem.key] || ""}
          onChange={(e) => handleChangValue(dataItem.key, e.target.value)}
        >
          <option value="">{dataItem.placeholder || "กรุณาเลือก"}</option>
          {!Array.isArray(dataItem?.option)
            ? null
            : dataItem?.option?.map((item) => (
                <option value={item[dataItem?.optionValueKey] || ""}>
                  {item[dataItem?.optionNameKey] || ""}
                </option>
              ))}
        </select>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="searchBar_container_search">
      <div class="searchBar_title_sub">{title}</div>
      <div className="row g-4 ">
        <div className="col-8">
          <div className="row g-4">
            {/* initials input container  */}
            {!Array.isArray(inputShowGroup)
              ? null
              : inputShowGroup?.map((item) => (
                  <div className={`col-${culumnLengthInputMainGroup}`}>
                    {showInputBoxByInputType(item)}
                  </div>
                ))}

            {/* when click show selecter more button*/}
            {!isShowMore || !Array.isArray(inputCollapseGroup)
              ? null
              : inputCollapseGroup?.map((item) => (
                  <div className={`col-${culumnLengthInputCollapseGroup}`}>
                    {showInputBoxByInputType(item)}
                  </div>
                ))}
          </div>
        </div>
        <div className="col-4">
          <div className="searchBar_container_search_button">
            {/* show more button */}
            {!Array.isArray(inputCollapseGroup) ||
            inputCollapseGroup.length == 0 ? null : (
              <button
                type="button"
                className="searchBar_btn_org_uxt_down"
                onClick={() => handleClickShowMore()}
              >
                {!isShowMore ? (
                  <svg
                    width="12"
                    height="11"
                    viewBox="0 0 12 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.8629 4.13606C11.9064 4.17852 11.9409 4.22927 11.9645 4.28529C11.988 4.34132 12.0001 4.4015 12 4.46227C11.9999 4.52305 11.9876 4.58318 11.9639 4.63914C11.9402 4.69509 11.9055 4.74573 11.8619 4.78806L6.54492 9.97007C6.45155 10.0611 6.32632 10.112 6.19592 10.112C6.06553 10.112 5.9403 10.0611 5.84692 9.97007L0.529938 4.78806C0.486395 4.74566 0.451786 4.69497 0.428155 4.63898C0.404524 4.58299 0.392349 4.52283 0.392349 4.46206C0.392349 4.40128 0.404524 4.34113 0.428155 4.28514C0.451786 4.22914 0.486395 4.17846 0.529939 4.13606C0.619236 4.04884 0.739111 4.00001 0.863938 4.00001C0.988765 4.00001 1.10864 4.04884 1.19794 4.13606L6.19592 9.00907L11.1959 4.13606C11.2852 4.04914 11.4048 4.00049 11.5294 4.00049C11.654 4.00049 11.7737 4.04914 11.8629 4.13606ZM11.8629 0.136053C11.9064 0.178516 11.9409 0.229259 11.9645 0.285286C11.988 0.341314 12.0001 0.40149 12 0.462264C11.9999 0.523038 11.9876 0.583178 11.9639 0.639133C11.9402 0.695088 11.9055 0.745724 11.8619 0.788054L6.54492 5.97006C6.45155 6.06108 6.32632 6.11201 6.19592 6.11201C6.06553 6.11201 5.9403 6.06108 5.84692 5.97006L0.529939 0.788053C0.486395 0.745657 0.451786 0.694967 0.428155 0.638976C0.404524 0.582985 0.392349 0.522827 0.392349 0.462053C0.392349 0.401279 0.404524 0.341121 0.428155 0.285129C0.451786 0.229138 0.486395 0.178448 0.529939 0.136052C0.619236 0.0488298 0.739111 -4.92229e-07 0.863938 -4.86773e-07C0.988765 -4.81316e-07 1.10864 0.0488298 1.19794 0.136052L6.19592 5.00906L11.1959 0.136053C11.2852 0.0491295 11.4048 0.000487541 11.5294 0.000487546C11.654 0.000487552 11.7737 0.0491295 11.8629 0.136053Z"
                      fill="#F79433"
                    />
                  </svg>
                ) : (
                  <svg
                    width="12"
                    height="11"
                    viewBox="0 0 12 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.137091 6.86394C0.0936128 6.82148 0.0590818 6.77073 0.0355363 6.71471C0.0119908 6.65868 -9.20988e-05 6.5985 1.12036e-06 6.53773C9.43395e-05 6.47695 0.0123618 6.41682 0.036079 6.36086C0.0597963 6.30491 0.094483 6.25427 0.138091 6.21194L5.45508 1.02993C5.54845 0.938919 5.67368 0.887981 5.80408 0.887981C5.93447 0.887981 6.0597 0.938919 6.15308 1.02993L11.4701 6.21194C11.5136 6.25434 11.5482 6.30503 11.5718 6.36102C11.5955 6.41701 11.6077 6.47717 11.6077 6.53794C11.6077 6.59872 11.5955 6.65887 11.5718 6.71487C11.5482 6.77086 11.5136 6.82155 11.4701 6.86394C11.3808 6.95116 11.2609 7 11.1361 7C11.0112 7 10.8914 6.95116 10.8021 6.86394L5.80408 1.99093L0.804089 6.86394C0.714838 6.95086 0.595176 6.99951 0.47059 6.99951C0.346005 6.99951 0.226343 6.95086 0.137091 6.86394ZM0.137091 10.8639C0.0936123 10.8215 0.0590813 10.7707 0.0355358 10.7147C0.0119903 10.6587 -9.26233e-05 10.5985 5.95823e-07 10.5377C9.3815e-05 10.477 0.0123612 10.4168 0.0360785 10.3609C0.0597958 10.3049 0.0944825 10.2543 0.138091 10.2119L5.45508 5.02994C5.54845 4.93892 5.67368 4.88799 5.80408 4.88799C5.93447 4.88799 6.0597 4.93892 6.15308 5.02994L11.4701 10.2119C11.5136 10.2543 11.5482 10.305 11.5718 10.361C11.5955 10.417 11.6077 10.4772 11.6077 10.5379C11.6077 10.5987 11.5955 10.6589 11.5718 10.7149C11.5482 10.7709 11.5136 10.8216 11.4701 10.8639C11.3808 10.9512 11.2609 11 11.1361 11C11.0112 11 10.8914 10.9512 10.8021 10.8639L5.80408 5.99094L0.804089 10.8639C0.714837 10.9509 0.595175 10.9995 0.47059 10.9995C0.346005 10.9995 0.226342 10.9509 0.137091 10.8639Z"
                      fill="#F79433"
                    />
                  </svg>
                )}
              </button>
            )}

            {/* search button */}
            <button
              type="button"
              className="searchBar_btn_primary"
              onClick={() => onClickSearch(data)}
            >
              <span>
                <FiSearch />
              </span>
              <span>{textSearchButton}</span>
            </button>

            {/* reset button */}
            {!isShowReset ? null : (
              <button
                type="button"
                className="searchBar_btn_org_uxt_reset"
                onClick={() => handleClickReset()}
              >
                <svg
                  width="13"
                  height="20"
                  viewBox="0 0 13 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.60039 0.832031V3.33203C10.1364 3.33203 13.0004 6.31536 13.0004 9.9987C13.0004 11.307 12.6324 12.5237 12.0084 13.5487L10.8404 12.332C11.2004 11.6404 11.4004 10.8404 11.4004 9.9987C11.4004 7.24037 9.24839 4.9987 6.60039 4.9987V7.4987L3.40039 4.16536L6.60039 0.832031ZM1.8002 9.99922C1.8002 12.7576 3.9522 14.9992 6.60019 14.9992V12.4992L9.8002 15.8326L6.60019 19.1659V16.6659C3.0642 16.6659 0.200195 13.6826 0.200195 9.99922C0.200195 8.69089 0.568195 7.47422 1.1922 6.44922L2.3602 7.66589C2.0002 8.35755 1.8002 9.15755 1.8002 9.99922Z"
                    fill="#F79433"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// check data type of prop
SearchBar.propTypes = {
  initialValue: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  title: PropTypes.string,
  inputShowGroup: PropTypes.arrayOf(
    PropTypes.shape({
      inputType: PropTypes.oneOf(["input", "select"]),
      key: PropTypes.string,
      placeholder: PropTypes.string,
      option: PropTypes.arrayOf(PropTypes.object),
      optionValueKey: PropTypes.string,
      optionNameKey: PropTypes.string,
    })
  ),
  inputCollapseGroup: PropTypes.arrayOf(
    PropTypes.shape({
      inputType: PropTypes.oneOf(["input", "select"]),
      key: PropTypes.string,
      placeholder: PropTypes.string,
      option: PropTypes.arrayOf(PropTypes.object),
      optionValueKey: PropTypes.string,
      optionNameKey: PropTypes.string,
    })
  ),
  maxInputCollapsePerRow: PropTypes.number,
  onClickSearch: PropTypes.func,
  textSearchButton: PropTypes.string,
  onClickReset: PropTypes.func,
  isShowReset: PropTypes.bool,
};

SearchBar.defaultProps = {
  initialValue: {},
  title: "ค้นหา",
  inputShowGroup: [
    {
      inputType: "input",
      key: "",
      placeholder: "",

      //select tag only
      option: [],
      optionValueKey: "",
      optionNameKey: "",
    },
    {
      style: {},
      inputType: "select",
      key: "",
      placeholder: "",

      //select tag only
      option: [],
      optionValueKey: "",
      optionNameKey: "",
    },
  ],

  //number of input or select box per row
  maxInputCollapsePerRow: 3 || "",

  //data the same as inputShowGroup
  inputCollapseGroup: [],

  onClickSearch: () => null,
  textSearchButton: "",
  onClickReset: () => null,
  isShowReset: true,
};
