import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link";
import Layout from "../components/Layout";

export default function HomePage() {
  return (
    <Layout>

      <h1>Home page</h1>
      <Link href='/about'>About</Link>

    </Layout>
  )
}
