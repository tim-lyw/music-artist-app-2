import React, { useEffect, useState } from 'react'
import { AlbumInfo } from '../../App';
import axios from 'axios';
import { baseUrl, apiKey, artist } from '../../App'
import styles from './AlbumCard.module.scss'
import Modal from '@mui/material/Modal';

interface ChildProps {
    album: AlbumInfo
}


const AlbumCard: React.FC<ChildProps> = ({ album }) => {

    const [releaseYear, setReleaseYear] = useState<string>();
    const [open, setOpen] = useState<boolean>(false);
    const [albumData, setAlbumData] = useState<any>();


    useEffect(() => {
        if (album) {
            axios.get(`${baseUrl}?method=album.getinfo&api_key=${apiKey}&artist=${artist}&album=${album.name}&format=json`)
                .then(res => {
                    setAlbumData(res.data.album);
                    if (res.data.album.wiki) {
                        const releaseYear = res.data.album.wiki.published.slice(7, 11);
                        setReleaseYear(releaseYear);
                        
                    } else setReleaseYear("-")

                })
                .catch(e => console.log(e));
        }
    }, [album]);

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);





    return (
        <>
            <div className={styles.container}>
                <div className={styles.albumCard}>
                    <button onClick={handleOpen} className={styles.albumCardButton}>
                        <img src={album.image[3]['#text']} className={styles.image} />

                    </button>

                </div>
                <h1 className={styles.albumTitle}>{album.name}</h1>
                <h1 className={styles.year}>{releaseYear}</h1>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
            >
                <div className={styles.modal}>
                    <h1 className={styles.modalTitle}>{albumData && albumData.name}</h1>
                    {['Song 1', 'Song 2', 'Song 3'].map((song, index) => {
                        return (
                            <p className={styles.songTitle} key={index}>{song}</p>
                        )
                    })}
                </div>

            </Modal>
        </>


    )
}

export default AlbumCard