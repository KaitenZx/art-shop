import fs from 'fs';
import path from 'path';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './[id].module.css';
import { useState } from 'react';
import Modal from '@/components/modal';

interface ArtDetails {
	name: string;
	images: string[];
}

interface PicturePageProps {
	artDetail: ArtDetails | null;
}

interface ArtDetails {
	name: string;
	images: string[];
}

interface PicturePageProps {
	artDetail: ArtDetails | null;
}

export const getStaticPaths: GetStaticPaths = async () => {
	const galleryDir = path.join(process.cwd(), 'public/gallery');
	const directories = fs.readdirSync(galleryDir, { withFileTypes: true })
		.filter(dirent => dirent.isDirectory())
		.map(dirent => dirent.name);

	const paths = directories.map((dir) => ({
		params: { id: dir }
	}));

	return {
		paths,
		fallback: false
	};
};


export const getStaticProps: GetStaticProps = async ({ params }) => {
	const id = params?.id as string;
	const galleryDir = path.join(process.cwd(), `public/gallery/${id}`);

	if (!fs.existsSync(galleryDir)) {
		return {
			notFound: true,
		};
	}

	const images = fs.readdirSync(galleryDir)
		.filter(file => /\.(jpg|jpeg|png|gif)$/.test(file))
		.map(file => `/gallery/${id}/${file}`);

	const artDetail: ArtDetails = {
		name: id,
		images,
	};

	return {
		props: {
			artDetail
		}
	};
};


interface Descriptions {
	[key: string]: string[]
}

const descriptions: Descriptions = {
	'man': ['man', 'oil on canvas', '700x800', '12.11.2024'],
	'lake': ['lake', 'oil on canvas', '700x800', '12.11.2024'],
	'void': ['void', 'oil on canvas', '700x800', '12.11.2024'],
}

const PicturePage = ({ artDetail }: PicturePageProps) => {
	const router = useRouter();
	const { id } = router.query;
	
	  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

	if (!artDetail) {
		return <div>Artwork not found</div>;
	}
	
	
  const openModal = (image: string) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };


	return (
		<div className={styles.container}>
			{/*<div className={styles.header}> {descriptions[id as string]}</div>*/}
			<div className={styles.header}> ОПИСАНИЕ КАРТИНЫ ДАТА ИМЯ МАТЕРИАЛЫ</div>
			<div className={styles.grid}>
				{artDetail.images.map((picture, index) => (
					<div key={index} className={styles.pictureContainer} onClick={() => openModal(picture)}>
						<Image src={picture} alt='' layout="fill" style={{ objectFit: 'cover' }} />
					</div>
				))}
			</div>
			<Modal show={isModalOpen} onClose={closeModal}>
        <div className={styles.imageContainer}>
          {selectedImage && (
            <Image
              src={selectedImage}
              alt=""
              fill
              style={{ objectFit: 'contain' }}
            />
          )}
        </div>
      </Modal>
		</div>
	);
};

export default PicturePage;