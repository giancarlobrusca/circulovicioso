import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Círculo Vicioso Podcast</title>
        <meta name="description" content="Aguante El Círculo papá" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Image width={300} height={300} src="/circulo400x400.jpeg" alt="Circulo logo"/>
        <h1>Próximamente</h1>
      </main>

      <footer className={styles.footer}>
        
      </footer>
    </div>
  )
}
