import React from 'react'
import FollowerCard from '../FollowersCard/FollowerCard'
import LogoSearch from '../logoSearch/LogoSearch'
import ProfileCard from '../profileCard/ProfileCard'
import './ProfileSide.css'

const ProfileSide = () => {
  return (
    <div className="profileSide">
        <LogoSearch/>
        <ProfileCard location="homePage" />
        <FollowerCard/>
    </div>
  )
}

export default ProfileSide