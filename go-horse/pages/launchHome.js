import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import Link from 'next/link'

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: 'https://api.spacex.land/graphql/',
    cache: new InMemoryCache()
  });
  
  const { data } = await client.query({
    query: gql`
      query GetLaunches {
        launchesPast(limit: 10) {
          id
          mission_name
          launch_date_local
          launch_site {
            site_name_long
          }
          links {
            article_link
            video_link
            mission_patch
          }
          rocket {
            rocket_name
          }
        }
      }
    `
  });
  
  return {
    props: {
      launches: data.launchesPast
    }
  }
}

export default function Home({ launches }) {
  
  return (
    <>
    <p><Link href="/">back samples home</Link></p>
    <p>
    <h2>Launch list:</h2>
      <ul>
        {launches.map((launch) => (
          <li key={launch.id}>
            <Link href={`/launches/${encodeURIComponent(launch.id)}`}>
              <a>{launch.mission_name}</a>
            </Link>
          </li>
        ))}
      </ul>
      </p>

      <br/>
    <h2>Launch videos: </h2>
    <div className={styles.grid}>
      {launches.map(launch => {
        return (
          <a key={launch.id} href={launch.links.video_link} className={styles.card}>
            <h3>{ launch.mission_name }</h3>
            <p><strong>Launch Date:</strong> { new Date(launch.launch_date_local).toLocaleDateString("en-US") }</p>
          </a>
        );
      })}
       
      
    </div>
    </>
  )
}
