import React from 'react'
import styles from './Hero.module.scss'
import { ArtistInfo } from '../../App'

interface ChildProps {
    artistInfo: ArtistInfo
}


const Hero: React.FC<ChildProps> = ({ artistInfo }) => {

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{artistInfo && artistInfo.name}</h1>
            <p className={styles.listeners}>{artistInfo && artistInfo.stats.listeners} Listeners</p>
        </div>
    )
}

export default Hero