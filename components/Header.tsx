import Link from "next/link"
import styles from "./Header.module.css"
const Header = () => {
	return (
		<div className={styles.container}>
			<div className={styles.name}>Tsiala Ghlonti</div>
			<div className={styles.menu}>
				<Link href='/gallery' className={styles.menuLink}>art store</Link>
				<div className={styles.menuLink}>about</div>
				<div className={styles.menuLink}>prints</div>
				<div className={styles.menuLink}>contact</div>
			</div>
		</div>
	)

}

export default Header
