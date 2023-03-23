import React, { useState} from 'react';
import Pagination from '../../shared/pagination/pagination';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
import LaunchesList from './LaunchesList';
import './Launches.css'
import { useSelector } from "react-redux";


export default function Launches() {
  const launches = useSelector((state) => state.launches);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(20);
  const [isLoadingFromButton, setIsLoadingFromButton] = useState(false);


  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const launchesData = launches.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(launches.length / recordsPerPage)

  const handleLoadingButton = () => {
    setIsLoadingFromButton(true);
    setTimeout(() => { setIsLoadingFromButton(false) }, 250)
  }

    return (
      <React.Fragment>
        {isLoadingFromButton && (<div className="l"> <LoadingSpinner /></div>)}
        {!isLoadingFromButton && <LaunchesList launches={launchesData} />}
          <Pagination
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              handleLoadingButton={handleLoadingButton}
          />
      </React.Fragment>
    );
}