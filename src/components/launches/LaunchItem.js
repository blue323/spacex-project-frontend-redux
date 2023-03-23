import React, { useEffect, useState } from 'react';
import './LaunchItem.css';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { addLaunchToUser, removeLaunchFromUser } from '../../reducers/usersReducer';
import Modal from '../../shared/UIElements/Modal';

const LaunchItem = () => {
  const { state } = useLocation();
  const launchIdFromURL = useParams().lid;

  const dispatch = useDispatch();
  const history = useHistory();
  const users = useSelector((state => state.users))
  const authState = useSelector((state => state.auth))
  const [show, setShow] = useState(false)
  const [add, setAdd] = useState(true)

  const handleModalClose = () => {
    setShow(false)
    if(add === true) setAdd(false) 
    history.push(`/mywatchlist/${authState.userId}`)
  }

  const handleAddLaunch = async(e) => {
    e.preventDefault()

    const url = `https://spacex-project-backend.vercel.app/pastLaunch/${launchIdFromURL}/${authState.userId}`

    dispatch(addLaunchToUser(url))
    setAdd(true)
    setShow(true)
  }

  const handleRemoveLaunch = async(e) => {
    e.preventDefault()

    const url = `https://spacex-project-backend.vercel.app/pastLaunch/${launchIdFromURL}/${authState.userId}`

    dispatch(removeLaunchFromUser(url))
    setAdd(false)
    setShow(true)
  }
    
  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: '0px' });
  }, []);

  let myUser;

  for(let i=0; i<users.length; i++) {
    if(users[i].id === authState.userId) {
        myUser = users[i]
    }
  }

  let hasLaunch = false;

  if(!!myUser) {
    for(let i=0; i<myUser.launches.length; i++) {
      if(myUser.launches[i].launchId === launchIdFromURL) {
        hasLaunch = true;
      }
    }
  }

  //console.log(hasLaunch)

  const url = "https://www.youtube.com/embed/" + state.links.youtube_id

  return (
    <>
    <Modal title="Info" onClose={handleModalClose} show={show}>
        {add === true ? 
          <p>launch added to your watchlist</p> :
          <p>launch removed from your watchlist</p>
        }
      </Modal>
    <div className='launchItem' key={state.id}>
      <h1>{state.name}</h1>
      {state.fDate ?
        <p>Launch Date: {state.fDate}</p> :
        null
      }
      <p>Successful: {state.success === true ? 'Yes' : state.success === false ? 'No' : 'Launch is pending'}</p>
          {state.links.reddit.campaign ?
            <a className='text' href={state.links.reddit.launch} target='_blank' rel='noreferrer'>Reddit - Campaign</a> :
            null
          }
          {state.links.reddit.launch ?
            <a className='text' href={state.links.reddit.launch} target='_blank' rel='noreferrer'>Reddit - Launch</a> :
             null
          }
          {state.links.wikipedia ?
            <a className='text' href={state.links.wikipedia} target='_blank' rel='noreferrer'>Wikipedia</a> :
            null
          }
          <iframe 
              width="560" 
              height="315" 
              src={url}
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
          </iframe>
          <h2>Rocket</h2>
          <p>{state.rocket.name}</p>
          <p>{state.rocket.active === true ? 'Status: Active' : 'Status: Retired'}</p>
          <p>Stages: {state.rocket.stages}</p>
          <p>Boosters: {state.rocket.boosters}</p>
          <ul>
            {state.rocket.flickr_images.map(image => 
              <a 
                 href={image} 
                target='_blank' 
                rel='noreferrer' 
                key={state.rocket.flickr_images.indexOf(image)} >
              <img 
                 key={state.rocket.flickr_images.indexOf(image)} 
                src={image}
                alt='rocket'
              />
              </a>)}
          </ul>
          {(hasLaunch === false) && authState.isLoggedIn && <button onClick={handleAddLaunch}>Add to watchlist</button>}
          {(hasLaunch === true) && authState.isLoggedIn && <button onClick={handleRemoveLaunch}>Remove from watchlist</button>}
        </div>
    </>
     
    )
}

export default LaunchItem;