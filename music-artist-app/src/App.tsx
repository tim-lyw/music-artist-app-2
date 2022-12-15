import styles from './styles/App.module.scss';
import Hero from './components/Hero/Hero';
import Albums from './components/Albums/Albums';
import { useEffect, useState } from 'react'
import axios from "axios";

//these will go into a .env file
export const apiKey = '49699de1f7bd083284833b4e87dd276d'; 
export const baseUrl = 'https://ws.audioscrobbler.com/2.0/';
export const artist = "John+Mayer"


export type ArtistInfo = {
    name: string,
    mbid: string,
    url: string,
    image: {
        "#text": string,
        size: string
    }[],
    streamable: string,
    ontour: string,
    stats: {
        listeners: string,
        playcount: string
    },
    similar: {
        artist: []
    },
    tags: {
        tag: []
    },
    bio: {
        links: {
            link: {
                "#text": string,
                rel: string,
                href: string
            }
        },
        published: string,
        summary: string,
        content: string
    }
} | null

export type AlbumInfo = {
    name: string,
    playcount: number,
    mbid: string,
    url: string,
    artist: {
        name: string,
        mbid: string,
        url: string
    },
    image: {
        "#text": string,
        size: string
    }[]
}

export type AlbumInfoArray = AlbumInfo[] | null;

const App = () => {

    
    const [artistInfo, setArtistInfo] = useState<ArtistInfo>(null);
    const [albums, setAlbums] = useState<AlbumInfoArray>(null);


    useEffect(() => {
        axios.get(`${baseUrl}?method=artist.getinfo&artist=${artist}&api_key=${apiKey}&format=json`)
            .then(res => {
                setArtistInfo(res.data.artist);
            })
            .catch(e => console.log(e));

        axios.get(`${baseUrl}?method=artist.gettopalbums&artist=${artist}&api_key=${apiKey}&format=json`)
            .then(res => {
                setAlbums(res.data.topalbums.album);
            })
            .catch(e => console.log(e));
    }, []);



    return (
        <div className={styles.appHeader}>
            <Hero artistInfo={artistInfo} />
            <Albums albums={albums} />
        </div>
    );
}

export default App;

