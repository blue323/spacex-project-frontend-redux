import React, { useState } from 'react';
import Pagination from '../../shared/pagination/pagination';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
import UsersList from './UsersList';
import './Users.css'
import { useSelector } from "react-redux";

export default function Users() {
  
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(20);
  const [isLoadingFromButton, setIsLoadingFromButton] = useState(false);

  const users = useSelector((state) => state.users);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const uData = users.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(users.length / recordsPerPage)

  const handleLoadingButton = () => {
    setIsLoadingFromButton(true);
    setTimeout(() => { setIsLoadingFromButton(false) }, 250)
  }

  return (
    <React.Fragment>
      {(users.length <= 0) ? (
        <div className="u">
          <LoadingSpinner />
        </div> 
      ) :
      <React.Fragment>
        {isLoadingFromButton && (<div className="u"> <LoadingSpinner /></div>)}
        {!isLoadingFromButton && 
          <UsersList users={uData} />}
          <Pagination
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              handleLoadingButton={handleLoadingButton}
              />
      </React.Fragment>
      }
    </React.Fragment>
  );
}