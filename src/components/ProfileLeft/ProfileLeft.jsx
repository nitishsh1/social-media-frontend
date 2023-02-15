import React from 'react'
import LogoSearch from '../../components/logoSearch/LogoSearch'
import InfoCard from '../InfoCard/InfoCard'
import FollowerCard from '../../components/FollowersCard/FollowerCard'

const ProfileLeft = () => {
  return (
    <div className="profileSide">
        <LogoSearch/>
        <InfoCard/>
        <FollowerCard/>
    </div>
  )
}

export default ProfileLeft