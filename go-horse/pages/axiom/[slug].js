import Head from 'next/head'
import Image from 'next/image'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { useRouter } from 'next/router' 
import Link from 'next/link'

export async function getStaticProps(context) {
  //TODO remove duplicated call
  //TODO use slug as filter
  const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
  const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
  const slug = context.params.slug;
  
  const client = new ApolloClient({
    uri: `https://graphql.contentful.com/content/v1/spaces/${space}`,
    cache: new InMemoryCache()
  });

  
  const { data } = await client.query({
    query: gql`
      query Get {
        axiomsCollection  {
          items  {
            slug
            number
            title
            description
          }
        }
      }
    `,
    context: {
      // example of setting the headers with context per operation
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    }
  });
  
  return {
    props: {
      axiomsCollection: data.axiomsCollection
    }
  }
}

export async function getStaticPaths() {
    //TODO remove duplicated call
    //TODO use slug as filter
    const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
    const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
    
    const client = new ApolloClient({
      uri: `https://graphql.contentful.com/content/v1/spaces/${space}`,
      cache: new InMemoryCache()
    });

    
    const { data } = await client.query({
      query: gql`
        query Get {
          axiomsCollection  {
            items  {
              slug
              number
              title
              description
            }
          }
        }
      `,
      context: {
        // example of setting the headers with context per operation
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      }
    });
    
    const paths = data.axiomsCollection.items.map(a=>{
      return {
        params: {
          slug: a.slug
        }
      }
    })

    return {
        paths: paths, 
        fallback: false 
    }
}

export default function Question({ axiomsCollection  }) {
  const router = useRouter()
  const { slug } = router.query;
  const q = axiomsCollection.items.find(element => element.slug == slug);
 
  return (
    <>
    <p><Link href="/gohorseHome">back</Link></p>
    <h3>{q.number} - {q.title}</h3>
    <p>{q.description}</p>
    </>
  )
}
