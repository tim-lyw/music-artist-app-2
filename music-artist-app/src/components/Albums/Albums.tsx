import React, { useRef, useEffect, useState } from 'react'
import styles from './Albums.module.scss'
import { AlbumInfoArray } from '../../App'
import { BsChevronCompactRight, BsChevronCompactLeft, BsSortAlphaDown, BsSortAlphaUp } from 'react-icons/bs';
import axios from "axios";
import { apiKey, baseUrl, artist } from '../../App';
import AlbumCard from '../AlbumCard/AlbumCard'

interface AlbumChildProps {
    albums: AlbumInfoArray
}



const Albums: React.FC<AlbumChildProps> = ({ albums }) => {

    const scrollRef = useRef<HTMLDivElement>(null);
    const [sortOrder, setSortOrder] = useState<boolean>(true);
    const [sortBy, setSortBy] = useState<string>("year");
    const [sortedAlbums, setSortedAlbums] = useState<AlbumInfoArray>(null);

    useEffect(() => {
        if (albums && albums.length) {
            setSortedAlbums(albums.filter(album => album.name !== "(null)").sort((a, b) => {
                if (a.name > b.name)
                    return sortOrder ? 1 : -1;
                if (a.name < b.name)
                    return sortOrder ? -1 : 1;
                return 0;
            }));

        }
    }, [albums, sortOrder]);

    const scroll = (value: number) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: value,
                behavior: 'smooth'
            });
        }
    }


    return (
        <>
            <div className={styles.sortDiv}>
                <select className={styles.select} onChange={e => { setSortBy(e.target.value) }}>
                    <option value="name">Name</option>
                    <option value="year">Year</option>
                </select>
                <button className={styles.sortButton} onClick={() => { setSortOrder(!sortOrder) }}>
                    {sortOrder ?
                        <BsSortAlphaDown size={25} /> :
                        <BsSortAlphaUp size={25} />
                    }

                </button>
            </div>

            <div className={styles.container}>

                <button className={styles.arrow} onClick={() => { scroll(-1200) }}>
                    <BsChevronCompactLeft size={100} />
                </button>
                <div className={styles.scroller} ref={scrollRef}>
                    {sortedAlbums &&
                        sortedAlbums.map((album, index) => {
                            return (
                                <AlbumCard album={album} key={index} />
                            )
                        })}
                </div>
                <button className={styles.arrow} onClick={() => { scroll(1200) }}>
                    <BsChevronCompactRight size={100} />
                </button>


            </div>
        </>


    )
}

export default Albums