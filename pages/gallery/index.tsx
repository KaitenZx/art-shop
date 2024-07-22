import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from './index.module.css';
import fs from 'fs';
import path from 'path';

interface Picture {
  path: string;
  alt: string;
  name: string;
}

interface GalleryProps {
  allArt: Picture[];
}

export const getStaticProps = async () => {
  const galleryDir = path.join(process.cwd(), 'public/gallery');
  const files = fs.readdirSync(galleryDir, { withFileTypes: true })
    .filter(dirent => dirent.isFile() && /\.webp$/.test(dirent.name))
    .map(dirent => dirent.name);

  const allArt: Picture[] = files.map(file => {
    const name = path.parse(file).name;
    return {
      path: `/gallery/${file}`,
      alt: name,
      name: name,
    };
  });

  return {
    props: {
      allArt,
    },
  };
};

const Gallery = ({ allArt }: GalleryProps) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Gallery</title>
      </Head>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
      <h1>Gallery</h1>

      <div className={styles.grid}>
        {allArt.map(picture => (
          <Link key={picture.name} href={`/gallery/${picture.name}`} className={styles.picture}>
            <Image fill style={{ objectFit: 'cover' }} src={picture.path} alt={picture.alt} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
